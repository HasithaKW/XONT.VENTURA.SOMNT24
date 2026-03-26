//Window Resize and Expand
if (window.screen) self.resizeTo(screen.availWidth, screen.availHeight); function Maximize() { window.moveTo(0, 0); window.resizeTo(window.screen.availWidth, window.screen.availHeight) } var mine = window.open('', '', 'width=1,height=1,left=0,top=0,scrollbars=no'); if (mine) { var popUpsBlocked = false } else { var popUpsBlocked = true; mine.close() }
//Show Hide Passwordword Expire User Control
function HidePopup() {
    document.getElementById("divChangePass").style.display = "none";
  objDiv = document.getElementById("divChangePassCon"); objDiv.style.display = "none"; return false }
function ShowPopup() {
    try {
        document.getElementById("divChangePass").style.display = "block";
        objDiv = document.getElementById("divChangePassCon"); objDiv.style.display = "block";
        objDiv.style.width = document.body.scrollWidth; objDiv.style.height = document.body.scrollHeight
    }
   catch (e) { alert(e) } return false }