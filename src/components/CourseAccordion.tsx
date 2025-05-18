import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode } from 'react';

interface CourseAccordionProps {
  titulo: string;
  descripcion: string;
  progreso: number;
  progresoTexto: string;
  children: ReactNode;
}

const CourseAccordion = ({
  titulo,
  descripcion,
  progreso,
  progresoTexto,
  children,
}: CourseAccordionProps) => {
  return (
    <Accordion defaultExpanded sx={{ mb: 4 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight={600}>
          {titulo}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" paragraph>{descripcion}</Typography>
        <LinearProgress
          variant="determinate"
          value={progreso}
          sx={{ height: 10, borderRadius: 5, mb: 1 }}
        />
        <Typography variant="caption" gutterBottom>
          Progreso general: {progresoTexto}
        </Typography>

        <Box mt={2}>
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseAccordion;
