function SelectOneCheckBox(id, checkBoxID) {

  
        var chkList = document.getElementById(id); if (chkList == null) {
        id = id + '_ctl00';
        chkList = document.getElementById(id)
      
    }
    var chks1 = chkList.getElementsByTagName("input");
    var selectedVal = document.getElementById(checkBoxID).value;
    //alert(selectedVal);
   
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
                //    alert(chkList.rows[i + 1].id);

                chkList.rows[i + 1].style.backgroundColor = '#669999';
                document.getElementById(checkBoxID).value = i; break
            } else {
                if (selectedVal != i) {

                
                    chks[selectedVal].checked = false;
                    chkList.rows[parseInt(selectedVal) + 1].style.backgroundColor = chkList.rows[parseInt(selectedVal) + 1].id;
                    var vall =document.getElementById(checkBoxID).value = i;
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
    
    
    var index = parseInt(document.getElementById(checkBoxID).value);
    var index2 = parseInt(index + 1);
    
    var gv = document.getElementById("grvProducts");
    var myInputTextField = gv.rows[index2].cells[1].innerText;
    
    document.getElementById('lblselectedProduct').innerHTML = "Product Code-" + myInputTextField;


    var myInputTextField2 = gv.rows[index2].cells[2].innerText;
    document.getElementById('TxtProducSqn').disabled = false;
    document.getElementById('lblselectedProductDes').innerHTML = "Description-" + myInputTextField2;

    document.getElementById('lblMessage').innerHTML = "";
    document.getElementById('lblMessageUpdated').innerHTML = "";
   
}

