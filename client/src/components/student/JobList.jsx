import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { toast } from 'react-toastify';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    skill: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const data = await jobService.getAllJobs({ 
        role: 'student',
        ...filters 
      });
      setJobs(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          name="search"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
        </select>
        <input
          type="text"
          name="skill"
          placeholder="Filter by skill..."
          value={filters.skill}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Link key={job._id} to={`/student/jobs/${job._id}`}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.company?.companyProfile?.companyName || job.company?.name}</p>
              <p className="text-gray-500 mb-2">📍 {job.location}</p>
              <p className="text-gray-500 mb-2">💼 {job.jobType}</p>
              {job.salary?.min && (
                <p className="text-green-600 font-semibold">
                  ₹{job.salary.min} - ₹{job.salary.max}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {job.requirements?.skills?.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobList;