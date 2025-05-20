import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom';
import ModuloViewer from '../ModuloViewer';
import * as LanguageContextModule from '../../context/LanguageContext';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

// Mock YouTube component
jest.mock('react-youtube', () => {
  const MockYouTube = ({ onEnd, videoId }: { onEnd: () => void; videoId: string }) => (
    <div className="youtube-container" data-testid="youtube-player">
      <div>Video ID: {videoId}</div>
      <button 
        data-testid="simulate-video-end"
        onClick={onEnd}
      >
        Simular fin del video
      </button>
    </div>
  );
  
  return {
    __esModule: true,
    default: MockYouTube
  };
});

const mockVideoId = 'abc123xyz';
const validYouTubeUrls = [
  `https://www.youtube.com/watch?v=${mockVideoId}`,
  `https://youtu.be/${mockVideoId}`,
  `https://www.youtube.com/embed/${mockVideoId}`,
  `https://www.youtube.com/v/${mockVideoId}`
];

describe('ModuloViewer', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });  const renderModuloViewer = (props = {}) => {
    const defaultProps = {
      titulo: "Test",
      videoUrl: validYouTubeUrls[0],
      ...props
    };
    
    // Asegurarse de que el mock se aplica correctamente
    jest.mock('react-youtube');
    
    return render(
      <MemoryRouter>
        <LanguageContextModule.LanguageProvider>
          <ModuloViewer {...defaultProps} />
        </LanguageContextModule.LanguageProvider>
      </MemoryRouter>
    );
  };

  describe('Renderización inicial', () => {
    it('renderiza correctamente con propiedades básicas', () => {
      renderModuloViewer({
        titulo: "Módulo de Prueba",
        descripcion: "Descripción de prueba"
      });

      expect(screen.getByText('Módulo de Prueba')).toBeInTheDocument();
      expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
      expect(screen.getByText('complete_video')).toBeInTheDocument();
    });

    it('renderiza el reproductor de YouTube con el ID correcto', () => {
      renderModuloViewer();
      
      const videoPlayer = screen.getByTestId('youtube-player');
      expect(videoPlayer).toBeInTheDocument();
      expect(within(videoPlayer).getByText(`Video ID: ${mockVideoId}`)).toBeInTheDocument();
    });
  });

  describe('Extracción de ID de YouTube', () => {
    it.each(validYouTubeUrls)('extrae correctamente el ID de la URL %s', (url) => {
      renderModuloViewer({ videoUrl: url });
      
      const videoPlayer = screen.getByTestId('youtube-player');
      expect(videoPlayer).toBeInTheDocument();
      expect(within(videoPlayer).getByText(`Video ID: ${mockVideoId}`)).toBeInTheDocument();
    });
  });

  describe('Estado del video y navegación', () => {
    it('maneja el estado de video completado', () => {
      renderModuloViewer();      const continueButton = screen.getByText('complete_video');
      expect(continueButton).toBeDisabled();

      const videoPlayer = screen.getByTestId('youtube-player');
      const endVideoButton = within(videoPlayer).getByTestId('simulate-video-end');
      fireEvent.click(endVideoButton);      expect(screen.getByText('next_module')).toBeEnabled();
      expect(localStorage.getItem('video-1-completed')).toBe('true');
    });

    it('muestra diferentes mensajes según el módulo actual', () => {
      (useParams as jest.Mock).mockReturnValue({ id: '3' });
      renderModuloViewer();

      const videoPlayer = screen.getByTestId('youtube-player');
      const endVideoButton = within(videoPlayer).getByTestId('simulate-video-end');
      fireEvent.click(endVideoButton);

      expect(screen.getByText('back_to_courses')).toBeInTheDocument();
    });

    it('navega correctamente entre módulos', () => {
      (useParams as jest.Mock).mockReturnValue({ id: '2' });
      localStorage.setItem('video-2-completed', 'true');
      renderModuloViewer();      const prevButton = screen.getByText('prev_module');
      fireEvent.click(prevButton);
      expect(mockNavigate).toHaveBeenCalledWith('/modulo/1');

      const nextButton = screen.getByText('next_module');
      fireEvent.click(nextButton);
      expect(mockNavigate).toHaveBeenCalledWith('/modulo/3');
    });

    it('recupera el estado de video completado desde localStorage', () => {
      localStorage.setItem('video-1-completed', 'true');
      renderModuloViewer();
      expect(screen.getByText('next_module')).toBeEnabled();
    });
  });
});