// @flow

import {
  NavigationActions,
  StackActions,
  type NavigationNavigateAction,
  type NavigationParams,
  type NavigationResetAction,
  type NavigationBackAction,
} from 'react-navigation';

let mainNavigator: Object | void;

function setNavigator(navigator: ?Object) {
  if (navigator) {
    mainNavigator = navigator;
  }
}

const navigate = (routeName: string, params?: Object) => {
  if (mainNavigator && routeName) {
    if (!mainNavigator.state || !mainNavigator.state.nav) return;
    const { routes } = mainNavigator.state.nav;
    const lastRoute = routes[routes.length - 1];
    if (lastRoute.routeName !== routeName) {
      const action = NavigationActions.navigate({ routeName, params });
      mainNavigator.dispatch(action);
    }
  }
};

const goBack = () => {
  if (mainNavigator) {
    const action = NavigationActions.back({});
    mainNavigator.dispatch(action);
  }
};

function reset(routeName?: string | string[], params?: Object) {
  if (mainNavigator) {
    const { _navigation } = mainNavigator;
    let action: NavigationResetAction | NavigationBackAction;
    if (routeName) {
      const actions: NavigationNavigateAction[] = [];
      let index: number;
      if (Array.isArray(routeName)) {
        index = routeName.length - 1;
        routeName.forEach((rn, i) => {
          const payload: {
            routeName: string,
            params?: ?NavigationParams,
            action?: ?NavigationNavigateAction,
            key?: string,
          } = { routeName: rn };
          if (i === index && params) {
            payload.params = params;
          }
          actions.push(NavigationActions.navigate(payload));
        });
      } else {
        actions.push(NavigationActions.navigate({ routeName, params }));
        index = 0;
      }
      action = StackActions.reset({ actions, index });
    } else {
      action = NavigationActions.back({ key: _navigation.state.routes[1].key });
    }
    _navigation.dispatch(action);
  }
}

function close(routeName: string) {
  if (mainNavigator) {
    const { _navigation } = mainNavigator;
    const { routes, index } = _navigation.state;
    if (routes[index].routeName === routeName) {
      _navigation.pop();
    }
  }
}

function getCanNavigateBack(): boolean {
  if (mainNavigator) {
    return mainNavigator._navigation.state.index > 0;
  }
  return false;
}

function isHaveRouteName(routeName: string): boolean {
  return mainNavigator ? mainNavigator._navigation.state.routes.some(
    route => route.routeName === routeName,
  ) : false;
}

export default {
  setNavigator,
  navigate,
  goBack,
  reset,
  close,
  getCanNavigateBack,
  isHaveRouteName,
};
