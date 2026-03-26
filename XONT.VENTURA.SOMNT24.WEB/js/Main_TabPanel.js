// Tab Loading...................Starting..................

var tabList = new Array(); //all tabs
var menuList = new Array(); //add tab urls
var acTabList = new Array(); //get Active tab Index
var disTabList = new Array(); //get description List
var pathList = new Array(); //Get Path

//Task Load........  
function LoadTask(url, des,taskid)//Task Code and Task Description
{
    var tabContainer = $find("tabContainer");
    var tabs = tabContainer.get_tabs();
    var flagTabClick = '100';
    url = url.toString().trim();

    if (document.getElementById('txtTabNo').value == '0') {//First Time
        TabsVisibility(); //Add alll Tabs Tab List
    }
    //Check if Already Task Click
    if (menuList.length > 0) {
        for (i = 0; i < menuList.length; i++) {
            if (menuList[i] == url) {
                flagTabClick = acTabList[i];
            }
        }
        if (flagTabClick != '100') {
            tabContainer.set_activeTabIndex(flagTabClick); //Already Opean Tab 
            SetPath(flagTabClick); //set Path
        } else {
            LoadFrames(url, des);
            //Add Active Task to Log
            PageMethods.AddTaskDetails(taskid); //VRoo3
        }
    } else {
        LoadFrames(url, des);
        //Add Active Task to Log
        PageMethods.AddTaskDetails(taskid); //VRoo3
    }
}

