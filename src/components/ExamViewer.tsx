import { useState, useEffect } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ExamViewerProps {
  moduleId: string;
  questions: Question[];
  onComplete: (score: number) => void;
}

const ExamViewer = ({ moduleId, questions, onComplete }: ExamViewerProps) => {
  const { t } = useLanguage();
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem(`exam-${moduleId}-attempts`);
    return saved ? parseInt(saved) : 0;
  });

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (currentAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setShowResults(true);
    setAttempts(prev => prev + 1);
    localStorage.setItem(`exam-${moduleId}-attempts`, (attempts + 1).toString());
    localStorage.setItem(`exam-${moduleId}-lastScore`, score.toString());
    
    // Guardar en el historial
    const history = JSON.parse(localStorage.getItem(`exam-${moduleId}-history`) || '[]');
    history.push({
      date: new Date().toISOString(),
      score,
      attempt: attempts + 1
    });
    localStorage.setItem(`exam-${moduleId}-history`, JSON.stringify(history));
    
    onComplete(score);
  };

  const resetExam = () => {
    setCurrentAnswers({});
    setShowResults(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t('module_evaluation')}
      </Typography>
      
      {questions.map((q) => (
        <Paper key={q.id} sx={{ p: 3, my: 2 }}>
          <Typography variant="h6" gutterBottom>
            {q.question}
          </Typography>
          
          <FormControl component="fieldset">
            <RadioGroup
              value={currentAnswers[q.id] ?? ''}
              onChange={(e) => handleAnswer(q.id, parseInt(e.target.value))}
            >
              {q.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                  disabled={showResults}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {showResults && (
            <Box sx={{ mt: 2, p: 2, bgcolor: currentAnswers[q.id] === q.correctAnswer ? '#e8f5e9' : '#ffebee' }}>
              <Typography color={currentAnswers[q.id] === q.correctAnswer ? 'success.main' : 'error.main'}>
                {currentAnswers[q.id] === q.correctAnswer ? t('correct') : t('incorrect')}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {q.explanation}
              </Typography>
            </Box>
          )}
        </Paper>
      ))}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        {!showResults ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={Object.keys(currentAnswers).length !== questions.length}
          >
            {t('submit_answers')}
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={resetExam}
          >
            {t('try_again')}
          </Button>
        )}
      </Box>

      {showResults && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t('score')}: {calculateScore().toFixed(1)}%
        </Typography>
      )}

      <Typography variant="body2" sx={{ mt: 2 }}>
        {t('attempts_made')}: {attempts}
      </Typography>
    </Box>
  );
};

export default ExamViewer;