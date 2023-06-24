var activeCard = null;
var language = "tr"; // Varsayılan dil

// Verileri al
function fetchData() {
  var xhr = new XMLHttpRequest();
  var jsonFile = language === "tr" ? "moviestr.json" : "movies.json";
  xhr.open("GET", jsonFile, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var movies = JSON.parse(xhr.responseText);

      // Random
      movies = shuffleArray(movies);

      var container = document.querySelector(".movie-container");
      container.innerHTML = "";

      movies.forEach(function (movie) {
        var card = document.createElement("div");
        card.classList.add("movie-card");
        card.addEventListener("click", function () {
          if (activeCard === card) {
            activeCard = null;
            card.classList.remove("clicked");
            hidePopup();
          } else {
            activeCard = card;
            card.classList.add("clicked");
            var image = card.querySelector("img");
            var popupImage = document.getElementById("popupImage");
            var popupTitle = document.getElementById("popupTitle");
            var popupGenre = document.getElementById("popupGenre");
            var popupYear = document.getElementById("popupYear");
            var popupDescription = document.getElementById("popupDescription");

            if (image.src.includes("scratch.jpg")) {
              image.src = movie.photo;
            }

            popupImage.src = movie.photo;
            popupTitle.textContent = movie.title;
            popupGenre.textContent = language === "tr" ? "Tür: " + movie.genres : "Genre: " + movie.genres;
            popupYear.textContent = language === "tr" ? "Yıl: " + movie.year : "Year: " + movie.year;
            popupDescription.textContent = movie.description;

            showPopup();
          }
        });

        var image = document.createElement("img");
        image.src = "scratch.jpg";
        image.alt = movie.title;
        card.appendChild(image);

        container.appendChild(card);
      });
    }
  };
  xhr.send();
}

var trButton = document.getElementById("trButton");
trButton.addEventListener("click", function () {
  language = "tr";
  fetchData();
});

var enButton = document.getElementById("enButton");
enButton.addEventListener("click", function () {
  language = "en";
  fetchData();
});

function shuffleArray(array) {
  var currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function showPopup() {
  var popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.style.display = "flex";

  // Pop-up dışında tıklandığında kapat
  popupOverlay.addEventListener("click", function (event) {
    if (event.target === popupOverlay) {
      hidePopup();
    }
  });
}

function hidePopup() {
  var popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.style.display = "none";
}

// Pop-up kapat
var closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", hidePopup);

fetchData();

function redirectToPage() {
  var clickedCards = document.querySelectorAll(".clicked");
  if (clickedCards.length >= 31) {
    window.location.href = "easterEgg1.html";
  }
}

document.getElementById("trButton").classList.add("active"); // Başlangıçta TR butonuna aktif efekti

function changeLanguage(lang) {
  language = lang;
  fetchData();

  // Buton efektlerini güncelle
  if (lang === "tr") {
    document.getElementById("trButton").classList.add("active");
    document.getElementById("enButton").classList.remove("active");
  } else if (lang === "en") {
    document.getElementById("enButton").classList.add("active");
    document.getElementById("trButton").classList.remove("active");
  }
}
