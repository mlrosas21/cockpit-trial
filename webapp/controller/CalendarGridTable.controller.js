sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(
	Controller,
    JSONModel
) {
	"use strict";

	return Controller.extend("sandbox.controller.CalendarGridTable", {
        onInit: function(){      
            let oDaysModel= new JSONModel()
            this.getView().setModel(oDaysModel, "daysInfo");
            this._addTableColumns()      

        },
        _addTableColumns: function(){
            let oTable = this.getView().byId("idCalendarTable");

            for(let i=1; i<=31; i++){
                let oColumn = new sap.ui.table.Column("col"+i, {
                    width: "2.5em",
                    hAlign: "Center",
                    resizable: false,
                    label: `${i}`,
                    template: new sap.m.Text({text: "{i}"})
                })
                oTable.addColumn(oColumn)
            }
        }, 
        /**
         * @override
         */
        onAfterRendering: function() {
            let aMonths = this.getView().getModel("months").getData().months;
            let oTable = this.getView().byId("idCalendarTable");

            let aMonthsInfo = []
            for(let i = 0; i< aMonths.length; i++){
                let obj = {}
                for(let j=1; j<=31; j++){
                    let year = new Date().getFullYear()
                    let date = new Date(year, i, j)
                    let type = '';
                    if(date.getDay() === 0 || date.getDay() === 6){
                        type="FS"
                    }
                    obj[j] = type
                }
                aMonthsInfo.push(obj)
            }

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({
                rows: aMonthsInfo,
            });

            oTable.bindRows(oModel)
            this.getView().getModel("daysInfo").setData(oNewModel)
        }
	});
});