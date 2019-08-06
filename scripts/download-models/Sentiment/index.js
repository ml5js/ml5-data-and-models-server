require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');

async function downloadSentiment(){
    const STORAGEPATH = "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1"
    const outputFolder = './models/sentiment';
    // NOTE: paths are relative to where the script is being called
    mkdirp.sync(outputFolder);

    let modelJson = await fetch(`${STORAGEPATH}/model.json`)
    modelJson = await modelJson.json();

    fs.writeFile(`${outputFolder}/model.json`, JSON.stringify(modelJson), () => {
        console.log('finished writing model.json')
    }); 
    
    
    // Need to also get metadata
    let metaJson = await fetch(`${STORAGEPATH}/metadata.json`)
    metaJson = await metaJson.json();

    fs.writeFile(`${outputFolder}/metadata.json`, JSON.stringify(modelJson), () => {
        console.log('finished writing metadata.json')
    }); 



        modelJson.weightsManifest.forEach( (weights) => {
            Promise.all(
                weights.paths.map( async (fileName) =>  {
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

module.exports = downloadSentiment;