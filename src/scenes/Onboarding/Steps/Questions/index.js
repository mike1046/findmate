// @flow

import React, { PureComponent, Fragment } from 'react';
import {
  View,
  TouchableOpacity,
  Picker,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { SaveAnswerRequest, SkipAnswerRequest, ChangeAnswer } from '../../../../redux/types/onboarding';

import { navigation, screens } from '../../../../global';

import { getQuestions, setOnboarding, saveAnswerRequest, skipAnswerRequest, toggleQuestionsAnswered,
  changeAnswer, checkIfUnunsweredLeft, skipQuestionsStep,
} from '../../../../redux/actions/onboarding';
import { BackgroundOnboarding, QuicksandText, SettingsCard, Button } from '../../../../components';
import styles from './styles';

type Props = {
  navigation: Object,
  onboarding: Object,
  selectedPickers: Object,
  getQuestions: () => void,
  setOnboarding: (Object) => void,
  questions: Object,
  saveAnswerRequest: SaveAnswerRequest,
  skipAnswerRequest: SkipAnswerRequest,
  skipQuestionsStep: () => void,
  changeAnswer: ChangeAnswer,
  checkIfUnunsweredLeft: () => void,
  toggleQuestionsAnswered: (Object) => void,
};

type State = {
  isSettingsOpened: boolean,
}

class UnconnectedQuestions extends PureComponent<Props, State> {

  state = {
    isSettingsOpened: false,
  };

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  onCloseModal = () => {
    this.setState(
      {
        isSettingsOpened: false,
      },
    );
  }

  onPressSignIn = () => {
    navigation.reset(screens.login);
  }

  onPressMenu = () => {
    const { isSettingsOpened } = this.state;
    this.setState({ isSettingsOpened: !isSettingsOpened });
  }

  onPressItemAtAnswersList = (answer, questionId) => {
    const { answerId } = answer;
    const { saveAnswerRequest } = this.props;
    saveAnswerRequest({ answerId, questionId, answer });
  }

  onPressSaveButton = () => {

  }

  renderAnswersList = (answers, questionId) => {
    const { skipAnswerRequest, questions } = this.props;
    let userAnswerId = -1;
    if (questions.basicQuestions[questionId].userAnswer) {
      const { answerId } = questions.basicQuestions[questionId].userAnswer;
      userAnswerId = answerId;
    }
    return (
      <View>
        {answers.map((answer) => {
          const isChosen = userAnswerId === answer.answerId;
          return (
            <TouchableOpacity
              key={answer.answerId}
              style={[styles.questionListItem, isChosen && styles.chosenQuestionListItem]}
              onPress={() => this.onPressItemAtAnswersList(answer, questionId)}
            >
              <QuicksandText
                style={[isChosen && styles.chosenItemText]}
              >
                {answer.answerQuestionFormat}
              </QuicksandText>
            </TouchableOpacity>
          );
        })
    }
        <QuicksandText
          style={styles.skip}
          onPress={() => skipAnswerRequest({ questionId })}
        >
        Skip this question
        </QuicksandText>
      </View>);
  }

  renderAnswersDropdown = (answers, questionId) => {
    const {
      props: {
        saveAnswerRequest,
        selectedPickers,
        setOnboarding,
      },
    } = this;
    const selectedValue = selectedPickers[questionId];
    return (
      <Fragment>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(item) => {
              const copySelectedPickers = { ...selectedPickers, [questionId]: item };
              setOnboarding({ 'selectedPickers': copySelectedPickers });
            }}
          >
            {answers.map(answer => (
              <Picker.Item
                label={answer.answerQuestionFormat}
                value={answer.answerId}
                key={answer.answerId}
              />
            ))}
          </Picker>
        </View>
        <Button
          text="Save"
          onPress={() => {
            const selectedAnswer = answers.find(
              answer => answer.answerId === selectedPickers[questionId],
            );
            saveAnswerRequest({ answerId: selectedValue, questionId, answer: selectedAnswer });
          }}
        />
      </Fragment>
    );
  }

  onPressDoneAnswering = () => {
    const { checkIfUnunsweredLeft } = this.props;
    checkIfUnunsweredLeft();
  }

  renderQuestionsOneByOne = () => {
    const {
      props: {
        questions,
      },
    } = this;

    if (questions.basicQuestions) {
      const { basicQuestions } = questions;
      const questionForRender = this.findNextQuestion(basicQuestions);
      if (questionForRender) {
        const { questionQuestionFormat, displayFormat, answers,
          questionId } = basicQuestions[questionForRender];
        return (
          <View>
            <QuicksandText style={styles.question}>
              {questionQuestionFormat}
            </QuicksandText>
            {displayFormat === 'list' && this.renderAnswersList(answers, questionId) }
            {displayFormat === 'dropdown' && this.renderAnswersDropdown(answers, questionId)}
          </View>
        );
      } return null;
    }
  }

  findNextQuestion = (basicQuestions) => {
    const keysQuestions = Object.keys(basicQuestions);
    return keysQuestions.find(key => !basicQuestions[key].isAnswered
      && !basicQuestions[key].skipped);
  }

  onPressFormItem = (questionId) => {
    const {
      props: {
        toggleQuestionsAnswered,
        changeAnswer,
      },
    } = this;
    changeAnswer({ questionId });
    toggleQuestionsAnswered({ userHasUnansweredQuestions: true });
  }

  renderForm = () => {
    const {
      props: {
        questions,
      },
    } = this;
    if (questions.basicQuestions) {
      const { basicQuestions } = questions;
      const keys = Object.keys(basicQuestions);
      const lastIndex = keys.length - 1;
      return (
        <Fragment>
          {keys.map((key, index) => (
            <Fragment
              key={key}
            >
              <TouchableOpacity
                key={index}
                style={[styles.formItem]}
                onPress={() => this.onPressFormItem(key)}
              >
                <QuicksandText style={styles.questionTitle}>
                  {basicQuestions[key].questionTitle}
                </QuicksandText>
                <QuicksandText
                  style={styles.userAnswer}
                  multiline
                >
                  {basicQuestions[key].userAnswer ? basicQuestions[key].userAnswer.answerTitle : ''}
                </QuicksandText>
              </TouchableOpacity>
              {index !== lastIndex
               && (
               <View
                 key="separator"
                 style={styles.separator}
               />
               ) }
            </Fragment>
          ))}
        </Fragment>
      );
    }

  }

  onPressDoThisLater = () => {
    const { skipQuestionsStep } = this.props;
    skipQuestionsStep();
  }

  goBack = () => {
    navigation.goBack();
  }

  render() {

    const {
      state: {
        isSettingsOpened,
      },
      props: {
        questions,
        navigation,
      },
    } = this;
    let settings = false;
    if (navigation.state.params) {
      const { fromSettings } = navigation.state.params;
      if (fromSettings) {
        settings = true;
      }
    }
    return (
      <View style={styles.container}>

        <BackgroundOnboarding
          onCloseModal={this.onCloseModal}
          onPressMenu={this.onPressMenu}
          onPressMenuButton={settings ? this.goBack : this.onPressSignIn}
          isSettingsOpened={isSettingsOpened}
          buttonMenuText={settings ? 'Go back' : 'Sign In'}
        >
          { questions
            && (
              <SettingsCard
                header="Your Profile"
                textButton="Do this later"
                onPressTextButton={this.onPressDoThisLater}
              >
                <View style={styles.cardContent}>
                  <ScrollView>
                    {questions.userHasUnansweredQuestions && this.renderQuestionsOneByOne()}
                    {!questions.userHasUnansweredQuestions && this.renderForm()}
                  </ScrollView>
                  {!questions.userHasUnansweredQuestions && questions.basicQuestions
                  && (
                  <Button
                    text="Done answering questions"
                    onPress={this.onPressDoneAnswering}
                    marginVertical={20}
                  />
                  ) }
                </View>
              </SettingsCard>
            )
        }

        </BackgroundOnboarding>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  onboarding: state.onboarding,
  questions: state.onboarding.questions,
  selectedPickers: state.onboarding.selectedPickers,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveAnswerRequest,
    getQuestions,
    skipAnswerRequest,
    changeAnswer,
    toggleQuestionsAnswered,
    checkIfUnunsweredLeft,
    skipQuestionsStep,
    setOnboarding,
  }, dispatch,
);

export const Questions = connect(mapStateToProps, mapDispatchToProps)(UnconnectedQuestions);
