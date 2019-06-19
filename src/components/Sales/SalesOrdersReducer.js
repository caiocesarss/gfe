const INITIAL_STATE = { 
  list: [],
  salePartyList: [],
  salePartyAccountList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SALES_ORDERS_FETCHED":
      return { ...state, list: action.payload.data }
    case "SALE_PARTIES_FETCHED":
      console.log(action.payload.data);
      return {...state, salePartyList: action.payload.data }
    case "SALE_PARTY_ACCOUNTS_FETCHED":
      console.log(action.payload.data);
      return {...state, salePartyAccountList: action.payload.data }
    default:
      return state
  }
};

