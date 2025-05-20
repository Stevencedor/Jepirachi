import { Box, Typography, Button } from '@mui/material';
import CertificateViewer from '../components/CertificateViewer';

const TestCertificatePage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Página de Prueba de Certificados
      </Typography>
      
      <CertificateViewer
        userName="Estudiante de Prueba"
        courseName="Curso de Prueba"
        completionDate={new Date().toLocaleDateString()}
        certificateId={`CERT-TEST-${Date.now()}`}
      />
    </Box>
  );
};

export default TestCertificatePage;
