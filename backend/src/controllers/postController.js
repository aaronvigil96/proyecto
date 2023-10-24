import { postServices } from "../services/postServices.js";
import { infoToken } from "../utils/handleJwt.js";

export const postController = {
    getAll: async (req, res) => {
        let posts = await postServices.getAll();
        return res.status(200).json({status: "OK", data: posts});
    },
    get: async (req, res) => {
        const {id} = req.params;
        const post = await postServices.get(parseInt(id));
        if(!post){
            return res.status(400).json({status: "FAILED", msg: "No se encontró el post con el id:" + id});
        }
        return res.status(200).json({status: "OK", data: post});
    },
    create: async (req, res) => {
        const {id} = infoToken(req.cookies.jwt);
        const {title, body} = req.body;
        if(!title || !body){
            return res.status(400).json({status: "FAILED", msg: "Se esperaba un titulo y un cuerpo de mensaje"});
        }
        const post = await postServices.create(id, title, body);
        return res.status(200).json({status: "OK", data: post});
    },
    update: async (req, res) => {
        const {id} = infoToken(req.cookies.jwt);
        const {title, body} = req.body;
        const post = await postServices.update(id, title, body);
        return res.status(200).json({status: "OK", data: post}); 
    }
};