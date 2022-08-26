import Layout from '../common/Layout';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Create() {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const [Tit, setTit] = useState('');
	const [Con, setCon] = useState('');

	const handleCreate = () => {
		if (Tit.trim() === '' || Con.trim() === '') return alert('제목과 본문을 모두 입력하세요.');

		//store에서 가져온 현재 로그인되노 사용자의 고유아이디값을 객체에 추가해서 서버요청
		const item = { title: Tit, content: Con, uid: user.uid };

		axios
			.post('/api/community/create', item)
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
			<input type='text' id='tit' value={Tit} onChange={(e) => setTit(e.target.value)} />

			<label htmlFor='con'>Content</label>
			<textarea
				name='con'
				id='con'
				cols='30'
				rows='4'
				value={Con}
				onChange={(e) => setCon(e.target.value)}></textarea>

			<button onClick={handleCreate}>SEND</button>
		</Layout>
	);
}

export default Create;
