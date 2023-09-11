import React from 'react';
import cl from "./pagesStyles/Welcome.module.css"

const Welcome = () => {

    const text = "Якщо у вас є ідеї, які ви хотіли б реалізувати, але для цього вам не вистачає необхідних навичок, то тут ви зможете запропонувати користувачам приєднатися до вашого проекту і разом дати йому життя!\n" +
        "\n" +
        "На нашій платформі ви знайдете безліч тегів, які допоможуть вам знайти саме того кандидата, якого ви шукаєте – чи то програміста, який напише веб-сайт, чи бізнес-аналітика, який удосконалить вашу ідею. Тут ви також зможете знайти проекти, де зможете випробувати свої професійні навички та пройти спільно з реальною командою!\n" +
        "\n" +
        "В загальних рисах, наш проект – це про отримання досвіду, про співпрацю студентів з різних фахів, що може надати можливості для багатьох стартапів, а також цікавий досвід, який ви зможете включити до свого резюме!\n" +
        "\n" +
        "Цей проект був розроблений командою Initiative Group для студентів з "

    return (
        <div>
            <div className={cl.cube_wrap}>
                <div className={cl.cube} id="cube">
                    <div className={[cl.face, cl.top].join(' ')}></div>
                    <div className={[cl.face, cl.front].join(' ')}></div>
                    <div className={[cl.face, cl.back].join(' ')}></div>
                    <div className={[cl.face, cl.left].join(' ')}></div>
                    <div className={[cl.face, cl.right].join(' ')}></div>
                    <div className={[cl.face, cl.bottom].join(' ')}></div>
                    <div className={cl.inner_wrap}>
                        <div className={[cl.face, cl.inner, cl.inner1].join(' ')}></div>
                        <div className={[cl.face, cl.inner, cl.inner2].join(' ')}></div>
                        <div className={[cl.face, cl.inner, cl.inner3].join(' ')}></div>
                    </div>
                </div>
            </div>
            <div className={cl.textBox}>
                <b className={cl.header}>Ласкаво просимо до IG-Student Service!</b>
                <pre className={cl.text}>
                    <br/>
                    {text} <b className={cl.love}>❤</b>!
                </pre>
            </div>
        </div>
    );
};

export default Welcome;