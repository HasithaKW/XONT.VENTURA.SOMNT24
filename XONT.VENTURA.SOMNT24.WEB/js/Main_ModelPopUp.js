       //To Message URL
        function PopUpURL(url){
             ShowPopup(url);
            }
            
        //
          function HidePopup() {
          
           document.getElementById("divSignin").style.display="none";    
           objDiv = document.getElementById("divg");
            objDiv.style.display = "none"; 
             return false;
               
            }
        //prompt
        function select(targetid, descid, ret){

            var tabContainer = $find("tabContainer");
            var tabs = tabContainer.get_tabs();
            var activeTab=tabContainer.get_activeTabIndex();
          
             switch (activeTab){
               case 0:
                window.frames.ifm_Main_1.Selected(targetid, descid, ret);
                HidePopup();
               
               break;
               
               case 1:
                window.frames.ifm_Main_2.Selected(targetid, descid, ret);
                HidePopup();

               break;
               
               case 2:
                window.frames.ifm_Main_3.Selected(targetid, descid, ret);
                HidePopup();
                  
               break;
               
               case 3:
                window.frames.ifm_Main_4.Selected(targetid, descid, ret);
                HidePopup();
               break;
                   
             }  
        }
        
        function ShowPopup(url) {
         try
           {  
             document.getElementById("divSignin").style.display="block"; 
             objDiv = document.getElementById("divg");
             objDiv.style.display = "block"; 
             objDiv.style.width = document.body.scrollWidth;
             objDiv.style.height= document.body.scrollHeight;         
             fnSetDivSigninLeft("divSignin");  
             document.getElementById("Iframe1").src=url;      
            }
        catch(e)
            {
         alert(e);
            }
         return false 
            
        }
        
        
        function fnSetDivSigninLeft(oElement)
        {
    
       var DivWidth = parseInt(document.getElementById(oElement).offsetWidth,10)
        
       var DivHeight = parseInt(document.getElementById(oElement).offsetHeight,10)
       document.getElementById(oElement).style.left = (document.body.offsetWidth / 2) - (DivWidth / 2)+200;
       document.getElementById(oElement).style.top = (document.body.offsetHeight / 2) -  ( DivHeight / 2);
     
       return false;     
       }
        //Model PopUP----------------------------------------------------------------------
          