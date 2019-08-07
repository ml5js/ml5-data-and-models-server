const DownloaderUtils = require('../utils');
const STORAGEPATH = "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1"
const outputFolder = './models/sentiment';

const downloaderUtils = new DownloaderUtils(STORAGEPATH, outputFolder);

async function downloadSentiment(){
    
    // NOTE: paths are relative to where the script is being called
    downloaderUtils.makeOutputPath();
    // get the metadata.json
    await downloaderUtils.saveJson('metadata.json');
    // get the modeljson and the weight files
    const modelJson = await downloaderUtils.saveJson('model.json');
    await downloaderUtils.saveWeights(modelJson);
}

module.exports = downloadSentiment;