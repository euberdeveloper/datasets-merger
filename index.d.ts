export = mergeDatasets;
/**
 * Creates a dataset by merging the datasets given as an array of directories paths. The resulting dataset will be saved in the given destination path.
 * @param {string[]} datasetsPaths An array containing the paths of the datasets to merge. Default value: ['./dataset_1', './dataset_2'].
 * @param {string} destination The path where the destination dataset will be saved. Default value: './destination'
 */
declare function mergeDatasets(datasetsPaths: string[], destination: string): void;
