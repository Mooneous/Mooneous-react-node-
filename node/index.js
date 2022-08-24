const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

//Post모델 불러옴
const { Post } = require('./model/postSchema.js');
//스키마  모델을 불러오면 자동으로 mongoDB에 빈 컬랙션이 추가됨
//초기 데이터가 들어갈 첫 document를 몽고DB상에서 직접 생성
//{name: 'counter', communityNum: 1} 이때 숫자값을 Int32형식으로 생성
const { Counter } = require('./model/counterSchema.js');

app.use(express.static(path.join(__dirname, '../react/build')));

//클라이언트로부터 넘어오는 데이터를 전달받도록 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Server app listening on port ${port}`);
	mongoose
		.connect(
			'mongodb+srv://Mooneos:!004mongodb@cluster0.ojdh526.mongodb.net/?retryWrites=true&w=majority'
		)
		//접속 성공시
		.then(() => {
			console.log(`Server app listening on port ${port}`);
			console.log('Connecting MongoDB...');
		})
		//접속 실패시
		.catch((err) => {
			console.log(err);
		});
});

//기본 라우터
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
app.get('*', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

//create
app.post('/api/create', (req, res) => {
	console.log(req.body);
	const PostModel = new Post({
		title: req.body.title,
		content: req.body.content,
	});

	PostModel.save()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//read
app.post('/api/read', (req, res) => {
	Post.find()
		.exec()
		.then((doc) => {
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});
