require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');


// https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128/model.json
// https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128/group1-shard1of2
// https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128/group1-shard2of2

async function downloadUNet(){
    const STORAGEPATH = "https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128"
    const outputFolder = './models/uNet';
    // NOTE: paths are relative to where the script is being called
    mkdirp.sync(outputFolder);

    let modelJson = await fetch(`${STORAGEPATH}/model.json`)
    modelJson = await modelJson.json();

    fs.writeFile(`${outputFolder}/model.json`, JSON.stringify(modelJson), () => {
        console.log('finished writing model.json')
    });    

    Promise.all( 
        modelJson.weightsManifest[0].paths.map( async (fileName) =>  {
            let partUrl = `${STORAGEPATH}/${fileName}`;

            let shard = await fetch(partUrl);
            shard = await shard.buffer();

            fs.writeFile(`${outputFolder}/${fileName}`, shard, () => {
                console.log('finished writing: ', fileName)
            });
            
        })
    )
        
}

module.exports = downloadUNet