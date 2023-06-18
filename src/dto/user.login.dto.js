// TODO Funcion de validaciòn
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { emailDTOSchema, passawordDTOSchema } from '#Lib/dto.type.js'

const LoginDTOSchema = Type.Object({
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
addFormats(ajv, ['email']);
addErrors(ajv);

const validateSchema = ajv.compile(LoginDTOSchema);

const userLoginDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)
    if (!isDTOValid) return res.status(400).send({
            errors: validateSchema.errors.map(error => error.message),
        });
    
    next()
}

export default userLoginDTO;