import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { FaUpload, FaFilePdf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ResumeUpload = () => {
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Allow only PDF
    if (selected.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    // Max 2 MB
    const maxSize = 2 * 1024 * 1024;
    if (selected.size > maxSize) {
      toast.error('File size should be less than 2 MB');
      return;
    }

    setFile(selected);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a resume to upload');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      // Must match Multer's field name: uploadResume.single('resume')
      formData.append('resume', file);

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const res = await axios.post(
        `${baseUrl}/api/upload/resume`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        }
      );

      const resumePath = res.data?.resumePath;

      // Update user in context (assuming studentProfile.resume)
      await updateUser({
        studentProfile: {
          ...user.studentProfile,
          resume: resumePath,
        },
      });

      toast.success('Resume uploaded successfully');
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || 'Failed to upload resume'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleViewResume = () => {
    if (!user?.studentProfile?.resume) {
      toast.info('No resume uploaded yet');
      return;
    }
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.open(`${baseUrl}${user.studentProfile.resume}`, '_blank');
  };

  const handleRemoveSelected = () => {
    setFile(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Resume</h3>

      {/* Current resume status */}
      <div className="mb-4 flex items-center gap-3">
        {user?.studentProfile?.resume ? (
          <>
            <FaCheckCircle className="text-green-600 text-2xl" />
            <div>
              <p className="font-semibold text-green-700">
                Resume already uploaded
              </p>
              <button
                type="button"
                onClick={handleViewResume}
                className="mt-1 text-blue-600 hover:underline text-sm"
              >
                View current resume
              </button>
            </div>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-red-600 text-2xl" />
            <p className="font-semibold text-red-700">
              No resume uploaded yet
            </p>
          </>
        )}
      </div>

      <form onSubmit={handleUpload} className="space-y-4">
        {/* File input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload new resume (PDF, max 2 MB)
          </label>
          <div className="flex items-center gap-3">
            <label
              className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <FaUpload />
              Choose file
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file && (
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg max-w-xs">
                <FaFilePdf className="text-red-600" />
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveSelected}
                  className="text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Upload button */}
        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FaUpload />
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </button>

        <p className="text-xs text-gray-500">
          Use a professional file name, for example: <b>YourName_Branch_Year.pdf</b>.
        </p>
      </form>
    </div>
  );
};

export default ResumeUpload;