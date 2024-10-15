import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme'; // Import the theme objects

// Create Context to use theme
export const ThemeContext = createContext();

// Create provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');  // Default theme is 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Choose the corresponding theme based on the theme value
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* StyledThemeProvider applies the theme to the entire application */}
      <StyledThemeProvider theme={themeMode}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);