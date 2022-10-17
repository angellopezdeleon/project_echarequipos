import React, { useState, createContext } from "react";

const formContext = createContext();

export default function FormContextProvider({ children }) {
  const [form, setForm] = useState({});

  async function addElement(element) {
    console.log("element es:  ", element);

    let newForm = form;
    element.players && (newForm.players = element.players);
    element.teams && (newForm.teams = element.teams);
    element.time && (newForm.time = element.time);
    element.day && (newForm.day = element.day);
    element.completeDate && (newForm.completeDate = element.completeDate);
    element.address && (newForm.address = element.address);
    element.sport && (newForm.sport = element.sport);
    setForm(newForm);
    console.log("newForm es:  ", newForm);
  }


  return (
    <formContext.Provider
      className="Provider"
      value={{
        form,
        addElement
      }}
    >
      {children}
    </formContext.Provider>
  );
}

export { formContext };
