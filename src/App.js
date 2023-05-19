import "./App.css";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Engineer from "./Pages/Engineer";
import Customer from "./Pages/Customer";
import { ThemeProvider, createTheme } from '@mui/material';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const defaultMaterialTheme = createTheme();

  return (
    <div className="App">
          <ThemeProvider theme={defaultMaterialTheme}>

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/engineer" element={<Engineer />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </Router>

      </ThemeProvider>

    </div>
  );
}

export default App;
