import React, { useState, createContext } from "react";

const formContext = createContext();

export default function FormContextProvider({ children }) {
  const [form, setForm] = useState({});

  // async function addElement(element) {
  //   let newForm = form;
  //   element.players && (newForm.players = element.players);
  //   element.teams && (newForm.teams = element.teams);
  //   element.time && (newForm.time = element.time);
  //   element.day && (newForm.day = element.day);
  //   element.completeDate && (newForm.completeDate = element.completeDate);
  //   element.address && (newForm.address = element.address);
  //   element.sport && (newForm.sport = element.sport);
  //   setForm(newForm);
  //   console.log("form es:  ", form);
  // }

  function addElement(element) {
    let newForm = Object.assign({}, form, element);
    setForm(newForm);
    console.log("form es:  ", form);
}

//   function addElement(element) {
//     setForm({...form, ...element});
//     console.log("form es:  ", form);
// }


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

  // function getRequeried() {
  //   console.log("getRequired es llamada")
  //   if (form.players && form.teams !== undefined) {
  //     return ("Echar Equipos");
  //   } else {
  //     return ("Completa el Formulario para Echar Equipos");
  //   }
  // };