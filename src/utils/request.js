const getData = () => {
	return fetch('https://rcslabs.ru/ttrp1.json', {
		method: 'GET',
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error(`Что-то пошло не так: ${res.status}`);
		})
}
export default getData;