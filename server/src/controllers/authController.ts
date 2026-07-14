import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { dbPromise } from "../database/db";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth";

export async function register(req: Request, res: Response) {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const db = await dbPromise;

        const existing = await db.get(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existing) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.run(
            `
            INSERT INTO users(name,email,password)
            VALUES(?,?,?)
            `,
            [name, email, hashedPassword]
        );

        const user = {
            id: result.lastID,
            name,
            email
        };

        const token = generateToken(user);

        return res.status(201).json({
            message: "User registered successfully.",
            token,
            user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

export async function login(req: Request, res: Response) {

    try {

        const { email, password } = req.body;

        const db = await dbPromise;

        const user = await db.get(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password."
            });
        }

        const token = generateToken(user);

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

export async function profile(req: AuthRequest, res: Response) {

    try {

        const db = await dbPromise;

        const user = await db.get(
            `
            SELECT id,name,email,created_at
            FROM users
            WHERE id = ?
            `,
            [req.user.id]
        );

        return res.json(user);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}