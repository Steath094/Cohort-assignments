const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
//  authMiddleware logic here
     const authHeader = req.headers.authorization;
    
     if (authHeader) {
        const token = authHeader.split(' ')[1];
         jwt.verify(token,process.env.JWT_ADMIN_SECRET,(err,admin)=>{
            if (err) {
                return res.status(403).json({message: "Forbidden: Invalid Token"})
            }
            req.adminId = admin.id;
            next();
        })
     }else{
        res.status(401).json({ message: 'Unauthorized: No token provided' });
     }
};

module.exports = authMiddleware;