
//$(function () {
//    var myAudio = document.getElementById("myTune");
//    if (myAudio.paused) {
//        $('#stateicon').removeClass('fa fa-play');
//        $('#stateicon').addClass('fa fa-pause');
//        myAudio.play();
//    } else {
//        $('#stateicon').removeClass('fa fa-pause');
//        $('#stateicon').addClass('fa fa-play');
//        myAudio.pause();
//    }
//    var notify = $.connection.notificationHub;

//    notify.client.displayNotification = function (msg) {
//        if (msg != "") {
//            if ($('#uplAlert').is(':visible'))
//            {
//                myAudio.pause();
//                $("#uplAlert").hide();
               
//            }
//        else
//            {
//                myAudio.play();
//            $("#lblAlertMessage").html(msg);
//            $("#uplAlert").show();
//                $("#alert_ok").click(function () {
//                    $("#uplAlert").hide();
//                    myAudio.pause();
//                });
           
//       }
//       }
       
   
//    };

//    $.connection.hub.start();
//});


$(function () {

    var myAudio = document.getElementById("myTune");
    var notify = $.connection.notificationHub;

    notify.client.displayNotification = function (msg) {
        if (msg != "") {

            if ($('#uplAlert').is(':visible')) {

                $("#uplAlert").hide();
                myAudio.pause();
                $("#lblAlertMessage").html(msg);

                setTimeout(function () {
                    myAudio.play();
                    $("#uplAlert").show();
                }, 2000);

                $("#alert_ok").click(function () {
                    myAudio.pause();
                    $("#uplAlert").hide();
                });
            }
            else {
                myAudio.play();
                $("#lblAlertMessage").html(msg);
                $("#uplAlert").show();
                $("#alert_ok").click(function () {
                    myAudio.pause();
                    $("#uplAlert").hide();
                });

            }
        }


    };

    $.connection.hub.start();
});