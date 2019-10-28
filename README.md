# ml5-data-and-models-server
A repo to download and serve data and models locally allowing ml5 to run without a web connection

**Work in progress - please ignore**

## Quickstart 🚀

To get started quickly, install the dependencies `>` download everything `>` serve it up

```
cd ml5-data-and-models-server
# install the dependencies
npm install
# download all the models
npm run download:all # wait for a long time for everything to download
# serve up your models
npm run serve 
# get your models at http://localhost:5000/<modelname>
```

## Setup 🏗

```
cd ml5-data-and-models-server
npm install
```

## Download Data and Models 💌

To download models run:

first go to the directory:
```
cd ml5-data-and-models-server
```

then either:

```
npm run download:all
```

or for specific models:

```
npm run download:bodypix
npm run download:sketchrnn
npm run download:unet
npm run download:sentiment
npm run download:faceapi
npm run download:soundclassification
npm run download:mobilenet
npm run download:yolo
npm run download:posenet
npm run download:posenet2
npm run download:all
```

→ Your model outputs will live in the `/models` directory


## Start the Server 🔥

This assumes you've:
* you've installed the dependencies
* and downloaded some models

e.g.
```
cd ml5-data-and-models-server
npm install
npm run download:bodypix
```

### Serve up the stuffs

Start the simple express server:
```
npm run serve
```

* Your models will be available at:`http://localhost:<PORT>/<modelname>`
* `<PORT>`: this is by default set to `5000`
* `<modelname>`: this is the all lowercase name for the model (e.g. sketchrnn, bodypix, unet, mobilenet, etc)

* e.g.: http://localhost:5000/sketchrnn/bicycle.gen.json




