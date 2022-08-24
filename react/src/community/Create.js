import Layout from '../common/Layout';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
	const navigate = useNavigate();
	const [Tit, setTit] = useState('');
	const [Con, setCon] = useState('');

	const handleCreate = () => {
		if (Tit.trim() === '' || Con.trim() === '') return alert('제목과 본문을 모두 입력하세요.');

		const item = { title: Tit, content: Con };

		axios
			.post('/api/create', item)
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					alert('글 저장이 완료되었습니다.');
					navigate('/list');
				} else {
					alert('글 저장에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Layout name={'Post'}>
			<label htmlFor='tit'>Title</label>
			<br />

			<input type='text' id='tit' value={Tit} onChange={(e) => setTit(e.target.value)} />
			<br />
			<label htmlFor='con'>Content</label>
			<br />
			<textarea
				name='con'
				id='con'
				cols='30'
				rows='4'
				value={Con}
				onChange={(e) => setCon(e.target.value)}></textarea>
			<br />
			<button onClick={handleCreate}>SEND</button>
		</Layout>
	);
}

export default Create;