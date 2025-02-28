import type { GraphQLSchemaExtension } from '@keystone-next/types';

import { AuthGqlNames, AuthTokenTypeConfig } from '../types';

import { createAuthToken } from '../lib/createAuthToken';
import { validateAuthToken } from '../lib/validateAuthToken';
import { getAuthTokenErrorMessage } from '../lib/getErrorMessage';

export function getPasswordResetSchema<I extends string, S extends string>({
  listKey,
  identityField,
  secretField,
  protectIdentities,
  gqlNames,
  passwordResetLink,
}: {
  listKey: string;
  identityField: I;
  secretField: S;
  protectIdentities: boolean;
  gqlNames: AuthGqlNames;
  passwordResetLink: AuthTokenTypeConfig;
}): GraphQLSchemaExtension {
  return {
    typeDefs: `
      # Reset password
      type Query {
        ${gqlNames.validateItemPasswordResetToken}(${identityField}: String!, token: String!): ${gqlNames.ValidateItemPasswordResetTokenResult}
      }
      type Mutation {
        ${gqlNames.sendItemPasswordResetLink}(${identityField}: String!): ${gqlNames.SendItemPasswordResetLinkResult}
        ${gqlNames.redeemItemPasswordResetToken}(${identityField}: String!, token: String!, ${secretField}: String!): ${gqlNames.RedeemItemPasswordResetTokenResult}
      }
      type ${gqlNames.SendItemPasswordResetLinkResult} {
        code: PasswordResetRequestErrorCode!
        message: String!
      }
      enum PasswordResetRequestErrorCode {
        IDENTITY_NOT_FOUND
        MULTIPLE_IDENTITY_MATCHES
      }

      type ${gqlNames.ValidateItemPasswordResetTokenResult} {
        code: PasswordResetRedemptionErrorCode!
        message: String!
      }
      type ${gqlNames.RedeemItemPasswordResetTokenResult} {
        code: PasswordResetRedemptionErrorCode!
        message: String!
      }
      enum PasswordResetRedemptionErrorCode {
        FAILURE
        IDENTITY_NOT_FOUND
        MULTIPLE_IDENTITY_MATCHES
        TOKEN_NOT_SET
        TOKEN_MISMATCH
        TOKEN_EXPIRED
        TOKEN_REDEEMED
      }
    `,
    resolvers: {
      Mutation: {
        async [gqlNames.sendItemPasswordResetLink](root: any, args: { [P in I]: string }, context) {
          const list = context.keystone.lists[listKey];
          const itemAPI = context.sudo().lists[listKey];
          const tokenType = 'passwordReset';
          const identity = args[identityField];

          const result = await createAuthToken(identityField, protectIdentities, identity, itemAPI);

          // Note: `success` can be false with no code
          // If protectIdentities === true then result.code will *always* be undefined.
          if (!result.success && result.code) {
            const message = getAuthTokenErrorMessage({
              identityField,
              itemSingular: list.adminUILabels.singular,
              itemPlural: list.adminUILabels.plural,
              code: result.code,
            });
            return { code: result.code, message };
          }

          // Update system state
          if (result.success) {
            // Save the token and related info back to the item
            const { token, itemId } = result;
            await itemAPI.updateOne({
              id: `${itemId}`,
              data: {
                [`${tokenType}Token`]: token,
                [`${tokenType}IssuedAt`]: new Date().toISOString(),
                [`${tokenType}RedeemedAt`]: null,
              },
              query: false,
            });

            await passwordResetLink.sendToken({ itemId, identity, token, context });
          }
          return null;
        },
        async [gqlNames.redeemItemPasswordResetToken](
          root: any,
          args: { [P in I]: string } & { [P in S]: string } & { token: string },
          context
        ) {
          const list = context.keystone.lists[listKey];
          const itemAPI = context.sudo().lists[listKey];
          const tokenType = 'passwordReset';
          const result = await validateAuthToken(
            tokenType,
            list,
            identityField,
            args[identityField],
            protectIdentities,
            passwordResetLink.tokensValidForMins,
            args.token,
            itemAPI
          );

          if (!result.success) {
            // Code could be FAILURE, TOKEN_REDEEMED, or TOKEN_EXPIRED
            // Message will be 'Auth token redemption failed.', 'Auth tokens are single use and the auth token provided has already been redeemed.'
            // or 'The auth token provided has expired.'
            const message = getAuthTokenErrorMessage({
              identityField,
              itemSingular: list.adminUILabels.singular,
              itemPlural: list.adminUILabels.plural,
              code: result.code,
            });
            return { code: result.code, message };
          }

          // Update system state
          const itemId = result.item.id;
          // Save the token and related info back to the item
          await itemAPI.updateOne({
            id: itemId,
            data: { [`${tokenType}RedeemedAt`]: new Date().toISOString() },
            query: false,
          });

          // Save the provided secret. Do this as a separate step as password validation
          // may fail, in which case we still want to mark the token as redeemed
          // (NB: Is this *really* what we want? -TL)
          await itemAPI.updateOne({
            id: itemId,
            data: { [secretField]: args[secretField] },
            query: false,
          });

          return null;
        },
      },
      Query: {
        async [gqlNames.validateItemPasswordResetToken](
          root: any,
          args: { [P in I]: string } & { token: string },
          context
        ) {
          const list = context.keystone.lists[listKey];
          const itemAPI = context.sudo().lists[listKey];
          const tokenType = 'passwordReset';
          const result = await validateAuthToken(
            tokenType,
            list,
            identityField,
            args[identityField],
            protectIdentities,
            passwordResetLink.tokensValidForMins,
            args.token,
            itemAPI
          );

          if (!result.success && result.code) {
            const message = getAuthTokenErrorMessage({
              identityField,
              itemSingular: list.adminUILabels.singular,
              itemPlural: list.adminUILabels.plural,
              code: result.code,
            });
            return { code: result.code, message };
          }
          return null;
        },
      },
    },
  };
}
