import {
  DATA_FETCHING_FAIL,
  DATA_FETCHING_SUCCESS,
  DATA_FETCHING_STARTED,
  SVUOTA_CARRELLO,
  DELETE_ITEM,
  AUMENTA_QTY,
  DIMINUISCE_QTY,
  COSTO_TOTALE,
  CONTATORE
} from "./actions";

const reducer = (state, { type, payload }) => {

  if (type === DATA_FETCHING_STARTED) {
    return { ...state, isLoading: true }
  }

  if (type === DATA_FETCHING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      products: payload.map((el) => {
        return { ...el, qty: 1 }
      }),
    }
  }

  if (type === DATA_FETCHING_FAIL) {
    return { ...state, isLoading: false, isError: true }
  }

  if (type === SVUOTA_CARRELLO) {
    return { ...state, products: [] }
  }

  if (type === DELETE_ITEM) {
    return { ...state, products: state.products.filter((el) => el._id !== payload) }
  }


  if (type === AUMENTA_QTY) {
    return {
      ...state,
      products: state.products.map((el) => {
        if (payload === el._id) {
          return { ...el, qty: el.qty + 1 }
        }
        return { ...el }
      })
    }
  }

  if (type === DIMINUISCE_QTY) {
    return {
      ...state,
      products: state.products.map((el) => {
        if (payload === el._id) {
          return { ...el, qty: el.qty - 1 }
        }
        return { ...el }
      })
    }
  }


  /*
       IL METODO REDUCE() DI JAVASCRIPT VIENE UTILIZZATO PER APPLICARE UNA FUNZIONE A OGNI ELEMENTO DI UN ARRAY
       E RESTITUIRE UN SINGOLO VALORE. 
       RIDUCE QUINDI UN ARRAY A UN UNICO VALORE, TIPO LA SOMMA DEI SUOI ELEMENTI 
       O FARLI IN QUALCHE MANIERA INTERAGIRE TRA DI LORO, IL PRIMO PARAMETRO CHE ACCETTA
       E' ALMENO UNA CALLBACK FUNCTION CHE PUO' ACCETTARE ANCHE 4 PARAMETRI, IL PRIMO DEI QUALI
       RAPPRESENTA TENDENZIALMENTE IL VALORE PRECEDENTE RISPETTO ALL'ATTUALE, OVVERO IL VALORE PRECEDENTE 
       DA CUI PARTIRE PER RICOMINCIARE IL CICLO SUCCESSIVO.
       PER CONVENZIONE VIENE DEFINITO ACCUMULATORE, MA IN QUESTO CASO LO CHIAMEREMO TOTAL.
       IL SECONDO PARAMETRO DELLA CALLBACK FUNCTION E' L'ELEMENTO ATTUALE, CHE CHIAMEREMO IN QUESTO CASO ITEM,
       CHE VERRA' AGGIUNTO AL PRIMO TRAMITE LA FORMULA ESPRESSA ALL'INTERNO DELLE GRAFFE, OVVERO IL RETURN.
       VOLENDO SI PUO' AVERE ACCESSO A UN TERZO VALORE, COME L'INDEX E COME QUARTO PARAMETRO L'INTERO ARRAY 
       CON CUI ABBIAMO A CHE FARE.
       IN QUESTO CASO USEREMO SOLO I PRIMI DUE PARAMETRI DEI QUATTRO CHE POTEVAMO 
       CHIAMARE IN CAUSA NELLA CALLBACK FUNCTION, OVVERO TOTAL E ITEM. 
       AVENDO UN ARRAY DI OGGETTI IL PRECEDENTE VALORE SARA' UN OGGETTO, NON UN NUMERO.
       QUINDI IL PRIMO VALORE DEVE ESSERE 0.
       IN PRODUCTS HO FATTO UNO SCHEMA ESEMPLICATIVO DEI VALORI CHE SI HANNO TRA IL PRIMO 
       CICLO, PRIMA LETTURA DEGLI ELEMENTI,  E IL SECONDO CICLO.
    */
  if (type === COSTO_TOTALE) {
    return {
      ...state,
      total: state.products.reduce((total, item) => {
        return total + item.qty * item.price
      }, 0)
    }
  }

  if (type === CONTATORE) {
    return {
      ...state,
      itemCounter: state.products.reduce((total, item) => {
        return total + item.qty
      }, 0)
    }
  }

  return state;
};

export default reducer;
