import { Container } from "@mui/material";
import React from 'react';
import Form from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResultToShare from "./components/ResultToShare";
import FormContextProvider from "./contexts/FormsContext";

function App() {
  return (
    <FormContextProvider>
      <BrowserRouter>
        <div className="app">
          <Header></Header>
          <Container className="app">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/result" element={<ResultToShare />} />
            </Routes>
          </Container>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </FormContextProvider>
  );
}

export default App;
