import multer from "multer";
import path from "path";
import express from "express";
const app = express.Router();

// Set up Multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the file name to be unique
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to handle file upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(201).json({ imagePath: req.file.path });
});

// Other routes and middleware...
export { app as fileUpload };
