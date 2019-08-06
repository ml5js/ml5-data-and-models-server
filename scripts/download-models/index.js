const downloadBodyPix = require('./BodyPix');
const downloadSketchRnn = require('./SketchRnn');

const selected = process.argv[2];
console.log(selected)
switch(selected){
    case 'bodyPix':
        downloadBodyPix();
        return;
    case 'sketchRnn':
            downloadSketchRnn();
            return;
    default:
        console.log("nothing selected!")
        return;
}
