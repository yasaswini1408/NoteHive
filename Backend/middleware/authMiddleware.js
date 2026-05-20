const jwt = require('jsonwebtoken')
const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).send("No token, access denied")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).send("Invalid token")
    }
}

module.exports = protect