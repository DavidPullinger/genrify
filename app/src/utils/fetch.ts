const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default async function _fetch(uri: string) {
	try {
		const response = await fetch(backendUrl + uri, {
			credentials: 'include',
		})

		return response.ok && response.json();
	} catch (error: any) {
		throw new Error(error);
	}
}
