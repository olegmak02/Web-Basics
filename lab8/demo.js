const UserDAO = require('./dao/user_dao');
const CredentialDAO = require('./dao/credential_dao');

const user_dao = new UserDAO();
const credential_dao = new CredentialDAO();

(async () => {
    await user_dao.clear();
    await credential_dao.clear();
    
    const user1 = {
        name: "user 1",
        group: "group 1",
        phone: "12345",
        faculty: "F 1",
        address: "city 1",
        privilege: false
    }
    
    const user2 = {
        name: "user 2",
        group: "group 1",
        phone: "131213",
        faculty: "F 1",
        address: "city 2",
        privilege: false
    }
    
    const id1 = await user_dao.add_user(user1);
    const id2 = await user_dao.add_user(user2);

    console.log("Expected: {user 1 ...} and {user 2 ...}");
    console.log(await user_dao.get_all_users());
    
    console.log("Expected: {user 2 ...}");
    console.log(await user_dao.get_user_by_id(id2));
    
    await user_dao.remove_user(id2);
    
    console.log("Expected: {user 1 ...}");
    console.log(await user_dao.get_all_users());
    
    const credential1 = {
        login: "login 1",
        password: "pass1",
        user_id: id1,
    };

    const credential2 = {
        login: "lo 1",
        password: "pa1",
        user_id: id1,
    };
    
    await credential_dao.add_credential(credential1);
    
    console.log("Expected: " + id1);
    console.log(await credential_dao.get_user_id_by_credential(credential1));
})();