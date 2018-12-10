// @flow

import React, { PureComponent, Fragment, type Element, type Node } from 'react';
import {
  Animated, PanResponder, TouchableOpacity, View, Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import QuicksandText from '../QuicksandText';
import { constants, colors } from '../../global';
import type { ModalItem } from './types';

import { styles } from './styles';

type Props = {
};

type State = {
  queue: ModalItem[],
  height: number,
};

const STATUSBAR_HEIGHT = constants.barHeight;
const PROGRESS_BAR_WIDTH = constants.width - 20;

const SWIPE_THRESHOLD = 100;

const openedTranslateY = 40 - constants.height;

let ref: *;

export class ModalQueue extends PureComponent<Props, State> {
  isClosing = false;

  timerForClose: ?TimeoutID;

  translateXAnimatedValue = new Animated.Value(0);
  translateYAnimatedValue = new Animated.Value(0);
  // timeoutAnimatedValue = new Animated.Value(PROGRESS_BAR_WIDTH);
  timeoutAnimatedValue = new Animated.Value(1);

  translateYAnimation: ?any;
  timeoutAnimation: ?any;

  state = {
    queue: [],
    height: 0,
  };

  get currentItem() {
    const { queue } = this.state;
    return queue[0];
  }

  componentDidMount() {
    ref = this;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { currentItem } = this;
    const prevItem = prevState.queue[0];
    if (currentItem && currentItem !== prevItem) {
      if (currentItem.type === 'custom') {
        reactotron.log('component did update type custom');
        this.animateTo(1);
      }
    }
  }

  animateTo = (value: number, callback?: ?any, duration?: number = 1000) => {
    reactotron.log('INSIDE ANIMATE TO');
    if (this.isClosing) {
      return;
    }
    const { translateYAnimation } = this;
    if (translateYAnimation) {
      translateYAnimation.stop();
    }
    this.translateYAnimation = Animated.timing(this.translateYAnimatedValue, {
      toValue: value,
      duration,
      useNativeDriver: true,
    }).start(callback);
  };

  close = () => {
    reactotron.log('close');
    const {
      state: { height },
      currentItem,
      translateYAnimatedValue,
      timeoutAnimatedValue,
    } = this;
    this.animateTo(-constants.height - height, () => {
      this.isClosing = false;
      translateYAnimatedValue.setValue(0);
      timeoutAnimatedValue.setValue(1);
      this.setState(({ queue }) => ({
        queue: queue.filter(item => item !== currentItem),
      }));
    });
    this.isClosing = true;
  };

  onPanResponderMove = (e: Object, { dx }: any) => {
    reactotron.log({ dx });
    this.translateXAnimatedValue.setValue(dx);
  };

  onPanResponderRelease = (e: Object, { dx }: any) => {
    if (dx < -SWIPE_THRESHOLD || dx > SWIPE_THRESHOLD) {
      this.close();
    } else {
      Animated.spring(this.translateXAnimatedValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  };

  panHandler = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (e, { dx }) => Math.abs(dx) > 5,
    onPanResponderMove: this.onPanResponderMove,
    onPanResponderRelease: this.onPanResponderRelease,
  });

  onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: any) => {
    this.setState(
      () => ({ height }),
      () => {
        const { currentItem } = this;
        if (currentItem) {
          reactotron.log('inside if current item at onLayout');
          this.translateXAnimatedValue.setValue(0);
          this.translateYAnimatedValue.setValue(-constants.height - height);
          this.animateTo(openedTranslateY, () => {
            if (currentItem === this.currentItem) {
              this.timerForClose = setTimeout(() => {
                if (currentItem === this.currentItem) {
                  this.close();
                  this.timerForClose = null;
                }
              }, 5000);
            }
          });
          Animated.timing(this.timeoutAnimatedValue, {
            toValue: 0,
            duration: 5000,
            direction: 'reverse',
            useNativeDriver: true,
          }).start();
        }
      },
    );

  };

  renderNotification = () => {
    reactotron.log('RENDER NOTIFICATION');
    const {
      timeoutAnimatedValue,
      currentItem: {
        title, message, onPress, titleStyle, messageStyle, avatar,
      },
    } = this;
    let onNotificationPress: ?() => void;
    let activeOpacity: number;
    if (onPress) {
      onNotificationPress = () => {
        onPress();
        this.close();
      };
      activeOpacity = 0.5;
    } else {
      activeOpacity = 1;
    }

    reactotron.log('timeoutAnimatedValue');
    reactotron.log(timeoutAnimatedValue);

    const progressBarContainerStyles = [
      styles.progressBarContainer,
      {
        transform: [{
          scaleX: this.timeoutAnimatedValue,
        },
        {
          translateX: this.timeoutAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-PROGRESS_BAR_WIDTH, 0],
          }),
        },
        ],
      },
    ];
    return (
      <Fragment>
        <View
          onPress={onNotificationPress}
          activeOpacity={activeOpacity}
          style={styles.notification}
          testID="notification"
        >
          <View style={styles.header}>
            <Image source={{ uri: avatar }} style={styles.logo} />
            <QuicksandText style={styles.headerTitle}>
              {title}
            </QuicksandText>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.close}
            >
              <Icon name="close" size={30} color={colors.black} />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={progressBarContainerStyles}
          />
        </View>
      </Fragment>
    );
  };

  render() {
    const { currentItem } = this;
    if (!currentItem) {
      return null;
    }
    const { title, message,
    } = currentItem;

    let key = '';
    if (title) {
      key += title;
    }
    if (message) {
      key += message;
    }

    const outputRange: Array<number> = [0, 1, 0];
    const contentContainerStyles = [
      styles.contentContainer,
      {
        top: constants.height,
        transform: [
          {
            translateX: this.translateXAnimatedValue,
          },
          {
            translateY: this.translateYAnimatedValue,
          },
        ],
        opacity: this.translateXAnimatedValue.interpolate({
          inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
          outputRange,
        }),
      },
    ];
    const content: Node = this.renderNotification();

    const contentContainer: Element<*> = (
      <Animated.View
        style={contentContainerStyles}
        onLayout={this.onLayout}
        key={key}
        {...this.panHandler.panHandlers}
      >
        {content}
      </Animated.View>
    );

    return contentContainer;
  }
}

