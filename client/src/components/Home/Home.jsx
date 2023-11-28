import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { getDogs, orderByName, orderByWeight } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";


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

    function handleByName(e){
        e.preventDefault();
        dispatch(orderByName)
    }

    function handleByWeight(e){
        e.preventDefault();
        dispatch(orderByWeight)
    }

    return(
        <div>
            <Link to = "/dog">Create Dog</Link>
            <h1>Aguantes los Dogos</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a Cargar Dogos
            </button>

            <div>
                <select onClick={e=>handleByName}>
                    <option> Alphabetical Order </option>
                    <options value = "asc">Ascendente</options>
                    <options value = "desc">Descendente</options>
                </select>
                <select onClink={e=>handleByWeight}>
                    <option> Filter by Weight </option>
                    <options value="All">Todos</options>
                    <options value="Created">Creados</options>
                    <options value="Existing">Existente</options>
                </select>
                {
                    allDogs && allDogs.map(el=>{
                        return (<Card name={el.name} temperaments={el.temperaments} weight={el.weight} image={el.image}/>)
                    })
                }
            </div>
        </div>
    )
}