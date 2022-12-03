import { useEffect } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import cookie from 'js-cookie';

export function useTranslator(pagesName: string[]): {
  t: TFunction<string[]>;
  updateLanguage: (language: string) => void;
  language: string;
} {
  const { t, i18n } = useTranslation(pagesName);
  const updateLanguage = (language: string): void => {
    cookie.set('language', language, { secure: true });
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    if (!cookie.get('language')) updateLanguage(i18n.language);
  }, []);

  return { t, updateLanguage, language: i18n.language };
}
