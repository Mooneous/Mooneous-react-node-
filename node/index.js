const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

//express에서 react폴더안쪽의 build폴더를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

app.listen(port, () => {
	console.log(`Server app listening on port ${port}`);
});

app.get('/', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

//어떤 URL에서 새로고침하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
