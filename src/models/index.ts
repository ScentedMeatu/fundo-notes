import sequelize, { DataTypes } from "../config/database";
import User from './user';
import Note from './note';

const Notes = Note(sequelize, DataTypes);
const Users = User(sequelize, DataTypes);

Users.hasMany(Notes, {
  foreignKey: 'createdBy', 
  as: 'notes',        
});

Notes.belongsTo(Users, {
  foreignKey: 'createdBy',
  as: 'user',
});

export { Users, Notes };
