const DownloaderUtils = require('../utils');
const fs = require('fs');

const STORAGEPATH = 'https://storage.googleapis.com/tfjs-models/weights/posenet';


async function downloadPosenet(){
    getPosenetByVersion('mobilenet_v1_050');
    getPosenetByVersion('mobilenet_v1_075');
    getPosenetByVersion('mobilenet_v1_100');
    getPosenetByVersion('mobilenet_v1_101');
}

async function getPosenetByVersion(mobilenetVersion){
    const storagePath = `${STORAGEPATH}/${mobilenetVersion}`
    const outputPath = `./models/posenet/${mobilenetVersion}`

    const posenetDownloader = new DownloaderUtils(storagePath, outputPath);

    posenetDownloader.makeOutputPath();

    const posenetManifest = await posenetDownloader.saveJson('manifest.json');

    await getWeights(storagePath, outputPath, posenetManifest);


}

async function getWeights(storagePath, outputPath, manifest){
    const keys = Object.keys(manifest);

    // console.log(keys);
    const weightsPromiseArray = keys.map( async(prop) => {
        const fileName = manifest[prop].filename;
        let weightFile;
        
        const weightUrl = `${storagePath}/${fileName}`;

        weightFile = await fetch(weightUrl);
        weightFile = await weightFile.buffer();

        fs.writeFile(`${outputPath}/${fileName}`, weightFile, () => {
            console.log(`finished writing: ${fileName}`)
        });

    })
    
    Promise.all(weightsPromiseArray)
}



module.exports = downloadPosenet