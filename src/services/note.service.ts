import sequelize, { DataTypes } from "../config/database";
import note from "../models/note";
import { INotes } from "../interfaces/note.interface";
import dotenv from "dotenv";
dotenv.config();

class noteServices {

    private note = note(sequelize, DataTypes);

    public createNote = async (body: INotes): Promise<INotes> => {
        try {
            const newNote = await this.note.create(body);
            return newNote;
        } catch (error) {
            throw new Error('Error creating note');
        }
    };

    public getNoteById = async (noteId: string, userId: any): Promise<INotes | null> => {
        try {
            const note = await this.note.findOne({ where: { id: noteId, createdBy: userId } });
            if (!note) {
                throw new Error('Note not found');
            }
            return note;
        } catch (error) {
            console.error('Error in getNoteById:', error);
            throw error;
        }
    };

    public getNotesByUserId = async (userId: string): Promise<{ data: INotes[], source: string }> => {
        try {
            const notes = await this.note.findAll({ where: { createdBy: userId } });
            if (!notes || notes.length === 0) {
                throw new Error('No notes found for this user');
            }
            return { data: notes, source: 'Data retrieved from database' };
        } catch (error) {
            throw error;
        }
    };

    public updateNoteById = async (noteId: string, userId: any, updatedData: any): Promise<void> => {
        try {
            const note = await this.note.update(updatedData, { where: { id: noteId, createdBy: userId } });
            if (!note) {
                throw new Error('Note not found or unauthorized');
            }

        } catch (error) {
            throw error;
        }
    };

    public deletePermanentlyById = async (noteId: string, userId: any): Promise<void> => {
        try {
            const note = await this.note.findOne({ where: { id: noteId, createdBy: userId } });

            if (!note) {
                throw new Error('Note not found or not authorized');
            }

            await this.note.destroy({ where: { id: noteId } });

        } catch (error) {
            throw error;
        }
    };
}

export default noteServices;