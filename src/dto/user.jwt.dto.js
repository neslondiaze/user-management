import { jwtVerify } from "jose";


const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send('Usuario no autorizado');

    try {
        const encoder = new TextDecoder();
        const { payload } = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));

        req.id = payload.id

        next();
    } catch (err) {
        return  res.status(401).send('Usuario no autorizado');
    }
}

export default userJWTDTO;