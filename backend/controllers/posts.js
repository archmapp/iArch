const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  console.log(req.body, req.userData.userId);
  let post = Object.assign({}, req.body, { creator: req.userData.userId });
                                  // from check-auth.js

  new Post(post)
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: "データが入力されました",
        post: {
          ...createdPost,
          _id: createdPost._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "データを作成出来ませんでした！"
      });
    });
};

exports.updatePost = (req, res, next) => {
  let post = Object.assign({}, req.body, { creator: req.userData.userId });
                                  // from check-auth.js
  post = new Post(post);
  //  const post = new Post({
  //    _id: req.body._id,
  //    title: req.body.title,
  //    content: req.body.content,
  //    creator: req.userData.userId // from check-auth.js
  //  });
  Post.updateOne({ _id: req.params._id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "データを更新しました" });
      } else {
        res.status(401).json({ message: "許可されていません (updateOne)！" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "データを更新できませんでした！"
      });
    });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page; // start from 0 also
  // const currentPage = +req.query.page || 0; // も可能か
  const postQuery = Post.find();  // ページネーション用

  let fetchedPosts;
  // console.log(pageSize, currentPage);
  if (pageSize && (typeof currentPage === 'number' && 0 <= currentPage)) {
  // if (pageSize && ( 0 <= currentPage)) {
    postQuery.skip(pageSize * currentPage).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.countDocuments(); //  全件数
    })
    .then(count => {
        res.status(200).json({
        message: "全データを取得できました",
        posts: fetchedPosts,
        maxPosts: count //  全件数
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "全データの取得に失敗しました！"
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params._id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "データが見つかりません !　(req.params._id)" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "データを取得できませんでした！"
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params._id, creator: req.userData.userId })
    .then(result => {
      // console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "データを削除しました" });
      } else {
        res.status(401).json({ message: "削除を許可されていません！" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "データの削除に失敗しました！"
      });
    });
};
