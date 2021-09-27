const PORT = 8080;
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const express = require("express");
const app = express();
const url = "https://www.panamericana.com.co/libros/libros-juveniles/comics-y-novela-grafica?utmi_cp=departamento-libros&utmi_pc=categoria-libros-icono-subcategoria-comics&utmi_p=departamento-libros-comics-4-agosto-2021";
axios(url).then((response) => {
  const html = response.data;
  //  console.log(html);
  const $ = cheerio.load(html);
  const carreras = [];
  $(".item__showcase__category__title", html).each(function () {
    const titulo = $(this).text().split("\n").join("").trim();
    const url =  $(this).find("a").attr("href");
    carreras.push({
      titulo,
      url,
    });
  })
  console.log(carreras);
}).catch(err=>console.log(err));
app.listen(PORT, () =>
  console.log(`Se esta ejecutando el servidor en el puerto ${PORT}`)
);
