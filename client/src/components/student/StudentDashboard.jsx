import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { toast } from 'react-toastify';
import { FaBriefcase, FaClock, FaCheckCircle, FaStar } from 'react-icons/fa';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    appliedJobs: 0,
    shortlisted: 0,
    rejected: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all jobs (you can add filters in your jobService if needed)
      const jobs = await jobService.getAllJobs();
      setStats(prev => ({ ...prev, totalJobs: jobs.length }));
      setRecentJobs(jobs.slice(0, 5));

      // Fetch student applications
      const applications = await applicationService.getMyApplications();
      setStats(prev => ({ ...prev, appliedJobs: applications.length }));

      const shortlisted = applications.filter(app => app.status === 'shortlisted').length;
      const rejected = applications.filter(app => app.status === 'rejected').length;
      setStats(prev => ({ ...prev, shortlisted, rejected }));

      setRecentApplications(applications.slice(0, 5));
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl opacity-90">
            {user?.studentProfile?.college} • {user?.studentProfile?.branch}
          </p>
          {user?.studentProfile?.cgpa && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <FaStar className="text-yellow-300" />
              <span>CGPA: {user.studentProfile.cgpa}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBriefcase className="text-blue-600 text-2xl" />
              </div>
            </div>
            <Link
              to="/student/jobs"
              className="mt-4 block text-blue-600 hover:underline text-sm font-semibold"
            >
              View all jobs →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Applied</p>
                <p className="text-3xl font-bold text-purple-600">{stats.appliedJobs}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaClock className="text-purple-600 text-2xl" />
              </div>
            </div>
            <Link
              to="/student/applications"
              className="mt-4 block text-purple-600 hover:underline text-sm font-semibold"
            >
              Track applications →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Shortlisted</p>
                <p className="text-3xl font-bold text-green-600">{stats.shortlisted}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Profile</p>
                <p className="text-2xl font-bold text-gray-700">
                  {(user?.studentProfile?.skills || []).length} skills
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaStar className="text-orange-600 text-2xl" />
              </div>
            </div>
            <Link
              to="/student/profile"
              className="mt-4 block text-orange-600 hover:underline text-sm font-semibold"
            >
              Edit profile →
            </Link>
          </div>
        </div>

        {/* Recent Jobs & Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Jobs</h2>
              <Link
                to="/student/jobs"
                className="text-blue-600 hover:underline font-semibold"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentJobs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No jobs available</p>
              ) : (
                recentJobs.map((job) => (
                  <Link
                    key={job._id}
                    to={`/student/jobs/${job._id}`}
                    className="block"
                  >
                    <div className="border rounded-lg p-4 hover:shadow-md transition">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {job.company?.companyProfile?.companyName ||
                          job.company?.name}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.jobType}</span>
                      </div>
                      {job.salary?.min && (
                        <p className="text-green-600 font-semibold mt-2">
                          ₹{job.salary.min.toLocaleString()} -
                          {' '}
                          ₹{job.salary.max?.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* My Applications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Applications</h2>
              <Link
                to="/student/applications"
                className="text-blue-600 hover:underline font-semibold"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentApplications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  You haven&apos;t applied to any jobs yet
                </p>
              ) : (
                recentApplications.map((app) => (
                  <div key={app._id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {app.job?.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {app.job?.company?.companyProfile?.companyName ||
                        app.job?.company?.name}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          app.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.status === 'shortlisted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Applied: {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;