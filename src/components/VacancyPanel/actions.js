import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    fetchData(vacancy_id) {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            //const vacancy_id = getState().vacancyListPanel.nextPage;

            axios.get(`https://api.hh.ru/vacancies/${vacancy_id}`)
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
                 });
        };
    },

    clearData() {
        return { type: actionTypes.CLEAR_DATA };
    },

    setPlaceId(id) {
        return { type: actionTypes.SET_PLACE_ID, payload: id };
    },

    setBackPanel(back) {
        return { type: actionTypes.SET_BACK_PANEL, payload: back };
    },
};

export default ActionCreator;
