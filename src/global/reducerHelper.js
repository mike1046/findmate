export function makeReducer<State>(
  initialState: State,
  actionType?: ?string,
  customReducer?: ?(state: State, action: *) => State,
  preventClear?: boolean,
) {
  return (state: State = initialState, action: *): State => {
    const { type } = action;
    if (actionType && type === actionType && typeof state === 'object') {
      const { payload } = action;
      return payload ? { ...state, ...payload } : initialState;
    }
    if (type === 'LOGOUT' && !preventClear) {
      return initialState;
    }
    return customReducer ? customReducer(state, action) : state;
  };
}
