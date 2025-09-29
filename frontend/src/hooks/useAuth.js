import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  uk: {
    translation: {
      welcome: "Ласкаво просимо",
      products: "Препарати",
      about: "Про нас",
      contact: "Контакти",
      login: "Увійти",
      register: "Реєстрація",
      logout: "Вийти"
    }
  },
  en: {
    translation: {
      welcome: "Welcome",
      products: "Products",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Register",
      logout: "Logout"
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uk",
    interpolation: {
      escapeValue: false
    }
  })

export default i18n