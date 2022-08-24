import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';

function Detail() {
	//라우터 파라미터로 전달되는 값을 받음
	const params = useParams();
	console.log(params);

	return <Layout name={'Detail'}>Detail</Layout>;
}

export default Detail;
