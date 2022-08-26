//npm i @reduxjs/toolkit
//npm i react-redux
import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Login() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd, setPwd] = useState('');
	const [Err, setErr] = useState('');

	const handleLogin = async () => {
		if (!(Email && Pwd)) return alert('모든값을 입력하세요.');

		try {
			//firebase쪽에 인수로 전달받은 이메일, 비번정보에 해당하는 유저가 있는지 확인후 있으면 상태값 변경요청하는 함수
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
			navigate('/');
		} catch (err) {
			console.log(err.code);

			if (err.code === 'auth/user-not-found') setErr('존재하지 않는 이메일입니다.');
			else if (err.code === 'auth/wrong-password') setErr('비밀번호 정보가 일치하지 않습니다.');
			else setErr('로그인에 실패했습니다.');
		}
	};

	return (
		<Layout name={'Login'}>
			<input
				type='email'
				value={Email}
				placeholder='이메일주소를 입력하세요.'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd}
				placeholder='비밀번호를 입력하세요'
				onChange={(e) => setPwd(e.target.value)}
			/>

			<BtnSet>
				<button onClick={handleLogin}>LOGIN</button>
				<button onClick={() => navigate('/join')}>JOIN</button>
			</BtnSet>
			{Err !== '' && <p>{Err}</p>}
		</Layout>
	);
}

export default Login;
