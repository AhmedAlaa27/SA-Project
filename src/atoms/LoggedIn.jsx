import { atom } from "recoil";

const userLogged = atom({
    key: 'userLogged',
    default: false
});

export default userLogged;