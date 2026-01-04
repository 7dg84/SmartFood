import { CatalogPage } from '../components/CatalogPage';
import { useNavigate } from 'react-router-dom';

export function Catalogo() {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/catalogo/${productId}`);
  };

  return <CatalogPage onProductClick={handleProductClick} />;
}
