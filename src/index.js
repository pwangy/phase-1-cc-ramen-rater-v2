// ! Define global variables
const ramenAPI = 'http://localhost:3000'

const menu = document.querySelector('#ramen-menu')
const ramenForm = document.querySelector('#new-ramen')
const ramenInfo = document.querySelector('#ramen-detail')

// ! 2- when item from ramen menu is clicked, display info for that item
// Callbacks
const handleClick = (ramen) => {
  // Add code
}

// 3 - add functionality to the ramenForm
const addSubmitListener = () => {
  // Add code
}

// ! 2- populate ramen menu
const displayRamens = (ramenObj) => {   // receives ramen data
  console.log(ramenObj)
  const img = document.createElement('img') // create image tag
  img.src = ramenObj.image
  img.addEventListener('click', e => handleClick(cakeObj)) //add event listener
  menu.append(img) //append to menu div
}

const getRamen = () => {
  return fetch(`${ramenAPI}/ramens`)
    .then(res => {
      if (!res.ok) {
        throw res.statusText
      } else {
        return res.json()
    }
  }) 
    .then(ramenObj => {
      ramenObj.forEach(ramen => displayRamens(ramen))
      // displayRamens(ramenObj)})
    })
    .catch(err => console.error(err))
}

// Start logic
// ** Attention here **: Your program should have a main() function that invokes displayRamens and addSubmitListener after the DOM has fully loaded and start the program logic.
const main = () => { 
  getRamen()
  // Invoke displayRamens here
  // Invoke addSubmitListener here
}

main()

// ! 1 - write resuable fetch call

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}


// json-server --watch db.json (starts backend)
// live-server (starts frontend in browser)

// As you are writing your code out and completing the deliverables ensure that it works on the DOM and passes the tests by running npm test in a new terminal in the same directory

// Your base URL for your API will be: http://localhost:3000
// The endpoints you may need are:
// GET /ramens
// GET /ramens/:id
// Feel free to add any additional classes or ids to any elements in the HTML file as you see fit.

// ! Deliverables
// display ramen-menu (a list of clickable images)
// See all ramen images in the div with the id of ramen-menu. When the page loads, fire a function called displayRamens that requests the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
// Click on an image from the #ramen-menu div and fire a callback called handleClick to see all the info about that ramen displayed inside the #ramen-detail div (where it says insert comment here and insert rating here).
// Attach a submit even listener to the new-ramen form using a function called addSubmitListener. After the submission, create a new ramen and add it to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.


// ! Advanced Deliverables
// Note: If you are going to attempt these advanced deliverables, please be sure to have a working commit with all the Core Deliverables first!
// User can:
// See the details for the first ramen as soon as the page loads (without clicking on an image) <---- set a default ramen to display on page load
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