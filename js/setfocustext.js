var focusPanelbehaviourId = null;
var focustextBox = null;

function pageLoad(sender, args) {
    if (focusPanelbehaviourId != null) {
        $find(focusPanelbehaviourId).add_expandComplete(expandHandler);
        $find(focusPanelbehaviourId).add_collapseComplete(collapseHandler)
    }
}
function expandHandler(sender, args) {
    document.getElementById(focustextBox).focus()
}
function collapseHandler(sender, args) { }
function SetFocusSelection(behaviourId, textBox) {
    focusPanelbehaviourId = behaviourId; focustextBox = textBox
}
function SetFocus(textBox) {
    document.getElementById(textBox).focus()
}