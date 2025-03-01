const jwt = require('jsonwebtoken')

const userAuthMiddleware = (req, res, next) => {
//  authMiddleware logic here
     const authHeader = req.headers.authorization;
    
     if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_USER_SECRET,(err,user)=>{
            if (err) {
                return res.status(403).json({message: "Forbidden: Invalid Token"})
            }
            req.userId = user.id;
            next();
        })
     }else{
        res.status(401).json({ message: 'Unauthorized: No token provided' });
     }
};

module.exports = userAuthMiddleware;