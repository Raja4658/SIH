import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation dictionaries
const resources = {
  en: {
    translation: {
      "app_title": "SolveTogether AI",
      "home": "Home",
      "report_problem": "Report a Problem",
      "ai_analysis": "AI Analysis",
      "matching": "Matching",
      "collaboration": "Collaboration",
      "impact": "Impact",
      "pilot": "Pilot",
      "language": "Language",
      "welcome": "Welcome to SolveTogether AI",
      "something_went_wrong": "Something went wrong.",
      "go_home": "Go Home"
    }
  },
  ta: {
    translation: {
      "app_title": "சால்வ்டுகெதர் AI",
      "home": "முகப்பு",
      "report_problem": "பிரச்சனையை பதிவு செய்",
      "ai_analysis": "AI பகுப்பாய்வு",
      "matching": "பொருத்தம்",
      "collaboration": "ஒத்துழைப்பு",
      "impact": "தாக்கம்",
      "pilot": "முன்னோட்டம்",
      "language": "மொழி",
      "welcome": "சால்வ்டுகெதர் AI-க்கு நல்வரவு",
      "something_went_wrong": "ஏதோ தவறு நடந்துவிட்டது.",
      "go_home": "முகப்புக்குச் செல்"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
