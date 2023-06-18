// TODO Funcion de validaciòn
import { idDTOSchema, nameDTOSchema, surnameDTOSchema, emailDTOSchema, passawordDTOSchema } from '#Dto/dto.type.js'
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const RegisterDTOSchema = Type.Object({
    _id: idDTOSchema,
    name: nameDTOSchema,
    surname:surnameDTOSchema,
    email:emailDTOSchema,
    password: passawordDTOSchema,
},
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El formato del objeto no es válido',
        },
    }
);

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier');

ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email', 'uuid']);
addErrors(ajv);

const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)
    if (!isDTOValid) return res.status(400).send({
        errors: validateSchema.errors.map(error => error.message),
    });
    
    next()
};

export default userRegisterDTO;