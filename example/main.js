const datasetsMerger = require('../lib');
const path = require('path');

datasetsMerger(
    [ 
        path.join(__dirname, 'first'), 
        path.join(__dirname, 'second') 
    ], 
    path.join(__dirname, 'destination')
);