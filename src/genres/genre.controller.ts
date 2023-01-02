import { Request, Response } from 'express';
import { StatusCode } from '../app/statusCodes';
import { GenreService } from './genre.service';

const genreService = new GenreService();
export const getGenres = async (req: Request, res: Response) => {
  const genres = await genreService.getGenres();
  return res.status(StatusCode.OK).json({ ok: true, genres });
};
