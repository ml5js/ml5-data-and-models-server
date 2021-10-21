require('isomorphic-fetch');
const mkdirp = require('mkdirp');
const tfconv = require('@tensorflow/tfjs-converter');
const fs = require('fs')

require('@tensorflow/tfjs-node');


const STORAGEPATH = 'https://tfhub.dev/mediapipe/tfjs-model/handdetector/1/default/1';
const OUTPATH = './models/handpose';

async function downloadHandpose() {
  mkdirp.sync(OUTPATH);
  console.log(`Output directory created at: ${OUTPATH}`);
  if (!fs.existsSync(`${OUTPATH}/model.json`) || !fs.existsSync(`${OUTPATH}/weights.bin`)) {
    const model = await tfconv.loadGraphModel(STORAGEPATH, {fromTFHub: true});
    await model.save(`file://${OUTPATH}/`);
  } else {
    console.log('handpose model already exists')
  }
}

module.exports = downloadHandpose
