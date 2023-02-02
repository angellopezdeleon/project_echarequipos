import React, { useState, createContext, useEffect } from "react";

const formContext = createContext();

export default function FormContextProvider({ children }) {
  const [dataForm, setDataForm] = useState({teams: '2'});

  function addElement(element) {
    let newDataForm = Object.assign({teams: '2'}, dataForm, element);
    setDataForm(newDataForm);
  }

  useEffect(() => {
    console.log("dataForm ha cambiado y es: ", dataForm);
    // Aquí puedes hacer cualquier validación o procesamiento adicional
  }, [dataForm]);

  return (
    <formContext.Provider
      className="Provider"
      value={{
        dataForm,
        addElement,
      }}
    >
      {children}
    </formContext.Provider>
  );
}

export { formContext };