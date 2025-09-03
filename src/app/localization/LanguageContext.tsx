import React, { createContext, useContext, useState } from "react";

export const LanguageContext = createContext({
  language: "en-US",
  changeLanguage: (lang) => {console.log(lang);
  },
});

export const useLanguageContext = () => useContext(LanguageContext);

const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("en-US");
  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage: (lang) => setLanguage(lang) }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
