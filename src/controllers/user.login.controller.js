import UserModel from "#Schemas/user.schema.js";
import { compare } from 'bcrypt';
import { SignJWT } from "jose";

const userLoginController = async (req, res) => {
    const { email, passward } = res.bady;

    const existingUserByEmail = UserModel.findOne({ email }).exec();
    if (!existingUserByEmail)
        return res.status(401).send({ errors: ['Credenciales incorrectas'] });
    
    const checkPassword = await compare(passward, (await existingUserByEmail).password);

    if (!checkPassword)
        return res.status(401).send({ errors: ['Credenciales incorrectas'] });
    
    const jwtConstructor = new SignJWT({ id: existingUserByEmail._id });

    const encoder = new TextDecoder();
    const jwt = await jwtConstructor
        .setProtectedHeader({
            alg: 'HS256',
            typ: 'JWT',
        })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    
    return res.send({ jwt });

};

export default userLoginController;