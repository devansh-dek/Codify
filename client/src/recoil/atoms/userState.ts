import { atom } from 'recoil';
const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: {
        userId: 0,
        username: '',
        email: '',
        isAuthenticated: false,
    }, // default value (aka initial value)
});
export default userState;
