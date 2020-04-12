const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('config');
const PORT = config.get('port');
//   ../../public/upload
const dirPath = path.join(__dirname, '..', '..', 'public/upload');
//create a folder to store files
const storage = multer.diskStorage({
  // destination: 'upload', // service create folder automatically
  destination: function (req, file, cb) { //a function to create a folder
    // console.log('destination()', file)
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    // console.log('filename()', file)
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});
const upload = multer({storage});
const uploadSingle = upload.single('image');

module.exports = function fileUpload(router) {

  //PATH: api/images (POST,DELETE)
  //POST -- upload image
  router.post('/images', (req, res) => {
    try {
      uploadSingle(req, res, function (err) {
        if (err) {
          res.status(400).send({errors: [{msg: "Upload Image Failed"}]});
          return res.send({
            status: 1,
            msg: 'upload failed'
          })
        }
        let file = req.file;
        res.send({
          name: file.filename,
          url: `http://localhost:${PORT}/upload/` + file.filename
        })

      })
    } catch (e) {
      res.status(500).send('Server error');
    }


  });

  // DELETE -- delete image
  router.delete('/images', (req, res) => {
    try {
      const {name} = req.body;
      fs.unlink(path.join(dirPath, name), (err) => {
        if (err) {
          console.log(err);
          res.status(400).json({errors: [{msg: "Delete Failed"}]})
        } else {
          res.send("ok");
        }
      })
    } catch (e) {
      res.status(500).send('Server error');
    }
  });


  //display image
  router.get('/public/upload/*', function (req, res) {
    try {
      console.log("Request for " + req.url + " received.");
      const imgPath = path.join(__dirname, '..', '..', req.url);
      res.sendFile(imgPath);
    } catch (e) {
      res.status(500).send('Server error');
    }
  })


  //display image
  router.get('/upload/*', function (req, res) {
    try {
      console.log("Request for " + req.url + " received.");
      const imgPath = path.join(__dirname, '..', '..', '/public',req.url);
      res.sendFile(imgPath);
    } catch (e) {
      res.status(500).send('Server error');
    }
  })
};