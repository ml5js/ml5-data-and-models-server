const DownloaderUtils = require('../utils');
const STORAGEPATH = "https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128"
const outputFolder = './models/unet';

const downloaderUtils = new DownloaderUtils(STORAGEPATH, outputFolder);


// https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128/model.json
// https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128/group1-shard1of2
// https://raw.githubusercontent.com/zaidalyafeai/HostedModels/master/unet-128/group1-shard2of2

async function downloadUNet(){
    
    // NOTE: paths are relative to where the script is being called
    downloaderUtils.makeOutputPath();

    // get the modeljson and the weight files
    const modelJson = await downloaderUtils.saveJson('model.json');
    await downloaderUtils.saveWeights(modelJson);
        
}

module.exports = downloadUNet