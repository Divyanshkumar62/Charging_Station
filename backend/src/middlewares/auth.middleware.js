import jwt from 'jsonwebtoken'

export const verified = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token)
    if(!token){
        return res.status(401).json({ message: 'Unauthorized User' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        req.user = decoded;
        // console.log("User:", req.user)
        next()
    } catch (error){
        // console.log(error)
        return res.status(401).json({
            message: "Invalid Token",
            error: error.message
        })
    }
}