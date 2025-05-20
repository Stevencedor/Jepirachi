import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

const PerfilPage = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  if (!user) return null;

  return (
    <Container sx={{ my: 4 }}>
      <Box
        textAlign="center"
        bgcolor="#198754"
        color="white"
        py={4}
        borderRadius="0 0 20px 20px"
        mb={4}
      >
        <Avatar
          src={user.avatar || ''}
          alt={t('profile')}
          sx={{
            width: 120,
            height: 120,
            mx: 'auto',
            mb: 2,
            border: '4px solid white',
          }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <Typography>
          {t(user.role || 'student_role')} - {t(user.program || 'solar_maintenance')}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={3}
        mb={4}
      >
        <Box flex={1}>
          <Card>
            <CardContent>
              <Typography variant="h6">{t('personal_information')}</Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body2">
                <strong>{t('location')}:</strong> {user.location || t('not_available')}
              </Typography>
              <Typography variant="body2">
                <strong>{t('member_since')}:</strong>{' '}
                {user.joined ? dayjs(user.joined).locale(language).format('MMMM YYYY') : t('not_specified')}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box flex={2}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">{t('course_progress')}</Typography>
              <Box mt={2} mb={2}>
                <Box bgcolor="#e0e0e0" height={10} borderRadius={5}>
                  <Box
                    bgcolor="#198754"
                    height={10}
                    width={user.progress || '0%'}
                    borderRadius="5px 0 0 5px"
                  ></Box>
                </Box>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Box textAlign="center">
                  <Typography variant="h6">{user.lessons || '0/0'}</Typography>
                  <Typography variant="body2">{t('lessons')}</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6">{user.practices || '0/0'}</Typography>
                  <Typography variant="body2">{t('practices')}</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6">{user.evaluations || '0/0'}</Typography>
                  <Typography variant="body2">{t('evaluations')}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6">{t('statistics')}</Typography>
            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
              <Box textAlign="center">
                <Typography variant="h5" color="success.main">
                  {user.studyTime || '0h'}
                </Typography>
                <Typography variant="body2">{t('study_time')}</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color="success.main">
                  {user.score || '0%'}
                </Typography>
                <Typography variant="body2">{t('evaluation_average')}</Typography>
              </Box>
            </Stack>
          </Card>

          <Card>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography>{t(user.lastModule || 'module_1_title')}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('completed')}: {
                  user.moduleCompletedMonth && user.moduleCompletedYear
                  ? `${t(user.moduleCompletedMonth)} ${user.moduleCompletedYear}` 
                  : user.moduleCompleted || t('not_registered')
                  }
                </Typography>
              </Box>
              <Button variant="outlined" color="success">
                {t('download_certificate')}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="success" fullWidth>
          {t('sync_data')}
        </Button>
      </Box>
    </Container>
  );
};

export default PerfilPage;