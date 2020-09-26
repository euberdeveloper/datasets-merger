#!/usr/bin/env node

const yargs = require('yargs');
const mergeDatasets = require('../lib');

yargs
.scriptName('burundu')
.command(
    'merge', 
    'Merges two or more datasets',
    () => ({}),
    argv => {
        const datasets = argv.datasets;
        const dest = argv.dest;
        mergeDatasets(datasets, dest);
    }
)
.demandCommand(1, 'You must use the merge command')
.options({
    'dest': {
        default: './destination',
        describe: 'The path where the merged dataset will be saved',
        type: 'string'
    },
    'datasets': {
        default: ['./dataset_1', './dataset_2'],
        describe: 'The array of the paths of the datasets folders that are to be merged',
        type: 'array'
    }
})
.argv;