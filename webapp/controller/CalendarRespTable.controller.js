sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/gantt/shape/Text"
], function(
	Controller,
	JSONModel,
	Text
) {
	"use strict";

	return Controller.extend("sandbox.controller.CalendarRespTable", {
        onInit: function(){
            this._addColumns()
        },
        onAfterRendering: function() {
            this._addTableInfo()
            this._addTableRows()
        },
        _addColumns: function(){
            let oTable = this.getView().byId("idCalendarRespTable");

            let oMonthColumn = new sap.m.Column("monthCol", {
                header: new sap.m.Label({
                    text: "MES" 
                }),
                width: '7em'
            })
            oTable.addColumn(oMonthColumn)
            for(let i=1; i<=31; i++){
                let oColumn = new sap.m.Column("col"+i, {
                    header: new sap.m.Label({
                        text: `${i}` 
                    }),
                    demandPopin: true,
                    minScreenWidth: "Desktop"
                })
                oTable.addColumn(oColumn)
            }
        },
        _addTableRows: function(){
            let oTable = this.getView().byId("idCalendarRespTable")
            
            let aCell = [];
            aCell.push(new sap.m.Text({
                text: `{Mes}`
            }));
            for (let i = 1; i <= 31; i++) {
                aCell.push(new sap.m.ObjectStatus({
                    text: `{${i}/value}`,
                    state: `{${i}/state}`
                }));
            }
            let aColList = new sap.m.ColumnListItem("aColList", {
                cells: aCell
            });

            oTable.bindItems("/rows", aColList);
            
        },
        _addTableInfo: function(){
            let aMonths = this.getView().getModel("months").getData().months;
            let oTable = this.getView().byId("idCalendarRespTable")
            let aMonthsInfo = []

            for(let i = 0; i< aMonths.length; i++){
                let row = {}
                row['Mes'] = aMonths[i].label
                for(let j=1; j<=31; j++){
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
                rows: aMonthsInfo
            });

            oTable.setModel(oModel)
        }
	});
});