let mainColor = localStorage.getItem("option-box");

let randomback = true;
let backgroundInterval;

if(mainColor !== null){
    document.documentElement.style.setProperty("--main--color" , localStorage.getItem("option-box"));
   document.querySelectorAll(".colors-list li").forEach(Element =>{
        Element.classList.remove(".active");
        if(Element.dataset.color === mainColor){ 
            Element.classList.add("active");
        }
    });
  

}
let localBackground = localStorage.getItem("background-option");
 
if(localBackground !== null){
//    console.log(typeof(localBackground));
  if(localBackground === "true"){
    randomback = true;
  }else{
      randomback = false;
  }
  document.querySelectorAll(".random-background span").forEach(element =>{
      element.classList.remove("active");
  });
  if(localBackground === "true"){
    document.querySelector(".random-background .yes").classList.add('active');

}else{
    document.querySelector(".random-background .no").classList.add('active');
}
}
document.querySelector( ".setting-box .toggle .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");

    document.querySelector(".setting-box").classList.toggle("open");

}
const liColors = document.querySelectorAll(".colors-list li");
    liColors.forEach(li =>{
         li.addEventListener("click" ,(e) =>{
             document.documentElement.style.setProperty("--main--color" , e.target.dataset.color);
             localStorage.setItem("option-box" , e.target.dataset.color);
           handelActive(e);
         });
        
    });

const randombackgroundEl = document.querySelectorAll(".random-background span");
    randombackgroundEl.forEach(span =>{
         span.addEventListener("click" ,(e) =>{
             e.target.parentElement.querySelectorAll(".active").forEach(Element =>{
                 Element.classList.remove("active");
             });
              e.target.classList.add("active");

              if(e.target.dataset.background === "yes"){
                randomback = true;
               randomizeImgs();
               localStorage.setItem("background-option" ,true);
                //  console.log(randomback);
              }else{
                randomback = false;
                // console.log(randomback);
                clearInterval(backgroundInterval);
                localStorage.setItem("background-option" ,false);
                
              }
         });
        
    });

let landingPage = document.querySelector(".landing-page");
let imgArray =["1.png","2.png","3.png","4.png","5.png"];

 function randomizeImgs(){

if( randomback === true){
    backgroundInterval = setInterval(() =>{
    let randomNumber = Math.floor(Math.random()* imgArray.length);
    landingPage.style.backgroundImage = `url("images/${imgArray[randomNumber]}")`;
    },1000);
  }
 }

 let ourSkills = document.querySelector(".skills");

window.onscroll = function(){

 let skillsOffset = ourSkills.offsetTop;
 let skillsOuter = ourSkills.offsetHeight;
 let windowHeight = this.innerHeight;
 let windowScrollTop = this.pageYOffset;
  if(windowScrollTop > (skillsOffset + skillsOuter - windowHeight )){
      let allSkills = document.querySelectorAll(".skills .skills-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
  }
};
// creat popup with the img
let ourGallery = document.querySelectorAll(".gellary .images-box img");
 ourGallery.forEach(img =>{

    img.addEventListener("click" ,(e) => {

       let overlay = document.createElement("div");
       overlay.className = "popup-overlay";
       document.body.appendChild(overlay);
       let popupBox = document.createElement("div");
       popupBox.className = "popup-box";

       
       if( img.alt !== null){
        let headingImage = document.createElement("h3");
        let txtImage = document.createTextNode(img.alt);
        headingImage.appendChild(txtImage);
        popupBox.appendChild(headingImage);

    }
       let imgPopup = document.createElement("img");
       imgPopup.src = img.src;
       popupBox.appendChild(imgPopup);
       document.body.appendChild(popupBox);

       let closeButton = document.createElement("span");
       let closeButtonText = document.createTextNode("X");
       closeButton.appendChild(closeButtonText);
       closeButton.className="close-button";
       popupBox.appendChild(closeButton);
    });

 });

 document.addEventListener("click" ,function(e){
  
    if( e.target.className === "close-button"){
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();

    }
 });

 function handelActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(Element =>{
        Element.classList.remove("active");
    });
     ev.target.classList.add("active");
 }

// select all bullets
const allBullets=document.querySelectorAll(".nav-bullet .bullet");
const allLinks= document.querySelectorAll(".lists a");

   function scrollTo(elements){
    elements.forEach(ele => {
      ele.addEventListener("click", (e) => {
            e.preventDefault();
           document.querySelector(e.target.dataset.section).scrollIntoView({
               behavior:'smooth'
           });
        });
   });
   }
   scrollTo(allBullets);
   scrollTo(allLinks);
//    creat bullets option
    let bulletSpan = document.querySelectorAll(".bullets-option span");
    let bulletsContainer = document.querySelector(".nav-bullet");
    let bulletLocalItem = localStorage.getItem("bullets-options");
    if( bulletLocalItem !== null){
        bulletSpan.forEach(span =>{
            span.classList.remove("active");
        });
      if(bulletLocalItem === "block"){
         bulletsContainer.style.display="block";
         document.querySelector(".bullets-option .yes").classList.add("active");
      }else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
      }
      
    }
    

    bulletSpan.forEach(span => {
        span.addEventListener("click" , (e) => {
            if(span.dataset.display === "show"){
                bulletsContainer.style.display = "block";
                localStorage.setItem("bullets-option" , "block");
            }else{
                bulletsContainer.style.display = "none";
                localStorage.setItem("bullets-option" , "none");
            }
            e.target.parentElement.querySelectorAll(".active").forEach(Element =>{
                Element.classList.remove("active");
            });
             e.target.classList.add("active");
        });
    });








// end bullets option