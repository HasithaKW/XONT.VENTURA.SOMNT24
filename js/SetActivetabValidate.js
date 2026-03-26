function RunValidationsAndSetActiveTab() {
    if (typeof (Page_Validators) != "undefined") {
        try {
            var noOfValidators = Page_Validators.length;
            for (var validatorIndex = 0; validatorIndex < noOfValidators; validatorIndex++) {
                var validator = Page_Validators[validatorIndex]; ValidatorValidate(validator);
                if (!validator.isvalid) {
                    validator = document.getElementById(validator.id);
                    var parentTab = validator;
                    var parentTabOld = validator;
                    var parentTabNodeName = validator;
                    while ((parentTab != null) && (parentTabNodeName != 'DIV') || ($find(parentTab.id) == null) || ($find(parentTab.id) == '') || (parentTab.className != 'ajax__tab_panel'))
{
    parentTabNodeName = parentTab.parentNode.nodeName;
    parentTab = parentTab.parentNode; 
    parentTabOld = parentTab;
    if (parentTab == null) break
}
if ((parentTab.className == 'ajax__tab_panel')) {
    var tabPanel = $find(parentTabOld.id);
    var tabContainer = tabPanel.get_owner();
    tabContainer.set_activeTabIndex(tabPanel.get_tabIndex())
} break
} 
}
} catch (Error) {
 } 
}
}