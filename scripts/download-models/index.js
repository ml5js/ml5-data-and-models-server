const downloadBodyPix = require('./BodyPix');

const selected = process.argv[2];
console.log(selected)
switch(selected){
    case 'bodyPix':
        downloadBodyPix();
        return;
    default:
        console.log("nothing selected!")
        return;
}
