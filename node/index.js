const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

//Post모델 불러옴
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');

app.use(express.static(path.join(__dirname, '../react/build')));

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
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

//create
app.post('/api/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			//위에서 생성한 모델을 DB에 저장
			PostModel.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } }).then(() =>
					res.json({ success: true })
				);
			});
		})
		.catch((err) => console.log(err));
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
