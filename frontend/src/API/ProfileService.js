import axios from "axios";

export default class ProfileService{

    static async setContacts(contacts, token){

        try {

            const response = await axios({
                method: 'post',
                url: "http://localhost:8080/profile/contacts",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: contacts
            });
            return response;

        } catch (e) {
            console.log(e)
            return e?.response;
        }

    }

    static async getOwnerPublications(id, token) {
        try {

            const response = await axios.get(`http://localhost:8080/profile/publications/${id}`,
                {headers: {Authorization: `Bearer ${token}`}}
            );
            return response;

        } catch (e) {
            console.log(e)
            return e?.response;
        }
    }

    static async getMyReviews(id, token) {
        try{

            const response =  await axios.get(
                `http://localhost:8080/profile/reviews/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            return response;

        } catch (e) {
            console.log(e)
            return e?.response;
        }
    }

    static async getCurrentUser(id, token){

        try{
            const response =  await axios.get(
                `http://localhost:8080/profile/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            return response;

        } catch (e) {
            console.log(e)
            return e?.response;
        }
    }


}
