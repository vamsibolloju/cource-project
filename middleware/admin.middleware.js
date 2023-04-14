module.exports = (req, res, next) => {
    if(req.user.role === 'admin'){
        next();
    } else {
        return res.status(403).end('You are not authorised to access this endpoint!');
    }
}