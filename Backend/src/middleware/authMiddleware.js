const jwt = require('jsonwebtoken');

const authMiddleware= function(req, res, next) {
// Get token from cookies
const token = req.cookies?.token;

if (!token){
    return res.status(401).json({message :"token missing"});

}

try{
    const payload = jwt.verify(token , process.env.JWT_SECRET);
    req.user ={ id: payload.userId, role: payload.role };
    next();
} catch(err){
    return res.status(401).json({message :"token missing"});
}

}
module.exports = authMiddleware;