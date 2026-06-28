import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Student Pages
import StudentDashboard from './components/student/StudentDashboard';
import JobList from './components/student/JobList';
import JobDetails from './components/student/JobDetails';
import MyApplications from './components/student/MyApplications';
import Profile from './components/student/Profile';

// Company Pages
import CompanyDashboard from './components/company/CompanyDashboard';
import PostJob from './components/company/PostJob';
import JobListCompany from './components/company/JobListCompany';
import ApplicantsList from './components/company/ApplicantsList';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/jobs"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <JobList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/jobs/:id"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <JobDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/applications"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MyApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              
              {/* Company Routes */}
              <Route
                path="/company/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/post-job"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <PostJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/jobs"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <JobListCompany />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/applications/:jobId"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <ApplicantsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/profile"
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-3xl">Company Profile Page</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-3xl">User Management Page</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-3xl">Job Approval Page</h1>
                    </div>
                  </ProtectedRoute>
                }
              /> 
               <Route
                path="/admin/stats"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-3xl">Placement Statistics Page</h1>
                    </div>
                  </ProtectedRoute>
                }
              /> 
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;