//New Frame Load
function LoadFrames(url, des) {

    //Remove Task Code (Use for Remove Session Variables)---01
    var closeTabAll = document.getElementById("txtTaskCode").value;
    var flag = false;
    var taskList = '';
    taskList = closeTabAll.split(",");
    var listCount = taskList.length;
    for (var i = 0; i < listCount; i++) {
        if (taskList[i] == url) {
            taskList.splice(i, i);
            flag = true;
        }
    }
    if (flag) {
        closeTabAll = '';
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i] != '') {
                closeTabAll = closeTabAll + ',' + taskList[i];
            }
        }
        document.getElementById("txtTaskCode").value = closeTabAll;
    }

    //End Close tab Maintaice------------------------------01

    //Start Load New Tab------------------------------------02    
    var tabContainer = $find("tabContainer");
    var tabs = tabContainer.get_tabs();
    url = url.toString().trim();
    var val;
    if (tabList.length > 0) {
        val = tabList.pop();
        acTabList.push(val);
        menuList.push(url);
        disTabList.push(des);
        pathList.push(document.getElementById("txtSelectRole").value + "/" +
                     document.getElementById("txtSelectMenu").value + "/" + des);
    } else {
        val = '100';
    }
    val = val.toString().trim();
    switch (val) {
        case '0':

            ap_showWaitMessage('divIframe1Loading', 1); //For Loading Progress................
            document.getElementById("ifm_Main_1").src = url + "/" + url + ".aspx";
            document.getElementById("ifm_Main_1").style.height = "96%";
            if (navigator.appName == "Netscape") {
                var frmHeight = document.body.clientHeight - 179;
                document.getElementById("appdiv").style.height = frmHeight + 27;
                document.getElementById("tbTabContainer").style.height = frmHeight;
                document.getElementById("ifm_Main_1").style.height = frmHeight;
            }
            tabContainer.set_activeTabIndex(0);
            tabs[0]._header.innerHTML = "<div id='divTab1' onClick='SetPath(0)'>" + des + "<div />";
            tabs[0].set_enabled(true);
            document.getElementById("txtTaskPath").value = document.getElementById("txtSelectRole").value + "/" +
                    document.getElementById("txtSelectMenu").value + "/" + des;

            //     var t = setTimeout("ap_showWaitMessage('divIframe1Loading', 0);", 2500); //For Loading Progress Hide................

            break;

        case '1':

            ap_showWaitMessage('divIframe2Loading', 1); //For Loading Progress................
            document.getElementById("ifm_Main_2").style.height = "96%";
            if (navigator.appName == "Netscape") {
                var frmHeight = document.body.clientHeight - 179;
                document.getElementById("appdiv").style.height = frmHeight + 27;
                document.getElementById("tbTabContainer").style.height = frmHeight;
                document.getElementById("ifm_Main_2").style.height = frmHeight;
            }
            document.getElementById("ifm_Main_2").src = url + "/" + url + ".aspx";
            tabContainer.set_activeTabIndex(1);
            tabs[1]._header.innerHTML = "<div id='divTab2' onClick='SetPath(1)'>" + des + "<div />";
            tabs[1].set_enabled(true);
            document.getElementById("txtTaskPath").value = document.getElementById("txtSelectRole").value + "/" +
                     document.getElementById("txtSelectMenu").value + "/" + des;

            //       var t = setTimeout("ap_showWaitMessage('divIframe2Loading', 0);", 2500);//For Loading Progress Hide................

            break;

        case '2':

            ap_showWaitMessage('divIframe3Loading', 1); //For Loading Progress................
            document.getElementById("ifm_Main_3").src = url + "/" + url + ".aspx";
            document.getElementById("ifm_Main_3").style.height = "96%";
            if (navigator.appName == "Netscape") {

                var frmHeight = document.body.clientHeight - 179;
                document.getElementById("appdiv").style.height = frmHeight + 27;
                document.getElementById("tbTabContainer").style.height = frmHeight;
                document.getElementById("ifm_Main_3").style.height = frmHeight;
            }
            //  document.getElementById("ifm_Main_3").contentWindow.location.reload(true);
            tabContainer.set_activeTabIndex(2);
            tabs[2]._header.innerHTML = "<div id='divTab3' onClick='SetPath(2)'>" + des + "<div />";
            tabs[2].set_enabled(true);
            document.getElementById("txtTaskPath").value = document.getElementById("txtSelectRole").value + "/" +
                    document.getElementById("txtSelectMenu").value + "/" + des;

            //   var t = setTimeout("ap_showWaitMessage('divIframe3Loading', 0);", 2500);//For Loading Progress Hide................


            break;

        case '3':
            //  alert('ddqq');
            ap_showWaitMessage('divIframe4Loading', 1); //For Loading Progress................
            //            if (document.getElementById("ifm_Main_4").src == "") {
            //                var testFrame =
            //               document.createElement("IFRAME");
            //                testFrame.id = "testFrame";
            //                testFrame.style.width = "600px";
            //                testFrame.style.height = "600px";
            //                testFrame.src = url + "/" + url + ".aspx";
            //                var oIframe = document.getElementById("ifm_Main_4");
            //                var oDoc = oIframe.contentWindow || oIframe.contentDocument;
            //                if (oDoc.document) {
            //                    oDoc = oDoc.document;
            //                }
            //                oDoc.body.appendChild(testFrame);

            //      window.frames["ifm_Main_4"].contentWindow.document.getElementById("ifm_Main_4_div").appendChild(testFrame);

            document.getElementById("ifm_Main_4").src = url + "/" + url + ".aspx";
            document.getElementById("ifm_Main_4").style.height = "96%";
            if (navigator.appName == "Netscape") {
                // alert(document.getElementById("ifm_Main_1").style.height);
                var frmHeight = document.body.clientHeight - 179;
                document.getElementById("appdiv").style.height = frmHeight + 27;
                document.getElementById("tbTabContainer").style.height = frmHeight;
                document.getElementById("ifm_Main_4").style.height = frmHeight;
            }
            //   window.frames["ifm_Main_4"].location.reload(true);

            //            } else {
            //             
            //            }
            //    document.getElementById("ifm_Main_4").Window.location.reload(true);
            tabContainer.set_activeTabIndex(3);
            tabs[3]._header.innerHTML = "<div id='divTab4' onClick='SetPath(3)'>" + des + "<div />";
            tabs[3].set_enabled(true);
            document.getElementById("txtTaskPath").value = document.getElementById("txtSelectRole").value + "/" +
                    document.getElementById("txtSelectMenu").value + "/" + des;

            //     var t = setTimeout("ap_showWaitMessage('divIframe4Loading', 0);", 2500);//For Loading Progress Hide................

            break;

        case '100':
            alert("You Have Exceeded the Maximum Number of Tabs.Close One to Open Another");
            break;
    }
    
     
    //End Load New Tab--------------------------------------------------------02
}

