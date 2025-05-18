import { useParams } from 'react-router-dom';
import ModuloViewer from '../components/ModuloViewer';
import { Container } from '@mui/material';

const moduloData = {
  '1': {
    titulo: 'Módulo 1: Introducción',
    descripcion: 'Conoce los fundamentos del mantenimiento solar.',
    videoUrl: 'https://www.youtube.com/watch?v=unHE7lAb-24',
  },
  '2': {
    titulo: 'Módulo 2: Mantenimiento Preventivo',
    descripcion: 'Aprende a prevenir fallos comunes.',
    videoUrl: 'https://www.youtube.com/watch?v=dDsaXt8tiUI',
  },
  '3': {
    titulo: 'Módulo 3: Mantenimiento Correctivo',
    descripcion: 'Corrige errores y fallas en sistemas solares.',
    videoUrl: 'https://www.youtube.com/watch?v=HcBRkk4Lm_s',
  },
};

const ModuloViewerPage = () => {
  const { id } = useParams();

  const modulo = moduloData[id as keyof typeof moduloData];

  if (!modulo) {
    return <Container><p>Módulo no encontrado</p></Container>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <ModuloViewer
        titulo={modulo.titulo}
        descripcion={modulo.descripcion}
        videoUrl={modulo.videoUrl}
      />
    </Container>
  );
};

export default ModuloViewerPage;
