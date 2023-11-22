import { atom } from "recoil";

const userState = atom({
    key: 'userState',
    default: {username: 'Admin', role: 'admin'}
});

export default userState;