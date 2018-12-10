// @flow

type SaveAnswerPayload = {|
  questionId: string,
  answerId: string,
  answer: Object,
|};
export type SaveAnswerAction = {|
  type: 'SAVE_ANSWER',
  ...SaveAnswerPayload,
|};
export type SaveAnswer = (payload: SaveAnswerPayload) => SaveAnswerAction;

type SaveAnswerRequestPayload = {|
  questionId: string,
  answerId: string,
  answer: Object,
|};
export type SaveAnswerRequestAction = {|
  type: 'SAVE_ANSWER_REQUEST',
  ...SaveAnswerRequestPayload,
|};
export type SaveAnswerRequest = (payload: SaveAnswerRequestPayload) => SaveAnswerRequestAction;

type SkipAnswerPayload = {|
  questionId: string,
|};

export type SkipAnswerAction = {|
  type: 'SKIP_ANSWER',
  ...SkipAnswerPayload,
|};
export type SkipAnswer = (payload:
  SkipAnswerPayload) => SkipAnswerAction;

  type ToggleQuestionsAnsweredPayload = {|
    userHasUnansweredQuestions: boolean,
  |};

export type ToggleQuestionsAnsweredAction = {|
    type: 'TOGGLE_QUESTIONS_ANSWERED',
    ...ToggleQuestionsAnsweredPayload,
  |};

export type ToggleQuestionsAnswered = (payload:
    ToggleQuestionsAnsweredPayload) => ToggleQuestionsAnsweredAction;

type ChangeAnswerPayload = {|
  questionId: string,
|};

export type ChangeAnswerAction = {|
  type: 'CHANGE_ANSWER',
  ...ChangeAnswerPayload,
|};
export type ChangeAnswer = (payload:
  ChangeAnswerPayload) => ChangeAnswerAction;

  type SkipAnswerRequestPayload = {|
    questionId: string,
  |};

export type SkipAnswerRequestAction = {|
    type: 'SKIP_ANSWER_REQUEST',
    ...SkipAnswerRequestPayload,
  |};
export type SkipAnswerRequest = (payload:
    SkipAnswerRequestPayload) => SkipAnswerRequestAction;
