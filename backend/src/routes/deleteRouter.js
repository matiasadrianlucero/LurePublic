import {Router} from 'express'
import {body} from 'express-validator'
import verifyToken from '../verifyToken.js'

const deleteRouter = Router();
import { dismissNotification } from '../controllers/notification/dismissNotification.js';

deleteRouter.delete("/dismiss/Notification",
  verifyToken,
  body('username').notEmpty().escape().withMessage("A password must be entered"),
  dismissNotification
);


export default deleteRouter;
 