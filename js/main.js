/* =========================== 
Standard Variables
============================== */

/* The Lightbox */
var $overlay = $('<div id="overlay"></div>');
var $description = $("<p></p>");

/* Buttons for Carousel Slider - Setting up lightbox mode */
var $tab = $('.image-link');
var $caption = $('.image-link span');

/* Using JQuery to generate the arrow images as real elements */
var $arrowLeft = $('<div class="left-arrow" title="Left (Prev) Arrow"></div>');
var $arrowRight = $('<div class="right-arrow" title="Right (Next) Arrow"></div>');

/* Core Variables */
var $findData;
var $currentYear;
var $displayThumb;
var $hideThumb;
var $displayThumbOnFocus;
var $hideThumbOnBlur;
var $showImage;
var $getImage;
var $fadeOut;
var $arrayGenerator;
var $slideAnimation;
var $container = $('<div class="container"></div>');
var $img = $("<img>");
var $iframe = $("<iframe>");
var $currentCaption;
var $currentTitle;

/* Other */
var currentSpan;
var imageLocation;
var imageHref;
var imageTitle;
var imageCaption;
var imageMedia;
var newImg;
var newCaption;
var newTitle;
var newMediaType;
var mediaType;
var resetForm;
var noResults = '';

/* Footer Text and Dates */
var d = new Date();
var n = d.getFullYear();

/* =========================== 
Functions - 14 Functions
============================== */

/* ----- 
Function 1 - (1 out of 14) 
----- */
function $displayThumb(element) { //Function for Displaying Thumb and Caption.
	"use strict";
	$(element).css("opacity", 1);
	$currentCaption = $(element).prev().attr('alt');
	$currentTitle = $(element).prev().attr('title');
	$(element).html('<span class="hover-style">' +$currentTitle + '</span><br />' +$currentCaption);
}

/* ----- 
Function 2 - (2 out of 14) 
----- */
function $hideThumb(element) { //Function for Hiding Thumb and Caption.
	"use strict";	
	$(element).css("opacity", 0);
}

/* ----- 
Function 3 - (3 out of 14) 
----- */
function $displayThumbOnFocus(element) { //Function for Displaying Thumb and Caption on [FOCUS].
	"use strict";
	$(element).find('span').css("opacity", 1);
	$currentCaption = $(element).find('img').attr('alt');
	$currentTitle = $(element).find('img').attr('title');	
	$(element).find('.hover-information').html('<span class="hover-style">' +$currentTitle + '</span><br />' +$currentCaption);
}

/* ----- 
Function 4 - (4 out of 14) 
----- */
function $hideThumbOnBlur(element) { //Function for Hiding Thumb and Caption on [FOCUS].
	"use strict";
	$(element).find('.hover-information').css('opacity', 0);
	currentSpan = $(element).find('span');
}

/* ----- 
Function 5 - (5 out of 14) 
----- */
function $arrayGenerator() { //Function generates Arrays using .column class.
	"use strict";
	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	imageMedia = [];
	$(".col").find(".image").each(function() {
		imageHref.push($(this).parent().attr("href"));
		imageMedia.push($(this).parent().attr("class"));
		imageCaption.push($(this).attr("alt"));
		imageTitle.push($(this).attr("title"));
	});
}

/* ----- 
Function 6 - (6 out of 14) 
----- */
function $slideAnimation(){ // This Function changes slide animation. I have chosen the fade animation when sliding.
	"use strict";
	$description.fadeOut(100);	
	if (mediaType === "image") {
		$img.hide();
		$iframe.fadeOut("slow", function(){	
			$img.fadeOut("750", function(){
				$img.attr("src", newImg).fadeIn("750");
				$description.html('<strong>' + newTitle + '</strong>: ' + newCaption).fadeIn('750');
			});
		});
	} else {
		$iframe.hide();
		$img.fadeOut("slow", function(){
			$iframe.fadeOut("750", function(){
				$iframe.attr("src", newImg).fadeIn("750");
				$description.html('<strong>' + newTitle + '</strong>: ' + newCaption).fadeIn('750');
			});
		});
	}
}

/* ----- 
Function 7 - (7 out of 14) 
----- */
function print(message){ //Function for print
	"use strict";
	var printOut = document.getElementById("response");
	printOut.innerHTML = message;
};

/* ----- 
Function 8 - (8 out of 14) 
----- */
function $findData(imageSrc){ //Function sets Image's href, caption and title.
	"use strict";
	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	$(".col").find(".image").each(function() {
		imageHref.push($(this).parent().attr("href"));
		imageCaption.push($(this).attr("alt"));
		imageTitle.push($(this).attr("title"));
	});
	for ( var i = 0 ; i < imageHref.length; i++){
		if ( imageSrc === imageHref[i] ) {
			newCaption = imageCaption[i];
			newTitle = imageTitle[i];			
		}
	}
}

