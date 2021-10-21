const DownloaderUtils = require('../utils');
const fs = require('fs');

// TODO! get models for posenet 2
// const STORAGEPATH = 'https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/quant2/075';

// mobilenet
const MOBILENET_STORAGE_PATH = `https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet`
// https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/quant2/075/model-stride16.json
// https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/quant2/075/group1-shard1of1.bin
// mobilenet output stride
// 8, 16, 32

// `${baseUrl}/quant${quantNumber}/${mobilenetVersion}/model-stride${strideNumber}.json`

// multiplier for mobilenet
// 1.01, 1.0, 0.75, or 0.50

// Resnet
const RESNET_STORAGE_PATH = `https://storage.googleapis.com/tfjs-models/savedmodel/posenet/resnet50`
// https://storage.googleapis.com/tfjs-models/savedmodel/posenet/resnet50/quant2/model-stride16.json

// `${baseUrl}/quant${quantNumber}/model-stride${strideNumber}.json
// Resnet output stride
// 16, 32


async function downloadPosenet() {
    // mobilenet
    // quant 1
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/050`, `MOBILENETV1_050_quant1_stride8`, `model-stride8.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/050`, `MOBILENETV1_050_quant1_stride16`, `model-stride16.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/075`, `MOBILENETV1_075_quant1_stride8`, `model-stride8.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/075`, `MOBILENETV1_075_quant1_stride16`, `model-stride16.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/100`, `MOBILENETV1_100_quant1_stride8`, `model-stride8.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/100`, `MOBILENETV1_100_quant1_stride16`, `model-stride16.json`);
    // // quant 2
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${2}/050`, `MOBILENETV1_050_quant2_stride8`, `model-stride8.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${2}/050`, `MOBILENETV1_050_quant2_stride16`, `model-stride16.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${2}/075`, `MOBILENETV1_075_quant2_stride8`, `model-stride8.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${2}/075`, `MOBILENETV1_075_quant2_stride16`, `model-stride16.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${2}/100`, `MOBILENETV1_100_quant2_stride8`, `model-stride8.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${2}/100`, `MOBILENETV1_100_quant2_stride16`, `model-stride16.json`);


    // quant4
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/float/050`, `MOBILENETV1_050_quant4_stride8`, `model-stride8.json`);
    await getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/float/075`, `MOBILENETV1_075_quant4_stride16`, `model-stride16.json`);

    // TODO: not working v101 and quant4
    // getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/101`, `MOBILENETV1_101_quant1_stride8`, `model-stride8.json`);
    // getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/101`, `MOBILENETV1_101_quant1_stride16`, `model-stride16.json`);
    // getPosenetByVersion(`${MOBILENET_STORAGE_PATH}/quant${1}/101`, `MOBILENETV1_101_quant1_stride32`, `model-stride32.json`);


    // resnet50
    await getPosenetByVersion(`${RESNET_STORAGE_PATH}/quant${1}`, `RESENET50_quant1_stride16`, `model-stride16.json`);
    await getPosenetByVersion(`${RESNET_STORAGE_PATH}/quant${2}`, `RESENET50_quant2_stride16`, `model-stride16.json`);
    await getPosenetByVersion(`${RESNET_STORAGE_PATH}/quant${1}`, `RESENET50_quant1_stride32`, `model-stride32.json`);
    await getPosenetByVersion(`${RESNET_STORAGE_PATH}/quant${2}`, `RESENET50_quant2_stride32`, `model-stride32.json`);
    await getPosenetByVersion(`${RESNET_STORAGE_PATH}/float`, `RESENET50_quant4_stride32`, `model-stride32.json`);
    await getPosenetByVersion(`${RESNET_STORAGE_PATH}/float`, `RESENET50_quant4_stride16`, `model-stride16.json`);
}

async function getPosenetByVersion(STORAGEPATH, OUTPUTDIR, FNAME) {
    const storagePath = `${STORAGEPATH}`
    const outputPath = `./models/posenet2/${OUTPUTDIR}`

    const posenetDownloader = new DownloaderUtils(storagePath, outputPath);

    posenetDownloader.makeOutputPath();

    const posenetManifest = await posenetDownloader.saveJson(FNAME);
    // console.log(posenetManifest)

    await getWeights(storagePath, outputPath, posenetManifest);


}

async function getWeights(storagePath, outputPath, manifest) {
    // const keys = Object.keys(manifest);

    // console.log(keys)
    // console.log(keys);
    const weightsPromiseArray = manifest.weightsManifest[0].paths.map(async (prop) => {
        const fileName = prop;
        let weightFile;

        const weightUrl = `${storagePath}/${fileName}`;
        const localFilePath = `${outputPath}/${fileName}`;

        if (!fs.existsSync(localFilePath)) {
            weightFile = await fetch(weightUrl);
            weightFile = await weightFile.buffer();

            fs.writeFileSync(localFilePath, weightFile);
            console.log(`finished writing: ${fileName}`)
        } else {
            console.log('weight already exists: ', fileName)
        }
    })

    return Promise.all(weightsPromiseArray)
}



module.exports = downloadPosenet
