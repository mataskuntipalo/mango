import i18n from 'i18next';
import { Login } from '../pages/Login/language';
import { Register } from '../pages/Register/language';
import { Home } from '../pages/Home/language';

import { initReactI18next } from 'react-i18next';
const namespaceObj: any = {
  Login,
  Register,
  Home,
};

const resources: any = (() => {
  const en: any = {};
  const th: any = {};
  for (const namespace in namespaceObj) {
    en[namespace] = namespaceObj[namespace].en;
    th[namespace] = namespaceObj[namespace].th;
  }
  return { en, th };
})();

const detection = {
  order: ['cookie'],
  lookupCookie: 'language',
};
i18n.use(initReactI18next).init({
  detection,
  resources,
  fallbackLng: 'th',
  supportedLngs: ['th', 'en'],
});
