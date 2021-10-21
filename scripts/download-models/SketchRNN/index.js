require('es6-promise').polyfill();
require('isomorphic-fetch');

const sequence = require('promise-sequence');
const fs = require('fs');
const mkdirp = require('mkdirp');
const modelList = require('./modelList');

// https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models/cat.gen.json

// cat.gen.json
async function downloadSketchRnn(){
    const STORAGEPATH = "https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models"
    const outputFolder = './models/sketchrnn';

    // NOTE: paths are relative to where the script is being called
    mkdirp.sync(outputFolder);

    // console.log(modelList)
    await sequence(
        modelList.map( (modelName) => async () => {
            const fileName = `${modelName}.gen.json`;
            const localFilePath = `${outputFolder}/${fileName}`;
            const url = `${STORAGEPATH}/${fileName}`
            if (!fs.existsSync(localFilePath)) {
                let modelJson = await fetch(url);
                modelJson = await modelJson.json();

                fs.writeFileSync(`${outputFolder}/${fileName}`, JSON.stringify(modelJson));
                console.log('finished writing: ', fileName)
            } else {
                console.log('already exists: ', fileName)
            }

        })
    )

}

module.exports = downloadSketchRnn;
