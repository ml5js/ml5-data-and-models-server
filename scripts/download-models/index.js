const sequence = require('promise-sequence');

const modelDownloaders = {
  bodypix : require('./BodyPix'),
  sketchrnn : require('./SketchRNN'),
  unet : require('./UNet'),
  sentiment : require('./Sentiment'),
  faceapi : require('./FaceApi'),
  soundclassification : require('./SoundClassification'),
  mobilenet : require('./Mobilenet'),
  yolo     : require('./YOLO'),
  posenet  : require('./Posenet'),
  posenet2 : require('./Posenet2'),
  handpose : require('./Handpose'),
}

const selected = process.argv.length >=3 && process.argv[2]?.toLowerCase() || 'all';
console.log(selected);

async function download(model) {
  const dn = modelDownloaders[model];
  if (dn) {
    console.log(`downloading ${model}...`)
    await dn();
    console.log(`downloaded ${model}\n`)
  } else {
    console.log(`no such ${model} to download`);
  }
}

(async () => {
  if (selected == 'all') {
    const tasks = Object.keys(modelDownloaders).map(model => {
      return download.bind(undefined, model);
    })
    await sequence(tasks);
  } else {
    await download(selected);
  }
})().catch(e => {
  // Deal with the fact the chain failed
  console.log(e)
});
