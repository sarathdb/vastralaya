import LocalizedStrings from "react-localization";
import { useLanguageContext } from "./LanguageContext";

const useTranslation = (locale) => {
  const { language } = useLanguageContext();
  let translation = new LocalizedStrings(locale);
  translation.setLanguage(language);
  return translation;
};

export default useTranslation;
