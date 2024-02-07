// ! Define global variables
const ramenAPI = 'http://localhost:3000'

const menu = document.querySelector('#ramen-menu')
const ramenName = document.querySelector('h2')
const ramenRestaurant = document.querySelector('h3.restaurant')

const ramenImg = document.querySelector('img.detail-image')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')

const ramenForm = document.querySelector('#new-ramen')
const ramenInfo = document.querySelector('#ramen-detail')

// ! 2- when item from ramen menu is clicked, display info for that item
// Callbacks
const handleClick = (ramenObj) => {
  displayRamenDetail(ramenObj)
}

// 3 - add functionality to the ramenForm
const addSubmitListener = () => {
  // Add 
}

// populate individual ramen detail
const displayRamenDetail = (ramenObj) => {
  ramenName.innerText = ramenObj.name
  ramenRestaurant.innerText = ramenObj.restaurant
  ramenRating.innerText = ramenObj.rating
  ramenComment.innerText = ramenObj.comment
  ramenImg.src = ramenObj.image
  ramenImg.alt = ramenObj.name
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

// 1 - write resuable fetch call
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

// Start logic on page load
const main = () => { 
  getRamen()
  displayRamens()
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

// ! Deliverables
// Attach a submit even listener to the new-ramen form using a function called addSubmitListener. After the submission, create a new ramen and add it to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

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