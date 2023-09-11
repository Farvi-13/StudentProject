import axios from "axios";

export default class ReviewService {

    static async getAllReviews(id, token) {
        try{
            const response =  await axios.get(
                `http://localhost:8080/resume/reviews/${id}`,
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

    static async addResume(resume, token) {
        try{
            const response = axios({
                method: 'post',
                url: "http://localhost:8080/resume/add",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                data: resume
            });
            return response;
        } catch (e) {
            console.log(e)
            return e?.response;
        }
    }

    static async getNumber(ownerId, token){
        try{
            const response =  await axios.get(
                `http://localhost:8080/profile/number/${ownerId}`,
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            return response;
        } catch (e){
            console.log(e)
            return e;
        }
    }

    static async declineReview(userId, imdbId, token){
        try {

            const response = axios({
                method: 'post',
                url: "http://localhost:8080/resume/reviews/delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                data: {
                    "userId": userId,
                    "imdbId": imdbId,
                }
            })
            return response;
        }catch (e){
            console.log(e)
            return e;
        }
    }

    static async getResumeById(resumeId, token){
        try{
            const response =  await axios.get(
                `http://localhost:8080/resume/current/${resumeId}`,
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

    static async getById(id) {
        const response = await axios.get(`http://localhost:8080/publications/searcher/${id}`)
        return response;
    }

}