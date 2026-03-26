function SelectOneCheckBox(id, checkBoxID) {
    var chkList = document.getElementById(id);
    if (chkList == null) {
        id = id + '_ctl00';
        chkList = document.getElementById(id)
    }
    var chks1 = chkList.getElementsByTagName("input");
    var selectedVal = document.getElementById(checkBoxID).value;
    var chks = new Array(); for (var y = 0; y < chks1.length; y++) {
        if (chks1[y].type == "radio") {
            chks.push(chks1[y])
        }
    }
    var isAlreayClick = true; for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            isAlreayClick = false;
            if (selectedVal == "") {
                chkList.rows[i + 1].id = chkList.rows[i + 1].style.backgroundColor; //Set Back Colour as Row ID
                //     alert(chkList.rows[i + 1].id);

                chkList.rows[i + 1].style.backgroundColor = '#669999';
                document.getElementById(checkBoxID).value = i; break
            } else {
            if (selectedVal != i) {
                try {
                    chks[selectedVal].checked = false;
                    chkList.rows[parseInt(selectedVal) + 1].style.backgroundColor = chkList.rows[parseInt(selectedVal) + 1].id;
                } catch (Error) { }
                
                    document.getElementById(checkBoxID).value = i;
                    chkList.rows[i + 1].id = chkList.rows[i + 1].style.backgroundColor;
                    chkList.rows[i + 1].style.backgroundColor = '#669999'; break
                }
            }
        }
    } if (selectedVal != "") {
        if (isAlreayClick) {
            chkList.rows[parseInt(selectedVal) + 1].style.backgroundColor = chkList.rows[parseInt(selectedVal) + 1].id;
            document.getElementById(checkBoxID).value = ""
        }
    }
}