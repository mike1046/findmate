import {
  SET_ONBOARDING,
  ADD_UPLOADING_PHOTO,
  DELETE_PHOTO_FROM_UPLOAD,
  DELETE_IMAGE,
  ADD_IMAGE_ID,
  ADD_IMAGE_TO_PRIVATE,
  ADD_IMAGE_TO_APPROVED,
  SET_AS_PRIMARY,
  SKIP_ANSWER,
  SAVE_ANSWER,
  CHANGE_ANSWER,
  TOGGLE_QUESTIONS_ANSWERED,
  RETURN_TO_SKIPPED,
} from '../actions/onboarding';
import { makeReducer } from '../../global/reducerHelper';

const initialState = {
  isFetching: false,
  isLoading: false,
  renderLocation: 'closest',
  closestLocation: {},
  nearbyLocations: {},
  searchLocations: {},
  uploadingPhotos: [],
  approvedPhotos: [],
  privatePhotos: [],
  fbPhotos: [],
  mailMessage: null,
  passwordMessage: null,
  questions: {},
  selectedPickers: {},
  emailSent: null,
};

export default makeReducer(initialState, SET_ONBOARDING, (state = initialState, {
  type,
  content,
  imageId,
  answer,
  questionId,
  userHasUnansweredQuestions,
}) => {
  switch (type) {
    case ADD_UPLOADING_PHOTO:
      return {
        ...state,
        uploadingPhotos: [...state.uploadingPhotos, content],
      };
    case DELETE_PHOTO_FROM_UPLOAD: {
      const copyUpload = [...state.uploadingPhotos];
      const filteredUpload = copyUpload.filter(item => item.inctanceId !== content.inctanceId);
      return {
        ...state,
        uploadingPhotos: filteredUpload,
      };
    }
    case ADD_IMAGE_ID: {
      return {
        ...state,
        uploadingPhotos: state.uploadingPhotos.map(item => (item.inctanceId === content.inctanceId)
          ? { ...item, imageId } : item),
      };
    }
    case ADD_IMAGE_TO_PRIVATE: {
      const copyUpload = [...state.uploadingPhotos];
      const filteredUpload = copyUpload.filter(item => item.imageId !== content.imageId);
      return {
        ...state,
        uploadingPhotos: filteredUpload,
        privatePhotos: [...state.privatePhotos, content],
      };
    }
    case ADD_IMAGE_TO_APPROVED: {
      const copyUpload = [...state.uploadingPhotos];
      const filteredUpload = copyUpload.filter(item => item.imageId !== content.imageId);
      return {
        ...state,
        uploadingPhotos: filteredUpload,
        approvedPhotos: [...state.approvedPhotos, content],
      };
    }
    case DELETE_IMAGE: {
      return {
        ...state,
        privatePhotos: state.privatePhotos.filter(item => item.imageId !== imageId),
      };
    }
    case SET_AS_PRIMARY: {
      return {
        ...state,
        approvedPhotos: state.approvedPhotos.map(item => (item.imageId === imageId)
          ? { ...item, isPrimary: true } : { ...item, isPrimary: false }),
      };
    }
    case SKIP_ANSWER: {
      return {
        ...state,
        questions: { ...state.questions,
          basicQuestions: { ...state.questions.basicQuestions,
            [questionId]: {
              ...state.questions.basicQuestions[questionId], skipped: true,
            } },
        },
      };
    }
    case SAVE_ANSWER: {
      return {
        ...state,
        questions: { ...state.questions,
          basicQuestions: { ...state.questions.basicQuestions,
            [questionId]: {
              ...state.questions.basicQuestions[questionId], isAnswered: true, userAnswer: answer,
            } },
        },
      };
    }
    case CHANGE_ANSWER: {
      return {
        ...state,
        questions: { ...state.questions,
          basicQuestions: { ...state.questions.basicQuestions,
            [questionId]: {
              ...state.questions.basicQuestions[questionId], isAnswered: false, skipped: false,
            } },
        },
      };
    }
    case TOGGLE_QUESTIONS_ANSWERED:
      return {
        ...state,
        questions: { ...state.questions,
          userHasUnansweredQuestions,
        },
      };
    case RETURN_TO_SKIPPED: {
      const nextBasicQuestions = {};
      const keys = Object.keys(state.questions.basicQuestions);
      keys.forEach((key) => {
        nextBasicQuestions[key] = { ...state.questions.basicQuestions[key], skipped: false };
      });
      return {
        ...state,
        questions: { ...state.questions,
          basicQuestions: nextBasicQuestions,
        },
      };
    }
    default:
      return state;
  }
});
