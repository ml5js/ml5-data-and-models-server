const DownloaderUtils = require('../utils');
const STORAGEPATH = "https://raw.githubusercontent.com/ml5js/ml5-data-and-training/master/models/YOLO"
const outputFolder = './models/yolo';

const downloaderUtils = new DownloaderUtils(STORAGEPATH, outputFolder);

async function downloadYolo(){
    
    // NOTE: paths are relative to where the script is being called
    downloaderUtils.makeOutputPath();

    // get the modeljson and the weight files
    const modelJson = await downloaderUtils.saveJson('model.json');
    await downloaderUtils.saveWeights(modelJson);
        
}

module.exports = downloadYolo