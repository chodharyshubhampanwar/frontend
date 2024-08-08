import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./AuthProvider";
import Main from "./Main.js";
import "./App.css";
import theme from "./theme/theme.js";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Main />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
