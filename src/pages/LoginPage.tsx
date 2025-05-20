import { Container, Box, Typography, Tabs, Tab, Paper, Avatar } from '@mui/material';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useLanguage } from '../context/LanguageContext';
import SchoolIcon from '@mui/icons-material/School';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mb: 4 
          }}
        >
          <Avatar 
            sx={{ 
              m: 1, 
              bgcolor: 'success.main',
              width: 56,
              height: 56
            }}
          >
            <SchoolIcon fontSize="large" />
          </Avatar>
          
          <Typography variant="h5" component="h1" gutterBottom>
            {t('welcome_to_jepirachi')}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {t('access_account')}
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            centered
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 'bold'
              }
            }}
          >
            <Tab label={t('login')} {...a11yProps(0)} />
            <Tab label={t('register')} {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <LoginForm />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <RegisterForm />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default LoginPage;
