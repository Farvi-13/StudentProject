import {useMemo} from "react";

export const useSortedPublications = (publications, tags) => {

    /*const sortedPublications = useMemo(() => {
        const publicationsWithTags = [];
        if(tags.length){
            for (const publication in publications){
                contains(publication.requirements, tags)
            }
        }
        else{
            return publications;
        }
    }, [tags, publications]);*/

    const sortedPublications = publications.filter(publication => tags.every(t => publication.requirements.includes(t)))
    return sortedPublications;
}

function contains(where, what){
    for(var i=0; i<what.length; i++){
        if(where.indexOf(what[i]) === -1) return false;
    }
    return true;
}

export const usePublications = (publications, query, tags) => {

    const taggedPublications = useSortedPublications(publications, tags)

    const taggedAndSearchedPosts = useMemo(() => {
        if(query){
            return taggedPublications.filter(publications => publications.title.toLowerCase().includes(query.toLowerCase()))
        }
        else {
            return taggedPublications;
        }
    }, [query, taggedPublications])

    return taggedAndSearchedPosts;
}
