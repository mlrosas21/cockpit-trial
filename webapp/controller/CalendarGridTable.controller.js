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
            //this._addTableColumns()      

        },
        _getTableColumns: function(){
            let oTable = this.getView().byId("idCalendarTable");
                // let oColumn = new sap.ui.table.Column("col"+i, {
                //     width: "2.5em",
                //     hAlign: "Center",
                //     resizable: false,
                //     label: `${i}`,
                //     template: new sap.m.Text({text: "{i}"})
                // })
                // oTable.addColumn(oColumn)
        }, 
        /**
         * @override
         */
        onAfterRendering: function() {

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
                    let type;
                    switch(day){
                        case 0:
                            type="D"
                            break;
                        case 6:
                            type="S"
                            break;
                        default:
                            type=""
                            break;
                    }
                    row[j] = type
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
            var sColumnId = oContext.getObject().columnName;
            if(sColumnId === "Mes"){
                return new sap.ui.table.Column({      
                    width: "7em",
                    resizable: false,     
                    label: sColumnId, 
                    template: new sap.m.Text({
                        text: "{"+sColumnId+"}"
                    }) 
                });
            }
            return new sap.ui.table.Column({      
                width: "2.5em",
                hAlign: "Center",
                resizable: false,     
                label: sColumnId, 
                template: new sap.m.Text({
                    text: "{"+sColumnId+"}"
                }) 
            });
        }
	});
});