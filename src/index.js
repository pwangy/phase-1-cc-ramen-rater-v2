const ramenAPI = 'http://localhost:3000'
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

// populate #ramen-menu
const displayRamens = (ramenObj) => {
  const img = document.createElement('img')
  img.src = ramenObj.image
  img.alt = ramenObj.name
  // img.id = ramenObj.id //pass object id to menu
  img.addEventListener('click', e => handleClick(ramenObj))
  menu.append(img)
}

// populate #ramen-detail
const displayRamenDetail = (ramenObj) => {
  ramenImg.src = ramenObj.image
  ramenImg.alt = ramenObj.name
  ramenName.innerText = ramenObj.name
  ramenRestaurant.innerText = ramenObj.restaurant
  ramenRating.innerText = ramenObj.rating
  ramenComment.innerText = ramenObj.comment
}

// Fetch data!
const getRamen = () => {
  return fetch(`${ramenAPI}/ramens`)
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
//listen for action on form 
const addSubmitListener = () => {
  ramenForm.addEventListener('submit', handleSubmit)
}

// do something upon form submission
const handleSubmit = (e) => {
  e.preventDefault()

  const newRamen = {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target.new-comment.value
  }
  displayRamens(newRamen)
  e.target.reset() //clear form
}

// ! Deliverables
//After form submission, create a new ramen and add it to the#ramen-menu div. 
// The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

// Start logic on page load
const main = () => { 
  getRamen()
  // displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}

// json-server --watch db.json (starts backend)
// live-server (starts frontend in browser)

// GET /ramens/:id


// ! Advanced Deliverables
// User can:
// Update the rating and comment for a ramen by submitting a form. Changes should be reflected on the frontend. No need to persist. You can add this HTML to the index.html file to create the edit form (see img)
// Delete a ramen (you can add a "delete" button if you'd like, or use an existing element to handle the delete action). The ramen should be removed from the ramen-menu div, and should not be displayed in the ramen-detail div. No need to persist.

// ! Extra Advanced Deliverables
// You'll need these endpoints for the advanced deliverables:
// POST /ramens
// DELETE /ramens/:id
// PATCH /ramens/:id
// User can:
// persist my updates to a ramen's rating and comment. (PATCH request)
// persist new ramens that I create (POST request)
// persist any ramen deletions (DELETE request)