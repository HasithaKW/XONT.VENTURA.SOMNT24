// Get the modal
var modal = document.getElementById('imageModalID');

// Get the image and insert it inside the modal - use its "alt" text as a caption

//var img = document.getElementById('myImg');
var modalImg = document.getElementById("imageModalContentID");
var captionText = document.getElementById("imageCaption");

$(".zoomImg").click(function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("imageClose")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}