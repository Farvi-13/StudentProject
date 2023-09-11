import React from 'react';
import PublicationItem from "./UI/Items/PublicationItem";
import cl from "./componentsStyles/PublicationsList.module.css"
import Tag from "./UI/Tags/Tag";

const PublicationsList = ({publications, filter, setFilter}) => {

    const click = (e) => {
        console.log(e.target.id)
        console.log(e.target.checked)
        if (e.target.checked) {
            console.log("HEREBROOO")
            setFilter(prev => ({...prev, tags: [...prev.tags, e.target.id]}))
        } else {
            const newFilter = filter.tags.filter(f => f !== e.target.id)
            setFilter({filter, tags: newFilter})
        }
    }

    return (

        <div className={cl.publications__wrapper}>
            <div className={cl.all__publications}>
                <div className={cl.searcher}>
                    <input className={cl.input__search}
                           value={filter.query}
                           onChange={e => setFilter({...filter, query: e.target.value})}
                           name="text"
                           placeholder="Пошук за назвою..."
                           type="search"/>
                </div>
                {publications.length
                    ? publications.map((publication, index) =>
                    <PublicationItem key={index} publication={publication}/>)
                    : <h2>Не було знайдено жодної публікації</h2>
                }
            </div>
            <div className={cl.tags}>
                <h3>Програмування:</h3>
                <div className={cl.tagsLangContainer}>
                    <div className={cl.tagsLang}>
                        <Tag click={click} id="Java">Java</Tag>
                        <Tag click={click} id="React.js">React.js</Tag>
                        <Tag click={click} id="Angular.js">Angular.js</Tag>
                        <Tag click={click} id="Node.js">Node.js</Tag>
                        <Tag click={click} id="Python">Python</Tag>
                        <Tag click={click} id="Assembler">Assembler</Tag>
                        <Tag click={click} id="Kotlin">Kotlin</Tag>
                        <Tag click={click} id="JavaScript">JavaScript</Tag>
                    </div>
                    <div className={cl.tagsLang}>
                        <Tag click={click} id="Vue.js">Vue.js</Tag>
                        <Tag click={click} id="Unreal">Unreal</Tag>
                        <Tag click={click} id="Ruby">Ruby</Tag>
                        <Tag click={click} id=".Net">.Net</Tag>
                        <Tag click={click} id="C++">C++</Tag>
                        <Tag click={click} id="GO">GO</Tag>
                        <Tag click={click} id="C#">C#</Tag>
                        <Tag click={click} id="C">C</Tag>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PublicationsList;