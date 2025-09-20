const mongoose = require('mongoose');

const CompetencySchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Beginner','Intermediate','Advanced','Expert'], default: 'Intermediate' },
  years: { type: Number, default: 0 },
  description: { type: String },
  attachments: [{ url: String, public_id: String }], // Cloudinary
  createdAt: { type: Date, default: Date.now }
});

const JobseekerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  displayName: { type: String },
  headline: { type: String },
  bio: { type: String },
  location: { type: String },
  avatarUrl: { type: String, default: null },
  resumeUrl: { type: String, default: null },
  visibility: { type: String, enum: ['public','private'], default: 'public' },
  competencies: [CompetencySchema],
  portfolio: [{ title: String, url: String, description: String }],
  contactRequests: [{
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

JobseekerSchema.index({ 'competencies.title': 'text', displayName: 'text', headline: 'text', bio: 'text' });

module.exports = mongoose.model('Jobseeker', JobseekerSchema);