/* ----- 
Function 9 - (9 out of 14) 
----- */
function $getImage(element, e){ /* Function for opening Image or Video on [MOUSE-CLICK]. */
	"use strict";
	e.preventDefault(); /* Removes the default browser behaviour to view an image or video */
	if(mediaType === "image") {
		$img.show();
		$iframe.hide();
	} else {
		$img.hide();
		$iframe.show();
	}
	imageLocation = $(element).parent().attr("href");	

	$findData(imageLocation);

	$showImage(imageLocation, newTitle, newCaption);
}

/* ----- 
Function 10 - (10 out of 14) 
----- */
function $showImage(iL, $cT, $cC) { //Function for showing Image.
	"use strict";	
	//Function updates image' source attribute.
	if(mediaType === "image"){
		$img.attr("src", iL);
	} else {
		$iframe.attr("src",iL);
	}
	//Update image description.
	$description.html('<strong>' + $cT + '</strong>: ' + $cC);	

	// Overlay fade speed when you click on an image.	
	$container.fadeIn(600);
	$arrowLeft.fadeIn(600);
	$arrowRight.fadeIn(600);	
}

/* ----- 
Function 11 - (11 out of 14) 
----- */
function $fadeOut() { //Function fades out image.
	"use strict";
	// Hide the overlay on mouse click.
	$container.fadeOut(150);
	$arrowLeft.fadeOut(150);
	$arrowRight.fadeOut(150);
	$img.attr("src","");
	$iframe.attr("src","");
	//Clean up overlay
	$("body").detach(".container");
}

/* ----- 
Function 12 - (12 out of 14) 
----- */
function resetForm() { //Function resets input field
	"use strict";
	$("#search_bar").val(function() {
		return $("search_bar").defaultValue;
	});
}

/* ----- 
Function 13 - (13 out of 14) 
----- */
(function ($) { //Function insures 'no conflict' 
	"use strict";
	$(document);
}(jQuery));

/* ----- 
Function 14 - (14 out of 14) 
----- */
function $currentYear() { // Function generates the current year and adds language for copyright notice.
	"use strict";

	// Built-in/Predefined object that helps calculate date and time
	var d = new Date();
	/* 
	We can see here I'm accessing the .getFullYear method from this cool "date" object
	This object will automatically update the year thanks to this object.	
	*/
	var n = d.getFullYear();

	// Hard coded text using JavaScript!
	document.getElementById("copyright").innerHTML = 'Interactive Photo Gallery ' + n + ' - ' + 'All Rights Reserved Ken Chung &copy; ';
}

/* ==================== 
Append to the document
======================= */

//Add image to overlay.
$overlay.append($img).append($iframe).append($description);
$img.hide();
$iframe.hide();

//Add overlay.
$container.append($overlay);

//Add directional arrows.
$("body").append($arrowLeft).append($arrowRight);

//Add container.
$("body").append($container);

//Call "always current" year.
$currentYear();

/* ============================== 
Events - Mouse & Native Keyboard
================================= */

//Display thumb and caption on [HOVER]. Hide thumb and caption on leave.
$caption.css("opacity", 0); /* Initally Hide */
$caption.mouseenter(function() {
	"use strict";
	$displayThumb(this);
}).mouseleave(function() {
	"use strict";
	$hideThumb(this);
});

// Display thumb and caption on [FOCUS]. Hide thumb and caption on [BLUR].	
$tab.focus(function(){
	"use strict";
	$displayThumbOnFocus(this);
}).blur(function(){
	"use strict";
	$hideThumbOnBlur(this);
});

//Capture the [MOUSE-CLICK] event on a link to an image.
$caption.click(function(e){
	"use strict";
	var thisImage = $(this).parent().find("img").attr("class");
	if (thisImage === "image"){
		switch($(this).parent().attr("class")){
			case "image-link":
			mediaType = "image";
			break;
			case "image-link video":
			mediaType = "video";
			break;
		}
		$getImage(this, e);
	}
});

//Prevents [ENTER] press from activating .column a element.  This is reserved for [MOUSE-CLICK].
$tab.click(function(e){
	"use strict";
	e.preventDefault();
});

//Fade out overlay when [MOUSE] is clicked.
$('.container').click(function(){
	"use strict";
	$fadeOut();
});

//Image's Left-Arrow Directional Behavior on [MOUSE-CLICK].
$arrowLeft.click(function(){	
	"use strict";

	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	imageMedia = [];

	$arrayGenerator();

	for ( var i = 0 ; i < imageHref.length; i++ ){
		switch(mediaType){
			case "image":
			if ( $img.attr("src") === imageHref[i] ) {
				if ( i !== 0 ) {
					newImg = imageHref[i - 1];
					newCaption = imageCaption[i - 1];
					newTitle = imageTitle[i - 1];
					newMediaType =  imageMedia[i - 1];
				} else {
					newImg = imageHref[imageHref.length - 1];
					newCaption = imageCaption[imageHref.length - 1];
					newTitle = imageTitle[imageHref.length - 1];
					newMediaType = imageMedia[imageHref.length - 1];
				}
			} 
			break;
			case "video":			
			if ( $iframe.attr("src") === imageHref[i] ) {
				if ( i !== 0 ) {
					newImg = imageHref[i - 1];
					newCaption = imageCaption[i - 1];
					newTitle = imageTitle[i - 1];
					newMediaType =  imageMedia[i - 1];
				} else {
					newImg = imageHref[imageHref.length - 1];
					newCaption = imageCaption[imageHref.length - 1];
					newTitle = imageTitle[imageHref.length - 1];
					newMediaType = imageMedia[imageHref.length - 1];
				}
			} 
			break;
		}
	}
	switch(newMediaType){
		case "image-link":
		mediaType = "image";
		$img.show().attr("src","");
		$iframe.hide().attr("src","");
		break;
		case "image-link video":
		mediaType = "video";
		$img.hide().attr("src","");
		$iframe.show().attr("src","");
		break;
	}
	$slideAnimation();
});

