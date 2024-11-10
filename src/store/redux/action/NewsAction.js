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
            console.log('Create News API Response:', res.data); // Debugging log
            const action = createNewsAction(res.data.content);
            dispatch(action);
            dispatch(fetchAllNews());
            
            return res.data; // Refetch news after creating
        } catch (error) {
            console.error("News creation failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'NEWS_CREATE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const updateNewsActionApi = (newsId, newsDetails, navigate) => {
    
    return async (dispatch) => {
        try {
            console.log("newsDetailsnewsDetailsnewsDetails",newsDetails)
            const res = await updateNews(newsId, newsDetails);
            console.log('Update News API Response:', res.data); // Debugging log
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
            console.log('Delete News API Response:', newsId); // Debugging log
            const action = removeNewsAction(newsId);
            dispatch(action);
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
            console.log('Fetch News Details API Response:', res.data); // Debugging log
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
            console.log('Fetch All News API Response:', res.data); // Debugging log
            dispatch(setNewsListAction(res.data)); // Assuming res.data is the array of news
        } catch (error) {
            console.error("Failed to fetch news:", error.response ? error.response.data : error.message);
        }
    };
};