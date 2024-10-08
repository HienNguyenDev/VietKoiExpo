import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme'; // Import các màu sắc

// Tạo Context để sử dụng theme
export const ThemeContext = createContext();

// Tạo provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');  // Khởi tạo theme mặc định là 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Lựa chọn theme tương ứng dựa vào giá trị theme
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* StyledThemeProvider giúp áp dụng theme cho toàn bộ ứng dụng */}
      <StyledThemeProvider theme={themeMode}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook để sử dụng theme
export const useTheme = () => useContext(ThemeContext);
