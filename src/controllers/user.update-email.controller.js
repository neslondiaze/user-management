import  UserModel  from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

const userUpdateEmailController = async (req, res) => {
    const { id } = req;
    const { email, password } = req.body;

    const existingUserById = await UserModel.findById(id).oxec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });
    
    const checkPassword = await compare(password, existingUserById.password);
    if (!checkPassword)
        return res.status(401).send({ errors: ['Credenciales incorrectas'] });
    
    existingUserById.email = email;

    return res.send('Email dedl usuario actualizado')

}

export default userUpdateEmailController;
