const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  const user = new User(req.body);
    console.log("TCL: createUser -> user", user);

  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "ユーザーが作成されました",
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "別のユーザー名をご検討ください"
          // message: "ユーザーを作成できませんでした"
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ name: req.body.name })
    .then(user => {
      console.log("TCL: exports.userLogin -> user", user);
      if (!user) {
        return res.status(401).json({
          message: "登録されていません"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "認証の失敗です"
        });
      }
      const token = jwt.sign(
        { name: fetchedUser.name, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.name
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "認証で不明のエラー!"
      });
    });
};

exports.getUsers = (req, res, next) => {
  let fetchedUsers;

    User.find()
    .then(documents => {
      fetchedUsers = documents;
      // console.log(fetchedUsers);
      return User.countDocuments(); //  全件数
    })
    .then(count => {
      res.status(200).json({
        message: "ユーザーが取得できました",
        users: fetchedUsers,
        maxUsers: count //  全件数
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "ユーザーを取得できませんでした"
      });
    });
};
