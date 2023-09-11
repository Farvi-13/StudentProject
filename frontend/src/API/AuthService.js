import axios from "axios";

export default class AuthService {

    static async reg(user) {

        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/auth/reg",
            headers: {},
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                phone: user.phone
            }
        });
        return response;
    }

    static async login(user) {
        try {
            const response = await axios({
                method: 'post',
                url: "http://localhost:8080/auth/authenticate",
                headers: {},
                data: {
                    email: user.email,
                    password: user.password,
                }
            });

            return response;
        } catch (e){
            console.log("HERE")
            return e?.response.status
        }
    }

}