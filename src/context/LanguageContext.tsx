import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import '../utils/dayjs-wayuu-locale';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  es: {
    // Página de inicio
    'welcome_to_jepirachi': 'Bienvenido a Jepirachi',
    'jepirachi_description': 'Jepirachi significa "enseñanza" en Wayuú, reflejando nuestro compromiso con la educación en comunidades energéticamente sostenibles.',
    'solar_maintenance_course': 'Mantenimiento de Paneles Solares',
    'course_description': 'Curso especializado en mantenimiento preventivo y correctivo de sistemas solares.',
    'offline_content': 'Contenido disponible offline',
    'video_tutorials': 'Videos tutoriales prácticos',
    'interactive_evaluations': 'Evaluaciones interactivas',
    'completion_certificate': 'Certificado al completar',
    'start_course': 'Comenzar Curso',
    'coming_soon_title': 'Próximamente',
    'coming_soon_description': 'Estamos desarrollando nuevos cursos adaptados a las necesidades de la comunidad Wayuú y otras regiones de Colombia.',

    // Navegación
    'home': 'Inicio',
    'courses': 'Cursos',
    'profile': 'Perfil',
    'logout': 'Cerrar Sesión',

    // Certificados
    'certificate': 'Certificado',
    'certificate_title': 'Certificado de Finalización',
    'certificate_certifies': 'Se certifica que',
    'certificate_has_completed': 'ha completado satisfactoriamente el curso',
    'completion_date': 'Fecha de finalización',
    'certificate_id': 'ID del Certificado',
    'download_pdf': 'Descargar PDF',
    'share': 'Compartir',
    'verify_certificate': 'Verificar Autenticidad',
    'certificate_share_title': 'Mi Certificado de Jepirachi',
    'certificate_completed_message': '¡He completado el curso de {courseName}!',
    'certificate_link_copied': 'Enlace del certificado copiado al portapapeles',
    'certificate_share_error': 'Error al compartir el certificado',
    'certificate_valid': '✅ Este certificado es válido y fue emitido por nuestra plataforma.',
    'certificate_invalid': '❌ No se pudo verificar la autenticidad de este certificado.',

    // Herramientas de aprendizaje
    'my_notes': 'Mis Notas',
    'write_note_placeholder': 'Escribe una nota...',
    'technical_glossary': 'Glosario Técnico',
    'search_term_placeholder': 'Buscar término...',
    'add_new_term': 'Agregar Nuevo Término',
    'term': 'Término',
    'definition': 'Definición',
    'add': 'Agregar',
    'cancel': 'Cancelar',
    'save': 'Guardar',

    // Módulos y evaluaciones
    'module_1_title': 'Módulo 1: Introducción',
    'module_1_description': 'Conoce los fundamentos del mantenimiento solar.',
    'module_2_title': 'Módulo 2: Mantenimiento Preventivo',
    'module_2_description': 'Aprende a realizar mantenimiento preventivo en sistemas solares.',
    'module_3_title': 'Módulo 3: Mantenimiento Correctivo',
    'module_3_description': 'Descubre cómo solucionar problemas en sistemas solares.',
    'review': "Repasar",
    'continue':'Continuar',
    'coming_soon':'Próximamente',
    'completed':'completado',
    'exam': 'Evaluación',
    'notes': 'Notas',
    'progress': 'Progreso',
    'complete_video': 'Complete el video para continuar',
    'next_module': 'Siguiente módulo',
    'prev_module': 'Módulo anterior',
    'back_to_courses': 'Volver a cursos',
    'correct': '¡Correcto!',
    'incorrect': 'Incorrecto',
    'score': 'Calificación',
    'attempts_made': 'Intentos realizados',
    'submit_answers': 'Enviar respuestas',
    'try_again': 'Intentar nuevamente',
    'module_evaluation': 'Evaluación del Módulo',
    'course_information':'Información del Curso',
    'completed_videos':'Videos completados',
    'passed_evaluations':'Evaluaciones aprobadas',
    'study_time':'Tiempo de estudio',
    'download_offline_content':'Descargar contenido offline',

    // Perfil
    'registered_student':'Estudiante Registrado',
    'personal_information':'Información Personal',
    'location':'Ubicación',
    'member_since':'Miembro desde',
    'not_available':'No disponible',
    'not_specified':'No especificado',
    'course_progress':'Progreso del curso',
    'lessons':'Lecciones',
    'practices':'Prácticas',
    'evaluations':'Evaluaciones',
    'statistics':'Estadísticas',
    'evaluation_average':'Promedio de Evaluaciones',
    'not_registered':'No registrado',
    'download_certificate':'Descargar certificado',
    'sync_data':'Sincronizar datos',
    'student_role':'Estudiante',
    'solar_maintenance':'Mantenimiento de Paneles Solares',

    // Meses
    'january':'Enero',
    'february':'Febrero',
    'march':'Marzo',
    'april':'Abril',
    'may':'Mayo',
    'june':'Junio',
    'july':'Julio',
    'august':'Agosto',
    'september':'Septiembre',
    'october':'Octubre',
    'november':'Noviembre',
    'december':'Diciembre',

  },
  en: {
    // Home page
    'welcome_to_jepirachi': 'Welcome to Jepirachi',
    'jepirachi_description': 'Jepirachi means "teaching" in Wayuú, reflecting our commitment to education in energy-sustainable communities.',
    'solar_maintenance_course': 'Solar Panel Maintenance',
    'course_description': 'Specialized course in preventive and corrective maintenance of solar systems.',
    'offline_content': 'Content available offline',
    'video_tutorials': 'Practical video tutorials',
    'interactive_evaluations': 'Interactive evaluations',
    'completion_certificate': 'Completion certificate',
    'start_course': 'Start Course',
    'coming_soon_title': 'Coming Soon',
    'coming_soon_description': 'We are developing new courses adapted to the needs of the Wayuú community and other regions of Colombia.',

    // Navigation
    'home': 'Home',
    'courses': 'Courses',
    'profile': 'Profile',
    'logout': 'Logout',

    // Certificates
    'certificate': 'Certificate',
    'certificate_title': 'Certificate of Completion',
    'certificate_certifies': 'This certifies that',
    'certificate_has_completed': 'has successfully completed the course',
    'completion_date': 'Completion date',
    'certificate_id': 'Certificate ID',
    'download_pdf': 'Download PDF',
    'share': 'Share',
    'verify_certificate': 'Verify Authenticity',
    'certificate_share_title': 'My Jepirachi Certificate',
    'certificate_completed_message': 'I have completed the {courseName} course!',
    'certificate_link_copied': 'Certificate link copied to clipboard',
    'certificate_share_error': 'Error sharing certificate',
    'certificate_valid': '✅ This certificate is valid and was issued by our platform.',
    'certificate_invalid': '❌ Could not verify the authenticity of this certificate.',

    // Learning tools
    'my_notes': 'My Notes',
    'write_note_placeholder': 'Write a note...',
    'technical_glossary': 'Technical Glossary',
    'search_term_placeholder': 'Search term...',
    'add_new_term': 'Add New Term',
    'term': 'Term',
    'definition': 'Definition',
    'add': 'Add',
    'cancel': 'Cancel',
    'save': 'Save',

    // Modules and evaluations
    'module_1_title': 'Module 1: Introduction',
    'module_1_description': 'Know the fundamentals of solar maintenance.',
    'module_2_title': 'Module 2: Preventive Maintenance',
    'module_2_description': 'Learn how to perform preventive maintenance on solar systems.',
    'module_3_title': 'Module 3: Corrective Maintenance',
    'module_3_description': 'Discover how to troubleshoot issues in solar systems.',
    'review': "Review",
    'continue':'Continue',
    'coming_soon':'Coming Soon',
    'completed':'Completed',
    'exam': 'Exam',
    'notes': 'Notes',
    'progress': 'Progress',
    'complete_video': 'Complete the video to continue',
    'next_module': 'Next module',
    'prev_module': 'Previous module',
    'back_to_courses': 'Back to courses',
    'correct': 'Correct!',
    'incorrect': 'Incorrect',
    'score': 'Score',
    'attempts_made': 'Attempts made',
    'submit_answers': 'Submit answers',
    'try_again': 'Try again',
    'module_evaluation': 'Module Evaluation',
    'course_information':'Course information',
    'completed_videos':'Completed videos',
    'passed_evaluations':'Passed evaluations',
    'study_time':'Study time',
    'download_offline_content':'Download offline content',

    // Profile
    'registered_student':'Registered Student',
    'personal_information':'Personal Information',
    'location':'Location',
    'member_since':'Member Since',
    'not_available':'Not Available',
    'not_specified':'Not Specified',
    'course_progress':'Course Progress',
    'lessons':'Lessons',
    'practices':'Practices',
    'evaluations':'Evaluations',
    'statistics':'Statistics',
    'evaluation_average':'Evaluation Average',
    'not_registered':'Not Registered',
    'download_certificate':'Download Certificate',
    'sync_data':'Sync Data',
    'student_role':'Student',
    'solar_maintenance':'Solar Panel Maintenance',

    // Months
    'january': 'January',
    'february': 'February',
    'march': 'March',
    'april': 'April',
    'may': 'May',
    'june': 'June',
    'july': 'July',
    'august': 'August',
    'september': 'September',
    'october': 'October',
    'november': 'November',
    'december': 'December',
  },
  wayuu:{
    //Inicio
    'welcome_to_jepirachi': 'Anakuaipaa Jepirachi',
    'jepirachi_description': "Jepirachi süchikanajüin washirüin sümaa ekirajaa sulu'u kojutuin süchikua katsüinsü sünain wayuu nóümainka.",
    'solar_maintenance_course': 'Akaliijaa Panela Solar',
    'course_description': 'Ekirajawaa sulu\'u akaliijia kasa atüjalaa süpüla yootoo solar.',
    'offline_content': 'Atüjalaa süpüla waneepia kamaiwaaka',
    'video_tutorials': 'Ekirajawaa sulu\'u akuhua\'ipa video',
    'interactive_evaluations': 'Asakiiraa sa\'aka niira\'akat',
    'completion_certificate': 'Karalouta süpüla kekiin',
    'start_course': 'Pepirawaa ekirajawaa',
    'coming_soon_title': 'Arütka mapeena',
    'coming_soon_description': 'Wekirajüin wane akua\'ipa ekirajawaa akusha\'atünüsü sümüin tü wayuu sulu\'u Colombia.',

    // Navegación
    'home': 'Miichi',
    'courses': 'Ekirajawaa',
    'profile': 'Tachikua',
    'logout': 'Ojuitaa',

    // Certificados
    'certificate': 'Karalouta',
    'certificate_title': 'Karalouta Süpüla Kekiin',
    'certificate_certifies': 'Tüü karaloutakat süchikajaa',
    'certificate_has_completed': 'kettaasü ma\'in suulia tü ekirajawaa',
    'completion_date': 'Ka\'i süpüla kettaasü',
    'certificate_id': 'ID tü karaloutakat',
    'download_pdf': 'Anaajaaa Karalouta',
    'share': 'Aapajirraa',
    'verify_certificate': 'Analirajaa Shiimüin',
    'certificate_share_title': 'Takaralouta Jepirachi',
    'certificate_completed_message': 'Kettaasü taya suulia tü ekirajawaa {courseName}!',
    'certificate_link_copied': 'Süshajünüin shii\'ira tü karaloutakat',
    'certificate_share_error': 'Mojusü sünain aapajirraa tü karaloutakat',
    'certificate_valid': '✅ Shiimüin tüü karaloutakat otta sünainjee waya ekirajüliikana.',
    'certificate_invalid': '❌ Isalaa analirajünüin shiimüin tü karaloutakat.',
    
    // Herramientas de aprendizaje
    'my_notes': 'Tashajala',
    'write_note_placeholder': 'Ashajaa wane...',
    'technical_glossary': 'Pütchi Katsüinsü',
    'search_term_placeholder': 'Achajaa pütchi...',
    'add_new_term': 'Aikakaa Wane Pütchi',
    'term': 'Pütchi',
    'definition': 'Süchikuamaajatü',
    'add': 'Aikakaa',
    'cancel': 'Nnojoluu',
    'save': 'Anaajaa',

    // Módulos y evaluaciones
    'module_1_title': 'Asakajawaa 1: Süchikuamaajatü',
    'module_1_description': 'Püshajaa tü katsüinsü sulu\'u akaliijaa panela solar.',
    'module_2_title': 'Asakajawaa 2: Akaliijaa Sümaiwa',
    'module_2_description': 'Pütüjaa sünain akaliijaa sümaiwa tü yootoo solar.',
    'module_3_title': 'Asakajawaa 3: Akaliijaa Sumojujaa',
    'module_3_description': 'Pütüjaa sünain akaliijaa sumojujaa tü yootoo solar.',
    'review': 'Aashajaawaa',
    'continue': 'Ayaawataa',
    'coming_soon': 'Arütka Mapeena',
    'completed': 'Kettaasü',
    'exam': 'Asakajawaa',
    'notes': 'Ashajuushi',
    'progress': 'Ayaawatüsü',
    'complete_video': 'Püsawataa tü video süpüla ayaawataa',
    'next_module': 'Waneepia asakajawaa',
    'prev_module': 'Eera asakajawaa',
    'back_to_courses': 'Ale\'ejaa sulu\'umüin ekirajawaa',
    'correct': 'Anasü!',
    'incorrect': 'Mojusü',
    'score': 'Akaliiraa',
    'attempts_made': 'Akaisa\'awaa',
    'submit_answers': 'Apütaa pütüjaka',
    'try_again': 'Püsawata\'a waneepia',
    'module_evaluation': 'Asakajiraa sulu\'u Asakajawaa',
    'course_information': 'Süchikua Ekirajawaa',
    'completed_videos': 'Videos kettaasü',
    'passed_evaluations': 'Asakajiraa anasü',
    'study_time': 'Ka\'i süpüla ekirajawaa',
    'download_offline_content': 'Anaajaa ekirajawaa süpüla kamaiwa',

    // Perfil
    'registered_student': 'Eirajünüshi Ashajünüshi',
    'personal_information': 'Püchikua',
    'location': 'Püchimaajachi',
    'member_since': 'Püyalajüin suulia',
    'not_available': 'Nnojotsu',
    'not_specified': 'Nnojotsü Süchikua',
    'course_progress': 'Ekirajawaa Ayaawatüsü',
    'lessons': 'Ekirajaa',
    'practices': 'Asawa\'a',
    'evaluations': 'Asakajiraa',
    'statistics': 'Akaliiraa',
    'evaluation_average': 'Wattapüna Asakajiraa',
    'not_registered': 'Nnojoishi Ashajünüin',
    'download_certificate': 'Anaajaa Karalouta',
    'sync_data': 'Awalakajaa Süchikua',
    'student_role': 'Eirajünüshi',
    'solar_maintenance': 'Akaliijaa Panela Solar',

    // Meses
    'january': 'Kaiuuapaiwaa',
    'february': 'Kaiulipünaa',
    'march': 'Kaiuishi',
    'april': 'Kaiuisiwaa',
    'may': 'Juyayaa',
    'june': 'Ishiruuna',
    'july': 'Jurunpu\'upaa',
    'august': 'Joutaleelu',
    'september': 'Kottaapünaa',
    'october': 'Wakuaipawa',
    'november': 'Jashitüraa',
    'december': 'Erüleewa',
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>(() => {
    // Intenta recuperar el idioma guardado, o usa el predeterminado
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      // Si la clave existe en el idioma actual, úsala
      if (translations[language]?.[key]) {
        return translations[language][key];
      }
      
      // Fallback a español si no se encuentra
      if (translations.es[key]) {
        return translations.es[key];
      }
      
      // Si no existe en ninguna traducción, devuelve la clave
      return key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


/*export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('preferred-language');
    return saved || 'es';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};*/

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};