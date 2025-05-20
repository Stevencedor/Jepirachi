import { useRef, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useLanguage } from '../context/LanguageContext';

interface CertificateViewerProps {
  userName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

const CertificateViewer = ({ userName, courseName, completionDate, certificateId }: CertificateViewerProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Registrar el certificado cuando se genera
  useEffect(() => {
    const certificates = JSON.parse(localStorage.getItem('issued-certificates') || '[]');
    if (!certificates.includes(certificateId)) {
      certificates.push(certificateId);
      localStorage.setItem('issued-certificates', JSON.stringify(certificates));
    }
  }, [certificateId]);

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `${t('certificate')}-${userName}-${courseName}`,
    copyStyles: true,
    pageStyle: `
      @page {
        size: landscape;
        margin: 0;
      }
      @media print {
        body {
          margin: 1cm;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
    onBeforeGetContent: () => Promise.resolve(),
    onAfterPrint: () => {
      console.log('Certificado descargado exitosamente');
    }
  });

  const shareCertificate = async () => {
    try {
      const certificateUrl = `${window.location.origin}/certificate/${certificateId}`;
      
      if (navigator.share) {
        await navigator.share({
          title: t('certificate_share_title'),
          text: t('certificate_completed_message').replace('{courseName}', courseName),
          url: certificateUrl
        });
      } else {
        await navigator.clipboard.writeText(certificateUrl);
        alert(t('certificate_link_copied'));
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      try {
        const certificateUrl = `${window.location.origin}/certificate/${certificateId}`;
        await navigator.clipboard.writeText(certificateUrl);
        alert(t('certificate_link_copied'));
      } catch (clipboardError) {
        alert(t('certificate_share_error'));
      }
    }
  };

  const verifyCertificate = () => {
    const certificates = JSON.parse(localStorage.getItem('issued-certificates') || '[]');
    const isValid = certificates.includes(certificateId);
    
    alert(isValid ? 
      t('certificate_valid') : 
      t('certificate_invalid')
    );
  };

  return (
    <Box sx={{ my: 4 }}>
      <Paper 
        ref={certificateRef}
        sx={{ 
          p: 4, 
          textAlign: 'center',
          backgroundImage: 'linear-gradient(45deg, #f3f4f6 25%, #ffffff 25%, #ffffff 50%, #f3f4f6 50%, #f3f4f6 75%, #ffffff 75%, #ffffff 100%)',
          backgroundSize: '20px 20px',
          border: '2px solid #1976d2',
          position: 'relative',
          mb: 3,
          '@media print': {
            backgroundImage: 'none',
            border: 'none'
          }
        }}
      >
        <Box sx={{ 
          position: 'absolute',
          top: 20,
          right: 20,
          opacity: 0.1,
          fontSize: '100px',
          '@media print': {
            opacity: 0.05
          }
        }}>
          <VerifiedIcon sx={{ fontSize: 'inherit' }} />
        </Box>

        <Typography variant="h4" color="primary" gutterBottom sx={{ 
          fontFamily: 'serif',
          '@media print': {
            color: '#1976d2 !important'
          }
        }}>
          {t('certificate_title')}
        </Typography>

        <Typography variant="h6" sx={{ my: 4 }}>
          {t('certificate_certifies')}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', my: 3 }}>
          {userName}
        </Typography>

        <Typography variant="body1" sx={{ my: 4 }}>
          {t('certificate_has_completed')}
        </Typography>

        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          color: 'primary.main',
          my: 3,
          '@media print': {
            color: '#1976d2 !important'
          }
        }}>
          {courseName}
        </Typography>

        <Typography variant="body2" sx={{ my: 4 }}>
          {t('completion_date')}: {completionDate}
        </Typography>

        <Typography variant="caption" color="textSecondary">
          {t('certificate_id')}: {certificateId}
        </Typography>
      </Paper>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: 'center',
        '@media print': {
          display: 'none'
        }
      }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handlePrint}
        >
          {t('download_pdf')}
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={shareCertificate}
        >
          {t('share')}
        </Button>

        <Button
          variant="outlined"
          startIcon={<VerifiedIcon />}
          onClick={verifyCertificate}
          color="success"
        >
          {t('verify_certificate')}
        </Button>
      </Box>
    </Box>
  );
};

export default CertificateViewer;