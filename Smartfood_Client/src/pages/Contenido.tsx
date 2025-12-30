import { useNavigate } from 'react-router-dom';
import { ContentPage } from '../components/ContentPage';

export function Contenido() {
  const navigate = useNavigate();

  const handleViewContent = (contentId: number, contentType: 'infografias' | 'videos' | 'trivias') => {
    navigate(`/contenido/${contentType}/${contentId}`);
  };

  return <ContentPage onViewContent={handleViewContent} />;
}
