sap.ui.define([
	"sap/m/SinglePlanningCalendarView"
], function(SinglePlanningCalendarView) {
	"use strict";

	return SinglePlanningCalendarView.extend("sandbox.controller.CustomYearView", {
		getEntityCount: function () {
			return 365;
		},

		getScrollEntityCount: function () {
			return 365;
		},

		calculateStartDate: function (oStartDate) {
			return oStartDate;
		}
	});

});