"use strict";

import auta from "./auta.js";
import akcesoria from "./akcesoria.js";

document.addEventListener("DOMContentLoaded", function () {
  const divAuta = document.querySelector(".divAuta");

  for (let i = 0; i < auta.length; i++) {
    const carsPhoto = document.createElement("div");
    carsPhoto.classList.add("img-container");

    const img = document.createElement("img");
    img.src = auta[i].obraz;
    img.classList.add("miniaturka");
    carsPhoto.appendChild(img);
    divAuta.appendChild(carsPhoto);

    const autoDetails = document.createElement("div");
    autoDetails.classList.add("szczegoly");
    carsPhoto.appendChild(autoDetails);
    const position = document.createElement("p");
    position.textContent = `${[i]}`;
    const brand = document.createElement("h3");
    brand.textContent = `Marka: ${auta[i].marka}`;
    const model = document.createElement("h2");
    model.textContent = `Model: ${auta[i].model}`;
    const modelYear = document.createElement("p");
    modelYear.textContent = `Rocznik: ${auta[i].rocznik}`;
    const power = document.createElement("p");
    power.textContent = `Moc silnika: ${auta[i].moc_silnika}`;
    const mileage = document.createElement("p");
    mileage.textContent = `Przebieg: ${auta[i].przebieg}`;
    const price = document.createElement("h4");
    const formatPrice = auta[i].cena.toLocaleString().replace(",", " ");
    price.textContent = `Cena: ${formatPrice} PLN`;
    autoDetails.appendChild(brand);
    autoDetails.appendChild(model);
    autoDetails.appendChild(modelYear);
    autoDetails.appendChild(power);
    autoDetails.appendChild(mileage);
    autoDetails.appendChild(price);
  }

  const brandChoice = document.querySelector("#wybor-marki");
  const wyborModelu = document.querySelector("#wybor-modelu");
  const markaAutaSprawdzenieWyboru = document.querySelectorAll(
    ".markaAutaSprawdzenieWyboru"
  );
  let markaAuta;

  const carsDetails = document.querySelectorAll(".szczegoly");

  for (let i = 0; i < auta.length; i = i + 2) {
    markaAuta = document.createElement("option");
    markaAuta.classList.add("markaAutaSprawdzenieWyboru");
    markaAuta.textContent = `${auta[i].marka}`;

    if (!brandChoice.querySelector(`option[value="${auta[i].marka}"]`)) {
      brandChoice.appendChild(markaAuta);
    }
  }

  const search = document.querySelector("#szukaj");
  search.addEventListener("click", function () {
    const chosenBrand = brandChoice.value;
    szcz.forEach((kafel) => {
      if (kafel.textContent.trim().includes(chosenBrand)) {
        kafel.style.display = "block";
      } else {
        kafel.style.display = "none";
      }
    });
  });

  const carsTile = document.querySelectorAll(".img-container");
  const mainPage = document.querySelector(".main-page");
  const productPage = document.querySelector("#details");
  const productPicture = document.querySelector(".product_picture");
  const mainImg = document.querySelector(".zdjecieGlowne");
  const description = document.querySelector(".opis");

  carsTile.forEach((kafel, index) => {
    kafel.addEventListener("click", function () {
      mainPage.classList.add("hidden");
      productPage.classList.remove("hidden");

      const picture = auta[index].obraz;
      mainImg.src = picture;
      productPicture.appendChild(mainImg);
      const formatPrices = auta[index].cena.toLocaleString().replace(",", " ");

      description.innerHTML = `
<h3> Marka: ${auta[index].marka}</h3>
<h2> Model: ${auta[index].model}</h2>
<p> Rocznik: ${auta[index].rocznik}</p>
<p> Moc silnika: ${auta[index].moc_silnika}</p>
<p> Przebieg: ${auta[index].przebieg}</p>
<h2> Cena: ${formatPrices} PLN </h2> 
`;

      const deliveryDate = document.querySelector("#data-dostawy");

      deliveryDate.addEventListener("click", function () {
        const todayDate = new Date();

        for (let i = 0; i < 14; i++) {
          const date = new Date(todayDate);
          date.setDate(todayDate.getDate() + i);

          const option = document.createElement("option");
          option.value = date.toISOString();
          option.textContent = date.toLocaleDateString();

          deliveryDate.appendChild(option);
        }
      });

      const undo = document.querySelector(".cofnij");

      const allAccessories = document.querySelector(".accessories");

      allAccessories.innerHTML = "";

      for (let i = 0; i < akcesoria.length; i++) {
        const carsAccessories = document.createElement("div");
        carsAccessories.classList.add("img-accessories");

        const imgAcc = document.createElement("img");
        imgAcc.src = akcesoria[i].obraz;
        imgAcc.classList.add("miniaturkaAkcesorii");
        carsAccessories.appendChild(imgAcc);
        allAccessories.appendChild(carsAccessories);

        const accessoriesBrand = document.createElement("p");
        accessoriesBrand.textContent = `${akcesoria[i].marka}`;
        const accessoriesName = document.createElement("h4");
        accessoriesName.textContent = `${akcesoria[i].nazwa}`;

        const accessoriesPrice = document.createElement("h5");
        const accessoriesFormatedPrice = akcesoria[i].cena
          .toLocaleString()
          .replace(",", " ");
        accessoriesPrice.textContent = `Cena: ${accessoriesFormatedPrice} PLN`;

        const addButton = document.createElement("button");
        addButton.textContent = "Dodaj";
        addButton.classList.add("dodajBTN");

        carsAccessories.appendChild(accessoriesName);
        carsAccessories.appendChild(accessoriesBrand);
        carsAccessories.appendChild(accessoriesPrice);
        carsAccessories.appendChild(addButton);

        allAccessories.appendChild(carsAccessories);
      }

      undo.addEventListener("click", function () {
        mainPage.classList.remove("hidden");
        productPage.classList.add("hidden");
        if (error) {
          error.innerHTML = "";
          error.remove();
        }
      });

      let suma = auta[index].cena;

      const addButtons = document.querySelectorAll(".dodajBTN");

      const totalAmount = document.querySelector(".kwota");
      totalAmount.innerHTML = `Łączna kwota: ${suma} PLN`;

      addButtons.forEach((button, i) => {
        button.addEventListener("click", function () {
          if (button.textContent === "Dodaj") {
            button.textContent = "Dodane 👍";
            button.classList.add("changed");
            suma =
              suma +
              (button.classList.contains("changed") ? akcesoria[i].cena : 0);
            totalAmount.innerHTML = `Łączna kwota: ${suma} PLN`;
          } else {
            const addedAccessories = button.classList.contains("changed");
            button.textContent = "Dodaj";
            button.classList.remove("changed");
            if (addedAccessories) {
              suma = suma - akcesoria[i].cena;
              totalAmount.innerHTML = `Łączna kwota: ${suma} PLN`;
            }
          }
        });
      });

      let error = document.querySelector(".error");

      const option1 = document.querySelector("#opcja1");
      const option2 = document.querySelector("#opcja2");

      const purchase = document.querySelector(".zakup");
      const success = document.querySelector("#success");
      const form = document.querySelector(".form");
      const nameSurname = document.querySelector(".input");

      purchase.addEventListener("click", function () {
        if (
          nameSurname.checkValidity() &&
          (option1.checked || option2.checked) &&
          deliveryDate.value !== ""
        ) {
          productPage.classList.add("hidden");
          success.classList.remove("hidden");
          success.innerHTML = "";
          const headline = document.createElement("h2");
          headline.classList.add("podziekowanie");
          headline.textContent = "Dziękujemy za zakup auta";
          success.appendChild(headline);

          const successDescription = document.createElement("div");
          successDescription.classList.add("opisSukces");
          success.appendChild(successDescription);
          const firstLine = document.createElement("h3");
          firstLine.textContent = `Wybrany model:${auta[index].marka} ${auta[index].model}`;
          successDescription.appendChild(firstLine);

          const succesPageCarImage = document.createElement("div");
          const succesCarImage = document.createElement("img");
          succesCarImage.src = picture;
          succesCarImage.classList.add("imgSuccess");
          success.appendChild(succesPageCarImage);
          succesPageCarImage.appendChild(succesCarImage);
          let dataSukces = document.createElement("p");
          dataSukces.textContent = `Data dostawy: ${
            deliveryDate.value.split("T")[0]
          }`;
          successDescription.appendChild(dataSukces);
          const succesTotalAmount = document.createElement("p");
          succesTotalAmount.textContent = totalAmount.textContent;
          successDescription.appendChild(succesTotalAmount);
          const succesPaymentMethod = document.createElement("p");
          if (option1.checked) {
            succesPaymentMethod.textContent =
              "Wybrana forma płatności: leasing";
          } else {
            succesPaymentMethod.textContent =
              "Wybrana forma płatności: gotówka";
          }
          successDescription.appendChild(succesPaymentMethod);
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