//On load add All Tabs in Tab List
function TabsVisibility() {
    document.getElementById('txtTabNo').value = '1';
    var tabContainer = $find("tabContainer");
    var tabs = tabContainer.get_tabs();
    tabs[0].set_enabled(false);
    tabs[1].set_enabled(false);
    tabs[2].set_enabled(false);
    tabs[3].set_enabled(false);
    tabList[0] = '0';
    tabList[1] = '1';
    tabList[2] = '2';
    tabList[3] = '3';
}

//Close Tab
function CloseTab() {

    var url = "";
    var answer;
    var valClose = document.getElementById("txtTaskPath").value;
    if (valClose == '') {
        answer = false;
    } else {
        answer = true;
        var isErrorTab = true;
        var tabContainer = $find("tabContainer");
        var tabs = tabContainer.get_tabs();
        var activeTab = tabContainer.get_activeTabIndex();
        var errorTaskText = window.parent.document.getElementById('txtClose').value;

        errorTaskList = errorTaskText.split(",");
        var errorlistCount = errorTaskList.length;
        for (var i = 0; i < errorlistCount; i++) {
            if (errorTaskList[i] == activeTab) {
                errorTaskList.splice(i, 1);
                isErrorTab = false;
            }
        }
        if (isErrorTab) {
            answer = confirm("Are you sure you want to close this window");
        } else {
            window.parent.document.getElementById('txtClose').value = "";
            errorlistCount = errorTaskList.length;
            for (var i = 0; i < errorlistCount; i++) {
                window.parent.document.getElementById('txtClose').value = errorTaskList[i] + "," + window.parent.document.getElementById('txtClose').value;
            }
        }
    }


    if (answer) {
        //Only 4 tabs close
        if (tabList.length < 4) {
            tabs[activeTab].set_enabled(false);
            tabList.push(activeTab);
            activeTab = activeTab.toString().trim();

            var listCount = menuList.length;
            for (i = 0; i < listCount; i++) {
                if (acTabList[i] == activeTab) {
                    url = menuList[i];
                    menuList.splice(i, 1);
                    acTabList.splice(i, 1);
                    disTabList.splice(i, 1);
                    pathList.splice(i, 1);
                }
            }
            document.getElementById("txtActiveTabUrL").value = "";

            switch (activeTab) {
                case '0':
                    document.getElementById("ifm_Main_1").src = "";
                    if (navigator.appName == "Netscape") {
                        var frmHeight = document.body.clientHeight - 140;
                        document.getElementById("appdiv").style.height = frmHeight - 27;
                        document.getElementById("tbTabContainer").style.height = frmHeight;
                        document.getElementById("ifm_Main_1").style.height = frmHeight;
                    }
                    break;

                case '1':
                    document.getElementById("ifm_Main_2").src = "";
                    if (navigator.appName == "Netscape") {
                        var frmHeight = document.body.clientHeight - 140;
                        document.getElementById("appdiv").style.height = frmHeight - 27;
                        document.getElementById("tbTabContainer").style.height = frmHeight;
                        document.getElementById("ifm_Main_2").style.height = frmHeight;
                    }
                    break;

                case '2':
                    document.getElementById("ifm_Main_3").src = "";
                    if (navigator.appName == "Netscape") {
                        var frmHeight = document.body.clientHeight - 140;
                        document.getElementById("appdiv").style.height = frmHeight - 27;
                        document.getElementById("tbTabContainer").style.height = frmHeight;
                        document.getElementById("ifm_Main_3").style.height = frmHeight;
                    }
                    break;

                case '3':
                    document.getElementById("ifm_Main_4").src = "";
                    if (navigator.appName == "Netscape") {
                        var frmHeight = document.body.clientHeight - 140;
                        document.getElementById("appdiv").style.height = frmHeight - 27;
                        document.getElementById("tbTabContainer").style.height = frmHeight;
                        document.getElementById("ifm_Main_4").style.height = frmHeight;

                    }
                    break;
            }
            //Remove Task Session
            PageMethods.ClearSessionTask(url, activeTab);

            //Use for Remove Session Variables
            var closeTabAll = document.getElementById("txtTaskCode").value;
            closeTabAll = closeTabAll + "," + url;
            document.getElementById("txtTaskCode").value = closeTabAll;

            //Set Path
            SetPath(tabContainer.get_activeTabIndex());
        }

    } //end Confirm
}

