// https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json
// https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/group1-shard1of1
// https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_025_224/classification/1/model.json
// https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_025_224/classification/1/group1-shard1of1

const DownloaderUtils = require('../utils');
const IMAGENET_CLASSES = require('../utils/IMAGENET_CLASSES');
const fs = require('fs')

const STORAGEPATH = 'https://storage.googleapis.com/tfjs-models/tfjs';


async function downloadMobilenet() {

    await getMobilenetByVersion('mobilenet_v1_0.25_224');
    await getMobilenetByVersion('mobilenet_v1_0.50_224');

}

async function getMobilenetByVersion(mobilenetVersion) {

    // set the mobilenet storage path based on the given version
    const mobilenetStoragePath = `${STORAGEPATH}/${mobilenetVersion}`

    // get the imagenet meta info you need to download stuff to the right place
    const imagenetMeta = getImagenetPath(mobilenetVersion);
    const imagenetStoragePath = imagenetMeta.STORAGEPATH;

    // set the output folders
    const mobilenetOutputFolder = `./models/mobilenet/${imagenetMeta.outputFolderRoot}`;
    const imagenetOutputFolder = `./models/mobilenet/${imagenetMeta.outputFolderImagenet}`
    
    // create new downloader utils
    const mobilenetDownloader = new DownloaderUtils(mobilenetStoragePath, mobilenetOutputFolder)
    const imagenetDownloader = new DownloaderUtils(imagenetStoragePath, imagenetOutputFolder)

    // NOTE: paths are relative to where the script is being called
    mobilenetDownloader.makeOutputPath();
    imagenetDownloader.makeOutputPath();
    

    // get the modelJson
    const modelJson = await mobilenetDownloader.saveJson('model.json');
    await mobilenetDownloader.saveWeights(modelJson);

    // get the imagenet details
    const imagenetJson = await imagenetDownloader.saveJson('model.json');
    await imagenetDownloader.saveWeights(imagenetJson);

    const labelArray = Object.values(IMAGENET_CLASSES).map( (item) => item);

    const metadataJson = {labels: labelArray}
    await fs.writeFile(`${mobilenetOutputFolder}/metadata.json`, JSON.stringify(metadataJson), () => {
        console.log(`finished writing: metadata.json`)
    });

}

function getImagenetPath(mobilenetVersion) {
    switch (mobilenetVersion) {
        case 'mobilenet_v1_0.25_224':
            return {
                STORAGEPATH: 'https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_025_224/classification/1',
                outputFolderRoot: 'mobilenet_v1_025_224',
                outputFolderImagenet: 'mobilenet_v1_025_224/imagenet'
            }
        case 'mobilenet_v1_0.50_224':
            return {
                STORAGEPATH: 'https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_050_224/classification/1',
                outputFolderRoot: 'mobilenet_v1_050_224',
                outputFolderImagenet: 'mobilenet_v1_050_224/imagenet'
            }
        default:
            console.log("must select valid version")
            return null;
    }
}





module.exports = downloadMobilenet