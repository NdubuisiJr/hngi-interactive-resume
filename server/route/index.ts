import { Router } from 'express';
import { FeedController } from '../controllers/feedController';

const router: Router = Router();

router.get('/feed', FeedController.GetFeed);

router.post('/feed', FeedController.AddFeed);

router.patch('/feed/:title', FeedController.Update);

router.delete('/feed/:id', FeedController.Delete);

router.post('/feed/config', FeedController.Configure);

export default router;
