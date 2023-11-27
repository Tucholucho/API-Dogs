import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { getDogs } from "../../actions";
import { Link } from "react-router-dom";


export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector ((state) => state.dogs)

    useEffect(()=>{
        dispatch(getDogs());
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return(
        <div>
            <Link to = "/dog">Create Dog</Link>
            <h1>Aguantes los Dogos</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a Cargar Dogos
            </button>

            <div>
                <select>
                    <options value = "asc">Ascendente</options>
                    <options value = "desc">Descendente</options>
                </select>
                <select onClink>
                    <options value="All">Todos</options>
                    <options value="Created">Creados</options>
                    <options value="Existing">Existente</options>
                </select>
            </div>
        </div>
    )
}