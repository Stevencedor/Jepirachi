import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Modulo {
  titulo: string;
  progreso: number;
  estado: string;
  color: 'success' | 'primary' | 'secondary';
  boton: string;
}

const ModuleList = ({ modulos }: { modulos: Modulo[] }) => {
  const navigate = useNavigate();

  return (
    <>
      {modulos.map((mod, idx) => (
        <Card key={idx} sx={{ mb: 2, borderLeft: '4px solid #198754' }}>
          <CardContent>
            <Typography gutterBottom>{mod.titulo}</Typography>
            <LinearProgress variant="determinate" value={mod.progreso} sx={{ mb: 1 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Badge color={mod.color} badgeContent={mod.estado} sx={{ mr: 2 }} />
              <Button
                variant={mod.progreso > 0 ? 'contained' : 'outlined'}
                disabled={mod.progreso === 0}
                onClick={() => {
                  if (mod.progreso > 0) {
                    navigate(`/modulo/${idx + 1}`);
                  }
                }}
              >
                {mod.boton}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ModuleList;
