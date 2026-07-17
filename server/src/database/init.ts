import { dbPromise } from "./db";

export async function initializeDatabase() {

    const db = await dbPromise;

    await db.exec("PRAGMA foreign_keys = ON;");

    // USERS
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // MIND MAPS
    await db.exec(`
        CREATE TABLE IF NOT EXISTS mindmaps(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
        );
    `);

    // NODES
    await db.exec(`
        CREATE TABLE IF NOT EXISTS nodes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            mindmap_id INTEGER NOT NULL,

            title TEXT NOT NULL,

            description TEXT DEFAULT '',

            type TEXT DEFAULT 'topic',

            x REAL DEFAULT 0,

            y REAL DEFAULT 0,

            color TEXT DEFAULT '#3B82F6',

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(mindmap_id)
            REFERENCES mindmaps(id)
            ON DELETE CASCADE
        );
    `);

    // EDGES
    await db.exec(`
        CREATE TABLE IF NOT EXISTS edges(
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            mindmap_id INTEGER NOT NULL,

            source_node_id INTEGER NOT NULL,

            target_node_id INTEGER NOT NULL,

            label TEXT DEFAULT '',

            FOREIGN KEY(mindmap_id)
            REFERENCES mindmaps(id)
            ON DELETE CASCADE,

            FOREIGN KEY(source_node_id)
            REFERENCES nodes(id)
            ON DELETE CASCADE,

            FOREIGN KEY(target_node_id)
            REFERENCES nodes(id)
            ON DELETE CASCADE
        );
    `);

    // AI CHAT
    await db.exec(`
        CREATE TABLE IF NOT EXISTS messages(
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            node_id INTEGER NOT NULL,

            role TEXT NOT NULL,

            message TEXT NOT NULL,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(node_id)
            REFERENCES nodes(id)
            ON DELETE CASCADE
        );
    `);

    console.log("✅ Database initialized");
}