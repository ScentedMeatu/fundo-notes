import { Notes } from "../models/index";
import { INotes } from "../interfaces/note.interface";
import dotenv from "dotenv";
import redisClient from "../config/redis";
dotenv.config();

class noteServices {

    public createNote = async (body: INotes): Promise<INotes> => {
        try {
            body.isArchive = false;
            body.isTrash = false;
            const newNote = await Notes.create(body);
            redisClient.flushAll();
            return newNote;
        } catch (error) {
            throw new Error('Error creating note');
        }
    };

    public getNoteById = async (noteId: string, userId: any): Promise<INotes | null> => {
        try {
            const note = await Notes.findOne({ where: { id: noteId, createdBy: userId } });
            if (!note) {
                throw new Error('Note not found');
            }
            await redisClient.setEx(`Note?id=${note.dataValues.id}&user=${note.dataValues.createdBy}`, 3600, JSON.stringify(note));
            return note;
        } catch (error) {
            console.error('Error in getNoteById:', error);
            throw error;
        }
    };

    public getNotesByUserId = async (userId: string): Promise<{ data: INotes[], source: string }> => {
        try {
            const notes = await Notes.findAll({ where: { createdBy: userId } });
            if (!notes || notes.length === 0) {
                throw new Error('No notes found for this user');
            }
            redisClient.setEx(`Notes?user=${userId}`, 3600, JSON.stringify(notes));
            return { data: notes, source: 'Data retrieved from database' };
        } catch (error) {
            throw error;
        }
    };

    public updateNoteById = async (noteId: string, userId: any, updatedData: any): Promise<void> => {
        try {
            const note = await Notes.update(updatedData, { where: { id: noteId, createdBy: userId } });
            if (!note) {
                throw new Error('Note not found or unauthorized');
            }
            redisClient.flushAll();
        } catch (error) {
            throw error;
        }
    };

    public deletePermanentlyById = async (noteId: string, userId: any): Promise<void> => {
        try {
            const note = await Notes.findOne({ where: { id: noteId, createdBy: userId, isTrash: true } });
            if (!note) {
                throw new Error('Note not found or not authorized');
            }

            await Notes.destroy({ where: { id: noteId } });
            redisClient.flushAll();

        } catch (error) {
            throw error;
        }
    };

    public toggleArchiveById = async (noteId: string, userId: any): Promise<INotes | null> => {
        try {
            console.log(noteId + ' ' + userId);
            const note = await Notes.findOne({ where: { id: noteId, createdBy: userId, isTrash: false } });

            if (!note) {
                throw new Error('Note not found or user not authorized');
            }

            note.isArchive = !note.isArchive;
            await note.save();
            redisClient.flushAll();
            return note;
        } catch (error) {
            console.error('Error in toggleArchive:', error);
            throw error;
        }
    };

    public toggleTrashById = async (noteId: string, userId: any): Promise<INotes | null> => {
        try {
            const note = await Notes.findOne({ where: { id: noteId, createdBy: userId } });
            if (!note) {
                throw new Error('Note not found or user not authorized');
            }
            note.isTrash = !note.isTrash;
            if (note.isTrash) {
                note.isArchive = false;
            }
            await note.save();
            redisClient.flushAll();
            return note;
        } catch (error) {
            console.error('Error in toggleTrash:', error);
            throw error;
        }
    };
}

export default noteServices;