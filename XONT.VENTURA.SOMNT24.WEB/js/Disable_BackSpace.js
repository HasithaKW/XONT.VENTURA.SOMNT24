
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' &&
             (
                 d.type.toUpperCase() === 'TEXT' ||
                 d.type.toUpperCase() === 'PASSWORD' ||
                 d.type.toUpperCase() === 'FILE' ||
                 d.type.toUpperCase() === 'SEARCH' ||
                 d.type.toUpperCase() === 'EMAIL' ||
                 d.type.toUpperCase() === 'NUMBER' ||
                 d.type.toUpperCase() === 'DATE')
             ) ||
             d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else if ((d.tagName.toUpperCase() === 'INPUT' &&
             (
                 d.type.toUpperCase() === 'RADIO' ||
                 d.type.toUpperCase() === 'CHECKBOX'
               
             )))
        {
            doPrevent = true;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

function ShowFullPostbackProgress(cookieKey, validationGroup) {

    if (validationGroup)
        Page_ClientValidate(validationGroup);
    else
        Page_ClientValidate();

    if (!Page_IsValid) {
        return;
    }

    document.cookie = cookieKey + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    var form = document.getElementsByTagName('form')[0];
    var divOuter = document.createElement('div');
    divOuter.id = 'divProgressBack';
    var divInner = document.createElement('div');
    divInner.id = 'dvProgress';
    divInner.setAttribute('class', 'loading');
    divOuter.appendChild(divInner);
    form.appendChild(divOuter);
    RemoveProgress();

    function RemoveProgress() {
        var isDownloadComplete = document.cookie.indexOf(cookieKey) > -1;

        if (isDownloadComplete) {
            document.cookie = cookieKey + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            divOuter.parentElement.removeChild(divOuter);
            divInner.parentElement.removeChild(divInner);
        }
        else {
            setTimeout(RemoveProgress, 100);
        }
    }
}

