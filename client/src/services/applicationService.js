import API from './api';

export const applicationService = {
  applyForJob: async (applicationData) => {
    const response = await API.post('/applications', applicationData);
    return response.data;
  },

  getMyApplications: async () => {
    const response = await API.get('/applications/my-applications');
    return response.data;
  },

  getJobApplicants: async (jobId) => {
    const response = await API.get(`/applications/job/${jobId}`);
    return response.data;
  },

  updateApplicationStatus: async (id, status) => {
    const response = await API.put(`/applications/${id}/status`, { status });
    return response.data;
  }
};