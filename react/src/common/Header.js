import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from '../firebase';

const HeaderWrap = styled.header`
	width: 350px;
	height: 100vh;
	background: #222;
	position: fixed;
	top: 0;
	left: 0;
	padding: 50px;
`;
const Logo = styled.h1`
	margin-bottom: 40px;
	a {
		font: 50px/1 'arial';
		color: #fff;
	}
`;
const Gnb = styled.ul`
	a {
		display: block;
		padding: 10px;
		font: bold 16px/1 'arial';
		color: #bbb;
		&:hover {
			color: hotpink;
		}
	}
`;
const Util = styled.ul`
	position: absolute;
	bottom: 50px;
	left: 50px;
	display: flex;
	li {
		margin-right: 20px;
		a {
			font: 14px/1 'arial';
			color: #777;
		}
	}
`;
const Util2 = styled.div`
	position: absolute;
	bottom: 50px;
	left: 50px;
	p {
		color: #777;
	}
	span {
		color: red;
		cursor: pointer;
	}
`;

function Header() {
	const navigate = useNavigate();
	const activeStyle = { color: 'hotpink' };
	const user = useSelector((store) => store.user);
	console.log(user);

	return (
		<HeaderWrap>
			<Logo>
				<NavLink to='/'>LOGO</NavLink>
			</Logo>

			<Gnb>
				<li>
					<NavLink to='/list' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
						Show List
					</NavLink>
				</li>
				{/* 로그인 상태에서만 게시글 입력 메뉴 출력 */}
				{user.accessToken !== '' && (
					<li>
						<NavLink to='/create' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
							Write Post
						</NavLink>
					</li>
				)}
			</Gnb>

			{user.accessToken === '' ? (
				//로그아웃 상태일때
				<Util>
					<li>
						<NavLink to='/login' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink to='/join' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
							Join
						</NavLink>
					</li>
				</Util>
			) : (
				//로그인 상태일때
				<Util2>
					<span
						onClick={() => {
							firebase.auth().signOut();
							alert('로그아웃 되었습니다. 메인페이지로 이동합니다.');
							navigate('/');
						}}>
						Logout
					</span>
					<br />
					<p>{`${user.displayName}님 반갑습니다.`}</p>
				</Util2>
			)}
		</HeaderWrap>
	);
}

export default Header;
