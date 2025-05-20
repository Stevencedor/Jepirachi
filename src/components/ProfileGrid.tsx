import { styled } from '@mui/material/styles';
import { Grid as MuiGrid } from '@mui/material';

// Crear un componente Grid personalizado que soporte la prop 'item'
const Grid = styled(MuiGrid)(() => ({
  '&.MuiGrid-item': {
    // Estilos para Grid items si es necesario
  },
  '&.MuiGrid-container': {
    // Estilos para Grid container si es necesario
  }
})) as typeof MuiGrid;

export default Grid;