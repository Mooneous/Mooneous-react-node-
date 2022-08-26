import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.article`
	width: 100%;
	padding: 30px 40px;
	background: #fff;
	margin-bottom: 50px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.01);
`;

function List() {
	const [List, setList] = useState([]);
	const [Loaded, setLoaded] = useState(false);
	const [Sort, setSort] = useState('new');

	useEffect(() => {
		const item = {
			sort: Sort,
		};
		axios
			.post('/api/community/read', item)
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.communityList);
					setList(res.data.communityList);
				}
			})
			.catch((err) => console.log(err));
	}, [Sort]);

	useEffect(() => {
		setLoaded(true);
	}, [List]);

	return (
		<Layout name={'List'}>
			<button onClick={() => setSort('new')}>최신순</button>
			<button onClick={() => setSort('old')}>게시순</button>
			{Loaded ? (
				List.map((post) => {
					return (
						<Item key={post._id}>
							<h2>
								<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
							</h2>
							<br />
							<p>Writer : {post.writer.displayName}</p>
							<p>Posted : {post.createdAt.split('T')[0]}</p>
							{post.createdAt !== post.updatedAt && <p>Updated : {post.updatedAt.split('T')[0]}</p>}
						</Item>
					);
				})
			) : (
				<p>Loading...</p>
			)}
		</Layout>
	);
}

export default List;
