// سكربت لإظهار الأفلام من Backend
async function loadMovies() {
  try {
    let res = await fetch('http://localhost:3000/movies');
    let data = await res.json();
    const moviesList = document.getElementById('movies');
    moviesList.innerHTML = '';
    data.forEach(m => {
      moviesList.innerHTML += `<li class="mb-2 p-2 bg-gray-800 rounded">${m.title} - ${m.category} ${m.free ? '(مجاني)' : '(اشتراك)'}</li>`;
    });
  } catch (err) {
    console.error(err);
  }
}
loadMovies();
