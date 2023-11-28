import { atom } from "recoil";

const UserName = atom({
    key: 'UserName',
    default: 'Admin'
});

export default UserName;