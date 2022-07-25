// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";

export var firebaseApp: FirebaseApp;
export var analytics: Analytics;

export function initFirebase() {

	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: "AIzaSyC2vcwTrg-_J2kvY5IfdQmMqIyavrzXRXg",
		authDomain: "sprite-atlas-preview.firebaseapp.com",
		projectId: "sprite-atlas-preview",
		storageBucket: "sprite-atlas-preview.appspot.com",
		messagingSenderId: "391884299710",
		appId: "1:391884299710:web:1ce8488195e96495eeadef",
		measurementId: "G-H08SDPFD73"
	};

	// Initialize Firebase

	firebaseApp = initializeApp(firebaseConfig);
	analytics = getAnalytics(firebaseApp);
}