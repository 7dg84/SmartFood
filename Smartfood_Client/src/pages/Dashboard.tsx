import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardLogin } from '../components/dashboard/DashboardLogin';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { isAuthenticated, login, logout } = useAuth({ storageKey: 'dashboardAuth' });
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    login();
  };

  const handleClose = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <DashboardLogin 
        onLoginSuccess={handleLoginSuccess}
        onClose={() => navigate('/')}
      />
    );
  }

  return <DashboardLayout onClose={handleClose} />;
}