export function showModal(modalItem: $Shape<ModalItem>) {
  reactotron.log('inside show modal');
  if (ref) {
    reactotron.log('inside if ref');
    const { state: { queue }, timerForClose } = ref;
    if (timerForClose) {
      clearTimeout(timerForClose);
      ref.timerForClose = null;
    }
    if (modalItem.type === 'custom') {
      reactotron.log('inside if modal type custom');
      const setState = () => {
        reactotron.log('using set state');
        if (ref) {
          ref.setState(({ queue: currentQueue }) => ({
            queue: [modalItem, ...currentQueue],
          }));
        }
      };
      const { currentItem } = ref;
      reactotron.log({ currentItem });
      if (currentItem) {
        reactotron.log('inside if current item');
        reactotron.log({ currentItem });
        if (currentItem.type === 'custom') {
          reactotron.log('inside if current item TYPE');
          reactotron.log({ modalItem });
          ref.setState(
            ({ queue: currentQueue }) => {
              if (currentQueue.length) {
                const [firstItem, ...other] = currentQueue;
                const nextQueue = [];
                if (firstItem.type === 'custom') {
                  nextQueue.push(firstItem, modalItem);
                } else {
                  nextQueue.push(modalItem);
                }
                nextQueue.push(...other);
                reactotron.log({ nextQueue });
                return {
                  queue: nextQueue,
                };
              }
              return {
                queue: [modalItem],
              };
            },
            () => {
              if (ref) {
                ref.close();
              }
            },
          );
        } else {
          ref.animateTo(0, setState);
        }
      } else {
        setState();
      }
    } else {
      if (queue.length > 0) {
        ref.close();
      }
      ref.setState(({ queue: currentQueue }) => ({
        queue: [...currentQueue, modalItem],
      }));
    }
  }
}

export function closeModal() {
  if (ref) {
    ref.close();
  }
}

export function clearModalQueue() {
  if (ref) {
    const {
      state: { queue },
    } = ref;
    if (queue.length) {
      ref.close();
      ref.setState(() => ({
        queue: [],
      }));
    }
  }
}
