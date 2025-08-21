import dotenv from 'dotenv';
dotenv.config();
import {checkBodyErrors} from "../checkBodyErrors.js";
import {verifyToken} from "../verifyToken.js";
import { loginUser } from "../controllers/landing/loginUser.js";
import { registerUser } from "../controllers/landing/registerUser.js";
import { sendFollowRequest } from "../controllers/followRequest/sendFollowRequest.js";
import { cancelFollowRequest } from "../controllers/followRequest/cancelFollowRequest.js";
import { unfollowUser } from "../controllers/followRequest/unfollowUser.js";
import { respondFollowRequest } from "../controllers/followRequest/respondFollowRequest.js";
import { createPost } from "../controllers/post/createPost.js";
import { commentPost } from "../controllers/post/comments/commentPost.js";
import { likePost } from "../controllers/post/likes/likePost.js";
import { favouritePost } from "../controllers/post/favourite/favouritePost.js";
import { Router } from "express";
import {body} from 'express-validator'

import uploadAWS from './uploadAWS.js';

let upload=uploadAWS()

const postRouter = Router();

postRouter.post('/upload/Post',
  verifyToken,
  body('text').trim().escape(),
  body('tags').trim().escape(),
  (req,res,next)=>{
    req.filenames=[]
    console.log(req.files,req.file,req.body,req)
    upload.array('files',3)(req, res, function (err) {
      if (err) {
        console.log(err)
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({validationErrors:[{msg:"Files must be <10mb."}]});
        }
        return res.status(400).send({validationErrors:[{msg:"Incorrect file formating."}]});
      } 
      if(req.filenames.length==req.files.length){
        next()
      }
    })
  },
  checkBodyErrors,
  createPost 
);

postRouter.post('/register',
    body('registerUsername').trim().notEmpty().withMessage("Username must be entered.").escape().isLength({max:20,min:1}).withMessage("User name must be 1 to 20 characters long."),
    body('registerEmail').trim().notEmpty().withMessage("Email must be entered.").escape().isEmail().withMessage("Incorrect email formating."),
    body('registerPassword').trim().notEmpty().withMessage("Password must be entered.").escape().isLength({min:6}).withMessage("Password must be at least 6 characters long."),
    checkBodyErrors,
    registerUser
);
postRouter.post('/login',
    body('loginEmail').escape().notEmpty().withMessage("An email must be entered").isEmail().trim().withMessage("Incorrect email formating."),
    body('loginPassword').escape().notEmpty().withMessage("A password must be entered"),
    checkBodyErrors,
    loginUser
);

postRouter.post('/send/followRequest',
  verifyToken,
  body('userToFollow').trim().escape().notEmpty().withMessage("Invalid request formating."),
  checkBodyErrors,
  sendFollowRequest
);
postRouter.post('/cancel/followRequest',
  verifyToken,
  body('userToUnfollow').trim().escape().notEmpty().withMessage("Invalid request formating."),
  checkBodyErrors,
  cancelFollowRequest
);
postRouter.post('/unfollow',
  verifyToken,
  unfollowUser
);
postRouter.post('/respond/followRequest',
  verifyToken,
  body('response').trim().escape().notEmpty().withMessage("Invalid request formating."),
  checkBodyErrors,
  respondFollowRequest
);
postRouter.post('/comment/Post', 
  verifyToken,
  body('comment').isLength({ min: 0, max:70 }).trim().escape().withMessage("Incorrect comment formating."),
  checkBodyErrors,
  commentPost
);
postRouter.post('/like/Post', 
  verifyToken,
  likePost
);
postRouter.post('/favourite/Post', 
  verifyToken,
  favouritePost
);
postRouter.post('/check/login',
  verifyToken,
  (req,res)=>{
    res.status(200).send("loggedIn")
  }
);
export default postRouter