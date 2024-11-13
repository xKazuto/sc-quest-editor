import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import Index from './pages/Index';
import Login from './pages/Login';
import CreateAdminPage from './pages/api/createAdmin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/createAdmin" element={<CreateAdminPage />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;