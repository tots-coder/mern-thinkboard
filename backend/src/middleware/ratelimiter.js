import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // param:
    // "my-limit-key" -> will deny request upon reaching specified limit on application
    // userId -> upon each users limit
    // ip -> can be based on ip address
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    }
    next();
  } catch (error) {
    console.error("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
