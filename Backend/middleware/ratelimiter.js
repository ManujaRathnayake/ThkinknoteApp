import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

try{

    const {success} = await ratelimit.limit("My-limit-key");

    if (!success) {
        return res.status(429).json({ message: "Too many requests, please try again later." });
    }

}catch(error){
    console.error("Error in rate limiter:", error);
    next(error); // Pass the error to the next middleware (error handler)
}


    next();
}


export default rateLimiter;