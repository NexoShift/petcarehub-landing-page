/**
 * Landing configuration.
 *
 * APP_URL: address of the deployed web application. While it is empty, the
 * login and sign-up buttons scroll to the plans section.
 *
 * VIDEOS: links of the "About the product" and "About the team" videos.
 * Paste the YouTube link as it is (https://www.youtube.com/watch?v=..., https://youtu.be/...)
 * or any embed link. While a link is empty, the section shows a "coming soon" placeholder.
 */
window.PETCARE_CONFIG = {
    APP_URL: 'https://petcarehub-web-application.pages.dev',
    ROUTES: {
        'login': '/login',
        'register': '/sign-up',
        'plan-owner': '/register?role=owner&plan=owner',
        'plan-pro': '/register?role=vet&plan=professional',
        'plan-clinic': '/register?role=vet&plan=clinic'
    },
    VIDEOS: {
        product: 'https://www.youtube.com/watch?v=RGIPiUQ4nq8',
        team: ''
    },
    DEFAULT_LANG: 'es',
    SUPPORTED_LANGS: ['es', 'en']
};
