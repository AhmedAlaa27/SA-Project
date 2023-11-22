import { atom } from "recoil";

const userLogged = atom({
    key: 'userLogged',
    default: true
});

export default userLogged;