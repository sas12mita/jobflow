import bcrypt from 'bcrypt';
import pool from '../config/db.js';
async function ensureAccount(role, name, email, password) {
    // Check whether this role already has an account.
    const [rows] = await pool.execute('SELECT id FROM users WHERE role = ? LIMIT 1', [role]);
    if (rows.length > 0) {
        console.log(`Seed ${role} already exists. Skipping.`);
        return;
    }
    if (!name || !email || !password) {
        throw new Error(`Missing seed credentials for role: ${role}`);
    }
    if (password.length < 12) {
        throw new Error(`Seed password for ${role} must be at least 12 characters.`);
    }
    // Hash the password before storing it.
    const passwordHash = await bcrypt.hash(password, 12);
    await pool.execute(`INSERT INTO users (name, email, password_hash, role)
     VALUES (?, ?, ?, ?)`, [name, email, passwordHash, role]);
    console.log(`Seed ${role} created successfully.`);
}
export async function seedAccounts() {
    await ensureAccount('user', process.env.SEED_USER_NAME, process.env.SEED_USER_EMAIL, process.env.SEED_USER_PASSWORD);
    await ensureAccount('admin', process.env.ADMIN_NAME, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
}
//# sourceMappingURL=seedAdmin.js.map