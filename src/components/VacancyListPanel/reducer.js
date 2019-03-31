import * as actionTypes from './actionTypes';

const initialState = {
    data:           [],
    count:          0,
    page:           0,
    pages:          0,
    per_page:       20,
    isCanFetchData: true,
    nextPage:       0,
    isLoading:      false,
    isHasError:     false,
    hasMoreItems:   true,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_DATA: {
            return {
                ...state,
                isLoading:  true,
                isHasError: false,
                hasMoreItems: false
            };
        }
        case actionTypes.FETCH_DATA_SUCCESS: {
            console.log('state.data', state.data)
            return {
                ...state,
                data:           state.data.concat(action.payload.items),
                count:          action.payload.found,
                page:           action.payload.page,
                nextPage:       action.payload.page+1,
                pages:          action.payload.pages,
                per_page:       action.payload.per_page,
                isLoading:      false,
                isHasError:     false,
                hasMoreItems:   action.payload.page !== action.payload.pages,
                isCanFetchData: false,
            };
        }
        case actionTypes.FETCH_DATA_FAILED: {
            return {
                ...state,
                isLoading:  false,
                isHasError: true,
                hasMoreItems: false
            };
        }


        case actionTypes.FETCH_DATA_MORE: {
            return {
                ...state,
                isLoading:  false,
                isHasError: false,
                hasMoreItems: false,
            };
        }
        case actionTypes.FETCH_DATA_MORE_SUCCESS: {
            return {
                ...state,
                data:           state.data.concat(action.payload.items),
                count:          action.payload.found,
                page:           action.payload.page,
                pages:          action.payload.pages,
                per_page:       action.payload.per_page,
                isLoading:      false,
                isHasError:     false,
                hasMoreItems:   action.payload.page !== action.payload.pages,
                isCanFetchData: false,
            };
        }
        case actionTypes.FETCH_DATA_MORE_FAILED: {
            return {
                ...state,
                isLoading:  false,
                isHasError: true,
                hasMoreItems: false
            };
        }

        case actionTypes.SET_IS_CAN_FETCH_DATA: {
            return {
                ...state,
                isCanFetchData: action.payload,
            };
        }

        case actionTypes.SET_PAGE: {
            return {
                ...state,
                page: action.payload,
            };
        }

    }

    return state;
}

export default reducer;
