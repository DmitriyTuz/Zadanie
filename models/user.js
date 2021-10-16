const {Book} = require('../models/book.js')
module.exports = (sequelize, DateTypes) => {
const User = sequelize.define("user", {
  id: {
    type:  DateTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type:  DateTypes.STRING
  },
  age: {
    type:  DateTypes.INTEGER
  },
  first_name: {
    type: DateTypes.STRING,
//    default: null
  },
  last_name: {
    type: DateTypes.STRING,
    default: null
  },
  email: {
    type: DateTypes.STRING,
    unique: true
  },
  password: {
    type: DateTypes.STRING
  },
  token: {
    type: DateTypes.STRING
  },
});

//User.hasMany(Book, { onDelete: "cascade" })
User.associate = (models) => {
  User.hasMany(models.book, { onDelete: "cascade" });
}

return User;
};


/*module.exports = function (sequelize, DateTypes) {

return sequelize.define("user", {
  id: {
    type:  DateTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type:  DateTypes.STRING,
    allowNull: false
  },
  age: {
    type:  DateTypes.INTEGER,
    allowNull: false
  }
});
};*/
