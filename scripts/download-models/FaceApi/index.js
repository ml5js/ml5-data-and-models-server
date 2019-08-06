require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');


// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-shard1
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-shard2

// There are 4 faceapi manifest.json and their accompanying data living in manifest.json[0].paths
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_model-weights_manifest.json
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_recognition_model-weights_manifest.json
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_expression_model-weights_manifest.json
async function downloadFaceApi(){
    const STORAGEPATH = "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi"
    const outputFolder = './models/faceapi';
    // NOTE: paths are relative to where the script is being called
    mkdirp.sync(outputFolder);

    await getWeights(STORAGEPATH, outputFolder, 'ssd_mobilenetv1_model-weights_manifest.json')
    await getWeights(STORAGEPATH, outputFolder, 'face_landmark_68_model-weights_manifest.json')
    await getWeights(STORAGEPATH, outputFolder, 'face_landmark_68_tiny_model-weights_manifest.json')
    await getWeights(STORAGEPATH, outputFolder, 'face_recognition_model-weights_manifest.json')
    await getWeights(STORAGEPATH, outputFolder, 'face_expression_model-weights_manifest.json')

}

async function getWeights(STORAGEPATH, outputFolder, jsonName){
    let modelJson = await fetch(`${STORAGEPATH}/${jsonName}`)
    modelJson = await modelJson.json();

    fs.writeFile(`${outputFolder}/${jsonName}`, JSON.stringify(modelJson), () => {
        console.log('finished writing:', jsonName)
    });    

    await getShards(STORAGEPATH, outputFolder, modelJson);
}

async function getShards(STORAGEPATH, outputFolder, modelJson){
    Promise.all(
        modelJson[0].paths.map( async (fileName) => {
            let partUrl = `${STORAGEPATH}/${fileName}`;

            let shard = await fetch(partUrl);
            shard = await shard.buffer();

            fs.writeFile(`${outputFolder}/${fileName}`, shard, () => {
                console.log('finished writing: ', fileName)
            });
        })
    )
}


module.exports = downloadFaceApi