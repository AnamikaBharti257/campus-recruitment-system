import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaBuilding, FaBriefcase, FaClipboardList, FaCheckCircle, FaClock, FaChartLine, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    pendingJobs: 0,
    shortlisted: 0,
    placedStudents: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setStats({
        totalStudents: 520,
        totalCompanies: 48,
        totalJobs: 310,
        totalApplications: 1240,
        activeJobs: 96,
        pendingJobs: 18,
        shortlisted: 210,
        placedStudents: 145
      });

      setRecentUsers([
        { id: 1, name: 'Rahul Sharma', role: 'student', email: 'rahul@example.com', verified: true },
        { id: 2, name: 'Tech Corp', role: 'company', email: 'hr@techcorp.com', verified: true },
        { id: 3, name: 'Priya Mehta', role: 'student', email: 'priya@example.com', verified: false }
      ]);

      setRecentJobs([
        { id: 1, title: 'Frontend Developer', company: 'Tech Corp', status: 'active' },
        { id: 2, title: 'Backend Intern', company: 'Innova Ltd', status: 'pending' },
        { id: 3, title: 'Data Analyst', company: 'FinEdge', status: 'active' }
      ]);

      setRecentApplications([
        { id: 1, student: 'Amit Verma', job: 'Frontend Developer', status: 'pending' },
        { id: 2, student: 'Sneha Iyer', job: 'Data Analyst', status: 'shortlisted' },
        { id: 3, student: 'Kabir Khan', job: 'Backend Intern', status: 'rejected' }
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const cards = [
    { title: 'Total Students', value: stats.totalStudents, icon: FaUsers, color: 'blue' },
    { title: 'Total Companies', value: stats.totalCompanies, icon: FaBuilding, color: 'green' },
    { title: 'Total Jobs', value: stats.totalJobs, icon: FaBriefcase, color: 'purple' },
    { title: 'Applications', value: stats.totalApplications, icon: FaClipboardList, color: 'orange' },
    { title: 'Active Jobs', value: stats.activeJobs, icon: FaCheckCircle, color: 'emerald' },
    { title: 'Pending Jobs', value: stats.pendingJobs, icon: FaClock, color: 'yellow' },
    { title: 'Shortlisted', value: stats.shortlisted, icon: FaChartLine, color: 'indigo' },
    { title: 'Placed Students', value: stats.placedStudents, icon: FaUsers, color: 'rose' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.name || 'Admin'} 👋
          </h1>
          <p className="text-lg opacity-90">
            Manage students, companies, jobs, and placements from one place.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                  </div>
                  <div className={`bg-${card.color}-100 p-3 rounded-full`}>
                    <Icon className={`text-${card.color}-600 text-2xl`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/users" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <FaUsers className="text-3xl text-blue-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-gray-600">View, verify, edit, or remove students and companies.</p>
          </Link>

          <Link to="/admin/jobs" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <FaBriefcase className="text-3xl text-green-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Job Approval</h3>
            <p className="text-gray-600">Approve or reject job postings submitted by companies.</p>
          </Link>

          <Link to="/admin/stats" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <FaChartLine className="text-3xl text-purple-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Placement Statistics</h3>
            <p className="text-gray-600">Track placements, applications, and hiring trends.</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Users</h2>
            <div className="space-y-4">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {u.role}
                    </span>
                    <p className="text-sm mt-1">{u.verified ? 'Verified' : 'Pending'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Job Posts</h2>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">Student</th>
                  <th className="py-3">Job</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="border-b">
                    <td className="py-3">{app.student}</td>
                    <td className="py-3">{app.job}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link to="/admin/users" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Manage Users
          </Link>
          <Link to="/admin/jobs" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Review Jobs
          </Link>
          <Link to="/admin/stats" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            View Analytics
          </Link>
          <Link to="/company/post-job" className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition flex items-center gap-2">
            <FaPlus /> Add Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;