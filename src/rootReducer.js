import { combineReducers } from 'redux';

import VacancyListPanel from './components/VacancyListPanel/reducer';
import VacancyPanel from './components/VacancyPanel/reducer';
import EmployerPanel from './components/EmployerPanel/reducer';

export const rootReducer = combineReducers({
    vacancyListPanel: VacancyListPanel,
    vacancyPanel: VacancyPanel,
    employerPanel: EmployerPanel,
});
