import { Request, Response } from 'express';
import { BookService } from './book.service';
import { StatusCode } from '../app/statusCodes';
import { BookDto } from './dto/createBookDto';
import { validateSchema } from '../helpers/validate-schema';

const bookService = new BookService();

export const getBooks = async (req: Request, res: Response) => {
  const { query } = req.query;
  const books = await bookService.getBooks(query as string);
  return books
    ? res.status(StatusCode.OK).json({ ok: true, books })
    : res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ ok: false, message: 'Error getting books' });
};

export const postBook = async (req: Request, res: Response) => {
  const bookDto = new BookDto();
  const { title, author, published, id_genre, stock } = req.body;
  bookDto.title = title;
  bookDto.author = author;
  bookDto.published = published;
  bookDto.id_genre = id_genre;
  bookDto.stock = stock;

  const isValidationError = await validateSchema(bookDto);
  if (isValidationError) {
    return res.status(StatusCode.BAD_REQUEST).json({
      ok: false,
      message: 'Validation error',
    });
  }

  const newBook = await bookService.createBook(bookDto);
  return newBook
    ? res.status(StatusCode.CREATED).json({ ok: true, book: newBook })
    : res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ ok: false, message: 'Error creating book or this book already exists' });
};

export const putBook = async (req: Request, res: Response) => {};