//This Function Used to Get Active Tab For Export Excel or Word 
function GetActiveTabURL() {
    var tabContainer = $find("tabContainer");
    var activeTab = tabContainer.get_activeTabIndex();
    var flagTabClick = 0;
    var url = '';
    var url2 = '';
    if (tabList.length > 3) {
        tabContainer.set_activeTabIndex(4);
    }
    else {
        var tabs = tabContainer.get_tabs();

        if (menuList.length > 0) {
            var listCount = menuList.length;
            for (i = 0; i < listCount; i++) {
                if (acTabList[i] == activeTab) {
                    url = menuList[i];

                }
            }
        }
        document.getElementById("txtActiveTabUrL").value = url + ".aspx";
    }

}

//Set User Path----------------------------------------------------------


function SetPath(selectTab) {
    var tabContainer = $find("tabContainer");
    var tabs = tabContainer.get_tabs();
    var activeTab = selectTab; //tabContainer.get_activeTabIndex();
    var des = "";
    for (i = 0; i < acTabList.length; i++) {
        if (acTabList[i] == activeTab) {
            des = pathList[i]; //Get active tab Description

        }
    }

    document.getElementById("txtTaskPath").value = des;

}
function SetRolePath(rolePath) {
    document.getElementById("txtSelectRole").value = rolePath;

}

function SetMenuPath(menuPath) {
    document.getElementById("txtSelectMenu").value = menuPath;

}
//End User Path-----------------------------------------------------------




function SetOpenTabCount(e) {

    document.getElementById('txtOpenTabCount').value = acTabList.length;
    document.getElementById('txtLogOutClick').value = '1';
    if (acTabList.length != 0) {
        //Sexy.alert('<h1>Close All Active Tabs before You Exit</h1>'); 
        alert('Close All Active Tabs before You Exit'); //
        //IE
        if (window.event) {
            event.returnValue = false;
            event.cancel = true;
        }
        // FOR FF
        else {
            e.preventDefault();
        }

    }


}
//-----------------------------Using Help Window Display
function SaveHelp() {

    var url = activeTabTaskId();
    if (url != undefined) {
        //  alert(url);
        //  alert(document.getElementById('textareaHelp').value);
        var tabContainer = $find("tabContainer");
        var activeTab = tabContainer.get_activeTabIndex();

        switch (activeTab) {
            case 0:
                document.getElementById('helpText').value = document.getElementById('tabContainer_TabPanel1_textareaHelp1').value;
                break;
            case 1:
                document.getElementById('helpText').value = document.getElementById('tabContainer_TabPanel2_textareaHelp2').value;
                break;
            case 2:
                document.getElementById('helpText').value = document.getElementById('tabContainer_TabPanel3_textareaHelp3').value;
                break;
            case 3:
                document.getElementById('helpText').value = document.getElementById('tabContainer_TabPanel4_textareaHelp4').value;
                break;

        }

        // alert(document.getElementById('helpText').value);
        document.getElementById('helpTextTaskCode').value = url;
        document.getElementById('btnHelpSave').click();
    }

}

