let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let divCollect = document.querySelector('#toy-collection')
// start by getting all toys
function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(function (response) {
      return response.json()})
}
fetchToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

function likes(event) {
  event.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.append(h2, img, p, btn)
  divCollect.append(card)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})
