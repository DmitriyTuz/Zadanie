let db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get all users
exports.getUsers = function(req, res) {
    db.user.findAll().then(users => res.send(users));
};

/* // с формой при помощи представлений(дальше тоже !)
exports.getUsers = function(req, res) {
    db.user.findAll().then(data => {
      console.log("***data *** = ", data)
      res.render("index.hbs", {
        users: data
      });
    }).catch(err => console.log(err));
};*/

// post new user
exports.postUser = (req, res) => {
    db.user.create({
       name: req.body.name,
       age: req.body.age
    }).then(submitedUser => res.send(submitedUser));
};

/*exports.postUser = function(req, res) {

    if(!req.body) return res.sendStatus(400);

    const username = req.body.name;
    const userage = req.body.age;
    db.user.create({ name: username, age: userage}).then(() => {
      res.redirect("/users");
    }).catch(err => console.log(err));
};*/

// get single user by id
exports.getUserWithId = (req, res) => {
    db.user.findAll({
      where: {
        id: req.params.id
      }
    }).then(user => res.send(user));
};

/*// получаем объект по id для редактирования
exports.getUserWithId = function(req, res) {
  const userid = req.params.id;
  db.user.findAll({where:{id: userid}, raw: true })
  .then(data => {
    res.render("edit.hbs", {
      user: data[0]
    });
  })
  .catch(err => console.log(err));
};*/

// delete book
exports.deleteUser = (req, res) => {
    db.user.destroy({
    where: {
      id: req.params.id
    }
  }).then((user) => res.send("success delete"));
};

// edit a book
exports.editUser = (req, res) => {
   db.user.update(
     {
       name: req.body.name,
       age: req.body.age
     },
     {
       where: { id: req.body.id }
     }
 ).then( () => res.send("success update") );
};

/*// обновление данных в БД
exports.editUser = function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const username = req.body.name;
  const userage = req.body.age;
  const userid = req.body.id;
  db.user.update({name:username, age: userage}, {where: {id: userid} }).then(() => {
    res.redirect("/users");
  })
  .catch(err=>console.log(err));
};*/

/*exports.deleteUser = function(req, res){
  const userid = req.params.id;
  db.user.destroy({where: {id: userid} }).then(() => {
    res.redirect("/users");
  }).catch(err => console.log(err));
};*/

// register User
exports.registerUser = async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await db.user.findOne({where: {email}});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await db.user.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};

// login user
exports.loginUser = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await db.user.findOne({where: {email}});

        console.log('***user created !!! *** =', user.email);
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
};

exports.successAuth = (req, res) => {
    res.status(200).send("Welcome 🙌 ");
};

exports.wrongRoute = (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
};