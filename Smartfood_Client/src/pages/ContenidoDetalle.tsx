import { useParams, useNavigate } from 'react-router-dom';
import { ContentDetailPage } from '../components/ContentDetailPage';

export function ContenidoDetalle() {
  const { tipo, id } = useParams<{ tipo: string; id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/contenido');
  };

  const contentType = (tipo as 'infografias' | 'videos' | 'trivias') || 'infografias';

  return (
    <ContentDetailPage 
      contentId={id || ''}
      contentType={contentType}
      onBack={handleBack}
    />
  );
}
