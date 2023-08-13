const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 

server.use(cors());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, 'public', 'images');
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

server.post('/api/upload', upload.single('image'), (req, res) => {
  const imageUrl = `/images/${req.file.filename}`;
  res.json({ imageUrl });
});

// Use default middlewares and your JSON Server routes
server.use(middlewares);
server.use(jsonServer.router('db.json'));

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
