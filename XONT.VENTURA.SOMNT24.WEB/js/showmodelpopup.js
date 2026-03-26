function PopUpURL(url) { ShowPopup(url) }
function HidePopup() {
    document.getElementById("divSignin").style.display = "none";
    objDiv = document.getElementById("divg");
    objDiv.style.display = "none";
    document.getElementById("Iframe1").src = "";
    return false
   
}
function PopMultimeadiaUpURL(url) {
    ShowMultimeadiaPopup(url)
}
function HideMultimeadiaPopup() {
    document.getElementById("divMultimeadiaSignin").style.display = "none";
    objDiv = document.getElementById("divMultimeadiag"); objDiv.style.display = "none";
    return false
} function ShowMultimeadiaPopup(url) { try { document.getElementById("divMultimeadiaSignin").style.display = "block"; objDiv = document.getElementById("divMultimeadiag"); objDiv.style.display = "block"; objDiv.style.width = document.body.scrollWidth; objDiv.style.height = document.body.scrollHeight; fnSetDivSigninLeft("divMultimeadiaSignin"); document.getElementById("Iframe1Multimeadia").src = url } catch (e) { alert(e) } return false }

function ShowPopup(url) {
    try {
        document.getElementById("divSignin").style.display = "block";
         objDiv = document.getElementById("divg");
         objDiv.style.display = "block";
         objDiv.style.width = document.body.scrollWidth;
         objDiv.style.height = document.body.scrollHeight; 
        //fnSetDivSigninLeft("divSignin");
        document.getElementById("Iframe1").src = url
    } catch (e) { alert(e) } return false
}
function fnSetDivSigninLeft(oElement) {
    document.getElementById(oElement).style.left = 243;
    document.getElementById(oElement).style.top = 162;
    document.getElementById(oElement).style.width = 472;
    document.getElementById(oElement).style.height = 410;
    return false
}
function select(targetid, descid, ret) {
    var tabContainer = $find("tabContainer");
    var tabs = tabContainer.get_tabs();
    var activeTab = tabContainer.get_activeTabIndex();
    switch (activeTab) {
        case 0: window.frames.ifm_Main_1.Selected(targetid, descid, ret); HidePopup(); break;
        case 1: window.frames.ifm_Main_2.Selected(targetid, descid, ret); HidePopup(); break;
        case 2: window.frames.ifm_Main_3.Selected(targetid, descid, ret); HidePopup(); break;
        case 3: window.frames.ifm_Main_4.Selected(targetid, descid, ret); HidePopup(); break;
            
    }
}