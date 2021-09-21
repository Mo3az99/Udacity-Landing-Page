/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
const list = document.getElementById('navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav () {
  //  let sections = document.querySelectorAll('section');
    const fragment = document.createDocumentFragment();
    let i = 0;
    for (const section of sections) {   /// how to use for of here please, i tried but it didnt work i needed the i counter 
        const newElement =document.createElement('li');
        newElement.className = `item ${i}`;
        var data = section.getAttribute("data-nav");
        newElement.innerText= data;
        fragment.appendChild(newElement);   
        i++;
    }
    list.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
function activeScrolling () {// is here an over head ?
    sections.forEach(function(section,i){    /// how to use for of here please, i tried but it didnt work i needed the i counter 
        if (window.scrollY >= sections[i].offsetTop ) {    //is there a better way ?
            sections[i].classList.add("active");
            if (i>0){
                sections[i-1].classList.remove("active");
            }
        }
        if (window.scrollY < sections[i].offsetTop) { 
            sections[i].classList.remove("active");
        }
    });
}; 

// Scroll to anchor ID using scrollTO event
function anchorClick (e) {
    if (e.target && e.target.matches("li.item")) { //li and li.item both works what is the diffrence please?
       console.log("clicked " + e.target.classList[1]);    
       window.scrollTo(0,sections[e.target.classList[1]].offsetTop); // is there a better way, i feel it is a bit complicated or i dont feel it is xd
    }
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('load', function () {
    buildNav();
  });

// Scroll to section on link click

//There is a default event occurring that we need to stop. How? ---- i cant understand this comment i didnt stop anything here
list.addEventListener('click', function(e) {
    anchorClick(e);
});

// Set sections as active
window.addEventListener('scroll', function  () {
    activeScrolling();  
    setTimeout(function(){document.getElementsByClassName("navbar__menu")[0].style.visibility='visible'},0); //is this idea is good or there is a better way ?
    setTimeout(function(){document.getElementsByClassName("navbar__menu")[0].style.visibility='hidden'},1500);
});


