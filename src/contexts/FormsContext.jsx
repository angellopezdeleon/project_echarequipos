import React, { useState, createContext } from "react";

const formContext = createContext();

export default function FormContextProvider({ children }) {
  const [form, setForm] = useState({});

  function addElement(element) {
    let newForm = Object.assign({}, form, element);
    setForm(newForm);
    console.log("form es:  ", newForm);
}

  function resrtartForm() {
    setForm({});
  }

  return (
    <formContext.Provider
      className="Provider"
      value={{
        form,
        addElement,
        resrtartForm,
      }}
    >
      {children}
    </formContext.Provider>
  );
}

export { formContext };