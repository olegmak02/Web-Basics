const UserDAO = require('../dao/user_dao');
const CredentialDAO = require('../dao/credential_dao');

class UserService {
    constructor() {
        this.user_dao = new UserDAO();
        this.credential_dao = new CredentialDAO();
    }
    
    async add_user(user) {
        if (!await this.credential_dao.get_user_by_login(user.login)) {
            const credential = {
                login: user.login,
                password: user.password,
            };
            user.privilege = false;
            const id = await this.user_dao.add_user(user);
            credential.user_id = id;
            await this.credential_dao.add_credential(credential);
            return id;
        }
    }

    async get_user_by_id(id) {
        const user = await this.user_dao.get_user_by_id(id);
        return user;
    }

    async get_user_by_login(id) {
        return await this.credential_dao.get_user_by_login(id);
    }

    async update_user(user) {
        const old_user = await this.credential_dao.get_user_by_id(user.id);
        if (!user.password) {
            user.password = old_user.password;
        }
        if (old_user.login != user.login && await this.credential_dao.get_user_by_login(user.login)) {
            return false;
        }
        await this.credential_dao.update_credential({password: user.password, login: user.login, id: user.id});
        await this.user_dao.update_user(user);
        return true;
    }
}

module.exports = UserService;