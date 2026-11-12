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
    APP_URL: '',
    ROUTES: {
        'login': '/login',
        'register-owner': '/register?role=owner',
        'register-vet': '/register?role=vet',
        'plan-owner': '/register?role=owner&plan=owner',
        'plan-pro': '/register?role=vet&plan=professional',
        'plan-clinic': '/register?role=vet&plan=clinic'
    },
    VIDEOS: {
        product: '',
        team: ''
    },
    DEFAULT_LANG: 'es',
    SUPPORTED_LANGS: ['es', 'en']
};
