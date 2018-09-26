/**
 * Retrieves the `data` property from a mutator's results.
 *
 * This helper is defined to be used as a simple way of retrieving the data,
 * specially useful when it should be directly returned, as it avoids storing
 * the mutator results in a variable to then extract the data.
 *
 * @example Simple usage
 *  import { mutator } from './stubMutators';
 *
 *  export const stubFunc = async () =>
 *    getMutatorData(
 *      mutator({
 *        // ...mutator options
 *      }),
 *    );
 *
 * @example Multiple mutator calls inside a map
 *  import { mutator } from './stubMutators';
 *
 *  const mutatorOptions = [
 *    // mutator options
 *  ];
 *  const datas = await Promise.all(
 *    mutatorOptions.map(options =>
 *      getMutatorData(
 *        updateMutator(options),
 *      ),
 *    ),
 *  );
 *
 * @param {Promise<{data: *}>} mutatorResults
 * @return {Promise<*>}
 */
export default async function getMutatorData(mutatorResults) {
  return (await mutatorResults).data;
}
