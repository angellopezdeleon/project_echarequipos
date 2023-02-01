import React, { useState, createContext, useEffect } from "react";

const formContext = createContext();

export default function FormContextProvider({ children }) {
  const [form, setForm] = useState({});

  function addElement(element) {
    let newForm = Object.assign({}, form, element);
    console.log("element es:  ", element);
    setForm(newForm);
    console.log("form es:  ", form);
}

  function restartForm() {
    setForm({});
  }

  useEffect(() => {
    addElement();
  }, []);

  return (
    <formContext.Provider
      className="Provider"
      value={{
        form,
        addElement,
        restartForm,
      }}
    >
      {children}
    </formContext.Provider>
  );
}

export { formContext };