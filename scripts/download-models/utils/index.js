require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');

class DownloaderUtils {
    constructor(STORAGEPATH, OUTPUTFOLDER){
        this.STORAGEPATH = STORAGEPATH;
        this.OUTPUTFOLDER = OUTPUTFOLDER;
    }

    makeOutputPath(OTHERFOLDER){
        const oPath = OTHERFOLDER || this.OUTPUTFOLDER;
        mkdirp.sync(oPath);
        console.log(`Output directory created at: ${oPath}`);
    }

    async saveJson(jsonFileWithPath){
        let modelJson;
        // jsonFileWithPath should be `model.json` or `manifest.json` or similar
        modelJson = await fetch(`${this.STORAGEPATH}/${jsonFileWithPath}`)
        modelJson = await modelJson.json();

        fs.writeFile(`${this.OUTPUTFOLDER}/${jsonFileWithPath}`, JSON.stringify(modelJson), () => {
            console.log(`finished writing ${jsonFileWithPath}`)
        });

        return modelJson;
    }

    async saveWeights(modelJson){
        if(!modelJson.hasOwnProperty('weightsManifest')) {
            console.log("no weights manifest property found! - check your data");
            return;
        }
        
        // loop through each of the weights objects in the weightsManifest
        modelJson.weightsManifest.forEach( (weights) => {
            
            // get an array of promises of the weights
            const weightsPromiseArray = weights.paths.map( (fileName) => this.saveWeight(fileName) );
            
            // call and wait for all those promises to finish
            Promise.all(weightsPromiseArray)
        })
    }

    async saveWeight(fileName){
        let weightFile;
        const weightUrl = `${this.STORAGEPATH}/${fileName}`;

        weightFile = await fetch(weightUrl);
        weightFile = await weightFile.buffer();

        fs.writeFile(`${this.OUTPUTFOLDER}/${fileName}`, weightFile, () => {
            console.log(`finished writing: ${fileName}`)
        });
    }

}


// function 

module.exports = DownloaderUtils;