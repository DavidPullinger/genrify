export default async function _fetch(uri: string) {
	try {
		const response = await fetch("/api" + uri, {
			credentials: 'include',
		})

		return response.ok && response.json();
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}
