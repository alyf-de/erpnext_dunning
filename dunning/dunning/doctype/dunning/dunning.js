// Copyright (c) 2019, Alyf and contributors
// For license information, please see license.txt

frappe.ui.form.on('Dunning', {
	refresh: function (frm) {
		if (frm.is_new()) {
			frm.trigger("calculate_overdue_days");
			frm.set_value("posting_date", frappe.datetime.nowdate());
		}
	},
	due_date: function (frm) {
		frm.trigger("calculate_overdue_days");
	},
	posting_date: function (frm) {
		frm.trigger("calculate_overdue_days");
	},
	interest_rate: function (frm) {
		frm.trigger("calculate_interest");
	},
	outstanding_amount: function (frm) {
		frm.trigger("calculate_sum");
	},
	interest_amount: function (frm) {
		frm.trigger("calculate_sum");
	},
	dunning_fee: function (frm) {
		frm.trigger("calculate_sum");
	},
	calculate_overdue_days: function (frm) {
		const posting_date = frm.get_field("posting_date").get_value();
		const due_date = frm.get_field("due_date").get_value();

		const overdue_days = moment(posting_date).diff(due_date, "days");
		frm.set_value("overdue_days", overdue_days);
	},
	calculate_sum: function (frm) {
		const outstanding_amount = frm.get_field("outstanding_amount").get_value() || 0;
		const interest_amount = frm.get_field("interest_amount").get_value() || 0;
		const dunning_fee = frm.get_field("dunning_fee").get_value() || 0;

		const sum = outstanding_amount + interest_amount + dunning_fee;
		frm.set_value("sum", sum);
	},
	calculate_interest: function (frm) {
		const interest_rate = frm.get_field("interest_rate").get_value() || 0;
		const outstanding_amount = frm.get_field("outstanding_amount").get_value() || 0;
		const overdue_days = frm.get_field("overdue_days").get_value() || 0;

		const interest_per_year = outstanding_amount * interest_rate / 100;
		const interest_amount = interest_per_year / 360 * overdue_days;
		frm.set_value("interest_amount", interest_amount);
	}
});
