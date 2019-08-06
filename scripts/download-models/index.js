const downloadBodyPix = require('./BodyPix');
const downloadSketchRnn = require('./SketchRnn');
const downloadUNet = require('./UNet');

const selected = process.argv[2];
console.log(selected)
switch (selected) {
    case 'bodyPix':
        downloadBodyPix();
        return;
    case 'sketchRnn':
        downloadSketchRnn();
        return;
    case 'uNet':
        downloadUNet();
        return;
    default:
        console.log("nothing selected!")
        return;
}