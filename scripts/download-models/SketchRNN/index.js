require('es6-promise').polyfill();
require('isomorphic-fetch');
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
    Promise.all(
        modelList.map( async (modelName) => {
            const fileName = `${modelName}.gen.json`
            let modelJson = await fetch(`${STORAGEPATH}/${fileName}`);
            modelJson = await modelJson.json();

            fs.writeFile(`${outputFolder}/${fileName}`, JSON.stringify(modelJson), () => {
                console.log('finished writing: ', fileName)
            });

        })
    )
    
}

module.exports = downloadSketchRnn;