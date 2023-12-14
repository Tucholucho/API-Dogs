import React from "react";

export default function Card({name, image, temperaments, weight}) {
    return(
        <div>
            <h3>{name}</h3>
            <h4>{temperaments}</h4>
            <h5>{weight}</h5>
            <img src={image} alt="Image Not Found" width="200px" height="200px"/>
        </div>
    )
}