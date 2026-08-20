const COOLDOWN_MS = 20 * 60 * 1000;

function storageKey(kind) {
  return `travessia-form-lock:${kind}`;
}

export function remainingLockMinutes(kind) {
  try {
    const raw = window.localStorage.getItem(storageKey(kind));
    if (!raw) return 0;
    const data = JSON.parse(raw);
    const left = Number(data?.until || 0) - Date.now();
    if (left <= 0) {
      window.localStorage.removeItem(storageKey(kind));
      return 0;
    }
    return Math.ceil(left / 60000);
  } catch {
    return 0;
  }
}

export function isFormLocked(kind) {
  return remainingLockMinutes(kind) > 0;
}

export function lockForm(kind) {
  window.localStorage.setItem(
    storageKey(kind),
    JSON.stringify({ until: Date.now() + COOLDOWN_MS })
  );
}

export function assertFormUnlocked(kind) {
  const minutes = remainingLockMinutes(kind);
  if (minutes > 0) {
    throw new Error(`Aguarde ${minutes} min para enviar outra solicitação.`);
  }
}
