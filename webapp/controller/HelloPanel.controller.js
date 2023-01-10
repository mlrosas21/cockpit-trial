sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function(
	Controller,
    MessageToast,
    Fragment
) {
	"use strict";

	return Controller.extend("sandbox.controller.HelloPanel", {
        onShowHello : function () {
			// read msg from i18n model
			let oBundle = this.getView().getModel("i18n").getResourceBundle();
			let sRecipient = this.getView().getModel().getProperty("/recipient/name");
			let sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},

		onOpenDialog : function () {
			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					name: "sandbox.view.fragments.HelloDialog",
                    controller: this,
                    id: this.getView().getId()
				});
			}

			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		onCloseDialog : function () {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("helloDialog").close();
		}
	});
});