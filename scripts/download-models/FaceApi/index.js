const DownloaderUtils = require('../utils');
const STORAGEPATH = "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi"
const outputFolder = './models/faceapi';

const downloaderUtils = new DownloaderUtils(STORAGEPATH, outputFolder);

// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-shard1
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-shard2

// There are 4 faceapi manifest.json and their accompanying data living in manifest.json[0].paths
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_model-weights_manifest.json
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_recognition_model-weights_manifest.json
// https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_expression_model-weights_manifest.json
async function downloadFaceApi(){
    
    // NOTE: paths are relative to where the script is being called
    downloaderUtils.makeOutputPath();

    
    const a = await downloaderUtils.saveJson('ssd_mobilenetv1_model-weights_manifest.json')
    await downloaderUtils.saveWeights(a);
    
    const b = await downloaderUtils.saveJson('face_landmark_68_model-weights_manifest.json')
    await downloaderUtils.saveWeights(b);
    
    const c = await downloaderUtils.saveJson('face_landmark_68_tiny_model-weights_manifest.json')
    await downloaderUtils.saveWeights(c);
    
    const d = await downloaderUtils.saveJson('face_recognition_model-weights_manifest.json')
    await downloaderUtils.saveWeights(d);
    
    const e = await downloaderUtils.saveJson('face_expression_model-weights_manifest.json')
    await downloaderUtils.saveWeights(e);



}


// async function getWeights(modelJson){
    
//     Promise.all(
//         modelJson[0].paths.map( async (fileName) => {
//             let partUrl = `${STORAGEPATH}/${fileName}`;

//             let shard = await fetch(partUrl);
//             shard = await shard.buffer();

//             fs.writeFile(`${outputFolder}/${fileName}`, shard, () => {
//                 console.log('finished writing: ', fileName)
//             });
//         })
//     )
// }


module.exports = downloadFaceApi