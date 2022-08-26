import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import firebase from './firebase';
import { useEffect } from 'react';
import { loginUser, logouerUser } from './redux/userSlice';

import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import List from './community/List';
import Detail from './community/Detail';
import Edit from './community/Edit';
import Join from './user/Join';
import Login from './user/Login';

function App() {
	useEffect(() => {
		//auth상태 변화를 감지해서 파라미터로 해당 상태값을 전달
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log('userInfo', userInfo);
		});
	}, []);

	useEffect(() => {
		//firebase의 로그인된 유저정보를 제거해서 로그아웃 처리 (테스트 용도)
		//firebase.auth().signOut();
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header />
			{/*리액트라우터돔5버전은component,6버전은element */}
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				{/* 라우터에 params설정 */}
				<Route path='/detail/:num' element={<Detail />} />
				<Route path='/edit/:num' element={<Edit />} />
				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
