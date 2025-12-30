import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetailPage } from '../components/ProductDetailPage';

export function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/catalogo');
  };

  return (
    <ProductDetailPage 
      productId={parseInt(id || '1')} 
      onBack={handleBack}
    />
  );
}
