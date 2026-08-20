export const OWNER_EMAIL = 'rafaelmoreirasuyama@gmail.com';
export const SHARK_PATH = '/shark';

export function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

export function isOwnerEmail(email) {
  return normalizeEmail(email) === OWNER_EMAIL;
}

export function sharkRedirectUrl() {
  return `${window.location.origin}${SHARK_PATH}`;
}

export function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}
