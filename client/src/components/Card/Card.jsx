import React from "react";

export default function Card({name, image, temperaments, weight}) {
    return(
        <div>
            <h2>{name}</h2>
            <h3>{temperaments}</h3>
            <h4>{weight}</h4>
            <img src={image} alt="Image Not Found" width="200px" height="200px"/>
        </div>
    )
}