import { createContext } from 'react';
import { theme } from '../styles/theme';
import { Theme } from '../types/theme';

export const ThemeContext = createContext<Theme>(theme.dark);
