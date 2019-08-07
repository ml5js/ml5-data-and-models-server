require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');

// https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json
// https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/group1-shard1of1
// https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_025_224/classification/1/model.json
// https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_025_224/classification/1/group1-shard1of1


const STORAGEPATH = 'https://storage.googleapis.com/tfjs-models/tfjs';

async function downloadMobilenet() {

    await getMobilenetByVersion('mobilenet_v1_0.25_224');
    await getMobilenetByVersion('mobilenet_v1_0.50_224');

}

async function getMobilenetByVersion(mobilenetVersion) {


    const imagenetMeta = getImagenetPath(mobilenetVersion);
    const imagenetUrl = imagenetMeta.url;
    const outputFolder = `./models/mobilenet/${imagenetMeta.folder}`;
    const imagenetOutputFolder = `./models/mobilenet/${imagenetMeta.folder}/imagenet`
    // NOTE: paths are relative to where the script is being called
    mkdirp.sync(outputFolder);
    mkdirp.sync(imagenetOutputFolder);

    // get the modelJson
    const modelJson = await getModelJson(STORAGEPATH, outputFolder, mobilenetVersion, 'model.json');
    await getShards(STORAGEPATH, outputFolder, modelJson);

    // get the imagenet details
    const imagenetJson = await getImagenetJson(imagenetUrl, imagenetOutputFolder, 'model.json');
    await getShards(imagenetUrl, imagenetOutputFolder, imagenetJson);

}

async function getModelJson(STORAGEPATH, outputFolder, mobilenetVersion, jsonName) {
    let modelJson = await fetch(`${STORAGEPATH}/${mobilenetVersion}/${jsonName}`)
    modelJson = await modelJson.json();

    fs.writeFile(`${outputFolder}/${jsonName}`, JSON.stringify(modelJson), () => {
        console.log('finished writing:', jsonName)
    });

    return modelJson
}

async function getImagenetJson(STORAGEPATH, outputFolder, jsonName) {
    let modelJson = await fetch(`${STORAGEPATH}/${jsonName}`)
    modelJson = await modelJson.json();

    fs.writeFile(`${outputFolder}/${jsonName}`, JSON.stringify(modelJson), () => {
        console.log('finished writing:', jsonName)
    });

    return modelJson
}

async function getShards(STORAGEPATH, outputFolder, modelJson) {
    modelJson.weightsManifest.forEach((weights) => {
        Promise.all(
            weights.paths.map(async (fileName) => {
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

function getImagenetPath(mobilenetVersion) {
    switch (mobilenetVersion) {
        case 'mobilenet_v1_0.25_224':
            return {
                url: 'https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_025_224/classification/1',
                    folder: 'mobilenet_v1_025_224'
            }
        case 'mobilenet_v1_0.50_224':
            return {
                url: 'https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_050_224/classification/1',
                folder: 'mobilenet_v1_050_224'
            }
        default:
            console.log("must select valid version")
            return null;
    }
}





module.exports = downloadMobilenet