import { sendNotificationAPI } from '../../api/notifAPI';

// Action Types
const SEND_NOTIFICATION_REQUEST = 'SEND_NOTIFICATION_REQUEST';
const SEND_NOTIFICATION_SUCCESS = 'SEND_NOTIFICATION_SUCCESS';
const SEND_NOTIFICATION_FAILURE = 'SEND_NOTIFICATION_FAILURE';

// Action Creators
const sendNotificationRequest = () => ({
  type: SEND_NOTIFICATION_REQUEST,
});

const sendNotificationSuccess = (data) => ({
  type: SEND_NOTIFICATION_SUCCESS,
  payload: data,
});

const sendNotificationFailure = (error) => ({
  type: SEND_NOTIFICATION_FAILURE,
  payload: error,
});

// Thunk Action
export const sendNotification = (userId, message) => async (dispatch) => {
  dispatch(sendNotificationRequest());
  try {
    const data = await sendNotificationAPI(userId, message);
    dispatch(sendNotificationSuccess(data));
  } catch (error) {
    dispatch(sendNotificationFailure(error));
  }
};