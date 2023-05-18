import { AppState } from '../types';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/themeReducer';
import { theme } from '../styles/theme';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { delay } from 'lodash';
import { asyncStorageHook } from './asyncStorageHook'
export const themeHook = () => {
  const state = useSelector((state: AppState) => state.theme)

  const dispatch = useDispatch()

  const {getItem, setItem} = asyncStorageHook()
  
  const initializeBottomBar = async () => {
    const mode = await getItem("@theme")
    SystemNavigationBar.setNavigationColor(mode === 'light' ? theme.light.background : theme.dark.background)
  }

  const toggleDarkMode = async () => {
          const mode = await getItem("@theme")
          dispatch(actions.setTheme(mode === 'light' ? theme.dark : theme.light))
          delay(() => {
            SystemNavigationBar.setNavigationColor(mode === 'light' ? theme.dark.background : theme.light.background)
          }, 50)
          setItem('@theme', mode === 'light' ? 'dark' : 'light')
    }

    return {
      onChangeTheme: toggleDarkMode,
      Thistheme: state.theme,
      initializeBottomBar
    };
}