import { NavLink } from 'react-router-dom';

function Header() {
	return (
		<header>
			<h1>
				<NavLink to='/'>LOGO</NavLink>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink to='/list'>Show List</NavLink>
				</li>
				<li>
					<NavLink to='/create'>Write Post</NavLink>
				</li>
			</ul>
		</header>
	);
}

export default Header;
