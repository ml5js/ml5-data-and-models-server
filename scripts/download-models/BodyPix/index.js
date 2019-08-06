require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');

// const https = require('https');
// const {join, resolve} = require('path');
// const {createGunzip} = require('zlib');

// https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap/model.json
// https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap/group1-shard1of2
// https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap/group1-shard2of2



async function downloadBodyPix(){
    const GOOGLEPATH = "https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap"
    const outputFolder = './models/bodyPix';
    // NOTE: paths are relative to where the script is being called
    mkdirp.sync(outputFolder);

    let modelJson = await fetch(`${GOOGLEPATH}/model.json`)
    modelJson = await modelJson.json();

    fs.writeFile(`${outputFolder}/model.json`, JSON.stringify(modelJson), () => {
        console.log('finished writing model.json')
    });    

    Promise.all( 
        modelJson.weightsManifest[0].paths.map( async (fileName) =>  {
            let partUrl = `${GOOGLEPATH}/${fileName}`;

            let shard = await fetch(partUrl);
            shard = await shard.buffer();

            fs.writeFile(`${outputFolder}/${fileName}`, shard, () => {
                console.log('finished writing: ', fileName)
            });
            
        })
    )
        
}


module.exports = downloadBodyPix
