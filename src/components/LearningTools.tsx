import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useLanguage } from '../context/LanguageContext';

interface Note {
  id: string;
  moduleId: string;
  content: string;
  timestamp: string;
}

interface GlossaryTerm {
  term: string;
  definition: string;
}

const defaultGlossary: GlossaryTerm[] = [
  {
    term: "Panel Solar",
    definition: "Dispositivo que convierte la luz solar en energía eléctrica mediante el efecto fotovoltaico."
  },
  {
    term: "Inversor",
    definition: "Dispositivo que convierte la corriente continua (DC) generada por los paneles solares en corriente alterna (AC)."
  },
  {
    term: "Batería Solar",
    definition: "Dispositivo que almacena la energía eléctrica generada por los paneles solares para su uso posterior."
  }
];

interface LearningToolsProps {
  moduleId: string;
}

const LearningTools = ({ moduleId }: LearningToolsProps) => {
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(`module-${moduleId}-notes`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newNote, setNewNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTermDialog, setShowAddTermDialog] = useState(false);
  const [newTerm, setNewTerm] = useState({ term: '', definition: '' });
  const [glossary, setGlossary] = useState<GlossaryTerm[]>(() => {
    const saved = localStorage.getItem('glossary-terms');
    return saved ? JSON.parse(saved) : defaultGlossary;
  });

  useEffect(() => {
    localStorage.setItem(`module-${moduleId}-notes`, JSON.stringify(notes));
  }, [notes, moduleId]);

  useEffect(() => {
    localStorage.setItem('glossary-terms', JSON.stringify(glossary));
  }, [glossary]);

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      moduleId,
      content: newNote,
      timestamp: new Date().toISOString()
    };
    
    setNotes(prev => [...prev, note]);
    setNewNote('');
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleAddTerm = () => {
    if (!newTerm.term.trim() || !newTerm.definition.trim()) return;
    
    setGlossary(prev => [...prev, newTerm]);
    setNewTerm({ term: '', definition: '' });
    setShowAddTermDialog(false);
  };

  const filteredGlossary = glossary.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('my_notes')}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder={t('write_note_placeholder')}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={addNote}
            disabled={!newNote.trim()}
          >
            {t('save')}
          </Button>
        </Box>

        <List>
          {notes.map((note) => (
            <ListItem
              key={note.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteNote(note.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={note.content}
                secondary={new Date(note.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('technical_glossary')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder={t('search_term_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setShowAddTermDialog(true)}
          >
            {t('add')}
          </Button>
        </Box>

        {filteredGlossary.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">{item.term}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.definition}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Dialog open={showAddTermDialog} onClose={() => setShowAddTermDialog(false)}>
        <DialogTitle>{t('add_new_term')}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label={t('term')}
            margin="normal"
            value={newTerm.term}
            onChange={(e) => setNewTerm(prev => ({ ...prev, term: e.target.value }))}
          />
          <TextField
            fullWidth
            label={t('definition')}
            margin="normal"
            multiline
            rows={3}
            value={newTerm.definition}
            onChange={(e) => setNewTerm(prev => ({ ...prev, definition: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddTermDialog(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleAddTerm} variant="contained" color="primary">
            {t('add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LearningTools;