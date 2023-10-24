import { authService } from "../services/authServices.js";
import { hashPassword, validatePassword } from "../utils/handleBcrypt.js";
import { signToken } from "../utils/handleJwt.js";

export const authController = {
    register: async (req, res) => {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({status: "FAILED", msg:"Se esperaban recibir un email y un password"});
        }
        let user = await authService.getEmail(email);
        if(user){
            return res.status(400).json({status: "FAILED", msg: "Ese email ya se encuentra en uso"});
        }
        user = authService.create(email,hashPassword(password));
        return res.status(200).json({status: "OK", msg: "Usuario creado con éxito"});
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({status: "FAILED", msg:"Se esperaban recibir un email y un password"});
        }
        let user = await authService.getEmail(email);
        if(!user){
            return res.status(400).json({status: "FAILED", msg: "Email y/o password incorrecto"});
        }
        user = await authService.getUser(email);
        if(!validatePassword(password, user.password)){
            return res.status(400).json({status: "FAILED", msg: "Email y/o password incorrecto"})
        }
        const token = signToken(user.id);
        res.cookie("jwt",token);
        res.status(200).json({status: "OK", msg: "Bienvenido usuario"});
    },
    logout: (req, res) => {
        res.cookie("jwt", '');
        res.status(200).json({status: "OK", msg: "Te desconectaste"});
    }
}