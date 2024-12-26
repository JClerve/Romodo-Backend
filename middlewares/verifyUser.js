const { verify }= require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }
        const decoded = verify(token, process.env.KEY);
        req.user = decoded; // Optionally attach the decoded token info to the request object
        next();
    } catch (err) {
        return res.status(401).json({ status: false, message: "Unauthorized", error: err.message });
    }
};

module.exports = verifyUser;
