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
            this._getSelectYears()
            
        },
        _getSelectYears: function(){
            let aYears = []
            let sYear = new Date().getFullYear()

            // Últimos 5 años
            for(let i=5; i>0; i--){
                aYears.push({sYear})
                sYear--
            }
            var oModel = new JSONModel({
                selectedYear: new Date().getFullYear(),
                years: aYears
            });
			this.getView().setModel(oModel, "yearsModel");
        },
        onYearChange: function(oEvent){
            this._addTableInfo(oEvent.getSource().getSelectedKey());
        },
        onAfterRendering: function() {
            this._addTableInfo(new Date().getFullYear())
        },
        _addTableInfo: function(sYear){
            this.getView().byId("idSelectYear").setSelectedKey(sYear)
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
                    let date = new Date(sYear, i, j)
                    let diasMes = new Date(sYear, i+1, 0).getDate()
                    let day = date.getDay()
                    let type = '', 
                        state = 'None';
                    
                    // Identificar fines de semana
                    switch(day){
                        case 0:
                            type="D"
                            state="Information"
                            break;
                        case 6:
                            type="S"
                            state="Information"
                            break;
                    }

                    // Identificar meses con menos de 31 dias
                    if(j > diasMes){
                        type="X"
                        state = 'None'
                    }
                    
                    row[j] = {
                        value: type,
                        state: state
                    }
                }
                aMonthsInfo.push(row);
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