import { useNavigate } from 'react-router-dom';
import { ShopLayout } from '../components/shop/ShopLayout';
import { ShopLogin } from '../components/shop/ShopLogin';
import { useAuth } from '../hooks/useAuth';

export function Tienda() {
  const { isAuthenticated, login, logout } = useAuth({ storageKey: 'shopAuth' });
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
      <ShopLogin 
        onLoginSuccess={handleLoginSuccess}
        onClose={() => navigate('/')}
      />
    );
  }

  return <ShopLayout onClose={handleClose} />;
}