import { SALT } from "../constants/salt.js";
import UserModel from '#Schemas/user.schema.js'
import { compare, hash } from "bcrypt";



const userUpdatePasswordController = async (req, res) => {
    const { id } = res;
    const { oldPassword, newPassword } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });
    
    const checkPassword = await compare(oldPassword, existingUserById.password);
    if (!checkPassword)
        return res.status(401).send({ errors: ['Credencial incorrecta'] });
    
    const hashedPassaword = await hash(newPassword, SALT);
    existingUserById.password = hashedPassaword;

    await existingUserById.save();

    return res.send('Contraseña del usuario actualizada')

}

export default userUpdatePasswordController;