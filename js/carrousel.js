

//calls move() the first time after the page loads, initializing the carrousel. 
document.addEventListener("DOMContentLoaded", () => {

  //pass your carrousel id and image class here;

  move('#carrousel', 'imagecontainer', 0, 0);
})

/**
 * This function is updates the position of the data-pos attribute and scrolls to the next image.
 * @param {object} carrousel //the carrousel id
 * @param {number} dir //the direction to move the image
 * @param {number} maxpos // the maximum position of the carrosel 
 * @param {number} increment // the amount to move the image
 */
function changeImage(carrousel, dir, maxpos, increment) {
  pos = parseInt(carrousel.getAttribute("data-pos"));
  nextpos = pos + increment * dir; //calculate next position

  if (nextpos < maxpos && nextpos >= 0) {
    //just move to the nextpos 
    pos = nextpos;
    carrousel.scrollTo(pos, 0);
    carrousel.setAttribute("data-pos", pos);

  } else if (nextpos < 0) {
    //wrap around to the maxpos 
    pos = (maxpos - increment);
    carrousel.setAttribute("data-pos", pos);
    carrousel.scrollTo(pos, 0);

  } else if (nextpos >= maxpos) {
    // go back to start position
    pos = 0;
    carrousel.setAttribute("data-pos", pos);
    carrousel.scrollTo(pos, 0);
  }

}

//this function just waits for the documet to load properly and then sets the carrosel position to 0 to avoid any weird stuff.
function forceStartPosition(carrousel, dir) {
  carrousel.scrollTo(0, 0);
  var interval = setInterval(function() {
    if (document.readyState === 'complete') {
      if (dir == 0) {
        //dir==0 initializes the carrousel
        carrousel.scrollTo(0, 0);
        carrousel.setAttribute("data-pos", 0);
      }
      clearInterval(interval);
    }
  }, 100);

}


/**
* This function Moves the carrosel towards an direction, either once , or automatically on an set interval
* @param {object} cid //id of the carrosel container
* @param {object} imagecontainer //class of the images that are children of the carrosel
* @param {number} dir // direction of the movement to be performed: -1 left, 1 right, 0 nothing;
 * @param {number} timer // timer in ms between image switch, if set to 0 or undefined images will not switch automatically.
**/
function move(cid, imagecontainer, dir, timer) {

  var carrousel = document.querySelector(cid);
  var container = document.getElementsByClassName(imagecontainer); //gets a HTML collection with all the images
  var imagewidth = container[0].offsetWidth; // Gets the width of the images.
  var maxpos = imagewidth * container.length; //mutiply the imagewidth by the amount of images to get the total size of the carrosel
  //container.lenght is the amount of itens int the html collection

  forceStartPosition(carrousel, dir);

  let interval = null;
  if (timer) {
    interval = window.setInterval(changeImage, timer, carrousel, dir, maxpos, imagewidth); //if the script is called with the autoswitch on , the run this function on an interval.
  }
  else {
    clearInterval(interval);
    changeImage(carrousel, dir, maxpos, imagewidth); //else only run it once5
  }

  //listen to mouse wheel
  carrousel.addEventListener("wheel", event => {
    if (event.deltaY < 0) {
      clearInterval(interval);
      changeImage(carrousel, 1, maxpos, imagewidth / 2);
    } else {
      clearInterval(interval);
      changeImage(carrousel, -1, maxpos, imagewidth / 2);
    }
  }, { passive: true });



}
