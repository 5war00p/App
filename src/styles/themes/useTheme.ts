import {useContext} from 'react';
import ThemeContext from './ThemeContext';
import {type ThemeColors} from './types';

function useTheme(): ThemeColors {
    const theme = useContext(ThemeContext);

    if (!theme) {
        throw new Error('ThemeContext was null! Are you sure that you wrapped the component under a <ThemeProvider>?');
    }

    return theme;
}

export default useTheme;
