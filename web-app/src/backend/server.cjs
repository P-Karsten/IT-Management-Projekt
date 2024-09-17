const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const multer = require('multer');
//const { GridFsStorage } = require('multer-gridfs-storage');
//const Grid = require('gridfs-stream');
//const methodOverride = require('method-override');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/videos', express.static(path.join(__dirname, 'videos')));



/*Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));*/

//MongoDB URI
const mongoURI = 'mongodb://localhost:27017/videoDB';


//Create connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => {
    console.log(e);
  });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './videos');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

require('./videoDetails.cjs');
const VideoSchema = mongoose.model('VideoDetails');
const upload = multer({ storage: storage })


app.get('/', (req, res) => {
  res.send('Running');
});

// POST /upload
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log('File uploaded successfully:', req.file);

  //Schema
  const title = req.body.title;
  const fileName = req.file.filename;
  const perm = req.body.perm;
  const owner = req.body.owner;
  try {
    await VideoSchema.create({title: title, video: fileName, perm: perm, owner: owner});
    res.send({ status: 'ok' });
    
  } catch (error) {
    res.json({ status: error })
  }
});

// @GET /get-videos
app.get('/get-videos', async (req, res) => {
  try {
    VideoSchema.find({}).then((data) => {
      res.send({ status: 'ok', data: data });
    });
  } catch (error) {}
});

app.listen(port, () => console.log(`Server started on port ${port}`));