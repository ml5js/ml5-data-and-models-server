const downloadBodyPix = require('./BodyPix');
const downloadSketchRnn = require('./SketchRnn');
const downloadUNet = require('./UNet');
const downloadSentiment = require('./Sentiment');
const downloadFaceApi = require('./FaceApi');
const downloadSoundClassification = require('./SoundClassification');
const downloadMobilenet = require('./Mobilenet');

const selected = process.argv[2];
console.log(selected.toLowerCase());

switch (selected.toLowerCase()) {
    case 'bodypix':
        downloadBodyPix();
        return;
    case 'sketchrnn':
        downloadSketchRnn();
        return;
    case 'unet':
        downloadUNet();
        return;
    case 'sentiment':
        downloadSentiment();
        return;
    case 'faceapi':
        downloadFaceApi();
        return;
    case 'soundclassification':
        downloadSoundClassification();
        return;
    case 'mobilenet':
        downloadMobilenet();
        return;
    case 'all':
        downloadBodyPix();
        downloadSketchRnn();
        downloadSentiment();
        downloadFaceApi();
        downloadSoundClassification();
        downloadMobilenet();
        return;
    default:
        console.log("nothing selected!")
        return;
}