const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';


localStorage.removeItem('next_fetch');

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {

      localStorage.setItem('next_fetch', response.info.next)

      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData() {
  const nextUrl = localStorage.getItem('next_fetch');
  if(nextUrl === null){
    await getData(API);
  } else if (nextUrl === '') {
      let notification = document.createElement('h1')
      let text = document.createTextNode('Ya no hay personajes :(')
      notification.appendChild(text)
      $app.appendChild(notification);
      intersectionObserver.unobserve($observe);
  } else {
    await getData (nextUrl);
  }
  
} 

  const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  }, {
    rootMargin: '0px 0px 100% 0px',
  });
  
  intersectionObserver.observe($observe);