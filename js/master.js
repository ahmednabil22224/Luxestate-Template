//-----------------Open & Close Menu---------------
let links = document.querySelector(".links");
let contact = document.querySelector(".registration");
let toggel = document.querySelector(".toggel"); 

function toggelMenu(){
	links.classList.toggle("menu-links");
    contact.classList.toggle("menu-registration");
}
toggel.onclick = toggelMenu;

window.onresize= () => {
	if((window.innerWidth > 991) && links.classList.contains("menu-links")){
		toggelMenu();
	}
}

//-----------------Active Link By NavBar And MenuBar---------------------
let allLinks = document.querySelectorAll(".header .links li a");
	//  Function To Remove Active From All Links
function removeActive(){
	allLinks.forEach(ele => {
		ele.classList.remove("active"); 
	});
}
	//  Check If Exists Value In SessionStorage
if(sessionStorage.getItem("link") !== null){
	removeActive();
	document.querySelector(`[data-link='${sessionStorage.getItem("link")}']`).classList.add("active");
}
		
	//  Handel Active Links
allLinks.forEach(ele => {
	ele.addEventListener("click", (e) => {
		if(links.classList.contains("menu-links")){
			toggelMenu();
		}

		removeActive();
		e.target.classList.add("active");
		sessionStorage.setItem("link",e.target.dataset.link);
	});
});

	//  Handel Logo-Link 
let logoLink = document.querySelector(".logo a");
logoLink.onclick = () => {
	removeActive();
	document.querySelector("[data-link= '.home']").classList.add("active");
	sessionStorage.setItem("link",".home");
}

//-----------------Active Link By Scroll-----------------------
	// Function to check if an element is in the viewport
function isInViewport(element) {
	const rectLink = element.getBoundingClientRect();
	return(
		rectLink.top <= ((window.innerHeight /2) || (document.documentElement.clientHeight /2)) && 
		rectLink.bottom >= ((window.innerHeight /2) || (document.documentElement.clientHeight /2))
	)
}
	// Function to handle scroll events
function handelScroll(){
	removeActive();
	allLinks.forEach(ele => {
		const sectionToReach = document.querySelector(ele.dataset.link);
		if(isInViewport(sectionToReach)){
			ele.classList.add("active");
			sessionStorage.setItem("link",ele.dataset.link);
		}
	})
}
		// Attach the scroll event listener
window.addEventListener("scroll", handelScroll)

//-----------------Header Animation---------------------
let navAnimate = document.querySelector(".header .container");
let previoustValue = window.scrollY;
		// Function to change the Nav Height with a transition
function scrollValue(){
	let currentValue = window.scrollY;
	if(currentValue-previoustValue < 0){
		navAnimate.style.height= "90px";
	}else{
		navAnimate.style.height= "70px";
	}
	previoustValue = currentValue;
}
		// Attach Height Transion Function With an Event
window.addEventListener("scroll", scrollValue)

//-----------------Overlay The Picture Of Appartments---------------------
let appartments = document.querySelector(".appartments");
let imgs = document.querySelectorAll(".appartments img");

let overlayBox = document.createElement("div")
let overlayImg = document.createElement("div")
let image = document.createElement("img");
overlayImg.appendChild(image);
let bttn = document.createElement("button");
bttn.innerText = "X";
overlayImg.appendChild(bttn);

imgs.forEach(img => {
	img.onclick = () => {
		appartments.appendChild(overlayBox)
		appartments.appendChild(overlayImg);
		overlayBox.className = "overlay-box";
		overlayImg.className = "overlay-img";
		image.src = img.src;
	}
})

bttn.addEventListener("click", (e) => {
	e.target.parentElement.remove();
	overlayBox.classList.remove("overlay-box");
});







