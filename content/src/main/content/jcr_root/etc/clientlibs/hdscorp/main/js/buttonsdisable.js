(function() {
    if ((window.location.pathname == "/cf") || (window.location.pathname.indexOf("/content") == 0)) {
        var SK_INTERVAL = setInterval(function() {
            var sk = CQ.WCM.getSidekick();
            var curPage = CQ.WCM.getPagePath();
            if (sk) {
                if (CQ.User.getCurrentUser().hasPermissionOn("replicate", [sk.getPath()]) != true) {
                    if (sk && sk.panels) {
                        var pagePanel = sk.panels["PAGE"];
                        if (pagePanel) {
	                        var buttons = pagePanel.findBy(function(comp) {
	                            return comp["name"] == "PUBLISH" || comp["name"] == "DEACTIVATE";
	                        }, pagePanel);
	                        CQ.Ext.each(buttons, function(button) {
	                            button.setDisabled(true);
	                        });
                        }
                    }
                } else {
                    return;
                }
            }
        }, 250);
    }
})();