require('es6-promise').polyfill();
require('isomorphic-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');

class DownloaderUtils {
    constructor(STORAGEPATH, OUTPUTFOLDER) {
        this.STORAGEPATH = STORAGEPATH;
        this.OUTPUTFOLDER = OUTPUTFOLDER;
    }

    makeOutputPath(OTHERFOLDER) {
        const oPath = OTHERFOLDER || this.OUTPUTFOLDER;
        mkdirp.sync(oPath);
        console.log(`Output directory created at: ${oPath}`);
    }

    async saveJson(jsonFileWithPath) {
        let modelJson;
        const url = `${this.STORAGEPATH}/${jsonFileWithPath}`;
        const localFilePath = `${this.OUTPUTFOLDER}/${jsonFileWithPath}`;
        if (fs.existsSync(localFilePath)) {
            modelJson = fs.readFileSync(localFilePath);
            try {
                modelJson = JSON.parse(modelJson);
                console.log('already exists: ', jsonFileWithPath);
                return modelJson;
            } catch (error) {
                console.log(`json parse local file: ${localFilePath} error, so try fetch again`);
            }
        }
        // jsonFileWithPath should be `model.json` or `manifest.json` or similar
        modelJson = await fetch(url);
        modelJson = await modelJson.json();

        fs.writeFileSync(localFilePath, JSON.stringify(modelJson));
        console.log(`finished writing ${jsonFileWithPath}`)

        return modelJson;
    }

    async saveWeights(modelJson) {
        const tasks = [];
        if (!modelJson.hasOwnProperty('weightsManifest')) {

            console.log("no weightsManifest property found - checking modelJson for path property");
            // this is the case for faceapi
            if (Array.isArray(modelJson) === true) {

                modelJson.forEach(weights => {

                    if (!weights.hasOwnProperty('paths')) return;
                    // get an array of promises of the weights
                    weights.paths.forEach((fileName) => tasks.push(this.saveWeight(fileName)));
                })
                // call and wait for all those promises to finish
                await Promise.all(tasks);
                return;
            }

            console.log("no weightsManifest property found and no paths property! - check your model.json or manifest.json");
            return;

        }

        // loop through each of the weights objects in the weightsManifest
        modelJson.weightsManifest.forEach((weights) => {

            // get an array of promises of the weights
            weights.paths.forEach((fileName) => tasks.push(this.saveWeight(fileName)));

        })
        // call and wait for all those promises to finish
        Promise.all(tasks)
    }

    async saveWeight(fileName) {
        let weightFile;
        const weightUrl = `${this.STORAGEPATH}/${fileName}`;
        const localFilePath = `${this.OUTPUTFOLDER}/${fileName}`;
        if (!fs.existsSync(localFilePath)) {

            weightFile = await fetch(weightUrl);
            weightFile = await weightFile.buffer();

            fs.writeFileSync(localFilePath, weightFile);
            console.log(`finished writing: ${fileName}`)
        } else {
            console.log('weight already exists: ', fileName)
        }
    }

}


// function

module.exports = DownloaderUtils;
