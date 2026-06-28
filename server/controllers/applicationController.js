import Application from '../models/Application.js';
import Job from '../models/Job.js';

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Student only)
export const applyForJob = async (req, res) => {
  try {
    const { job, coverLetter } = req.body;
    
    // Check if job exists
    const jobData = await Job.findById(job);
    if (!jobData) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if already applied
    const existingApplication = await Application.findOne({ job, student: req.user._id });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Check if student is eligible by CGPA
    if (req.user.studentProfile?.cgpa < jobData.requirements.minCGPA) {
      return res.status(400).json({ 
        message: `You don't meet the minimum CGPA requirement of ${jobData.requirements.minCGPA}` 
      });
    }
    
    const application = await Application.create({
      job,
      student: req.user._id,
      coverLetter
    });
    
    // Add application to job
    jobData.applications.push(application._id);
    await jobData.save();
    
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student's applications
// @route   GET /api/applications/my-applications
// @access  Private (Student only)
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('job', 'title company location jobType salary')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get job applicants (for company)
// @route   GET /api/applications/job/:jobId
// @access  Private (Company only)
export const getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate('applications', 'student coverLetter status appliedAt');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the company that posted the job
    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const applicants = await Application.find({ job: req.params.jobId })
      .populate('student', 'name email studentProfile phone skills resume');
    
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Company only)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const application = await Application.findById(req.params.id)
      .populate('job');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user is the company that posted the job
    if (application.job.company.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    application.status = status;
    application.reviewedAt = Date.now();
    application.reviewer = req.user._id;
    
    await application.save();
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};