import noteServices from "../services/note.service";
import httpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from "express";

class noteControllers {
    private noteServices = new noteServices();

    /**
   * Controller to create a note
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newNote = await this.noteServices.createNote(req.body);
            res.status(httpStatus.CREATED).json({
                code: httpStatus.CREATED,
                message: "Note created successfully",
                data: newNote,
            });

        } catch (error) {
            console.error(`Cannot create note:`, error);
            next({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Failed to create note",
                error: (error as Error).message,
            });
        }
    };

    /**
  * Controller to get all note
  * @param  {object} Request - request object
  * @param {object} Response - response object
  * @param {Function} NextFunction
  */
    public getUserNotes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.body.createdBy;
            const { data: notes, source } = await this.noteServices.getNotesByUserId(userId);

            res.status(httpStatus.OK).json({ message: source, notes });
        } catch (error) {
            console.error('Error retrieving notes:', error);

            next({
                code: httpStatus.UNAUTHORIZED,
                message: 'Error retrieving notes',
                error: (error as Error).message,
            });
        }
    };

    /**
  * Controller to get a note by id
  * @param  {object} Request - request object
  * @param {object} Response - response object
  * @param {Function} NextFunction
  */
    public getNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteId = req.params.id;
            const userId = req.body.createdBy;

            const note = await this.noteServices.getNoteById(noteId, userId);

            res.status(httpStatus.OK).json(note);
        } catch (error) {
            console.error('Error retrieving note:', error);

            next({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error retrieving note',
                error: (error as Error).message,
            });
        }
    };

    /**
  * Controller to update a note by id
  * @param  {object} Request - request object
  * @param {object} Response - response object
  * @param {Function} NextFunction
  */
    public updateNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const noteId = req.params.id;
            const userId = req.body.createdBy;
            const updateData = req.body;
            await this.noteServices.updateNoteById(noteId, userId, updateData);

            res.status(httpStatus.OK).json({
                code: httpStatus.OK,
                message: 'Note updated',
                NoteId: noteId
            });
        } catch (error) {
            next({
                code: httpStatus.NOT_FOUND,
                message: 'Error updating note',
                error: (error as Error).message,
            });
        }
    };

    /**
  * Controller to delete a note
  * @param  {object} Request - request object
  * @param {object} Response - response object
  * @param {Function} NextFunction
  */
    public deletePermanently = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const noteId = req.params.id;
            const userId = req.body.createdBy;

            await this.noteServices.deletePermanentlyById(noteId, userId);

            res.status(httpStatus.OK).json({
                code: httpStatus.OK,
                message: 'Note permanently deleted',
                deletedNoteId: noteId
            });
        } catch (error) {
            next({
                code: httpStatus.FORBIDDEN,
                message: 'Error updating note',
                error: (error as Error).message,
            });
        }
    };
}

export default noteControllers;