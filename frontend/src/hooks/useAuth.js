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
      contact_us: "Зв'язатися з нами",
      admin: "Адмін",
      all_products: "Всі продукти",
      anti_aging: "Антивік",
      hydration: "Зволоження",
      brightening: "Освітлення",
      consultation: "Консультація",
      view_products: "Переглянути препарати",
      get_consultation: "Отримати консультацію",
      why_choose_us: "Чому обирають нас",
      scientific_approach: "Науковий підхід",
      own_production: "Власне виробництво",
      proven_effectiveness: "Доведена ефективність",
      professional_support: "Професійна підтримка",
      fast_delivery: "Швидка доставка",
      premium_quality: "Преміум якість",
      ready_to_cooperate: "Готові розпочати співпрацю?",
      contact_with_us: "Зв'язатися з нами",
      view_catalog: "Переглянути каталог",
      write_to_us: "Написати нам",
      anti_aging_preparations: "Антивікові препарати",
      moisturizing_agents: "Зволожуючі засоби",
      brightening_serums: "Освітлювальні серуми",
      recovery_complexes: "Відновлювальні комплекси",
      all_preparations: "Всі препарати",
      for_clients: "Клієнтам",
      about_company: "Про компанію",
      delivery_payment: "Доставка та оплата",
      quality_guarantee: "Гарантія якості",
      cooperation_terms: "Умови співпраці"
    }
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать",
      products: "Препараты",
      about: "О нас",
      contact: "Контакты",
      login: "Войти",
      register: "Регистрация",
      logout: "Выйти",
      name: "Имя",
      email: "Электронная почта",
      password: "Пароль",
      phone: "Телефон",
      submit: "Отправить",
      message: "Сообщение",
      add_to_cart: "Добавить в корзину",
      price: "Цена",
      category: "Категория",
      description: "Описание",
      total: "Всего",
      checkout: "Оформить заказ",
      contact_us: "Связаться с нами",
      admin: "Админ",
      all_products: "Все продукты",
      anti_aging: "Анти-эйдж",
      hydration: "Увлажнение",
      brightening: "Осветление",
      consultation: "Консультация",
      view_products: "Посмотреть препараты",
      get_consultation: "Получить консультацию",
      why_choose_us: "Почему выбирают нас",
      scientific_approach: "Научный подход",
      own_production: "Собственное производство",
      proven_effectiveness: "Доказанная эффективность",
      professional_support: "Профессиональная поддержка",
      fast_delivery: "Быстрая доставка",
      premium_quality: "Премиум качество",
      ready_to_cooperate: "Готовы начать сотрудничество?",
      contact_with_us: "Связаться с нами",
      view_catalog: "Посмотреть каталог",
      write_to_us: "Написать нам",
      anti_aging_preparations: "Антивозрастные препараты",
      moisturizing_agents: "Увлажняющие средства",
      brightening_serums: "Осветляющие сыворотки",
      recovery_complexes: "Восстановительные комплексы",
      all_preparations: "Все препараты",
      for_clients: "Клиентам",
      about_company: "О компании",
      delivery_payment: "Доставка и оплата",
      quality_guarantee: "Гарантия качества",
      cooperation_terms: "Условия сотрудничества"
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