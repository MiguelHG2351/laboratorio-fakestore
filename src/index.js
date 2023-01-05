const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API_URL = new URL('https://api.escuelajs.co/api/v1/products?limit=10');

const getData = async api => {
  let offset = localStorage.getItem('pagination') - 0;
  console.log(api.searchParams.set('offset', offset))
  try {
    const response = await fetch(api.toString());
    const response_2 = await response.json();
    console.log(response_2);
    let products = response_2;
    if(products.length === 0) {
      intersectionObserver.unobserve($observe);
      return alert('No hay mas productos');
    }
    let output = products.map(product => {
      const temp = `<article class="Card">
        <img src="${product.images[0]}" width={640} height={480} />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`;
      return temp;
    });
    let container = document.querySelector('section');
    container.innerHTML += output.join('');
    localStorage.setItem('pagination', offset+=10);
  } catch (error) {
    return console.log(error);
  }
}

const loadData = async () => {
  await getData(API_URL);
}

document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('pagination', 5);
  loadData()
})

const intersectionObserver = new IntersectionObserver(entries => {
  const docLength = document.querySelector('.Items').children.length
  if (entries[0].isIntersecting && docLength >= 10) {
    console.log('Cargar mas productos');
    loadData();
  }
}, {
  // rootMargin: '0px 0px 100% 0px',
  threshold: 1
});
intersectionObserver.observe($observe);
