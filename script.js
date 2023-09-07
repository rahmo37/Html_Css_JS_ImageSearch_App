// API key from unsplash
const accessKey = "u6B0PgrhSChFNc0dk8cx2Eliozq8NIJIL3k9BijnKHo";

// The querySelector() method returns the first element that matches a CSS selector.
// To return all matches (not only the first), use the querySelectorAll() instead.
// Both querySelector() and querySelectorAll() throw a SYNTAX_ERR exception if the selector(s) is invalid.
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-results");
const showMoreBtnEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
let data = "";
// the default behavior of an HTML <form> element when its submitted with a click of a button an event is triggered (usually by clicking a submit button) is to send the form data to the server specified in the form's action attribute and then refresh the page to display the server's response. This is the traditional way web forms work without using JavaScript.

async function searchImges() {
  // Extracting value entered in the input field
  inputData = searchInputEl.value;
  // Constructing the url which will be used to fetch api data
  console.log(page, "<--");
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  console.log(url);
  //Making Api call with fetch function
  const response = await fetch(url);
  data = await response.json();
  // If the the page equals to 1 we clear the page by making its inner HTML blank
  if (page === 1) {
    searchResultEl.innerHTML = "";
  }
}

// However you can change the default behaviour by adding the preventDefault() method
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  console.log("Submitted"); // Just confirming that its submitted
  searchImges().then(() => {
    const results = data.results;
    createElAndPlaceData(results);
  });
});

function createElAndPlaceData(resultArr) {
  // Calling the map function for each element
  resultArr.map((result) => {
    // Creating a div to place each picture
    const imageWrapper = document.createElement("div");
    // adding the class list inside each imageWrapper div element
    imageWrapper.classList.add("search-result");
    // Creating an image for each element
    const img = document.createElement("img");
    // Changing each img element's attributes dynamically
    img.src = result.urls.small;
    img.alt = result.alt_description;
    // creating anchor element to place in each image
    const imgLink = document.createElement("a");
    // Changing each a element's attributes dynamically
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;
    // Finally accumulating all elements
    // First placing img and imgLink inside the imageWrapper(innerDiv)
    imageWrapper.appendChild(img);
    imageWrapper.appendChild(imgLink);
    // Then the innner div is placed in the outer div
    searchResultEl.appendChild(imageWrapper);
  });
  page++;
  // The show more button will only apprear if the user presses the show more button
  if (page > 1 && page < 1000) {
    showMoreBtnEl.style.display = "block";
  }
}

showMoreBtnEl.addEventListener("click", () => {
  searchImges().then(() => {
    const results = data.results;
    createElAndPlaceData(results);
  });
});
