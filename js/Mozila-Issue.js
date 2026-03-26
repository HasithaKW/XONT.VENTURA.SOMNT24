 


 function SetTableheight(){

     var height = document.getElementById("txtTblHeigh").value;
   //  alert(height);
   
                     if (height == '0') {
                      //   alert('1');
                document.getElementById("txtTblHeigh").value = '1';
                document.getElementById("MainTable").className = "TableMax"; //.style.height="800px";
                if (navigator.appName == "Netscape") {
                   // alert(document.getElementById("ifm_Main_1").style.height);
                    frmHeight = document.body.clientHeight - 128;
                   // alert(frmHeight);
                    document.getElementById("tbTabContainer").style.height = frmHeight;
                    document.getElementById("appdiv").style.height = frmHeight+27;
                   // frmHeight = frmHeight - 5; 
                    document.getElementById("ifm_Main_1").style.height = frmHeight;
                    document.getElementById("ifm_Main_2").style.height = frmHeight;
                    document.getElementById("ifm_Main_3").style.height = frmHeight;
                    document.getElementById("ifm_Main_4").style.height = frmHeight;
                   
                }
            } else if (height == '1') {

                document.getElementById("txtTblHeigh").value = '0';
                //document.getElementById("MainTable").style.height="600px";
                document.getElementById("MainTable").className = "TableMini";
                BrowserType();

            } else if (height == '2') {

                document.getElementById("txtTblHeigh").value = '0';
                //document.getElementById("MainTable").style.height="600px";
                document.getElementById("MainTable").className = "TableMini";
                BrowserType();

            } else {
                BrowserType();
            }
     }
     
             
     function BrowserType() {
            var frmHeight;
           
            if (navigator.appName == "WebTV") {
              frmHeight=  document.getElementById("tdTabContainer").style.height;
                document.getElementById("tbTabContainer").style.height = frmHeight;
                document.getElementById("ifm_Main_1").style.height = frmHeight;
                document.getElementById("ifm_Main_2").style.height = frmHeight;
                document.getElementById("ifm_Main_3").style.height = frmHeight;
                document.getElementById("ifm_Main_4").style.height = frmHeight;
                document.getElementById("appdiv").style.height = frmHeight;
             
            }
            if (navigator.appName == "Netscape") {

              //  alert('2');            
                frmHeight = document.body.clientHeight - 179;
             //   alert(frmHeight);
                document.getElementById("appdiv").style.height = frmHeight+27;
              //  frmHeight = frmHeight - 5;
                document.getElementById("tbTabContainer").style.height=frmHeight;
                document.getElementById("ifm_Main_1").style.height = frmHeight;
                document.getElementById("ifm_Main_2").style.height = frmHeight;
                document.getElementById("ifm_Main_3").style.height = frmHeight;
                document.getElementById("ifm_Main_4").style.height = frmHeight;
                
                
            }
            if (navigator.appName == "Microsoft Internet Explorer") {

                frmHeight = document.getElementById("tdTabContainer").style.height;
                document.getElementById("tbTabContainer").style.height = frmHeight;
                document.getElementById("appdiv").style.height = frmHeight;
                frmHeight = "96%";
                document.getElementById("ifm_Main_1").style.height = frmHeight;
                document.getElementById("ifm_Main_2").style.height = frmHeight;
                document.getElementById("ifm_Main_3").style.height = frmHeight;
                document.getElementById("ifm_Main_4").style.height = frmHeight;
               
               //  ("You're using the Internet Explorer browser.")
            }
        }