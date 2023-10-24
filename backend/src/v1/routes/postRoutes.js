import { Router } from "express";
import { postController } from "../../controllers/postController.js";

const router = Router();

router.get('/', postController.getAll);
router.get('/:id', postController.get);
router.post('/', postController.create);
router.put('/:id', postController.update);

export default router;