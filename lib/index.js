const dree = require('dree');
const fs = require('fs');
const path = require('path');

function mergeDatasets(datasetsPaths, destination) {
    const classes = [];

    fs.mkdirSync(destination, { recursive: true });
    
    for (const datasetPath of datasetsPaths) {
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
                fs.writeFileSync(path.join(destination, file.name), parsedText);
            }
            else if (file.extension === 'png') {
                fs.copyFileSync(file.path, path.join(destination, file.name));
            }
        });
        fs.writeFileSync(path.join(destination, 'classes.txt'), classes.join('\n'));
    }
}

module.exports = mergeDatasets;