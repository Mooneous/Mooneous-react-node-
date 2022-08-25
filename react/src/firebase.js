//firebase추가
import firebase from 'firebase/compat/app';
//firebase auth 추가
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCm0z7KzDtslVPAbr557gQ8qwixZXlbN6w',
	authDomain: 'react-august-834bd.firebaseapp.com',
	projectId: 'react-august-834bd',
	storageBucket: 'react-august-834bd.appspot.com',
	messagingSenderId: '1098330583867',
	appId: '1:1098330583867:web:fb219bedf451266e93bd1e',
};

//firebase 초기화 구문으로 수정
firebase.initializeApp(firebaseConfig);

//firebase 내보내기
export default firebase;
