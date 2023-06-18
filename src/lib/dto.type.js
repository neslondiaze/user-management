import { Type } from '@sinclair/typebox';

export const idDTOSchema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: 'El tipo de _id no es vàlido, debe ser us string',
        format: 'El formato de _id no es vàlido, debe ser un uuidv4'
    }
});

export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'name debe tener al menos 2 caracteres de longitud',
        maxLength: 'name debe tener como maximo 20 caracteres de longitud'
    }
});

export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'surname debe tener al menos 4 caracteres de longitud',
        maxLength: 'surname debe tener como maximo 50 caracteres de longitud'
    }
});

export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'El tipo de email no es vàlido, debe ser us string',
        format: 'El formato de email no es vàlido, debe cumplir el RFC 5322'
    }
});

export const passawordDTOSchema = Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: 'El tipo del password contraseña no es vàlido, debe ser us string',
        format: 'El formato de la password debe centener una mayùscula, una minùscula y un numero',
        minLength: 'password debe tener al menos 10 caracteres de longitud',
        maxLength: 'password debe tener como maximo 25 caracteres de longitud'
    }
});
