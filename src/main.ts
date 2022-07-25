import App from './App.svelte';
import { initFirebase } from './firebase';

initFirebase();

const app = new App({ target: document.body });
export default app;
