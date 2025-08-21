import jwt from 'jsonwebtoken'

export default async function verifyToken(req,res,next){
  if(typeof req.headers['authorization'] !== 'undefined') {
    req.token = req.headers['authorization'];
    jwt.verify(req.token, '?', (err, authorizedData) => {
        if(err){
          return res.status(401).send("No Token")
        } else { 
          res.locals.tojwt=authorizedData.toJWT
          next()  
        }
    })
  } else {
    return res.status(401).json("No Token");x
  }
}
export {verifyToken}