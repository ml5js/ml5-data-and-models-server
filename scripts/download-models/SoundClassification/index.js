require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');


// https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v0.3/browser_fft/18w/metadata.json
// https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v0.3/browser_fft/18w/model.json
async function downloadSoundClassification(){
    const  STORAGEPATH = 'https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v0.3/browser_fft/18w'
    const outputFolder = './models/SoundClassification/18w';
    // NOTE: paths are relative to where the script is being called
    mkdirp.sync(outputFolder);

    let m = await getWeights(STORAGEPATH, outputFolder, 'model.json')
    await getShards(STORAGEPATH, outputFolder, m);

    await getWeights(STORAGEPATH, outputFolder, 'metadata.json')

    
}

async function getWeights(STORAGEPATH, outputFolder, jsonName){
    let modelJson = await fetch(`${STORAGEPATH}/${jsonName}`)
    modelJson = await modelJson.json();

    fs.writeFile(`${outputFolder}/${jsonName}`, JSON.stringify(modelJson), () => {
        console.log('finished writing:', jsonName)
    });    

    return modelJson
}

async function getShards(STORAGEPATH, outputFolder, modelJson){
    
    modelJson.weightsManifest.forEach( (weights) => {
        
        Promise.all(
            weights.paths.map( async (fileName) => {
                let partUrl = `${STORAGEPATH}/${fileName}`;
    
                let shard = await fetch(partUrl);
                shard = await shard.buffer();
    
                fs.writeFile(`${outputFolder}/${fileName}`, shard, () => {
                    console.log('finished writing: ', fileName)
                });
            })
        )
    })

}

module.exports = downloadSoundClassification;