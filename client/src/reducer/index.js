
const initialState = {
    dogs: [],
}


function rootReducer (state = initialState,action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload
            }

        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperamets: action.payload
            }
    }

}

export default rootReducer;