// Define globals 
const ramenAPI = 'http://localhost:3000/'
const menu = document.querySelector('#ramen-menu')
const ramenName = document.querySelector('h2')
const ramenRestaurant = document.querySelector('h3.restaurant')
const ramenImg = document.querySelector('img.detail-image')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')
const ramenForm = document.querySelector('#new-ramen')

// #ramen-menu helper
const handleClick = (ramenObj) => {
  displayRamenDetail(ramenObj)
}

// #ramen-detail
const displayRamenDetail = (ramenObj) => {
  ramenImg.src = ramenObj.image
  ramenImg.alt = ramenObj.name
  ramenName.innerText = ramenObj.name
  const displayedId = ramenName.id = ramenObj.id
  ramenRestaurant.innerText = ramenObj.restaurant
  ramenRating.innerText = ramenObj.rating
  ramenComment.innerText = ramenObj.comment
  
  return displayedId
}

const resetDetails = (ramenObj) => {
  ramenImg.src = './assets/image-placeholder.jpg'
  ramenImg.alt = ''
  ramenName.innerText = ''
  displayedId = ''
  ramenRestaurant.innerText = ''
  ramenRating.innerText = ''
  ramenComment.innerText = ''
}

const checkDisplayedRamen = (displayedId, id) => {
  displayedId === id ? resetDetails(id) : console.log('Nothing to clear.')
}

// #ramen-menu
const displayRamens = (ramenObj) => {
  const img = document.createElement('img')
  img.src = ramenObj.image
  img.alt = ramenObj.name
  img.addEventListener('click', e => handleClick(ramenObj))

  const div = document.createElement('div')
  const id =  div.id = ramenObj.id
  div.className = 'ramen-menu-item'

  const btn = document.createElement('button')
  btn.textContent = 'x'
  btn.id = 'delete'
  btn.addEventListener('click', e => {
    checkDisplayedRamen(id)
    div.remove(ramenObj.id)
    deleteRamen(`${div.id}`)
  })
  div.append(img, btn)
  menu.append(div)
}

// Fetch data
const getRamen = () => {
  return fetch(`${ramenAPI}ramens`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw res.statusText
    }) 
    .then(ramenObj => {
      ramenObj.forEach(ramen => displayRamens(ramen))
      displayRamenDetail(ramenObj[0])
    })
    .catch(err => console.error(err))
}

// #new-ramen form
// detect form submission
const addSubmitListener = () => {
  ramenForm.addEventListener('submit', handleSubmit)
}

// Create new ramen and pass to displayRamens
const handleSubmit = (e) => {
  e.preventDefault()
  const newRamenName = document.querySelector('#new-name')
  const newRamenResturaunt = document.querySelector('#new-restaurant')
  const newRamenImg = document.querySelector('#new-image')
  const newRamenRating = document.querySelector('#new-rating')
  const newRamenComment = document.querySelector('#new-comment')
  const newRamen = {
    name: newRamenName.value,
    restaurant: newRamenResturaunt.value,
    image: newRamenImg.value,
    rating: newRamenRating.value,
    comment: newRamenComment.value
  }
  displayRamens(newRamen)
  e.target.reset() //clear form
}
// use to test form
// https://futuredish.com/wp-content/uploads/2019/10/Jeju-Seafood-Ramen.jpg

// Persist a DELETE request
const deleteRamen = (ramenId) => {
  return fetch(`${ramenAPI}ramens/${ramenId}`, {method: 'DELETE'})
    .then(res => {
      if (res.ok) {
        return 'Ramen deleted!'
      } {
        throw 'Failed to delete ramen.'
      }
  })
}

// Start logic on page load
const main = () => { 
  getRamen()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main
}

// json-server --watch db.json (starts backend)
// live-server (starts frontend in browser)

// ! Advanced Deliverables
// User can: Update the rating and comment for a ramen by submitting a form. Changes should be reflected on the frontend. No need to persist. You can add this HTML to the index.html file to create the edit form (see img)

// ! Extra Advanced Deliverables
// POST /ramens
// PATCH /ramens/:id
// User can:
// persist my updates to a ramen's rating and comment. (PATCH request)
// persist new ramens that I create (POST request)
