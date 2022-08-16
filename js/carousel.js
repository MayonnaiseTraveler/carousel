document.addEventListener("DOMContentLoaded", () => {

  //Define your variables here:
  const cid = '#carousel';                //carrousel id
  const imgclass = 'imagecontainer';      //images class
  const btnL = '#btnleft';                //Left button id
  const btnR = '#btnright';               //right button id

  const timer = 2000;                     //timer in ms for the carousel to autoswitch, leave zero for no autoswitch;
  const autoSwitchDir = 1;                //direction for the carrousel to move automatically

  setupCarousel(cid, imgclass, btnL, btnR, timer, autoSwitchDir);

})

/**
* This function will call the other functions, add event listener to the buttons and make te carrousel move if a timer is defined!
* @param {string} cid               // Carrousel id
* @param {string} imgclass          // class for the image containers
* @param {string} btnL              // id for Left Button
* @param {string} btnR              // id for Right Button
* @param {number} timer             // time in ms between each image transition 
* @param {number} autoSwitchDir     // 1 or 0 or -1, direction for the image to scroll automatically if a timer is setup.  
*/
function setupCarousel(cid, imgclass, btnL, btnR, timer, autoSwitchDir) {
  var carousel = document.querySelector(cid);
  var images = document.getElementsByClassName(imgclass); //gets a HTML collection with all the images
  var bLeft = document.querySelector(btnL);
  var bRight = document.querySelector(btnR);

  forceStartPosition(carousel, 0);
  move(carousel, images, 0);
  let interval = null;

  //create an interval if there isn't one already
  if (timer > 0) {
    interval = window.setInterval(move, timer, carousel, images, autoSwitchDir);
  }

  bRight.onclick = () => {
    if (interval) {
      clearInterval(interval);
    }
    move(carousel, images, 1);
    if (timer > 0) {
      interval = window.setInterval(move, timer, carousel, images, autoSwitchDir);
    }
  }
  bLeft.onclick = () => {
    if (interval) {
      clearInterval(interval);
    }
    move(carousel, images, -1);

    if (timer > 0) {
      interval = window.setInterval(move, timer, carousel, images, autoSwitchDir);
    }
  }
}


/**
 * This function is updates the position of the data-pos attribute and scrolls to the next image.
 * @param {object} carousel //the carousel id
 * @param {object} images //images that are children of the carrosel
 * @param {number} dir //the direction to move the image
 */
function move(carousel, images, dir) {

  var width = images[0].offsetWidth; // Gets the width of the images.
  var maxpos = width * images.length; //mutiply the imagewidth by the amount of images to get the total size of the carrosel


  var pos = parseInt(carousel.getAttribute("data-pos"));
  var nextpos = pos + width * dir; //calculate next position

  if (nextpos < maxpos && nextpos >= 0) {
    //just move to the nextpos 
    pos = nextpos;
    carousel.scrollTo(pos, 0);
    carousel.setAttribute("data-pos", pos);

  } else if (nextpos < 0) {
    //wrap around to the maxpos 
    pos = (maxpos - width);
    carousel.setAttribute("data-pos", pos);
    carousel.scrollTo(pos, 0);

  } else if (nextpos >= maxpos) {
    // go back to start position
    pos = 0;
    carousel.setAttribute("data-pos", pos);
    carousel.scrollTo(pos, 0);
  }
}

//this function just waits for the documet to load properly and then sets the carrosel position to 0 to avoid any weird stuff.
function forceStartPosition(carousel) {
  carousel.scrollTo(0, 0);
  var interval = setInterval(function() {
    if (document.readyState === 'complete') {
      carousel.scrollTo(0, 0);
      carousel.setAttribute("data-pos", 0);
      clearInterval(interval);
    }
  }, 100);
}



