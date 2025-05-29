const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters";
const numericErr = "must only contain numbers";
const rangeErr = "must be age between 18 and 120";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid (e.g. username@domain.com)"),
  body("age")
    .optional({ values: "falsy" })
    .trim()
    .isNumeric()
    .withMessage(`Age ${numericErr}`)
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${rangeErr}`),
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create User",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update User",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render("updateUser", {
        title: "Update User",
        user: user,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};
