export default (roles) => (req, res, next) => roles.includes(req.user.type) ? next() : res.status(403).send({message: 'Unauthorized access'})