# datasets-merger
An npm package to quickly merge datasets for machine learning

## Install

To install datasets-merger as a local module:

```bash
$ npm install datasets-merger
```

To install datasets-merger as a global module:

```bash
$ npm install -g datasets-merger
```

## Purpose

This packages merges two **datasets** for machine learning with a specific format:
* Each dataset is a **directory**
* Each dataset contains a `classes.txt` file
* Each `classes.txt` file contains a simple **list of classes** (such as objects in a photo) separated by a **newline**
* Each dataset can contain some `.png` files
* Each dataset can contain `.txt` files different from `classes.txt`, ideally one for each `.png` file. These files contain multiple rows. Each row begins with a **number** which is the **index** (from 0) of the **corrisponding*** object find in the photo and present in the `classes.txt` file. This index should be followed by other numbers (such the coordinates of the objects), but this does not matter.

The package will simply merge the given datasets, creating a new dataset in the specified destination directory.

## Usage (local module)

```javascript
const datasetsMerger = require('datasets-merger');

const datasetsPaths = [
    './first_dataset',
    './second_dataset',
    './third_dataset'
];
const destination = './destination';

datasetsMerger(datasetsPaths, destination);
```

## Usage (global module)

```bash
$ ds-merger merge --datasets ./first_dataset ./second_dataset --dest ./destination
```

## Example

There is an example in this repository, in the path `/example`.

To run it, go to that folder and execute:

```bash
$ node mains
```

It will create the `destination` folder, which will be the result of the merging operation on the other two folders.