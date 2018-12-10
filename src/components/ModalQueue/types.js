// @flow

import type { Node } from 'react';

// import type { ViewStyle, TextStyle } from 'types/global';
// import type { Contact } from 'types/community';

export type ModalItem = {
  type?: 'notification' | 'actionSheet' | 'custom',
  withOverlay?: ?boolean,
  title?: ?string,
  message?: ?string,
  avatar?: ?string,
  onPress?: ?() => void,
  titleStyle?: any,
  messageStyle?: any,
  duration?: number,
  onCloseBySwipe?: ?() => void,
  render?: ?() => Node,
};
