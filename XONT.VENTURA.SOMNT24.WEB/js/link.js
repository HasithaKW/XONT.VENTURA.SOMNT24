function openvideowin(){
	var videowin=dhtmlmodal.open("videowindow", "iframe", "video.htm", "Product Sample Video", "width=365px,height=401px,center=1,resize=0,scrolling=0", "recal")

	videowin.onclose=function(){ //Run custom code when window is being closed (return false to cancel action):
		return window.confirm("Close Window?")
	}
}
function openvideowin2(vedio) {
    var pageName = vedio + ".html";
    var videowin = dhtmlmodal.open("videowindow", "iframe", pageName, "Product Sample Video", "width=365px,height=401px,center=1,resize=0,scrolling=0", "recal")

	videowin.onclose=function(){ //Run custom code when window is being closed (return false to cancel action):
		return window.confirm("Close Window?")
	}
}