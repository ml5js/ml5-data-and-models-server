require('isomorphic-fetch');
const mkdirp = require('mkdirp');
const tfconv = require('@tensorflow/tfjs-converter');

require('@tensorflow/tfjs-node');


const STORAGEPATH = 'https://tfhub.dev/mediapipe/tfjs-model/handdetector/1/default/1';
const OUTPATH = './models/handpose';

async function downloadHandpose() {
  mkdirp.sync(OUTPATH);
  console.log(`Output directory created at: ${OUTPATH}`);
  const model = await tfconv.loadGraphModel(STORAGEPATH, {fromTFHub: true});
  return model.save(`file://${OUTPATH}/`);
}

module.exports = downloadHandpose
