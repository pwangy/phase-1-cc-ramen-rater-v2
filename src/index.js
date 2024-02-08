const ramenAPI = 'http://localhost:3000/'
const menu = document.querySelector('#ramen-menu')
const ramenName = document.querySelector('h2')
const ramenRestaurant = document.querySelector('h3.restaurant')
const ramenImg = document.querySelector('img.detail-image')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')
const ramenForm = document.querySelector('#new-ramen')

// #ramen-menu
const handleClick = (ramenObj) => {
  displayRamenDetail(ramenObj)
}

// Populate #ramen-menu
const displayRamens = (ramenObj) => {
  const img = document.createElement('img')
  img.src = ramenObj.image
  img.alt = ramenObj.name
  img.addEventListener('click', e => handleClick(ramenObj))

  const div = document.createElement('div')
  div.id = ramenObj.id
  div.className = 'ramen-menu-item'

  const btn = document.createElement('button')
  btn.textContent = 'x'
  btn.id = 'delete'
  btn.addEventListener('click', e => {
    console.log(`deleting ${div.id}`)
    div.remove(ramenObj.id)
    deleteRamen(`${div.id}`)
  })

  div.append(img, btn)
  menu.append(div)
}

// Populate #ramen-detail
const displayRamenDetail = (ramenObj) => {
  ramenImg.src = ramenObj.image
  ramenImg.alt = ramenObj.name
  ramenName.innerText = ramenObj.name
  ramenRestaurant.innerText = ramenObj.restaurant
  ramenRating.innerText = ramenObj.rating
  ramenComment.innerText = ramenObj.comment
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
  // displayRamens() no need to call since the fetch call lives in getRamen() 
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

// GET /ramens/:id

// ! Advanced Deliverables
// User can: Update the rating and comment for a ramen by submitting a form. Changes should be reflected on the frontend. No need to persist. You can add this HTML to the index.html file to create the edit form (see img)

// Delete a ramen... and should not be displayed in the ramen-detail div. No need to persist.

// ! Extra Advanced Deliverables
// You'll need these endpoints for the advanced deliverables:
// POST /ramens
// PATCH /ramens/:id
// User can:
// persist my updates to a ramen's rating and comment. (PATCH request)
// persist new ramens that I create (POST request)
