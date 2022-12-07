const database = require('../database');

class CredentialDAO {
    constructor() {
        this.database = database;
    }

    async clear() {
        await this.database.query("DELETE FROM credentials");
    }

    async add_credential(credential) {
        await this.database.query("INSERT INTO credentials (login, password, user_id) VALUES ($1, $2, $3)", 
           [credential.login, credential.password, credential.user_id]);
    }
    
    async remove_credential_by_user(user_id) {
        await this.database.query("DELETE FROM credentials WHERE user_id = $1", [user_id]);
    }
    
    async get_user_id_by_credential(credential) {
        const res = await this.database.query("SELECT user_id FROM credentials WHERE login = $1 AND password = $2", [credential.login, credential.password])
            .then(res => res.rows[0]);
        return res ? res['user_id'] : res;
    }

    async get_user_by_login(login) {
        const res = await this.database.query("SELECT user_id FROM credentials WHERE login = $1", [login])
            .then(res => res.rows[0]);
        return res ? res['user_id'] : res;
    }

    async get_user_by_id(id) {
        const res = await this.database.query("SELECT * FROM credentials WHERE user_id = $1", [id])
            .then(res => res.rows[0]);
        return res;
    }

    async get_login_by_user(id) {
        const res = await this.database.query("SELECT login FROM credentials WHERE user_id = $1", [id])
            .then(res => res.rows[0]);
        return res ? res['login'] : res;
    }
    
    async get_user_by_login(id) {
        return await this.database.query("SELECT user_id FROM credentials WHERE login = $1", [id])
            .then(res => res.rows[0]);
    }

    async update_credential(credential) {
        await this.database.query("UPDATE credentials SET login = $1, password = $2 WHERE user_id = $3",
            [credential.login, credential.password, credential.id]);
    }
}

module.exports = CredentialDAO;