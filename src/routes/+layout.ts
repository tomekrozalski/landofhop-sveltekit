export async function load({ session }: { session: { isLoggedIn: boolean } }) {
	return { session };
}
