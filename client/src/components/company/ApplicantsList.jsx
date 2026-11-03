import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import { toast } from 'react-toastify';
import { FaDownload, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const ApplicantsList = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const data = await applicationService.getJobApplicants(jobId);
      setApplicants(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch applicants');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    setUpdating(applicationId);
    try {
      await applicationService.updateApplicationStatus(applicationId, status);
      toast.success(`Application ${status}`);
      fetchApplicants();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const handleDownloadResume = (resumeUrl) => {
    if (resumeUrl) {
      window.open(`${import.meta.env.VITE_API_URL}${resumeUrl}`, '_blank');
    } else {
      toast.info('Resume not available');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock },
      shortlisted: { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: FaTimesCircle }
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
        <Icon /> {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Applicants</h1>
          <p className="text-gray-600">Review and manage candidates for your job</p>
        </div>

        {applicants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No applicants yet for this job</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div key={app._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{app.student?.name}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    <p className="text-gray-600 mb-2">📧 {app.student?.email}</p>
                    <p className="text-gray-600 mb-2">📱 {app.student?.studentProfile?.phone}</p>
                    <p className="text-gray-600 mb-2">
                      🎓 {app.student?.studentProfile?.college} • {app.student?.studentProfile?.branch}
                    </p>
                    <p className="text-purple-600 font-semibold mb-2">
                      CGPA: {app.student?.studentProfile?.cgpa}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.student?.studentProfile?.skills?.map((skill, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {app.coverLetter && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="font-semibold text-gray-700 mb-2">Cover Letter:</p>
                        <p className="text-gray-600">{app.coverLetter}</p>
                      </div>
                    )}
                    <p className="text-gray-500 text-sm">
                      Applied: {new Date(app.appliedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {app.student?.studentProfile?.resume && (
                      <button
                        onClick={() => handleDownloadResume(app.student.studentProfile.resume)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <FaDownload /> Resume
                      </button>
                    )}
                    {app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                          disabled={updating === app._id}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-green-300"
                        >
                          <FaCheckCircle /> Shortlist
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'rejected')}
                          disabled={updating === app._id}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-red-300"
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;