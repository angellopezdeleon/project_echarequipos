import React from 'react';
import FormContextProvider from "./contexts/FormsContext";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SubmitButton from './components/SubmitButton';
import "./App.css";

function App() {

  return (
    <FormContextProvider>
        <div className="app">
          <Header />
          <Container className="container">
            <SubmitButton />
          </Container>
          <Footer />
        </div>
    </FormContextProvider>
  );
}

export default App;
