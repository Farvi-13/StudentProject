import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import PublicationService from "../API/PublicationService";
import PublicationsList from "../component/PublicationsList";
import Loader from "../component/UI/Loader/Loader";
import {usePublications} from "../hooks/usePublications";

const Publications = () => {

    const [publications, setPublications] = useState([]);
    const [filter, setFilter] = useState({query: '', tags: []})
    const searchedAndTaggedPublications = usePublications(publications, filter.query, filter.tags)

    const [fetchPosts, isPublicationLoading, publicationError] = useFetching(async () => {
        const response = await PublicationService.getAll();
        setPublications(response.data.reverse());
    })

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div style={{marginTop: '60px', minHeight: "100%"}}>
            {publicationError &&
                <h1>Something goes wrong: ${publicationError}</h1>}
            <PublicationsList filter={filter} setFilter={setFilter} publications={searchedAndTaggedPublications}/>
            {isPublicationLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
            }
        </div>
    );
};

export default Publications;