import { Error } from 'mongoose';

const normalizedErrorMessage = (errors: Error.ValidationError) => Object.values(errors.errors).map(error => error.message).join(', ');

export default normalizedErrorMessage;
