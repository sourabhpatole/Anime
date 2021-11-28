const url = "https://api.jikan.moe/v3";

function searchanimation(event) {
  event.preventDefault();
  const form = new FormData(this);
  const query = form.get("search");
  // console.log(query);
  fetch(`${url}/search/anime?q=${query}&page=1`)
    .then((dat) => dat.json())
    .then(DOMupdate)
    .catch((error) => console.warn(error.message));
}

function DOMupdate(data) {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = data.results
    .sort((a, b) => a.episodes - b.episodes)
    .map((animation) => {
      console.log("Printing animation", animation);
      return `

    <div class="card" id ="cardbody"style="width: 20rem;">
    <img src="${animation.image_url}" class="card-img-top"alt="${
        animation.title
      }">
    <div class="card-body">
      <h5 class="card-title">${animation.title}</h5>
      <p class="card-text" id = "synopsistext" style="font-family: "Julee", cursive;">${
        animation.synopsis
      }</p>
      <h3 class="card-title" id = "Episode">Total Episode : ${
        animation.episodes
      }</h3>
      <h3 class="card-title"id="sdate">Start date : ${
        animation.start_date ? animation.start_date.slice(0, 10) : "N/A"
      }</h3>
      <h3 class="card-title" id="edate">End date : ${
        animation.end_date ? animation.end_date.slice(0, 10) : "N/A"
      }</h3>
      <button type="button" class="btn btn-outline-primary">Type of Episode : ${
        animation.type
      }</button><br>
      <div><button type="button" class="btn btn-warning">IMDB Rating : ${
        animation.score
      }</button></div>
    </div>
  </div>
  `;
    });
}

function loadedPage() {
  const form = document.getElementById("search_form");
  form.addEventListener("submit", searchanimation);
}
window.addEventListener("load", loadedPage);
