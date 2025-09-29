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
      logout: "Вийти",
      name: "Ім'я",
      email: "Електронна пошта",
      password: "Пароль",
      phone: "Телефон",
      submit: "Надіслати",
      message: "Повідомлення",
      add_to_cart: "Додати в кошик",
      price: "Ціна",
      category: "Категорія",
      description: "Опис",
      total: "Загалом",
      checkout: "Оформити замовлення",
      contact_us: "Зв'язатися з нами"
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
      logout: "Logout",
      name: "Name",
      email: "Email",
      password: "Password",
      phone: "Phone",
      submit: "Submit",
      message: "Message",
      add_to_cart: "Add to Cart",
      price: "Price",
      category: "Category",
      description: "Description",
      total: "Total",
      checkout: "Checkout",
      contact_us: "Contact Us"
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