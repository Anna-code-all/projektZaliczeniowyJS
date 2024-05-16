"use strict";

import auta from "./auta.js";
import akcesoria from "./akcesoria.js";

document.addEventListener("DOMContentLoaded", function () {
  const divAuta = document.querySelector(".divAuta");

  for (let i = 0; i < auta.length; i++) {
    const zdjecieAuta = document.createElement("div");
    zdjecieAuta.classList.add("img-container");

    const img = document.createElement("img");
    img.src = auta[i].obraz;
    img.classList.add("miniaturka");
    zdjecieAuta.appendChild(img);
    divAuta.appendChild(zdjecieAuta);

    const autoDetails = document.createElement("div");
    autoDetails.classList.add("szczegoly");
    zdjecieAuta.appendChild(autoDetails);
    const pozycja = document.createElement("p");
    pozycja.textContent = `${[i]}`;
    const marka = document.createElement("h3");
    marka.textContent = `Marka: ${auta[i].marka}`;
    const model = document.createElement("h2");
    model.textContent = `Model: ${auta[i].model}`;
    const rocznik = document.createElement("p");
    rocznik.textContent = `Rocznik: ${auta[i].rocznik}`;
    const mocSilnika = document.createElement("p");
    mocSilnika.textContent = `Moc silnika: ${auta[i].moc_silnika}`;
    const przebieg = document.createElement("p");
    przebieg.textContent = `Przebieg: ${auta[i].przebieg}`;
    const cena = document.createElement("h4");
    const sformatowanaCena = auta[i].cena.toLocaleString().replace(",", " ");
    cena.textContent = `Cena: ${sformatowanaCena} PLN`;
    autoDetails.appendChild(marka);
    autoDetails.appendChild(model);
    autoDetails.appendChild(rocznik);
    autoDetails.appendChild(mocSilnika);
    autoDetails.appendChild(przebieg);
    autoDetails.appendChild(cena);
  }

  const wyborMarki = document.querySelector("#wybor-marki");
  const wyborModelu = document.querySelector("#wybor-modelu");
  const markaAutaSprawdzenieWyboru = document.querySelectorAll(
    ".markaAutaSprawdzenieWyboru"
  );
  let markaAuta;

  const szczegoly = document.querySelectorAll(".szczegoly");

  for (let i = 0; i < auta.length; i = i + 2) {
    markaAuta = document.createElement("option");
    markaAuta.classList.add("markaAutaSprawdzenieWyboru");
    markaAuta.textContent = `${auta[i].marka}`;

    if (!wyborMarki.querySelector(`option[value="${auta[i].marka}"]`)) {
      wyborMarki.appendChild(markaAuta);
    }
  }

  const szukaj = document.querySelector("#szukaj");
  szukaj.addEventListener("click", function () {
    const wybranaMarka = wyborMarki.value;
    szcz.forEach((kafel) => {
      if (kafel.textContent.trim().includes(wybranaMarka)) {
        kafel.style.display = "block";
      } else {
        kafel.style.display = "none";
      }
    });
  });

  const kafel = document.querySelectorAll(".img-container");
  const mainPage = document.querySelector(".main-page");
  const kartaProduktu = document.querySelector("#details");
  const productPicture = document.querySelector(".product_picture");
  const zdjecieGlowne = document.querySelector(".zdjecieGlowne");
  const opis = document.querySelector(".opis");

  kafel.forEach((kafel, index) => {
    kafel.addEventListener("click", function () {
      mainPage.classList.add("hidden");
      kartaProduktu.classList.remove("hidden");

      const obraz = auta[index].obraz;
      zdjecieGlowne.src = obraz;
      productPicture.appendChild(zdjecieGlowne);
      const formatCena = auta[index].cena.toLocaleString().replace(",", " ");

      opis.innerHTML = `
<h3> Marka: ${auta[index].marka}</h3>
<h2> Model: ${auta[index].model}</h2>
<p> Rocznik: ${auta[index].rocznik}</p>
<p> Moc silnika: ${auta[index].moc_silnika}</p>
<p> Przebieg: ${auta[index].przebieg}</p>
<h2> Cena: ${formatCena} PLN </h2> 
`;

      const dataDostawy = document.querySelector("#data-dostawy");

      dataDostawy.addEventListener("click", function () {
        const dzisiaj = new Date();

        for (let i = 0; i < 14; i++) {
          const data = new Date(dzisiaj);
          data.setDate(dzisiaj.getDate() + i);

          const option = document.createElement("option");
          option.value = data.toISOString();
          option.textContent = data.toLocaleDateString();

          dataDostawy.appendChild(option);
        }
      });

      const cofnij = document.querySelector(".cofnij");

      const allAccessories = document.querySelector(".accessories");

      allAccessories.innerHTML = "";

      for (let i = 0; i < akcesoria.length; i++) {
        const akcesoriaDoAuta = document.createElement("div");
        akcesoriaDoAuta.classList.add("img-accessories");

        const imgAcc = document.createElement("img");
        imgAcc.src = akcesoria[i].obraz;
        imgAcc.classList.add("miniaturkaAkcesorii");
        akcesoriaDoAuta.appendChild(imgAcc);
        allAccessories.appendChild(akcesoriaDoAuta);

        const marka = document.createElement("p");
        marka.textContent = `${akcesoria[i].marka}`;
        const nazwa = document.createElement("h4");
        nazwa.textContent = `${akcesoria[i].nazwa}`;

        const cena = document.createElement("h5");
        const sformatowanaCena = akcesoria[i].cena
          .toLocaleString()
          .replace(",", " ");
        cena.textContent = `Cena: ${sformatowanaCena} PLN`;

        const dodaj = document.createElement("button");
        dodaj.textContent = "Dodaj";
        dodaj.classList.add("dodajBTN");

        akcesoriaDoAuta.appendChild(nazwa);
        akcesoriaDoAuta.appendChild(marka);
        akcesoriaDoAuta.appendChild(cena);
        akcesoriaDoAuta.appendChild(dodaj);

        allAccessories.appendChild(akcesoriaDoAuta);
      }

      cofnij.addEventListener("click", function () {
        mainPage.classList.remove("hidden");
        kartaProduktu.classList.add("hidden");
        if (error) {
          error.innerHTML = "";
          error.remove();
        }
      });

      let suma = auta[index].cena;

      const dodajButtons = document.querySelectorAll(".dodajBTN");

      const kwota = document.querySelector(".kwota");
      kwota.innerHTML = `Łączna kwota: ${suma} PLN`;

      dodajButtons.forEach((button, i) => {
        button.addEventListener("click", function () {
          if (button.textContent === "Dodaj") {
            button.textContent = "Dodane 👍";
            button.classList.add("changed");
            suma =
              suma +
              (button.classList.contains("changed") ? akcesoria[i].cena : 0);
            kwota.innerHTML = `Łączna kwota: ${suma} PLN`;
          } else {
            const dodanyDodatek = button.classList.contains("changed");
            button.textContent = "Dodaj";
            button.classList.remove("changed");
            if (dodanyDodatek) {
              suma = suma - akcesoria[i].cena;
              kwota.innerHTML = `Łączna kwota: ${suma} PLN`;
            }
          }
        });
      });

      let error = document.querySelector(".error");

      const opcja1 = document.querySelector("#opcja1");
      const opcja2 = document.querySelector("#opcja2");

      const zakup = document.querySelector(".zakup");
      const success = document.querySelector("#success");
      const form = document.querySelector(".form");
      const imieNazwisko = document.querySelector(".input");

      zakup.addEventListener("click", function () {
        if (
          imieNazwisko.checkValidity() &&
          (opcja1.checked || opcja2.checked) &&
          dataDostawy.value !== ""
        ) {
          kartaProduktu.classList.add("hidden");
          success.classList.remove("hidden");
          success.innerHTML = "";
          const headline = document.createElement("h2");
          headline.classList.add("podziekowanie");
          headline.textContent = "Dziękujemy za zakup auta";
          success.appendChild(headline);

          const opisSukces = document.createElement("div");
          opisSukces.classList.add("opisSukces");
          success.appendChild(opisSukces);
          const pierwszaLinia = document.createElement("h3");
          pierwszaLinia.textContent = `Wybrany model:${auta[index].marka} ${auta[index].model}`;
          opisSukces.appendChild(pierwszaLinia);

          const zdjecieAutaSukcesDiv = document.createElement("div");
          const zdjecieAutaSukces = document.createElement("img");
          zdjecieAutaSukces.src = obraz;
          zdjecieAutaSukces.classList.add("imgSuccess");
          success.appendChild(zdjecieAutaSukcesDiv);
          zdjecieAutaSukcesDiv.appendChild(zdjecieAutaSukces);
          let dataSukces = document.createElement("p");
          dataSukces.textContent = `Data dostawy: ${
            dataDostawy.value.split("T")[0]
          }`;
          opisSukces.appendChild(dataSukces);
          const cenaSukces = document.createElement("p");
          cenaSukces.textContent = kwota.textContent;
          opisSukces.appendChild(cenaSukces);
          const formaPlatnosciSukces = document.createElement("p");
          if (opcja1.checked) {
            formaPlatnosciSukces.textContent =
              "Wybrana forma płatności: leasing";
          } else {
            formaPlatnosciSukces.textContent =
              "Wybrana forma płatności: gotówka";
          }
          opisSukces.appendChild(formaPlatnosciSukces);
        } else {
          if (!error) {
            error = document.createElement("div");
            error.classList.add("error");
            const errorMessege = document.createElement("p");
            errorMessege.textContent = "Uzupełnij dane w formularzu";
            form.appendChild(error);
            error.appendChild(errorMessege);
          } else {
            console.log("komunikat już istnieje");
          }
        }
      });
    });
  });
});
