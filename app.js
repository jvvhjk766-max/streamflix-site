// عرض الأفلام حسب الاشتراك
async function loadMovies() {
  try {
    const userSubscription = localStorage.getItem('subscription') || 'Free';
    let res = await fetch('http://localhost:3000/movies');
    let data = await res.json();
    const moviesList = document.getElementById('movies');
    moviesList.innerHTML = '';
    data.forEach(m => {
      if(m.free || userSubscription !== 'Free'){
        moviesList.innerHTML += `<li class="mb-2 p-2 bg-gray-800 rounded">${m.title} - ${m.category} ${m.free ? '(مجاني)' : '(اشتراك)'}</li>`;
      }
    });
  } catch (err) { console.error(err); }
}
loadMovies();
