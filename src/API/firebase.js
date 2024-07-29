import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DB_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() { signInWithPopup(auth, provider).catch(console.error) }
export function logout() { signOut(auth) }

export function onUserStateChange(callback) {
	onAuthStateChanged(auth, user => {
		const updatedUser = user ? user : null
		callback(updatedUser)
		localStorage.setItem('user', JSON.stringify(user))
	});
}

export async function addToSubscription(channel, userId) {
	return set(ref(database, `subscription/${userId}/${channel.id}`), channel)
}

export async function unsubscribe(channel, userId) {
	return remove(ref(database, `subscription/${userId}/${channel.id}`), channel)
}

export async function getSubscription(userId) {
	return get(ref(database, `subscription/${userId}`))
		.then(snapshot => {
			const subscription = snapshot.val() || {}
			return subscription
		})
}