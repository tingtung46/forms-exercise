const usersStorage = require("../storages/usersStorage");

exports.userListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

exports.userCreateGet = (req, res) => {
  res.render("createUser"),
    {
      title: "Create User",
    };
};

exports.userCreatePost = (req, res) => {
  const { firstName, lastName } = req.body;
  usersStorage.addUser({ firstName, lastName });
  res.redirect("/");
};
