import castArray from 'lodash/castArray';

const getAutoValueResult = async ({
  schema,
  fieldName,
  handlerName,
  mapArgs,
}) => ({
  fieldName,
  value: await schema[fieldName][handlerName](...castArray(mapArgs())),
});

/**
 * Runs the given schema's auto values handler for those fields that have it,
 * and returns the results keyed by the fieldName.
 *
 * @param {Object} options
 * @param {Object} options.schema
 * @param {String} options.handlerName
 * @param {Function} options.mapArgs
 *  Function called every time a handler is invoked, and used to provide
 *  arguments to the handler
 * @return {Promise<Object>}
 * @async
 * @example
 *  const createMutator = ({ data, collection, ...other }) => {
 *    let newData = {
 *      ...data,
 *      ...(await getSchemaAutoValues({
 *        schema: collection.simpleSchema()._schema,
 *        handlerName: 'onCreate',
 *        mapArgs: () => ({
 *          data: clone(data),
 *          currentUser,
 *          document,
 *        }),
 *      })),
 *    };
 *
 *    // ... do mutation
 *  };
 *
 */
export default async function getSchemaAutoValues({
  schema,
  handlerName,
  mapArgs,
}) {
  return (await Promise.all(
    Object.keys(schema).reduce((reduced, fieldName) => {
      if (schema[fieldName][handlerName]) {
        return [
          ...reduced,
          // eslint-disable-next-line object-curly-newline
          getAutoValueResult({ schema, fieldName, handlerName, mapArgs }),
        ];
      }
      return reduced;
    }, []),
  )).reduce(
    (reduced, { fieldName, value }) => ({ ...reduced, [fieldName]: value }),
    {},
  );
}
