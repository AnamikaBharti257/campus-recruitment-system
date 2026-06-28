import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJobDetails();
    checkApplicationStatus();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const data = await jobService.getJob(id);
      setJob(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch job details');
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const applications = await applicationService.getMyApplications();
      const isApplied = applications.some(app => app.job._id === id);
      setApplied(isApplied);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      toast.error('Please enter a cover letter');
      return;
    }

    setApplying(true);
    try {
      await applicationService.applyForJob({
        job: id,
        coverLetter
      });
      toast.success('Application submitted successfully!');
      setApplied(true);
      setCoverLetter('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Job not found</div>
      </div>
    );
  }

  const isEligible = user?.studentProfile?.cgpa >= job.requirements?.minCGPA;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link
          to="/student/jobs"
          className="inline-flex items-center text-blue-600 hover:underline mb-6"
        >
          ← Back to Jobs
        </Link>

        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Job Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <p className="text-xl font-semibold">
                {job.company?.companyProfile?.companyName || job.company?.name}
              </p>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FaBriefcase />
                {job.jobType}
              </span>
            </div>
          </div>

          {/* Job Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {job.salary?.min && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Salary</p>
                <p className="text-xl font-bold text-green-700">
                  ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max?.toLocaleString()}
                </p>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Openings</p>
              <p className="text-xl font-bold text-blue-700">{job.openings}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Deadline</p>
              <p className="text-xl font-bold text-purple-700">
                {new Date(job.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requirements?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p><span className="font-semibold">Education:</span> {job.requirements?.education}</p>
                <p><span className="font-semibold">Experience:</span> {job.requirements?.experience}</p>
                <p><span className="font-semibold">Min CGPA:</span> {job.requirements?.minCGPA}</p>
              </div>
            </div>
          </div>

          {/* Eligibility Check */}
          {user?.studentProfile && (
            <div className={`rounded-lg p-4 mb-8 ${
              isEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                {isEligible ? (
                  <FaCheckCircle className="text-green-600 text-2xl" />
                ) : (
                  <FaCalendarAlt className="text-red-600 text-2xl" />
                )}
                <div>
                  <p className={`font-semibold ${isEligible ? 'text-green-800' : 'text-red-800'}`}>
                    {isEligible ? '✓ You are eligible for this job' : '✗ You do not meet the CGPA requirement'}
                  </p>
                  {!isEligible && (
                    <p className="text-red-600">
                      Your CGPA: {user.studentProfile.cgpa} | Required: {job.requirements.minCGPA}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Apply Section */}
          <div className="border-t pt-8">
            {applied ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  You have applied for this job!
                </h3>
                <p className="text-green-700">
                  Check "My Applications" to track your application status.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Apply for this Position
                </h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows="5"
                    placeholder="Tell us why you're a good fit for this position..."
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleApply}
                  disabled={!isEligible || applying}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
                {!isEligible && (
                  <p className="text-red-600 text-center mt-2">
                    You must meet the minimum CGPA requirement to apply
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;