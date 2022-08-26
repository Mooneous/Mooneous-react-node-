const express = require('express');
const router = express.Router();

//Post모델 불러옴
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');
const { User } = require('../model/userSchema.js');

//create
router.post('/create', (req, res) => {
	const temp = req.body;

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			//기존 게시글 temp객체에 현재 counter 모델의 communityNumr값을 추가
			//{tite, content, uid, communityNum}
			temp.communityNum = doc.communityNum;

			//현재 로그인된 uid값에 해당하는 User모델의 document를 찾차 해당 ObjectID값을 temp객체의 witer키값에 저장
			//{title, content, uid, coummunityNum, writer}
			//해당 writer키값에는 User Model의  objectId에 해당하는 user정보를 통채로 참조시킴
			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					temp.writer = doc._id;

					//위에서 만들어진 최종 temp객체값을 인수로 해서 Postmodel생성
					const PostModel = new Post(temp);
					PostModel.save().then(() => {
						Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } }).then(() =>
							res.json({ success: true })
						);
					});
				});
		})
		.catch((err) => console.log(err));
});

//read
router.post('/read', (req, res) => {
	const sort = {};
	if (req.body.sort === 'new') {
		sort.createdAt = -1;
	}
	if (req.body.sort === 'old') {
		sort.createdAt = 1;
	}

	Post.find()
		.populate('writer')
		.sort(sort)
		.limit(req.body.count)
		.exec()
		.then((doc) => {
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//detail
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.num })
		.populate('writer')
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//edit
router.post('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
	};

	console.log(temp);

	Post.updateOne({ communityNum: req.body.num }, { $set: temp })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//delete
router.post('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.num })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

module.exports = router;
