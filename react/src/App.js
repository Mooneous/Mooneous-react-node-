import axios from 'axios';
import { useEffect } from 'react';

function App() {
	const item = {
		name: 'Emily',
	};

	useEffect(() => {
		axios
			.post('api/send', item)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <h1>Hello</h1>;
}

export default App;
