const express = require('express');
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadMiddleware');
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../cloudinaryConfig");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "jobPortal",
        allowed_formats: ["jpg", "jpeg", "png", "pdf", "xlm", "gif", "webp"],
    },
});

const parser = multer({ storage });

router.post("/upload-image", protect, parser.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = req.file.path;

    res.status(200).json({ imageUrl });
});

module.exports = router;