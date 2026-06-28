import User from '../models/User.js';

export const uploadResumeController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const relativePath = `/uploads/resumes/${req.file.filename}`;

    if (req.user && req.user._id) {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            'studentProfile.resume': relativePath,
          },
        },
        { new: true }
      ).select('-password');

      return res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        resumePath: relativePath,
        user,
      });
    }

    return res.status(200).json({
      success: true,
      resumePath: relativePath,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: 'Server error during upload',
    });
  }
};