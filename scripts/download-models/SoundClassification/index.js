const DownloaderUtils = require('../utils');
const STORAGEPATH = "https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v0.3/browser_fft/18w"
const outputFolder = './models/soundclassification/18w';

const downloaderUtils = new DownloaderUtils(STORAGEPATH, outputFolder);

// https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v0.3/browser_fft/18w/metadata.json
// https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v0.3/browser_fft/18w/model.json
async function downloadSoundClassification(){
    
    // NOTE: paths are relative to where the script is being called
    downloaderUtils.makeOutputPath();

    // get the metadata.json
    await downloaderUtils.saveJson('metadata.json');
    // get the modeljson and the weight files
    const modelJson = await downloaderUtils.saveJson('model.json');
    await downloaderUtils.saveWeights(modelJson);
    
}

module.exports = downloadSoundClassification;