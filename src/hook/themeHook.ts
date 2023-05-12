import { AppState } from '../types';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/themeReducer';
import { Theme } from '../types/theme';
import { theme } from '../styles/theme';


export const themeHook = () => {
  const state = useSelector((state: AppState) => state.theme)

  const dispatch = useDispatch()

  const toggleDarkMode = (themeValue?: Theme) => {
          if(themeValue) {
            dispatch(actions.setTheme(themeValue))
          } else {
            dispatch(actions.setTheme(state.theme === theme.light ? theme.dark : theme.light))
          }
    }

    return {
      onChangeTheme: toggleDarkMode,
      Thistheme: state.theme
    };
}