import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	return (
		<Layout name={'Join'}>
			<input
				type='email'
				value={Email}
				placeholder='이메일 주소를 입력하세요'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd1}
				placeholder='비밀번호를 입력하세요'
				onChange={(e) => setPwd1(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd2}
				placeholder='비밀번호를 재입력하세요'
				onChange={(e) => setPwd2(e.target.value)}
			/>
			<input
				type='text'
				value={Name}
				placeholder='사용자명을 입력하세요'
				onChange={(e) => setName(e.target.value)}
			/>
			<BtnSet>
				<button>가입취소</button>
				<button>회원가입</button>
			</BtnSet>
		</Layout>
	);
}

export default Join;