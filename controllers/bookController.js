const db = require("../models/db");

// get all books
exports.getBooks = (req, res) => {
    db.book.findAll().then(books => res.send(books));
};

// post new book
exports.postBook = (req, res) => {
    db.book.create({
       name: req.body.name
    }).then(submitedBook => res.send(submitedBook));
};

// get single book by id
exports.getBookWithId = (req, res) => {
    db.book.findAll({
      where: {
        id: req.params.id
      }
    }).then(book => res.send(book));
};

// delete book
exports.deleteBook = (req, res) => {
    db.book.destroy({
    where: {
      id: req.params.id
    }
  }).then((book) => res.send("success delete"));
};

// edit a book
exports.editBook = (req, res) => {
   db.book.update(
     {
       name: req.body.name
     },
     {
       where: { id: req.body.id }
     }
 ).then( () => res.send("success update") );
};

// register user
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
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            /*process.env.*/TOKEN_KEY,
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


