import { useParams } from 'react-router-dom';
import ModuloViewer from '../components/ModuloViewer';
import { Container } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const moduloData = {
  '1': {
    titulo: 'module_1_title',
    descripcion: 'module_1_description',
    videoUrl: 'https://www.youtube.com/watch?v=unHE7lAb-24',
  },
  '2': {
    titulo: 'module_2_title',
    descripcion: 'Aprende a prevenir fallos comunes.',
    videoUrl: 'https://www.youtube.com/watch?v=dDsaXt8tiUI',
  },
  '3': {
    titulo: 'module_3_title',
    descripcion: 'Corrige errores y fallas en sistemas solares.',
    videoUrl: 'https://www.youtube.com/watch?v=HcBRkk4Lm_s',
  },
};

const ModuloViewerPage = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  const modulo = moduloData[id as keyof typeof moduloData];

  if (!modulo) {
    return <Container><p>{t('not_available')}</p></Container>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <ModuloViewer
        titulo={t(modulo.titulo)}
        descripcion={t(modulo.descripcion)}
        videoUrl={modulo.videoUrl}
      />
    </Container>
  );
};

export default ModuloViewerPage;
