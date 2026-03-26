var theme_color = 'blue';
var link = window.parent.document.getElementsByTagName('link');


if (link) {
    for (var i = 0; i < link.length; i++) {
        var href = link[i].href;
        if (href.includes('App_Themes') && href.includes('StyleSheet')) {
            var array = href.split('App_Themes/');
            var new_color = array[1].split('/')[0];
            if (new_color && new_color != '') {
                theme_color = new_color;
            }
        }
    }
}

//document.write('<link href="../App_Themes/' + theme_color + '/V3.css" rel="stylesheet" />');//V2024
document.write('<link href="../App_Themes_V3/' + theme_color + '/V3.css" rel="stylesheet" />');//V2024

document.write('<script src="../js/jspdf.debug.js"></script>');//V2027
document.write('<script src="../js/jspdf.plugin.autotable.js"></script>');//V2027

//V2024
$.getJSON("../ventura.config.json", function (result) {
    if (result) {
        localStorage.setItem('ClientDateFormat', result.appSettings.clientDateFormat);
    } else {
        localStorage.setItem('ClientDateFormat', 'yyyy/mm/dd');
    }
});
//V2024

function closeTab() {
    var t = window.parent.document.getElementById('txtCurrentTaskCode');
    if (t != null) {//check this one working in app console or local
        window.parent.document.getElementById(t.value + '_close').click();
    } else {
        var taskCode = currentTaskCode();
        cleanLocalStorage(taskCode);
    }
}

function currentTaskCode() {
    var base = document.getElementsByTagName('base');
    var taskCode = '';
    if (base) {
        var href = base[0].href;
        var array = href.split('/');
        taskCode = array[array.length - 2];
    }
    return taskCode.trim();
}

function cleanLocalStorage(taskCode) {
    for (var key in localStorage) {
        var keySplitArray = key.split('_');
        if (keySplitArray.length > 0) {
            if (keySplitArray[0] == taskCode) {
                localStorage.removeItem(key);
            }
        }
    }
}
//V2024
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}
function isNumberWithoutDec(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}
function blockCharacters(evt, array) {
    //['&#34;', 'p', 'r', '\'']
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode

    for (var i = 0; i < array.length; i++) {
        if (iKeyCode == array[i].charCodeAt(0)) {
            return false;
        }
    }
    return true;
}

function setupGridLoader(taskCode) {
    //V2037 del
    //if (localStorage.getItem(taskCode + '_MasterControlData') == null) {
    //    var url = window.location.href;
    //    var array = url.split('/');
    //    var apiPrefix = '';
    //    if (array[3] != taskCode) {
    //        apiPrefix = '/' + array[3];
    //    }
    //    $.ajax(apiPrefix + '/api/CustomControl/GetMasterControlData?taskCode=' + taskCode, {
    //        success: function (data) {
    //            localStorage.setItem(taskCode + '_MasterControlData', JSON.stringify(data));
    //        },
    //        error: function (error) {
    //            console.log(error);
    //        }
    //    });
    //}
    //V2037
}
//V2024

//V2033Adding start
function GetAPI_Prefix() {
    var a = parent.document.getElementsByClassName("navbar");
    if (a.length == 0) {
        return document.location.origin;
    } else {
        var array = document.location.pathname.split("/");
        return document.location.origin + "/" + array[1];
    }
}
//V2033Adding end

//V2037 del
////V2030 - populate master control data for the list prompt start
//var pmtMstCntDta = localStorage.getItem('PROMPT_MasterControlData');
//if (!pmtMstCntDta) {

//    $.ajax(GetAPI_Prefix() + '/api/CustomControl/GetMasterControlData?taskCode=PROMPT', {
//        success: function (data) {
//            localStorage.setItem('PROMPT_MasterControlData', JSON.stringify(data));
//        },
//        error: function (error) {
//            console.log(error);
//        }
//    });
//}
////V2030 - populate master control data for the list prompt end

////V2033 -populate caption Transaltor data start
//$.ajax(GetAPI_Prefix() + '/api/CaptionTranslate/GetCaptions', {
//    success: function (data) {
//        localStorage.setItem('Caption_List', JSON.stringify(data));
//    },
//    error: function (error) {
//        console.log(error);
//    }
//});
////V2033 -populate caption Transaltor data end
//V2037


