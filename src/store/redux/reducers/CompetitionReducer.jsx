import {
  FETCH_COMPETITION_DATA_REQUEST,
  FETCH_COMPETITION_DATA_SUCCESS,
  FETCH_COMPETITION_DATA_FAILURE,
  FETCH_CATEGORY_DATA_REQUEST,
  FETCH_CATEGORY_DATA_SUCCESS,
  FETCH_CATEGORY_DATA_FAILURE,
  FETCH_KOI_ENTRIES_REQUEST,
  FETCH_KOI_ENTRIES_SUCCESS,
  FETCH_KOI_ENTRIES_FAILURE,
  UPDATE_KOI_SCORE_REQUEST,
  UPDATE_KOI_SCORE_SUCCESS,
  UPDATE_KOI_SCORE_FAILURE,
  CHECK_COMPETITION_STATUS_REQUEST,
  CHECK_COMPETITION_STATUS_SUCCESS,
  CHECK_COMPETITION_STATUS_FAILURE,
} from '../action/competitionAction';

const initialState = {
  competition: null,
  categories: [],
  koiEntries: [],
  loading: false,
  error: null,
  competitionStatus: null,
};

const competitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPETITION_DATA_REQUEST:
    case FETCH_CATEGORY_DATA_REQUEST:
    case FETCH_KOI_ENTRIES_REQUEST:
    case UPDATE_KOI_SCORE_REQUEST:
    case CHECK_COMPETITION_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMPETITION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        competition: action.payload,
      };
    case FETCH_CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case FETCH_KOI_ENTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        koiEntries: action.payload,
      };
    case UPDATE_KOI_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        koiEntries: state.koiEntries.map(koi =>
          koi.koiId === action.payload.koiId ? { ...koi, score: action.payload.score } : koi
        ),
      };
    case CHECK_COMPETITION_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        competitionStatus: action.payload,
      };
    case FETCH_COMPETITION_DATA_FAILURE:
    case FETCH_CATEGORY_DATA_FAILURE:
    case FETCH_KOI_ENTRIES_FAILURE:
    case UPDATE_KOI_SCORE_FAILURE:
    case CHECK_COMPETITION_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default competitionReducer;