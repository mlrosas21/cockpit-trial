sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("sandbox.controller.View1", {
            onInit : function () {
                let oDataJsonModel = new JSONModel ({
                   recipient: {
                        name: 'World'
                   }
                });
                this.getView().setModel(oDataJsonModel);
             },
            
        });
    });
