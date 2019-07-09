// Copyright (c) 2019, Alyf and contributors
// For license information, please see license.txt

frappe.ui.form.on('Dunning', {
	refresh: function (frm) {
		
	},
	calculate_overdue_days: function(frm) {
		const diff = moment(frm.doc.posting_date).diff(frm.doc.due_date,"days");
		frm.set_value("overdue_days", diff);
	},
	due_date: function(frm) {
		frm.trigger("calculate_overdue_days");
	},
	posting_date: function(frm) {
		frm.trigger("calculate_overdue_days");
	},
	calculate_sum: function(frm){
		const sum = frm.get_field("outstanding_amount").get_value() + frm.get_field("interest_amount").get_value() + frm.get_field("dunning_fee").get_value();
		frm.set_value("sum", sum);
	},
	outstanding_amount: function(frm){
		frm.trigger("calculate_sum");
	},
	interest_amount: function(frm){
		frm.trigger("calculate_sum");
	},
	dunning_fee: function(frm){
		frm.trigger("calculate_sum");
	},
	calculate_interest: function(frm) {
		const interest = (frm.get_field("interest_rate").get_value() * frm.get_field("outstanding_amount").get_value() * frm.get_field("overdue_days").get_value()) / (100 * 365);
		frm.set_value("interest_amount", z);
	}	
});
