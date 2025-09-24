const jwt = require ('jsonwebtoken');

function generateToken(user){
    const payload = {userId : user._id , role: user.role};
    return jwt.sign(payload , process.env.JWT_SECRET , {expiresIn:'1h'})
}
module.exports = generateToken;