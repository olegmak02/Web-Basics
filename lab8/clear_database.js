const UserDAO = require('./dao/user_dao');
const CredentialDAO = require('./dao/credential_dao');

const user_dao = new UserDAO();
const credential_dao = new CredentialDAO();

(async () => {
    await user_dao.clear();
    await credential_dao.clear();
    process.exit();
})();