//Image's Right-Arrow Directional Behavior on [MOUSE-CLICK].
$arrowRight.click(function(){
	"use strict";
	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	imageMedia = [];

	$arrayGenerator();
	for ( var i = 0 ; i < imageHref.length; i++){
		switch (mediaType) {
			case "image" :
			if ( $img.attr("src") === imageHref[i] ) {
				if ( i !== imageHref.length - 1 ) {
					newImg = imageHref[i + 1];
					newCaption = imageCaption[i + 1];
					newTitle = imageTitle[i + 1];
					newMediaType = imageMedia[i + 1];
				} else {
					newImg = imageHref[0];
					newCaption = imageCaption[0];
					newTitle = imageTitle[0];
					newMediaType = imageMedia[0];
				}
			}
			break;
			case "video":
			if ( $iframe.attr("src") === imageHref[i] ) {
				if ( i !== imageHref.length - 1 ) {
					newImg = imageHref[i + 1];
					newCaption = imageCaption[i + 1];
					newTitle = imageTitle[i + 1];
					newMediaType = imageMedia[i + 1];
				} else {
					newImg = imageHref[0];
					newCaption = imageCaption[0];
					newTitle = imageTitle[0];
					newMediaType = imageMedia[0];
				}
			}

			break;				
		}
	}
	switch(newMediaType){
		case "image-link":
		mediaType = "image";
		$img.show().attr("src","");
		$iframe.hide().attr("src","");
		break;
		case "image-link video":
		mediaType = "video";
		$img.hide().attr("src","");
		$iframe.show().attr("src","");
		break;
	}

	$slideAnimation();
});

/* =========================== 
KEYBOARD EVENTS
============================== */

//[KEY UP] Switch Statement.
$(this).keyup(function(e) {
	"use strict";
	switch(e.keyCode) {
		case 13:
		case 27:
//Fade out overlay when [ENTER=13] and [ESC=27] is keyed.
$fadeOut();
break;
case 37:
//Advances slideshow left on left-arrow [37] key.
if ( $container.is(":visible") ) {
	$arrowLeft.trigger("click");
} else {
	$caption.trigger("click");
}			
break;
case 39:
//Advances slideshow right on right-arrow [39] key.
if ( $container.is(":visible") ) {
	$arrowRight.trigger("click");
} else {
	$caption.trigger("click");
}
break;
}
});

// MY ULTIMATE GOOGLE SEARCH ENGINE GOD FORM 
// [SEARCH] function sets unfiltered to hidden and .hide() them. Sets filtered to show and .show() them.
$('#search_bar').keyup(function() {
	"use strict";
	var searchValue = $("#search_bar").val().toLowerCase();	
	var targetImg = $(".gallery").find("img");
	var targetCol = $(".gallery").find(".col");
	var searchThis;
	var noResultsCounter = 0;	
	
	targetCol.each(function(){
		noResultsCounter++;
	});
	
	targetImg.each(function(){
		searchThis = $(this).attr("alt").toLowerCase() + $(this).attr("title").toLowerCase();		
		if (searchThis.indexOf(searchValue) === -1){
			if( $(this).attr("class") !== "image_hide" ) {
				$(this).attr("class", "image_hide").parent().unwrap("<div class='col'></div>").wrap("<span class='col-hide'></span>"); 				
				$(this).parent().parent().delay(100).hide(500);
				noResultsCounter--;
			}
		} else {
			if( $(this).attr("class") !== "image" ) {	
				$(this).parent().parent().delay(100).show(500, function(){				
					$(this).children().unwrap("<span class='col-hide'></span>").wrap("<div class='col'></div>");
				});		
				$(this).attr("class", "image");
				noResultsCounter++;
			}
		}
		
	});	 	 
	setTimeout(function(){
		showResults();
	}, 620);

	// Local Function displays message when there's 'No Results'
	function showResults() {
		if (noResultsCounter < 1 ) {	
				if (searchValue !== "") {
					noResults = "No Results for '" + searchValue + ".'";
					print(noResults);
					document.getElementById("response").style.display = "inline";
						noResults = "";	
				} else {
					document.getElementById("response").style.display = "none";					
				}
		} else {	
			noResults = "";	
			document.getElementById("response").style.display = "none";	
		}
	}
});