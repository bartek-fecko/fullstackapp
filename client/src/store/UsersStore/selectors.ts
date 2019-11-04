import { createSelector } from 'reselect';
import AppState from 'config/AppState';
import * as C from './constants';

export const SelectArticles = (state: AppState): C.MainPageArticlesState => (
   state && state.mainPageArticles
);

export const makeFetchSelector = createSelector(
   SelectArticles,
   (articles: C.MainPageArticlesState) => articles && articles.data,
);
