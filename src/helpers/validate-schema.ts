import { validate } from 'class-validator';

export const validateSchema = async schema => {
  const errors = await validate(schema);
  return errors.length > 0 ? true : false;
};
