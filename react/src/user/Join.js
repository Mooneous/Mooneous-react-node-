import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../firebase';
import axios from 'axios';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd1 && Pwd2)) return alert('모든 양식을 입력하세요.');
		if (Pwd1 !== Pwd2) return alert('비밀번호 2개를 동일하게 입력하세요.');
		if (Pwd1.length < 6) return alert('비밀번호는 최소 6글자 이상 입력하세요.');

		let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);
		await createdUser.user.updateProfile({ displayName: Name });

		console.log(createdUser.user);
		navigate('/login');

		//firebase로부터 인증정보값이 넘어오면 해당 정보값을 다시 객체에 옮겨담기
		const item = {
			email: createdUser.user.multiFactor.user.email,
			displayName: createdUser.user.multiFactor.user.displayName,
			uid: createdUser.user.multiFactor.user.uid,
		};
		firebase.auth().signOut();

		//서버쪽에 post요청 보내기
		axios.post('/api/user/join', item).then((res) => {
			if (res.data.success) {
				alert('회원가입이 완료되었습니다.');
				navigate('/login');
			} else {
				return alert('회원가입에 실패했습니다.');
			}
		});
	};

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
				<button onClick={handleJoin}>회원가입</button>
			</BtnSet>
		</Layout>
	);
}

export default Join;
