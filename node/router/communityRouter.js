const express = require('express');
const router = express.Router();

//Post모델 불러옴
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');

//create
router.post('/create', (req, res) => {
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
router.post('/read', (req, res) => {
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

//detail
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.num })
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

module.exports = router;
