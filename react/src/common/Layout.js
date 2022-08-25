import styled from 'styled-components';

const MainWrap = styled.main`
	width: calc(100% - 350px);
	min-height: 100vh;
	float: right;
	> .inner {
		width: 100%;
		padding: 60px;
		h1 {
			font: normal 40px/1 'arial';
			color: #444;
			margin-bottom: 30px;
		}
	}
`;

function Layout({ children, name }) {
	return (
		<MainWrap>
			<div className='inner'>
				<h1>{name}</h1>
				<section>{children}</section>
			</div>
		</MainWrap>
	);
}

export default Layout;
