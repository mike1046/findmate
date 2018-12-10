// @flow

import React, { Fragment } from 'react';
import { TouchableOpacity, View } from 'react-native';

import QuicksandText from '../QuicksandText';
import styles from './styles';

type Props = {
  text: string,
  onPress: (number | string) => void;
  chosenGender: number,
  gender: Object,
};

const renderGenders = (gender, chosenGender, onPress) => {

  const genderKeys = Object.keys(gender);
  const lastItemIndex = genderKeys.length - 1;

  return (
    <View style={styles.genderContainer}>
      {genderKeys.map((item, index) => (
        <TouchableOpacity
          key={item}
          style={[styles.genderButton,
            chosenGender === item && styles.activeGenderButton,
            index !== lastItemIndex && styles.genderButtonLeft,
          ]}
          onPress={() => onPress(item)}
        >
          <QuicksandText style={[styles.genderButtonText,
            chosenGender === item && styles.activeGenderButtonText]}
          >
            {gender[item]}
          </QuicksandText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const GenderPicker = ({ text, onPress, chosenGender, gender } : Props) => (

  <Fragment>
    <QuicksandText style={styles.subHeaderText}>
      {text}
    </QuicksandText>

    {renderGenders(gender, chosenGender, onPress)}

    {/* <View style={styles.genderContainer}>
      <TouchableOpacity
        style={[styles.genderButton,
          styles.genderButtonLeft, chosenGender === 1 && styles.activeGenderButton]}
        onPress={() => onPress(1)}
      >
        <QuicksandText style={[styles.genderButtonText,
          chosenGender === 1 && styles.activeGenderButtonText]}
        >
                  Man
        </QuicksandText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genderButton,
          chosenGender === 2 && styles.activeGenderButton]}
        onPress={() => onPress(2)}
      >
        <QuicksandText style={[styles.genderButtonText,
          chosenGender === 2 && styles.activeGenderButtonText]}
        >
                  Woman
        </QuicksandText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genderButton, styles.genderButtonRight,
          chosenGender === 3 && styles.activeGenderButton]}
        onPress={() => onPress(3)}
      >
        <QuicksandText
          style={[styles.genderButtonText,
            chosenGender === 3 && styles.activeGenderButtonText]}
        >
                  Ladyboy
        </QuicksandText>
      </TouchableOpacity>
    </View> */}
  </Fragment>
);
