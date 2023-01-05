const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API_URL = new URL('https://api.escuelajs.co/api/v1/products?limit=10');

const getData = api => {
  console.log(api.searchParams.set('offset', localStorage.getItem('pagination')))
  fetch(api.toString())
    .then(response => response.json())
    .then(response => {
      console.log(response[0].images)
      let products = response;
      let output = products.map(product => {
        const temp = `<article class="Card">
        <img src="${product.images[0]}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`
      return temp;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API_URL);
}

document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('pagination', 5);
  loadData()
})

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
