import Job from '../models/Job.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
    try {
        const { role, search, skill, minCGPA, jobType } = req.query;

        // let filter = { status: 'active' };
        let filter = {};

        // Student-specific filters
        if (role === 'student') {
            if (search) {
                filter.title = { $regex: search, $options: 'i' };
            }
            if (skill) {
                filter.requirements.skills = { $in: [skill] };
            }
            if (minCGPA) {
                filter.requirements.minCGPA = { $lte: parseFloat(minCGPA) };
            }
            if (jobType) {
                filter.jobType = jobType;
            }
        }

        const jobs = await Job.find(filter)
            .populate('company', 'name companyProfile.companyName')
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('company', 'name companyProfile');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private (Company only)
export const createJob = async (req, res) => {
    try {
        const { title, description, location, jobType, salary, requirements, openings, deadline } = req.body;

        const job = await Job.create({
            company: req.user._id,
            title,
            description,
            location,
            jobType,
            salary,
            requirements,
            openings,
            deadline
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Company only)
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user is the company that posted the job
        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Company or Admin)
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check authorization
        if (job.company.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};