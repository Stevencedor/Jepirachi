import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

export type ModuleStatus = 'completed' | 'in_progress' | 'locked';

export interface Modulo {
  titulo: string;
  progreso: number;
  estado: ModuleStatus;
  estadoTexto: string;
  boton: string;
}

interface ModuleListProps {
  modulos: Modulo[];
  renderStatus?: (estado: ModuleStatus, estadoTexto: string) => ReactNode;
}

const ModuleList = ({ modulos, renderStatus }: ModuleListProps) => {
  const navigate = useNavigate();

  const getButtonColor = (estado: ModuleStatus) => {
    switch (estado) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      default:
        return 'inherit';
    }
  };

  const getButtonVariant = (estado: ModuleStatus) => {
    return estado === 'locked' ? 'outlined' : 'contained';
  };

  return (
    <>
      {modulos.map((mod, idx) => (
        <Card 
          key={idx} 
          sx={{ 
            mb: 2, 
            borderLeft: '4px solid',
            borderLeftColor: mod.estado === 'completed' ? 'success.main' : 
                           mod.estado === 'in_progress' ? 'primary.main' : 
                           'grey.300',
            position: 'relative'
          }}
        >
          <CardContent>
            <Box sx={{ pr: 10 }}> {/* Espacio para el estado */}
              <Typography gutterBottom>{mod.titulo}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={mod.progreso} 
                sx={{ 
                  mb: 2,
                  height: 8,
                  borderRadius: 1,
                  backgroundColor: 'grey.200'
                }} 
              />
              <Button
                variant={getButtonVariant(mod.estado)}
                color={getButtonColor(mod.estado)}
                disabled={mod.estado === 'locked'}
                onClick={() => {
                  if (mod.estado !== 'locked') {
                    navigate(`/modulo/${idx + 1}`);
                  }
                }}
                size="small"
              >
                {mod.boton}
              </Button>
            </Box>
            
            {renderStatus && renderStatus(mod.estado, mod.estadoTexto)}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ModuleList;
