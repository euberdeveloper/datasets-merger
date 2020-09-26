const dree = require('dree');
const fs = require('fs');
const path = require('path');

function _handleArgs(datasetsPaths, destination) {
    return {
        handledDatasetsPaths: datasetsPaths || [path.join(process.cwd(), 'dataset_1'), path.join(process.cwd(), 'dataset_2')],
        handledDestination: destination || path.join(process.cwd(), 'destination')
    }
}

/**
 * Creates a dataset by merging the datasets given as an array of directories paths. The resulting dataset will be saved in the given destination path.
 * @param {string[]} datasetsPaths An array containing the paths of the datasets to merge. Default value: ['./dataset_1', './dataset_2'].
 * @param {string} destination The path where the destination dataset will be saved. Default value: './destination'
 */
function mergeDatasets(datasetsPaths, destination) {
    let { handledDatasetsPaths, handledDestination } = _handleArgs(datasetsPaths, destination);

    const classes = [];

    fs.mkdirSync(handledDestination, { recursive: true });
    
    for (const datasetPath of handledDatasetsPaths) {
        const classesFilePath = path.join(datasetPath, 'classes.txt');
        const classesFile = fs.readFileSync(classesFilePath, 'utf-8');
        const currentClasses = classesFile.split(/[\n\r]/).filter(el => !!el);

        for (const currentClass of currentClasses) {
            if (!classes.includes(currentClass)) {
                classes.push(currentClass);
            }
        }

        const mapTable = currentClasses.map(c => classes.indexOf(c));

        dree.scan(datasetPath, { extensions: ['txt', 'png'], exclude: /classes/ }, file => {
            if (file.extension === 'txt') {
                const text = fs.readFileSync(file.path, 'utf-8');
                const parsedText = text
                    .split(/[\n\r]/)
                    .filter(row => !!row)
                    .map(row => `${mapTable[+row.charAt(0)]}${row.substring(1)}`)
                    .join('\n');
                fs.writeFileSync(path.join(handledDestination, file.name), parsedText);
            }
            else if (file.extension === 'png') {
                fs.copyFileSync(file.path, path.join(handledDestination, file.name));
            }
        });
        fs.writeFileSync(path.join(handledDestination, 'classes.txt'), classes.join('\n'));
    }
}

module.exports = mergeDatasets;