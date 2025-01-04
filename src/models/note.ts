import { Model } from "sequelize";
import { INotes } from "../interfaces/note.interface";

export default (sequelize, DataTypes) => {
    class Note extends Model<INotes> implements INotes {
        public title;
        public description;
        public createdBy;
        public isArchive;
        public isTrash;
    }
    Note.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            createdBy: DataTypes.INTEGER,
            isArchive: DataTypes.BOOLEAN,
            isTrash: DataTypes.BOOLEAN
        }, {
        sequelize,
        modelName: 'notes'
    });
    return Note;
}