// firebase.ts (DEV MODE – Firebase disabled)
console.warn('🔥 Firebase is disabled for local front-end work.');

export const app = null;
export const db = null;
export const collection = () => null;
export const addDoc = async () => null;
export const serverTimestamp = () => null;

export default function FirebaseUtil() {
  return null;
} 