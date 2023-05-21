const adminMiddleware = (req, res, next) => {
    const { role_id } = req.user_id;

    if (role_id === 1) {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = adminMiddleware;