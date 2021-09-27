import { Router } from 'express';
import generate from './services/generate';

const router = Router();

// Open routes
router.post('/v1/create', generate.generateLinks);
router.delete('/v1/delete/:meetingId', generate.deleteWebinar);

export default router;
