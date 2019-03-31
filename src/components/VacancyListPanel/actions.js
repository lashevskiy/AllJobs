import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    fetchData() {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            const page = getState().vacancyListPanel.nextPage;

            axios.get('https://api.hh.ru/vacancies',
                {
                    params: {
                        text: 'react',
                        page: page,
                        area: 2
                    }
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
                 });
        };
    },

    // fetchDataMore() {
    //     return (dispatch, getState) => {
    //
    //         console.log('AAAAA')
    //         dispatch({ type: actionTypes.FETCH_DATA_MORE });
    //
    //         const page = getState().vacancyListPanel.page + 1;
    //
    //         dispatch(ActionCreator.setPage(page));
    //
    //         axios.get('https://api.hh.ru/vacancies',
    //             {
    //                 params: {
    //                     text: 'react',
    //                     page: page,
    //                 }
    //             })
    //              .then(function (response) {
    //                  dispatch({ type: actionTypes.FETCH_DATA_MORE_SUCCESS, payload: response.data });
    //              })
    //              .catch(function (error) {
    //                  dispatch({ type: actionTypes.FETCH_DATA_MORE_FAILED, payload: String(error) });
    //              });
    //     };
    // },

    setIsCanFetchData(id) {
        return { type: actionTypes.SET_IS_CAN_FETCH_DATA, payload: id };
    },

    setPage(page) {
        return { type: actionTypes.SET_PAGE, payload: page };
    },

};

export default ActionCreator;
