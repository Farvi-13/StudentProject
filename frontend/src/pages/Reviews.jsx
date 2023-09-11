import React, {useContext, useEffect, useState} from 'react';
import Loader from "../component/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import ReviewsList from "../component/ReviewsList";
import {AuthContext} from "../context/AuthContext";
import ReviewsService from "../API/ReviewService";
import {useNavigate} from "react-router-dom";
import {usePublications} from "../hooks/usePublications";
import {useReviews} from "../hooks/useReviews";

const Reviews = () => {

    const navigate = useNavigate()
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState({query: ''})
    const searchedReviews = useReviews(reviews, filter.query)
    const {jwt, userId, setIsAuth, setUserId, setJwt} = useContext(AuthContext);

    const [fetchPosts, isReviewLoading, reviewError] = useFetching(async () => {
        const response = await ReviewsService.getAllReviews(userId, jwt);
        if (response.data?.includes("JWT expired at")){
            console.log(response.data);
            localStorage.removeItem("auth")
            localStorage.removeItem("jwt")
            localStorage.removeItem("userId")
            setJwt('')
            setUserId(0)
            setIsAuth(false)
            navigate("/login");
        }
        else {
            setReviews(response.data.reverse());
        }
    })

    console.log(searchedReviews);

    useEffect(() => {
        console.log("USER ID", userId);
        fetchPosts().then(console.log(searchedReviews)).catch(console.log(reviewError))
    }, [])

    return (
        <div style={{marginTop: '60px', minHeight: "100%"}}>
            {reviewError && <div>Something goes wrong</div>}
            {isReviewLoading
                ? <Loader/>
                : <ReviewsList filter={filter} setFilter={setFilter} reviews={searchedReviews}/>
            }
        </div>
    );
};

export default Reviews;