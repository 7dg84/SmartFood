import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import {
  Home,
  Catalogo,
  ProductoDetalle,
  Contenido,
  ContenidoDetalle,
  Feedback,
  Estadisticas,
  Dashboard,
  Tienda,
  Estado,
  Mantenimiento,
  NotFound,
} from './pages';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Routes with Layout (Header + Footer + Modals) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/catalogo" element={<Layout><Catalogo /></Layout>} />
        <Route path="/catalogo/:id" element={<Layout><ProductoDetalle /></Layout>} />
        <Route path="/contenido" element={<Layout><Contenido /></Layout>} />
        <Route path="/contenido/:tipo/:id" element={<Layout><ContenidoDetalle /></Layout>} />
        <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
        <Route path="/estadisticas" element={<Layout><Estadisticas /></Layout>} />
        
        {/* Routes without Layout (Full-screen pages) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/estado" element={<Estado />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        
        {/* 404 - Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}