////V2037 -Getting all control data through sigle request
var currentTask = $("#txtCurrentTaskCode", parent.document).val();
if (currentTask==undefined) {
    currentTask = currentTaskCode();
}
$.ajax(GetAPI_Prefix() + '/api/CustomControl/GetInitialControlData?taskCode=' + currentTask, {
    success: function (data) {
        localStorage.setItem('ControlData', JSON.stringify(data.ControlData));
        localStorage.setItem('Caption_List', JSON.stringify(data.CaptionData));
        localStorage.setItem('PROMPT_MasterControlData', JSON.stringify(data.PromptMasterControlData));
        localStorage.setItem(currentTask + '_MasterControlData', JSON.stringify(data.MasterControlData));
    },
    error: function (error) {
        console.log(error);
    }
});
////V2037 -Getting all control data through sigle request

function numbersOnly(evt, noOfRoundableDigits, noOfDecimalDigits, withMinus) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    var text = evt.target.value.trim();
    var originalText = evt.target.value;

    var cursorStart = evt.target.selectionStart;
    var cursorEnd = evt.target.selectionEnd;
    if (originalText != "") {

        if (cursorStart == 0 && cursorEnd == 0) {
            return false;
        } else if (cursorStart != cursorEnd) {
            if (!(cursorStart == 0 && cursorEnd == originalText.length)) {

                return false;
            }
        } else if (!(cursorStart == originalText.length && cursorEnd == originalText.length)) {
            return false;
        }
    }



    if (withMinus == true) {
        if (iKeyCode != 45 && iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
            return false;
        }
    } else {
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
            return false;
        }
    }


    if (iKeyCode == 45) {
        if (text != "") {
            return false;//block - 
        }
    }

    else if (iKeyCode == 46) {
        if (text == "") {
            return false;//block . for first digit
        }
        else if (text.includes(".")) {
            return false;//block . if it already exists
        } else if (noOfDecimalDigits == 0) {
            return false;
        }

    } else {
        if (noOfRoundableDigits == 0) {
            return false;
        }
        else if (noOfRoundableDigits > 0) {
            if (text.includes(".")) {
                var array = text.split('.');
                if (array[1].length >= noOfDecimalDigits && noOfDecimalDigits >= 0) {

                    if (!(cursorStart == 0 && cursorEnd == originalText.length)) {
                        return false;
                    }
                }


            } else {
                var textWithoutComma = text.replace(/,/g, "");
                if (textWithoutComma.length >= noOfRoundableDigits) {
                    return false;
                }
            }
        }
        else {
            if (text.includes(".")) {
                var array = text.split('.');
                if (array[1].length >= noOfDecimalDigits && noOfDecimalDigits >= 0) {

                    if (!(cursorStart == 0 && cursorEnd == originalText.length)) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}



function applyAmoutFormat(evt) {
    var text = evt.target.value.trim().replace(/,/g, "");
    var array = text.split('.');

    var prefix = '';
    var suffix = '';
    if (array.length > 1) {
        suffix = array[1];
    }
    prefix = array[0];

    if (array.length > 1) {
        prefix = prefix.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        evt.target.value = prefix + '.' + suffix;
    } else {
        prefix = prefix.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        evt.target.value = prefix;
    }

}

function getDecimalOffset(noOfRemainingDecimalPoints) {
    var offset = '';
    for (var i = 0; i < noOfRemainingDecimalPoints; i++) {
        offset = offset + '0';
    }
    return offset;
}

function completeDecimalPlaces(evt, noOfMinimumDecimalDigits) {
    var text = evt.target.value.trim();
    if (text != "") {
        if (text.includes(".")) {
            var array = text.split(".");
            var decimalLength = array[1].length;
            if (noOfMinimumDecimalDigits > 0) {
                if (noOfMinimumDecimalDigits > decimalLength) {
                    evt.target.value = text + getDecimalOffset(noOfMinimumDecimalDigits - decimalLength);
                }
            } else {
                var numText = text.replace(/,/g, "");
                evt.target.value = parseFloat(numText).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        } else {
            if (noOfMinimumDecimalDigits > 0) {
                evt.target.value = text + "." + getDecimalOffset(noOfMinimumDecimalDigits);
            } else {
                evt.target.value = text;
            }
        }
    }
}