import IUser from "../interfaces/User.interface";

const DUMMY_USER: Partial<IUser> = {
    _id: 1,
    name: "Ayush Ranjan",
    email: "ayush.r2345@gmail.com",
    dob: new Date().toLocaleDateString()
}

export default DUMMY_USER;