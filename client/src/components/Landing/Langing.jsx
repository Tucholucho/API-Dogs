import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos a esta pagina random</h1>
            <Link to = "/home">
                <button> Entrar </button>
            </Link>
        </div>
    )
}