const DownloaderUtils = require('../utils');

// https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap/model.json
// https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap/group1-shard1of2
// https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap/group1-shard2of2

const STORAGEPATH = "https://storage.googleapis.com/tfjs-models/savedmodel/posenet_mobilenet_075_partmap"
const outputFolder = './models/bodypix';

const downloaderUtils = new DownloaderUtils(STORAGEPATH, outputFolder);

async function downloadBodyPix(){
    
    // NOTE: paths are relative to where the script is being called
    downloaderUtils.makeOutputPath();

    const modelJson = await downloaderUtils.saveJson('model.json');
    await downloaderUtils.saveWeights(modelJson);        
}


module.exports = downloadBodyPix
