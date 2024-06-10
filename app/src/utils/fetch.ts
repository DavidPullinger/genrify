export default async function _fetch(uri: string) {
	try {
		const response = await fetch("/api" + uri, {
			credentials: 'include',
		})

		return response.ok && response.json();
	} catch (error: any) {
		throw new Error(error);
	}
}
