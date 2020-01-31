module.exports = {
    verifyCustomer: (req, res, next) => {
        if (!req.session.customer) {
            res.status(403).json({ message: "You must be logged in!" })
        } else {
            next();
        }
    }
}