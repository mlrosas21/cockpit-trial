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

        },
        onAfterRendering: function() {
            this._addTableInfo()
        },
        _addTableInfo: function(){
            let oTable = this.getView().byId("idCalendarTable")
            let aMonths = this.getView().getModel("months").getData().months;
            let aColumns = [
                {columnName: "Mes"}
            ]
            let aMonthsInfo = []
            for(let i = 0; i< aMonths.length; i++){
                let row = {}
                row['Mes'] = aMonths[i].label
                for(let j=1; j<=31; j++){
                    if(i===0){
                        let col={
                            columnName: `${j}`
                        }
                        aColumns.push(col)
                    }
                    let date = new Date(new Date().getFullYear(), i, j)
                    let day = date.getDay()
                    let type, state;
                    switch(day){
                        case 0:
                            type="D"
                            state="Information"
                            break;
                        case 6:
                            type="S"
                            state="Information"
                            break;
                        default:
                            type = '';
                            state='None'
                    }
                    row[j] = {
                        value: type,
                        state: state
                    }
                }
                aMonthsInfo.push(row)
            }

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({
                rows: aMonthsInfo,
                columns: aColumns
            });

            oTable.setModel(oModel)
            oTable.bindRows("/rows");
        },
        columnFactory : function(sId, oContext) {     
            var sColumnName = oContext.getObject().columnName;
            if(sColumnName === "Mes"){
                return new sap.ui.table.Column({      
                    width: "7em",
                    resizable: false,     
                    label: sColumnName, 
                    template: new sap.m.Text({
                        text: "{"+sColumnName+"}"
                    }) 
                });
            }
            return new sap.ui.table.Column({      
                width: "2.5em",
                hAlign: "Center",
                resizable: false,     
                label: sColumnName, 
                template: new sap.m.ObjectStatus({
                    text: `{${sColumnName}/value}`,
                    state: `{${sColumnName}/state}`
                }) 
            });
        }
	});
});