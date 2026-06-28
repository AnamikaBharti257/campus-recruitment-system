import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { FaBriefcase, FaUsers, FaCheckCircle, FaClock } from 'react-icons/fa';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const jobs = await jobService.getAllJobs();
      const companyJobs = jobs.filter(job => 
        job.company._id === user._id || job.company._id === user._id
      );
      
      setStats(prev => ({
        ...prev,
        totalJobs: companyJobs.length,
        activeJobs: companyJobs.filter(j => j.status === 'active').length
      }));
      setRecentJobs(companyJobs.slice(0, 5));

      // Get all applications for company jobs
      let totalApps = 0;
      let pendingApps = 0;
      for (const job of companyJobs) {
        const applicants = await applicationService.getJobApplicants(job._id);
        totalApps += applicants.length;
        pendingApps += applicants.filter(a => a.status === 'pending').length;
      }
      
      setStats(prev => ({
        ...prev,
        totalApplications: totalApps,
        pendingApplications: pendingApps
      }));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.companyProfile?.companyName}! 🏢
          </h1>
          <p className="text-xl opacity-90">{user?.companyProfile?.industry}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBriefcase className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Jobs</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeJobs}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalApplications}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaUsers className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Review</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingApplications}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaClock className="text-orange-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/company/post-job"
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition hover:border-green-500"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <FaBriefcase className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Post New Job</h3>
                <p className="text-gray-500 text-sm">Create a job posting</p>
              </div>
            </Link>
            <Link
              to="/company/jobs"
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition hover:border-blue-500"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">View All Jobs</h3>
                <p className="text-gray-500 text-sm">Manage your postings</p>
              </div>
            </Link>
            <Link
              to="/company/profile"
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition hover:border-purple-500"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCheckCircle className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Company Profile</h3>
                <p className="text-gray-500 text-sm">Update information</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;