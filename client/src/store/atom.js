import {atom} from "recoil";

export const isLoggedIn = atom({
    key: 'isloggedin',
    default: false
})

export const ProfileData = atom({
    key: 'currentuser',
    default: {}
})

export const loader = atom({
    key: 'loader',
    default: false
});

export const loadError = atom({
    key: 'loaderError',
    default: false
})