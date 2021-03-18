// call all the required packages
const express = require('express')
const fileUpload = require("express-fileupload");

const multer = require('multer');
var cors = require('cors');
var fileExtension = require('file-extension')

const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");

const imagesPath = 'C:/Users/yehonatan/Desktop/sela album final/sela-album-hub-main/Sela-AlbumHub/src/assets/images/'
const dbPath = 'C:/Users/yehonatan/Desktop/sela album final/sela-album-hub-main/upload-server/json.json'
const categoryDBpath = 'C:/Users/yehonatan/Desktop/sela album final/sela-album-hub-main/upload-server/categoriesJson.json'

//CREATE EXPRESS APP
const app = express();

// cors allow usage of server from different origin only for development
app.use(cors())

//ROUTES WILL GO HERE
app.get('/', function (req, res) {
    res.json({ message: 'Server Started!' });
});

app.listen(3000, () => console.log('Server started on port 3000'));

/******* save local images *******/

// Configure Storage
var storage = multer.diskStorage({
    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, imagesPath)
    },
    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.originalname + ".png")
    }
})

var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },

})

//func to save image from local storage  
app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    console.log(req);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

//********** save snapshot img ******** 

app.use(bodyParser.urlencoded());
// have to set big limit to transfer image
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

//func to save image from local camera
app.post("/upload", function (req, res) {
    let sampleFile = req.body.image;
    // remove the start of the string that contains "data:image/png;base64,"
    let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
    //create buffer to save to local system
    let buf = Buffer.from(data, "base64");
    // using write file to save the data
    fs.writeFile(imagesPath + req.body.id + ".png", buf, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("image saved");
            res.send("image saved");
        }
    });
});

//******** Small JSON database for Node **********/

//func to save the image details to json file 
app.post("/saveDetails", function (req, res) {
    const stream = fs.readFileSync(dbPath);
    //turn the json to array
    let jsonTMP = JSON.parse(stream);
    // update the array
    let imgTMP = req.body.photosClass;
    imgTMP.path = imagesPath + imgTMP.id + ".png"
    jsonTMP.imageDetails.push(imgTMP);
    //parse back to json
    fs.writeFile(dbPath, JSON.stringify(jsonTMP), function (err) {
        console.log("saved to json");
    });
})

/****** send saved images to client *******/

// func to send all images detalis to the client 
app.get(`/getImagesDetails`, (req, res) => {
    try {
        const stream = fs.readFileSync(dbPath);
        const logTmp = JSON.parse(stream);
        if (!logTmp.imageDetails) {
            //404
            res.status(404).send("no data exist");
        } else {
            res.json(logTmp.imageDetails);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// func to send single image detalis to the client by image id
app.get(`/getSingleImageDetails`, (req, res) => {
    try {
        const stream = fs.readFileSync(dbPath);
        const logTmp = JSON.parse(stream);
        if (!logTmp.imageDetails) {
            //404
            res.status(404).send("no data exist");
        } else {
            //filter to find the specific image
            const findID = logTmp.imageDetails.find(img => img.id == req.query.id);
            res.json(findID);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

// func to send single image to the client by image id
app.get(`/getImage`, (req, res) => {
    try {
        const stream = fs.readFileSync(dbPath)
        const logTmp = JSON.parse(stream);
        if (!logTmp.imageDetails) {
            //404
            res.status(404).send("no data exist");
        } else {
            const findID = logTmp.imageDetails.find(img => img.id == req.query.id);
            res.download(imagesPath + findID.id + ".png");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// func to edit selected image details
app.post(`/editDetails`, (req, res) => {
    try {
        const stream = fs.readFileSync(dbPath)
        const logTmp = JSON.parse(stream);
        if (!logTmp.imageDetails) {
            //404
            res.status(404).send("no data exist");
        } else {
            // find the matching image and overwrite details
            for (let index = 0; index < logTmp.imageDetails.length; index++) {
                if (logTmp.imageDetails[index].id === req.body.photo.id) {
                    logTmp.imageDetails[index] = req.body.photo;
                    break;
                }
            }
            fs.writeFile(dbPath, JSON.stringify(logTmp), function (err) {
                console.log("Edit json");
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
})


/********* CATEGORIES ***********/

//func to add category
app.post('/addCategory', (req, res) => {
    try {
        const stream = fs.readFileSync(categoryDBpath)
        const logTmp = JSON.parse(stream);
        if (!logTmp.categories) {
            res.status(404).send("no categories here")
        } else {
            logTmp.categories.push(req.body.name);
            fs.writeFile(categoryDBpath, JSON.stringify(logTmp), function (err) {
                console.log("category added");
            });
            res.json(logTmp.categories);
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

//func to send to client the categories list
app.get(`/getCategory`, (req, res) => {
    try {
        const stream = fs.readFileSync(categoryDBpath);
        const logTmp = JSON.parse(stream);
        if (!logTmp.categories) {
            //404
            res.status(404).send("no data exist");
        } else {
            res.json(logTmp.categories);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

/******* DELETE *******/

app.post("/deleteImage", function (req, res) {
    const stream = fs.readFileSync(dbPath);
    const logTmp = JSON.parse(stream);
    let isFound = false;
    let index;
    //if image exist save the index
    for (let i = 0; i < logTmp.imageDetails.length; i++) {
        if (logTmp.imageDetails[i].id == req.body.id) {
            isFound = true;
            index = i;
            break;
        }
    }
    //the selected image
    const path = imagesPath + req.body.id + '.png'

    if (isFound == true) {
        fs.unlinkSync(path);
        logTmp.imageDetails.splice(index, 1);
        fs.writeFile(dbPath, JSON.stringify(logTmp), function (err) {
            console.log(err);
        });
    }
});
