import globby from 'globby';
import { multiAdapterRunners, setupFromConfig, testConfig } from '@keystone-next/test-utils-legacy';
import { createSchema, list } from '@keystone-next/keystone/schema';
import { text } from '@keystone-next/fields';

const testModules = globby.sync(`{packages,packages-next}/**/src/**/test-fixtures.{js,ts}`, {
  absolute: true,
});
multiAdapterRunners().map(({ runner, provider }) =>
  describe(`Provider: ${provider}`, () => {
    testModules
      .map(require)
      .filter(
        ({ skipRequiredTest, unSupportedAdapterList = [] }) =>
          !skipRequiredTest && !unSupportedAdapterList.includes(provider)
      )
      .forEach(mod => {
        (mod.testMatrix || ['default']).forEach((matrixValue: string) => {
          describe(`${mod.name} - ${matrixValue} - isRequired`, () => {
            beforeAll(() => {
              if (mod.beforeAll) {
                mod.beforeAll();
              }
            });
            afterAll(async () => {
              if (mod.afterAll) {
                await mod.afterAll();
              }
            });
            const keystoneTestWrapper = (testFn: (setup: any) => Promise<void>) =>
              runner(
                () =>
                  setupFromConfig({
                    provider,
                    config: testConfig({
                      lists: createSchema({
                        Test: list({
                          fields: {
                            name: text(),
                            testField: mod.typeFunction({
                              isRequired: true,
                              ...(mod.fieldConfig ? mod.fieldConfig(matrixValue) : {}),
                            }),
                          },
                        }),
                      }),
                    }),
                  }),
                testFn
              );
            test(
              'Create an object without the required field',
              keystoneTestWrapper(async ({ context }) => {
                const { data, errors } = await context.graphql.raw({
                  query: `
                  mutation {
                    createTest(data: { name: "test entry" } ) { id }
                  }`,
                });
                expect(data.createTest).toBe(null);
                expect(errors).not.toBe(null);
                expect(errors.length).toEqual(1);
                expect(errors[0].message).toEqual('You attempted to perform an invalid mutation');
                expect(errors[0].path[0]).toEqual('createTest');
              })
            );

            test(
              'Update an object with the required field having a null value',
              keystoneTestWrapper(async ({ context }) => {
                const data0 = await context.graphql.run({
                  query: `
                  mutation($data: TestCreateInput) {
                    createTest(data: $data ) { id }
                  }`,
                  variables: {
                    data: {
                      name: 'test entry',
                      testField: mod.exampleValue(matrixValue),
                    },
                  },
                });
                const { data, errors } = await context.graphql.raw({
                  query: `
                  mutation {
                    updateTest(id: "${data0.createTest.id}" data: { name: "updated test entry", testField: null } ) { id }
                  }`,
                });
                expect(data.updateTest).toBe(null);
                expect(errors).not.toBe(undefined);
                expect(errors.length).toEqual(1);
                expect(errors[0].message).toEqual('You attempted to perform an invalid mutation');
                expect(errors[0].path[0]).toEqual('updateTest');
              })
            );

            test(
              'Update an object without the required field',
              keystoneTestWrapper(async ({ context }) => {
                const data0 = await context.graphql.run({
                  query: `
                  mutation($data: TestCreateInput) {
                    createTest(data: $data ) { id }
                  }`,
                  variables: {
                    data: {
                      name: 'test entry',
                      testField: mod.exampleValue(matrixValue),
                    },
                  },
                });
                const data = await context.graphql.run({
                  query: `
                  mutation {
                    updateTest(id: "${data0.createTest.id}" data: { name: "updated test entry" } ) { id }
                  }`,
                });
                expect(data.updateTest).not.toBe(null);
              })
            );
          });
        });
      });
  })
);
