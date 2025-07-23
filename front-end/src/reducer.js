export default function reducer(state = {categ : "all" } , action ) {
    
    switch(action.type){
        case "storeCateg":
            return {...state , categ : action.payload}
        default : 
            return state;
    }
}
