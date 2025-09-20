const Jobseeker = require('../models/Jobseeker');

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Jobseeker.findOne({ user: req.user._id }).populate('contactRequests.employer', 'displayName email profileUrl');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const body = req.body;
    let profile = await Jobseeker.findOne({ user: req.user._id });
    if (profile) {
      Object.assign(profile, body);
      await profile.save();
    } else {
      profile = await Jobseeker.create({ user: req.user._id, ...body });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCompetency = async (req, res) => {
  try {
    const { title, level, years, description, attachments } = req.body;
    const profile = await Jobseeker.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    const comp = { title, level, years, description, attachments };
    profile.competencies.unshift(comp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCompetency = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.deleteCompetency = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Jobseeker.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    profile.competencies = profile.competencies.filter(c => c._id.toString() !== id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadFile = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.searchJobseekers = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.employerContact = async (req, res) => {
  try {
    const { message } = req.body;
    const jobseekerId = req.params.jobseekerId;
    const profile = await Jobseeker.findById(jobseekerId);
    if (!profile) return res.status(404).json({ message: 'Jobseeker not found' });

    profile.contactRequests.unshift({
      employer: req.user._id, // employer must be authenticated
      message
    });
    await profile.save();

    // optionally: notify via websocket / email
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
