// Copyright (c) 2019, Alyf and contributors
// For license information, please see license.txt

frappe.ui.form.on('Dunning', {
	setup: function (frm) {
		frm.set_query('sales_invoice', () => {
			return {
				'filters': {
					'docstatus': 1,
					'company': frm.doc.company,
					'outstanding_amount': ['>', 0]
				},
			};
		});
	},

	refresh: function (frm) {
		frm.set_df_property('company', 'read_only', frm.doc.__islocal ? 0 : 1);
		frm.set_df_property('sales_invoice', 'read_only', frm.doc.__islocal ? 0 : 1);

		frm.trigger('set_posting_date_and_time_read_only');
		frm.trigger('set_interest_rate_and_dunning_fee_read_only');

		if (frm.doc.docstatus == 1 && frm.doc.status == 'Unresolved') {
			frm.add_custom_button(__('Resolve'), () => {
				frm.set_value('status', 'Resolved');
			});
		}
	},

	set_posting_time: function (frm) {
		frm.trigger('set_posting_date_and_time_read_only');
	},

	sales_invoice: function (frm) {
		if (!frm.doc.sales_invoice) {
			frm.set_value('outstanding_amount', 0);
			frm.set_df_property('outstanding_amount', 'hidden', 1);
		} else {
			frm.set_df_property('outstanding_amount', 'hidden', 0);
		}
		frm.trigger('calculate_interest');
		frm.trigger('calculate_sum')
	},

	due_date: function (frm) {
		frm.trigger('calculate_overdue_days');
	},

	posting_date: function (frm) {
		frm.trigger('calculate_overdue_days');
	},

	overdue_days: function (frm) {
		frm.trigger('calculate_interest');
	},

	dunning_type: function (frm) {
		frm.trigger('set_interest_rate_and_dunning_fee_read_only');
	},

	interest_rate: function (frm) {
		frm.trigger('calculate_interest');
	},

	outstanding_amount: function (frm) {
		frm.trigger('calculate_interest');
	},

	interest_amount: function (frm) {
		frm.trigger('calculate_sum');
	},

	dunning_fee: function (frm) {
		frm.trigger('calculate_sum');
	},

	set_posting_date_and_time_read_only: function (frm) {
		if(frm.doc.docstatus == 0 && frm.doc.set_posting_time) {
			frm.set_df_property('posting_date', 'read_only', 0);
			frm.set_df_property('posting_time', 'read_only', 0);
		} else {
			frm.set_df_property('posting_date', 'read_only', 1);
			frm.set_df_property('posting_time', 'read_only', 1);
		}
	},

	set_interest_rate_and_dunning_fee_read_only: function (frm) {
		if(frm.doc.dunning_type) {
			frm.set_df_property('interest_rate', 'read_only', 1);
			frm.set_df_property('dunning_fee', 'read_only', 1);
		} else {
			frm.set_df_property('interest_rate', 'read_only', 0);
			frm.set_df_property('dunning_fee', 'read_only', 0);
		}
	},

	calculate_overdue_days: function (frm) {
		const posting_date = frm.doc.posting_date;
		const due_date = frm.doc.due_date;

		const overdue_days = moment(posting_date).diff(due_date, 'days');

		frm.set_value('overdue_days', overdue_days);
	},

	calculate_sum: function (frm) {
		const outstanding_amount = frm.doc.outstanding_amount || 0;
		const interest_amount = frm.doc.interest_amount || 0;
		const dunning_fee = frm.doc.dunning_fee || 0;

		const sum = outstanding_amount + interest_amount + dunning_fee;

		frm.set_value('sum', sum);
	},

	calculate_interest: function (frm) {
		const interest_rate = frm.doc.interest_rate || 0;
		const outstanding_amount = frm.doc.outstanding_amount || 0;
		const overdue_days = frm.doc.overdue_days || 0;

		const interest_per_year = outstanding_amount * interest_rate / 100;
		const interest_amount = interest_per_year / 360 * overdue_days;

		frm.set_value('interest_amount', interest_amount);
	}
});
