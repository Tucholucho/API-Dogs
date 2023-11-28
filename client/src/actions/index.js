import axios from "axios";


export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs",{

        });
        return dispatch({
            type:"GET_DOGS",
            payload: json.data,
        })
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: "ORDER_BY_WEIGHT",
        payload
    }
}

export function selectByOrigin(payload){
    return{
        type: "SELECT_BY_ORIGIN",
        payload
    }
}