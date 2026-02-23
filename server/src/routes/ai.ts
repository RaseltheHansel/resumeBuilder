import { Router } from 'express';   
import verifyToken from '../middleware/auth';
import { generateSummary, generateExperience, generateCoverLetter, checkATSScore } from '../controllers/aiController';

const router = Router();

router.post('/summary', verifyToken, generateSummary);
router.post('/experience', verifyToken, generateExperience);
router.post('/cover-letter', verifyToken, generateCoverLetter);
router.post('/ats-score', verifyToken, checkATSScore);

export default router;
