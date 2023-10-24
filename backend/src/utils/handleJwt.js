import jwt, { decode } from 'jsonwebtoken';

export const signToken = id => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: 30});
}

export const verifyToken = (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if(err){
                return res.status(400).json({status: "FAILED", msg: "Token invalido"});
            }else {
                next();
            }
        })
    }catch(err){
        console.log(err);
    }
}

export const infoToken = token => {
    try{
        return jwt.verify(token, process.env.SECRET_KEY);
    }catch(err){
        console.log(err)
    }
}