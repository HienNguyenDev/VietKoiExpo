import axios from 'axios';
import {
    createNewsAction,
    updateNewsAction,
    removeNewsAction,
    fetchNewsDetailsSuccess,
    fetchNewsDetailsFailure,
    setNewsListAction
} from '../reducers/newsReducer';
import { createNews, updateNews, getNews, getAllNews, deleteNews } from '../../../service/NewsAPI'; // replace with your actual API methods

// async actions
export const createNewsActionApi = (newsDetails) => {
    return async (dispatch) => {
        try {
            const res = await createNews(newsDetails);
            const action = createNewsAction(res.data.content);
            dispatch(action);
            dispatch(fetchAllNews()); // Refetch news after creating
        } catch (error) {
            console.error("News creation failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'NEWS_CREATE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const updateNewsActionApi = (newsId, newsDetails, navigate) => {
    return async (dispatch) => {
        try {
            const res = await updateNews(newsId, newsDetails);
            console.log('API Response:', res.data); // Debugging log
            const action = updateNewsAction(res.data.content);
            dispatch(action);
            dispatch(fetchAllNews()); // Refetch news after updating
            navigate('/admin/manage-news'); // Navigate to the desired URL
        } catch (error) {
            console.error("News update failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'NEWS_UPDATE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const removeNewsActionApi = (newsId) => {
    return async (dispatch) => {
        try {
            await deleteNews(newsId);
            const action = removeNewsAction(newsId);
            dispatch(action);
            dispatch(fetchAllNews()); 
        } catch (error) {
            console.error("News removal failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'NEWS_REMOVE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const fetchNewsDetails = (newsId) => {
    return async (dispatch) => {
        try {
            const res = await getNews(newsId);
            dispatch(fetchNewsDetailsSuccess(res.data.content));
        } catch (error) {
            console.error("Fetching news details failed:", error.response ? error.response.data : error.message);
            dispatch(fetchNewsDetailsFailure(error.response ? error.response.data : error.message));
        }
    };
};

export const fetchAllNews = () => {
    return async (dispatch) => {
        try {
            const res = await getAllNews();
            dispatch(setNewsListAction(res.data)); // Assuming res.data is the array of news
        } catch (error) {
            console.error("Failed to fetch news:", error.response ? error.response.data : error.message);
        }
    };
};