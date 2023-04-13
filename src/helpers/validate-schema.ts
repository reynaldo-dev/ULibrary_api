import { validate } from 'class-validator';

export const validateSchema = async schema => {
  const errors = await validate(schema);
  console.log(errors);
  return errors.length > 0;
};
