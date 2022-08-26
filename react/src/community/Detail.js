import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import styled from 'styled-components';

const DetailWrap = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

const BtnSet = styled.div`
	margin-top: 20px;

	button {
		margin-left: 10px;
	}
`;

function Detail() {
	const navigate = useNavigate();
	//라우터 파라미터로 전달되는 값을 받음
	const params = useParams();
	const user = useSelector((store) => store.user);
	console.log(user);
	const [Detail, setDetail] = useState(null);
	const [Loaded, setLoaded] = useState(false);

	const item = {
		num: params.num,
	};

	const handleDelete = () => {
		if (!window.confirm('정말 삭제하겠습니까')) return;

		axios
			.post('/api/community/delete', item)
			.then((res) => {
				if (res.data.success) {
					alert('게시글이 삭제되었습니다.');
					navigate('/list');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		//params값을 서버쪽에 전달해서 응답받은 데이터를 state에 저장
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
		setLoaded(true);
	}, [Detail]);

	return (
		<Layout name={'Detail'}>
			{/* Detail스테이트에 값이 있을때에만 컨텐츠 내용 출력 */}
			{Detail && Loaded ? (
				<>
					<DetailWrap>
						<h2>{Detail.title}</h2>
						<p>{Detail.content}</p>
						<br />
						<p>Writer : {Detail.writer.displayName}</p>
					</DetailWrap>

					{user.uid === Detail.writer.uid && (
						<BtnSet>
							<button>
								<Link to={`/edit/${Detail.communityNum}`}>Edit</Link>
							</button>
							<button onClick={handleDelete}>Delete</button>
						</BtnSet>
					)}
				</>
			) : (
				<p>Loading...</p>
			)}
		</Layout>
	);
}

export default Detail;
