import { atom } from "recoil";

const UserRole = atom({
    key: 'UserRole',
    default: 'admin'
});

export default UserRole;