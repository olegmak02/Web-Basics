const database = require('../database');

class UserDAO {
    constructor() {
        this.database = database;
    }

    async clear() {
        await this.database.query("DELETE FROM users");
    }

    async add_user(user) {
        const a = await this.database.query("INSERT INTO users (name, group_name, phone, faculty, address, privilege) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", 
            [user.name, user.group, user.phone, user.faculty, user.address, user.privilege]
        );
        return a.rows[0]['id'];
    }

    async remove_user(user_id) {
        await this.database.query("DELETE FROM users WHERE id = $1", [user_id]);
    }

    async get_all_users() {
        const res = await this.database.query("SELECT * FROM users");
        return res.rows;
    }

    async get_user_by_id(user_id) {
        const res = await this.database.query("SELECT * FROM users WHERE id = $1", [user_id]);
        return res.rows[0];
    }

    async update_user(user) {
        await this.database.query("UPDATE users SET name = $1, group_name = $2, phone = $3, faculty = $4, address = $5, privilege = false WHERE id = $6", 
            [user.name, user.group, user.phone, user.faculty, user.address, user.id]);
    }
}

module.exports = UserDAO;