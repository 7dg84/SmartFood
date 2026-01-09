import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardLogin } from '../components/dashboard/DashboardLogin';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    login();
  };

  const handleClose = () => {
    logout();
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <DashboardLogin 
        onLoginSuccess={handleLoginSuccess}
        onClose={() => navigate('/')}
      />
    );
  }

  return <DashboardLayout onClose={handleClose} />;
}