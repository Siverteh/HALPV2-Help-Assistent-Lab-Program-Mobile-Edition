import React, { createContext, useContext, useState } from 'react';
import { theme } from '../styles/theme';
import { Theme } from '../types/theme';
import { AppState } from '../types';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/themeReducer';

export const ThemeContext = createContext<Theme>(theme.dark);

export const themeHook = () => {
    const state = useSelector((state: AppState) => state.theme)

    const dispatch = useDispatch()

    const toggleDarkMode = (themeValue?: Theme) => {
            dispatch(actions.setTheme(themeValue ?? state.theme === theme.light ? theme.dark : theme.light))
      };

      return {
        onChangeTheme: toggleDarkMode,
        Thistheme: state.theme
      };
}