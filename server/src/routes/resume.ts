import { Router } from "express";
import verifiyToken from "../middleware/auth";  
import { getAllResumes, getResumeById, createResume, updateResume, deleteResume} from "../controllers/resumeController";

const router = Router();

router.get('/', verifiyToken, getAllResumes);
router.get('/:id', verifiyToken, getResumeById);
router.post('/', verifiyToken, createResume);
router.put('/:id', verifiyToken, updateResume);
router.delete('/:id', verifiyToken, deleteResume);

export default router;

