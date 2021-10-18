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
exports.register = async (req, res) => {
    try {
        // Get user input
        const { name, email, password } = req.body;

        // Validate user input
        if (!(email && password && name)) {
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
            name,
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
exports.login = async (req, res) => {
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

exports.getUserByFirstNameLastName = (req, res) => {

    db.sequelize.query(`SELECT id, first_name, last_name FROM users WHERE first_name = ${req.query.first_name} AND last_name = ${req.query.last_name}`,

        function(err, results, fields) {
            console.log(err);
            console.log(results); // собственно данные
            console.log(fields); // мета-данные полей
        }).then(results => res.send(results));
};

exports.getUserByFirstNameLastNameLike = (req, res) => {

let query = `SELECT id, first_name, last_name FROM users WHERE first_name LIKE "${req.query.first_name}%"`;
console.log('***', query);
//   db.sequelize.query(`SELECT id, first_name, last_name FROM users WHERE first_name LIKE 'Al/*${req.query.first_name}*/%'`,
    db.sequelize.query(query,
//    db.sequelize.query('SELECT id, first_name, last_name FROM users WHERE first_name LIKE "Al%"',
        function(err, results, fields) {
            console.log(err);
            console.log(results); // собственно данные
            console.log(fields); // мета-данные полей
        }).then(results => {
            console.log(results);
            res.send(results)
        }).catch(error => {
            console.log(error);
            res.send(error)
         });
};

exports.getUserById = (req, res) => {

     db.sequelize.query(`SELECT id, first_name, last_name FROM users WHERE id = ${req.query.id}`,

        function(err, results, fields) {
            console.log(err);
            console.log(results); // собственно данные
            console.log(fields); // мета-данные полей
        }).then(results => res.send(results));
};

/*// edit a book
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
};*/

exports.addBookToUser = async (req, res) => {
    let {id, userId} = req.body
    const book = await db.book.update({userId}, {where: {id}})
    return res.send("success update")
}

exports.comeBackBookFromUser = async (req, res) => {
    let {id} = req.body
    const book = await db.book.update({userId: null}, {where: {id}})
    return res.send("success update")
}

exports.addBookToAutor = async (req, res) => {
    let {id, autorId} = req.body
    const book = await db.book.update({autorId}, {where: {id}})
    return res.send("success update")
}

//Users.findAll(include: [{model: Hobbies}])
//Users.findAll(include: [{model: Hobbies, where: {hobby: 'fishing'}, required : true}])
//include : [{model:Model.Account, attribute:['name']}]

exports.getUsersWithBooks = async function(req, res) {
    let res1 = await db.user.findAll({attributes: ["id","first_name"], include: [{model: db.book, attributes:['name']}]})
    return res.json(res1)
};

exports.getUsersWithBooksAndAutor = async function(req, res) {

    let res1 = await db.user.findAll({attributes: ["id","first_name"],
        include: [{
            model: db.book, attributes:["name"],
            required: false,
            include: [{
                model: db.autor, attributes:["name"],
               required: false
            }]
        }]
    })
    // let res2 = await db.book.findAll({where: {res1}}, {include: [{model: db.autor, attributes:['name']}]})
    return res.json(res1)
};


/*Places.findById(req.params.id, {
    include: [{
        model: Reviews,
        required: false,
        include: [{
            model: Users,
            required: false
        }]
    }]
}).then(function(place) {
    // The rest of your logic here...
});*/

/*const user = await  db.User.findByid(userId, {
    include: [{
        model: db.Table1,
        separate: true // обязательно указать!
    }, {
        model: db.Table2,
        separate: true // обязательно указать!
    }, {
        model: db.Table3,
        separate: true // обязательно указать!
    }]
})*/


    // db.user.findAll({
    //     where: {
    //         first_name: req.query.first_name,
    //         last_name: req.query.last_name
    //     }
    // }).then(user => res.send(user));
// };