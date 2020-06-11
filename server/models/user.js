'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password must be minimum 8 characters & maximum 32 characters"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        // user.password = encrypt(user.password) bcrypt disini
      }
    }
  });
  User.associate = function(models) {
  };
  return User;
};