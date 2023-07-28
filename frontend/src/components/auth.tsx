import { SyntheticEvent, useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

const Auth = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const signIn = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);
		}
	};
	console.log(auth.currentUser?.email, auth?.currentUser?.photoURL);
	const googleSignIn = async () => {
		try {
			await signInWithPopup(auth, googleAuthProvider);
		} catch (err) {
			console.error(err);
		}
	};
	const logout = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<form onSubmit={signIn}>
				<input
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit">Sign In</button>
			</form>
			<button onClick={googleSignIn}>Signin With Google</button>
			<button onClick={logout}>Signout</button>
		</div>
	);
};

export default Auth;
