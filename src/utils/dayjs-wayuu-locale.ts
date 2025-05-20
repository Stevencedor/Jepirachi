import dayjs from 'dayjs';

// Define la configuración regional para Wayuunaiki
const locale = {
  name: 'wayuu',
  weekdays: 'Atataa_Atamana_Atalüshi_Atalüshikua_Atalüshimüin_Jalapuin_Jala\'arain'.split('_'),
  months: 'Kaiuuapaiwaa_Kaiulipünaa_Kaiuishi_Kaiuisiwaa_Juyayaa_Ishiruuna_Jurunpu\'upaa_Joutaleelu_Kottaapünaa_Wakuaipawa_Jashitüraa_Erüleewa'.split('_'),
  weekdaysShort: 'Ata_Ata_Ata_Ata_Ata_Jal_Jal'.split('_'),
  monthsShort: 'Kai_Kai_Kai_Kai_Juy_Ish_Jur_Jou_Kot_Wak_Jas_Erü'.split('_'),
  weekdaysMin: 'At_At_At_At_At_Ja_Ja'.split('_'),
  ordinal: (n: number) => n,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'sulu\'u %s',
    past: 'yapaje\'ewojirawain %s',
    s: 'maalimojuikai',
    m: 'wane minutu',
    mm: '%d minutos',
    h: 'wane ora',
    hh: '%d oras',
    d: 'wane kaikai',
    dd: '%d kaikais',
    M: 'wane kaikat',
    MM: '%d kaikats',
    y: 'wane año',
    yy: '%d años'
  }
};

// Registra la configuración regional
dayjs.locale('wayuu', locale);

export default locale;