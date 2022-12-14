import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Edit() {
	const navigate = useNavigate();
	const params = useParams();
	const [Detail, setDetail] = useState({});
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');
	const [Loaded, setLoaded] = useState(false);

	const handleUpdate = () => {
		if (Title === '' || Content === '') return alert('모든항목을 입력하세요');

		const item = {
			title: Title,
			content: Content,
			num: params.num,
		};

		console.log(item);

		axios.post('/api/community/edit', item).then((res) => {
			if (res.data.success) {
				alert('글수정이 완료되었습니다.');
				navigate(`/detail/${params.num}`);
			} else {
				alert('글수정에 실패했습니다.');
			}
		});
	};

	useEffect(() => {
		const item = { num: params.num };
		axios
			.post('/api/community/detail', item)
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.detail);
					setDetail(res.data.detail);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		setTitle(Detail.title);
		setContent(Detail.content);
		setLoaded(true);
	}, [Detail]);

	return (
		<Layout name={'Edit'}>
			{Loaded ? (
				<>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						value={Title || ''}
						id='title'
						onChange={(e) => setTitle(e.target.value)}
					/>

					<label htmlFor='content'>Content</label>
					<textarea
						name='content'
						id='content'
						cols='30'
						rows='3'
						value={Content || ''}
						onChange={(e) => setContent(e.target.value)}></textarea>

					<BtnSet>
						<button onClick={() => navigate(-1)}>cancel</button>
						<button onClick={handleUpdate}>update</button>
					</BtnSet>
				</>
			) : (
				<p>Loading...</p>
			)}
		</Layout>
	);
}

export default Edit;
