import { Request, Response } from 'express';
import { BorrowService } from './borrow.service';
import { StatusCode } from '../app/statusCodes';
import { BorrowDto } from './dto/borrowDto';
import { validateSchema } from '../helpers/validate-schema';

const borrowService = new BorrowService();

export const getBorrows = async (req: Request, res: Response) => {
  const { student } = req.query;

  const borrows = await borrowService.getBorrows(student as string);
  return borrows
    ? res.status(StatusCode.OK).json({ ok: true, borrows })
    : res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ ok: false, message: 'Error getting borrows' });
};

export const postBorrow = async (req: Request, res: Response) => {
  const borrows: BorrowDto[] = req.body;

  const newBorrow = await borrowService.createBorrow(borrows);
  return newBorrow
    ? res.status(StatusCode.CREATED).json({ ok: true, borrow: newBorrow })
    : res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ ok: false, message: 'Error creating borrow' });
};

export const putBorrow = async (req: Request, res: Response) => {
  const updatedBorrow = await borrowService.updateBorrow(req.body);
  return updatedBorrow
    ? res.status(StatusCode.OK).json({ ok: true, borrow: updatedBorrow })
    : res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ ok: false, message: 'Error updating borrow' });
};
