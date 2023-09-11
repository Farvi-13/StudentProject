import {useMemo} from "react";

export const useReviews = (reviews, query) => {

    const searchedReviews = useMemo(() => {
        if(query){
            console.log(query)
            return reviews.filter(review => review.title.toLowerCase().includes(query.toLowerCase()))
        }
        else {
            return reviews;
        }
    }, [query, reviews])

    return searchedReviews;
}
