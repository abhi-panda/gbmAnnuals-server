'use strict'

module.exports = (sequelize, DataTypes) => {

  const Guest = sequelize.define('guest' , {
    uid : {
      type : DataTypes.STRING,
      allowNull:false,
      primaryKey : true
    },
    number : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entered : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{timestamps: false});
  return Guest;
}
