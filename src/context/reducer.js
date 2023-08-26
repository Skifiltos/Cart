import {
  DATA_FETCHING_FAIL,
  DATA_FETCHING_SUCCESS,
  DATA_FETCHING_STARTED,
  SVUOTA_CARRELLO,
  DELETE_ITEM,
  AUMENTA_QTY,
  DIMINUISCE_QTY
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


  return state;
};

export default reducer;
