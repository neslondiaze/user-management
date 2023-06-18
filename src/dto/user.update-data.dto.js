// TODO Funcion de validaciòn
import { nameDTOSchema, surnameDTOSchema } from '#Lib/dto.type.js'
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateDataDTOSchema = Type.Object(
    {
        name: nameDTOSchema,
        surname: surnameDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: 'El formato del objecto no es valido',
    },
);

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier')
addErrors(ajv);

const validateSchema = ajv.compile(UpdateDataDTOSchema);

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map(error => error.message),
        });
    
    next()
}

export default userUpdateDataDTO;