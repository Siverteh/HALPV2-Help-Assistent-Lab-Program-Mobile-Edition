import React, { createContext, useContext, useState } from 'react';
import { theme } from '../styles/theme';
import { Theme } from '../types/theme';
export const DarkModeContext = createContext<Theme>(theme.dark);