function OpenHelp() {
    var tabContainer = $find("tabContainer");
    var activeTab = tabContainer.get_activeTabIndex();
    switch (activeTab) {
        case 0:
            document.getElementById('divhelpNotepad1').style.visibility = 'visible';
            break;
        case 1:
            document.getElementById('divhelpNotepad2').style.visibility = 'visible';
            break;
        case 2:
            document.getElementById('divhelpNotepad3').style.visibility = 'visible';
            break;
        case 3:
            document.getElementById('divhelpNotepad4').style.visibility = 'visible';
            break;

    }
}

function GetHelpText(text) {

    text = text.replace(/newline/g, "\n");

    var tabContainer = $find("tabContainer");
    var activeTab = tabContainer.get_activeTabIndex();
    // alert(activeTab);
    switch (activeTab) {
        case 0:
            document.getElementById('tabContainer_TabPanel1_textareaHelp1').value = text;
            break;
        case 1:
            document.getElementById('tabContainer_TabPanel2_textareaHelp2').value = text;
            break;
        case 2:
            document.getElementById('tabContainer_TabPanel3_textareaHelp3').value = text;
            break;
        case 3:
            document.getElementById('tabContainer_TabPanel4_textareaHelp4').value = text;
            break;

    }
}
//-------------------------------End Help

//GEt Active Tab Task Id
function activeTabTaskId() {

    var tabContainer = $find("tabContainer");
    var activeTab = tabContainer.get_activeTabIndex();
    var url;
    //  alert(menuList.length);
    if (menuList.length > 0) {
        var listCount = menuList.length;
        for (i = 0; i < listCount; i++) {
            if (acTabList[i] == activeTab) {
                url = menuList[i];

            }
        }
    }
    return url;
}
//----------------------------------End Loading In Iframe-----------------------------------
function SetLoaderTimeOut(url) {
    var openPage = url.toString().substring(4, 11);

    var iframe1Src = document.getElementById('ifm_Main_1').src.substring(0, 7);
    var iframe2Src = document.getElementById('ifm_Main_2').src.substring(0, 7);
    var iframe3Src = document.getElementById('ifm_Main_3').src.substring(0, 7);
    var iframe4Src = document.getElementById('ifm_Main_4').src.substring(0, 7);
    var browser = navigator.appName;
    if (browser == "Netscape") {
        var src1 = document.getElementById('ifm_Main_1').src;
        var length1M = parseInt(src1.length) - 12;
        var length1P = length1M + 7;
        iframe1Src = src1.substring(length1M, length1P);

        var src2 = document.getElementById('ifm_Main_2').src;
        var length2M = parseInt(src2.length) - 12;
        var length2P = length2M + 7;
        iframe2Src = src2.substring(length2M, length2P);

        var src3 = document.getElementById('ifm_Main_3').src;
        var length3M = parseInt(src3.length) - 12;
        var length3P = length3M + 7;
        iframe3Src = src3.substring(length3M, length3P);

        var src4 = document.getElementById('ifm_Main_4').src;
        var length4M = parseInt(src4.length) - 12;
        var length4P = length4M + 7;
        iframe4Src = src4.substring(length4M, length4P);

    }


    if (iframe1Src.toUpperCase() == openPage.toUpperCase()) {
        var t = setTimeout("ap_showWaitMessage('divIframe1Loading', 0);", 10)
    }
    else if (iframe2Src.toUpperCase() == openPage.toUpperCase()) {
        var t = setTimeout("ap_showWaitMessage('divIframe2Loading', 0);", 10)
    }
    else if (iframe3Src.toUpperCase() == openPage.toUpperCase()) {
        var t = setTimeout("ap_showWaitMessage('divIframe3Loading', 0);", 10)
    }
    else if (iframe4Src.toUpperCase() == openPage.toUpperCase()) {

        var t = setTimeout("ap_showWaitMessage('divIframe4Loading', 0);", 10)
    }
}