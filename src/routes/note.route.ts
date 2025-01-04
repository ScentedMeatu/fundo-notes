import express, { IRouter } from 'express';
import noteControllers from '../controllers/note.controller';
import userAuthorization from '../middlewares/auth.middleware';

class NoteRoutes {
  private NoteController = new noteControllers();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.post('/', userAuthorization, this.NoteController.create);

    this.router.get('/', userAuthorization, this.NoteController.getUserNotes);

    this.router.get('/:id', userAuthorization, this.NoteController.getNote);

    this.router.put('/:id', userAuthorization, this.NoteController.updateNote);

    this.router.delete('/:id', userAuthorization, this.NoteController.deletePermanently);
  }

  public getRoutes = (): IRouter => {
    return this.router;
  }
}

export default NoteRoutes;
