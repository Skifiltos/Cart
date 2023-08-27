import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import {
    DATA_FETCHING_FAIL,
    DATA_FETCHING_STARTED,
    DATA_FETCHING_SUCCESS,
    DELETE_ITEM,
    SVUOTA_CARRELLO,
    AUMENTA_QTY,
    DIMINUISCE_QTY,
    COSTO_TOTALE,
    CONTATORE
} from "./actions";
import axios from "axios";


const url = "https://react--course-api.herokuapp.com/api/v1/data/cart";

const initialState = {
    products: [],
    isLoading: true,
    isError: false,
    total: 0,
    itemCounter: 0,
}
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    // UTILIZZO USEREDUCER CON STATE INIZIALE

    const [state, dispatch] = useReducer(reducer, initialState);

    // CANCELLA UN SINGOLO ELEMENTO
    const deleteItem = (id) => {
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    }

    // SVUOTA IL CARRELLO
    const deleteAll = () => {
        dispatch({
            type: SVUOTA_CARRELLO
        })
    }

    // AUMENTA LA QUANTITA DI UN SINGOLO ELEMENTO
    const addQty = (id) => {
        dispatch({
            type: AUMENTA_QTY,
            payload: id
        })
    }

    const dimQty = (id) => {
        dispatch({
            type: DIMINUISCE_QTY,
            payload: id
        })
    }

    // DATA FETCHING STARTED 
    useEffect(() => {
        // IIFE (funzione invocata ed eseguita non appena dichiarata)
        (async () => {
            dispatch({
                // VARIA LO STATE DI ISLOADING IN TRUE QUALORA FOSSE FALSE
                type: DATA_FETCHING_STARTED
            })
            try {
                const response = await axios.get(url);
                dispatch({
                    type: DATA_FETCHING_SUCCESS,
                    payload: response.data.data
                })
            } catch (error) {
                dispatch({
                    type: DATA_FETCHING_FAIL
                })
            }
        }
        )()
    }, []);

    // AGGIORNA IL COSTO TOTALE E IL NUMERO DI ELEMENTI DENTRO IL CARRELLO
    useEffect(() => {
        dispatch({
            type: COSTO_TOTALE
        })
        dispatch({
            type: CONTATORE
        })
    }, [state.products])


    return (
        <AppContext.Provider value={
            {
                ...state,
                deleteItem,
                deleteAll,
                addQty,
                dimQty
            }
        }>
            {children}
        </AppContext.Provider >
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useGlobalContext };