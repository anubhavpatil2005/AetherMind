import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: any;
}

export function authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const token = auth.split(" ")[1];

    try {
        req.user = verifyToken(token);
        next();
    } catch {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}