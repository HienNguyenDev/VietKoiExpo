import { NEWS_CREATE, NEWS_UPDATE, NEWS_REMOVE, NEWS_LIST } from '../../../util/config';
import { createNews, updateNews, getNews, deleteNews, getAllNews } from '../../../service/NewsAPI';


// Create News
export const createNewsAction = (newsData) => {
    return async (dispatch) => {
        try {
            const response = await createNews(newsData);
            dispatch({
                type: NEWS_CREATE,
                payload: response.data
            });
        } catch (error) {
            console.error('Error creating news:', error);
        }
    };
};

// Update News
export const updateNewsAction = (newsId, newsData) => {
    return async (dispatch) => {
        try {
            const response = await updateNews(newsId, newsData);
            dispatch({
                type: NEWS_UPDATE,
                payload: response.data
            });
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };
};

// Read News
export const getNewsAction = (newsId) => {
    return async (dispatch) => {
        try {
            const response = await getNews(newsId);
            dispatch({
                type: NEWS_LIST,
                payload: response.data
            });
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };
};

export const getAllNewsAction = () => {
    return async (dispatch) => {
        try {
            const response = await getAllNews();
            dispatch({
                type: NEWS_LIST,
                payload: response.data
            });
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };
};

// Delete News
export const deleteNewsAction = (newsId) => {
    return async (dispatch) => {
        try {
            await deleteNews(newsId);
            dispatch({
                type: NEWS_REMOVE,
                payload: newsId
            });
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };
};