const express = require("express");
const {
    getMyProfile,
    createOrUpdateProfile,
    addCompetency,
    updateCompetency,
    deleteCompetency,
    uploadFile,
    searchJobseekers,
    employerContact,
} = require("../controllers/jobseekerController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrUpdateProfile).get(getMyProfile);
router.route("/competencies").post(protect, addCompetency);
router.route("/competencies/:id").put(protect, updateCompetency).delete(protect, deleteCompetency);
router.route("/upload").post(protect, uploadFile);
router.route("/search").get(searchJobseekers);
router.route("/contact/:jobseekerId").post(protect, employerContact);

module.exports = router;





