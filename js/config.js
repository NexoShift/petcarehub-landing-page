/**
 * Configuración de la landing.
 * Cuando la aplicación web esté desplegada, reemplazar APP_URL por su dirección
 * (por ejemplo, la URL de Vercel) para que los botones lleven al login y al registro.
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
  DEFAULT_LANG: 'es',
  SUPPORTED_LANGS: ['es', 'en']
};
