import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
	//라우터 파라미터로 전달되는 값을 받음
	const params = useParams();

	const [Detail, setDetail] = useState(null);

	const item = {
		num: params.num,
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

	return (
		<Layout name={'Detail'}>
			{/* Detail스테이트에 값이 있을때에만 컨텐츠 내용 출력 */}
			{Detail && (
				<>
					<DetailWrap>
						<h2>{Detail.title}</h2>
						<p>{Detail.content}</p>
					</DetailWrap>

					<BtnSet>
						<button>
							<Link to={`/edit/${Detail.communityNum}`}>Edit</Link>
						</button>
						<button>Delete</button>
					</BtnSet>
				</>
			)}
		</Layout>
	);
}

export default Detail;
