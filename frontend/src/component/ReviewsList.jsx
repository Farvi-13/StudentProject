import React from "react";
import ReviewItem from "./UI/Items/ReviewItem";
import cl from "./componentsStyles/ReviewsList.module.css"
import {Link} from "react-router-dom";
import Loader from "./UI/Loader/Loader";

const ReviewsList = ({reviews, filter, setFilter}) => {

    console.log(reviews);

    return (
        <div className={cl.reviews__wrapper}>
            <div className={cl.searcher}>
                <input className={cl.input__search}
                       value={filter.query}
                       onChange={e => setFilter({...filter, query: e.target.value})}
                       name="text"
                       placeholder="Пошук за назвою..."
                       type="search"/>
            </div>
            {reviews.length
                ?
                <>
                    <div>
                        <h1>Відгуків: {reviews.length}</h1>
                    </div>
                    <div className={cl.all__reviews}>
                        {reviews.map((review, index) =>
                            <ReviewItem key={index} review={review}/>)
                        }
                    </div>
                </>
                : <h1>Не було знайдено відгуків</h1>
            }
        </div>
    );
};

export default ReviewsList;