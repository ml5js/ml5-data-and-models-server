const downloadBodyPix = require('./BodyPix');
const downloadSketchRnn = require('./SketchRnn');
const downloadUNet = require('./UNet');
const downloadSentiment = require('./Sentiment');
const downloadFaceApi = require('./FaceApi');
const downloadSoundClassification = require('./SoundClassification');
const downloadMobilenet = require('./Mobilenet');
const downloadYolo = require('./YOLO');
const downloadPosenet = require('./Posenet');
const downloadPosenet2 = require('./Posenet2');

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
    case 'yolo':
        downloadYolo();
        return;
    case 'posenet':
        downloadPosenet();
        return;
    case 'posenet2':
        downloadPosenet2();
        return;
    case 'all':
        downloadBodyPix();
        downloadSketchRnn();
        downloadSentiment();
        downloadFaceApi();
        downloadSoundClassification();
        downloadMobilenet();
        downloadYolo();
        downloadPosenet();
        downloadPosenet2();
        return;
    default:
        console.log("nothing selected!")
        return;
}