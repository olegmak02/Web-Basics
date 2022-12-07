const CredentialDAO = require('../dao/credential_dao');

class CredentialService {
    constructor() {
        this.credential_dao = new CredentialDAO();
    }
    
    async add_credential(credential) {
        if (await this.credential_dao.get_user_id_by_credential(credential)) {
            return false;
        } else {
            await this.credential_dao.add_credential(credential);
            return true;
        }
    }

    async get_user_by_login(login) {
        return await this.credential_dao.get_user_by_login(login);
    }

    async get_login_by_user(id) {
        return await this.credential_dao.get_login_by_user(id);
    }
}

module.exports = CredentialService;