/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
		authenticated: boolean;
	}
	// interface Platform {}
	interface Session {
		isLoggedIn: boolean;
	}
	// interface Stuff {}
}
