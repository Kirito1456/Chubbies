$(document).ready(function(){

    document.getElementById("bmodal").addEventListener("click",showForm, false);
    document.getElementById("bmodal2").addEventListener("click",hideForm, false);
   
    function showForm(){
        document.getElementById("id01").style.display="block";
    }

    function hideForm(){
        document.getElementById("id01").style.display="none";
    }
    // JS for submission of login form
    //document.getElementById("loginForm").addEventListener("submit", ifValid); //triggers when submit button is clicked
    
    //function ifValid() { //function that displays a message if the login credentials are valid
        //alert("Loading..... Please wait!!");
    //}

     
    //JS for Product Preview
    var currentSlide = 0;
    const slides = document.querySelectorAll(".products")
    const dots = document.querySelectorAll('.indicator')

    const init = (n) => {
        slides.forEach((slide) => {
            slide.style.display = "none"
            dots.forEach((dot) => {
                dot.classList.remove("active")
            })
        })
        slides[n].style.display = "block"
        dots[n].classList.add("active")
    }

    document.addEventListener("DOMContentLoaded", init(currentSlide))
    const next = () => {
        currentSlide >= slides.length - 1 ? currentSlide = 0 : currentSlide++
        init(currentSlide)
    }
  
    const prev = () => {
        currentSlide <= 0 ? currentSlide = slides.length - 1 : currentSlide--
        init(currentSlide)
 }
  
  
    document.querySelector(".next").addEventListener('click', next)
    document.querySelector(".prev").addEventListener('click', prev)  
 
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            console.log(currentSlide)
            init(i)
            currentSlide = i
        })
    })

        // Close login page when the user clicks anywhere outside of the login page.
        var modal = document.getElementById('id01');
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }       
        
        
        // JS for submission of login form
  //document.getElementById("loginForm").addEventListener("submit", ifValid); //triggers when submit button is clicked
  
  //function ifValid() { //function that displays a message if the login credentials are valid
    //alert("Loading..... Please wait!!");
  //}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
     })