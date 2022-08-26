const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, '../react/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//community,user 전용 라우터 연결
app.use('/api/community', require('./router/communityRouter.js'));
app.use('/api/user', require('./router/userRouter.js'));

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
