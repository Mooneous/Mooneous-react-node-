import Layout from './Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostList = styled.article`
	width: 100px;
	padding: 30px;
	background: #fff;
	margin-bottom: 30px;
	box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.05);
`;

function Main() {
	const [List, setList] = useState([]);
	const [Loaded, setLoaded] = useState(false);
	useEffect(() => {
		const item = { count: 3 };

		axios
			.post('/api/community/read', item)
			.then((res) => {
				if (res.data.success) {
					setList(res.data.communityList);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout name={'Main'}>
			{List.map((post) => {
				return (
					<PostList key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
					</PostList>
				);
			})}
		</Layout>
	);
}

export default Main;
