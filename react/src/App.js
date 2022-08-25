import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import List from './community/List';
import Detail from './community/Detail';

function App() {
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
			</Routes>
		</>
	);
}

export default App;
