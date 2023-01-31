import React, { useState, useEffect } from "react";

export default function Temperatures(props) {

// Función para devolver temperatura y recomendación.
function provideTemperature(temperature) {
  let sport = document.querySelector("#form__select").value;
  if (temperature < 1) {
    document.querySelector("#teams").innerHTML += `<h2>${
      "La temperatura será de " + temperature + "º, así que ve bien abrigado."
    }</h2>`;
  } else if (1 <= temperature && temperature < 10) {
    document.querySelector("#teams").innerHTML += `<h2>${
      "La temperatura será de " + temperature + "º, así que ve algo abrigado."
    }</h2>`;
  } else if (10 <= temperature && temperature < 18) {
    document.querySelector("#teams").innerHTML += `<h2>${
      "La temperatura será de " + temperature + "º, calienta bien antes."
    }</h2>`;
  } else if (18 <= temperature && temperature < 24) {
    document.querySelector("#teams").innerHTML += `<h2>${
      "La temperatura será de " +
      temperature +
      "º, muy buena temperatura para practicar " +
      sport +
      "."
    }</h2>`;
  } else if (24 <= temperature && temperature < 34) {
    document.querySelector("#teams").innerHTML += `<h2>${
      "La temperatura será de " +
      temperature +
      "º, hidratate bien durante el partido."
    }</h2>`;
  } else if (34 <= temperature && temperature < 40) {
    document.querySelector("#teams").innerHTML += `<h2>${
      "La temperatura será de " +
      temperature +
      "º, hace mucho calor, haced descansos e hidrataros todo lo que podáis."
    }</h2>`;
  } else {
    document.querySelector("#teams").innerHTML += `<h2>${
      "La temperatura será de " +
      temperature +
      "º, no es nada aconsejable jugar con tanto calor. Remplanteate jugar en otro momento."
    }</h2>`;
  }
}

// Llamada a la API del clima
function getTemperature(latitude, longitude) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=dd22c883ca7bc71e219739bd85ecfd07"
  )
    .then((response) => response.json())
    .then((data) => {
      let temp = Math.round(data.main.temp - 273.15);
      provideTemperature(temp);
    });
}

// Get de la latitud y la longitud
async function getCoordinates(address) {
  fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=AIzaSyAlcHVQ6Lhi4vgwEBrAd8lt5nRBsSO92ys"
  )
    .then((response) => response.json())
    .then((data) => {
      let latitude = data.results[0].geometry.location.lat;
      let longitude = data.results[0].geometry.location.lng;
      getTemperature(latitude, longitude);
    });
}

  return (
	<div>Temperatures</div>
  )
}
