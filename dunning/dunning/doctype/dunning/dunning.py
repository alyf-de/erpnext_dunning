# -*- coding: utf-8 -*-
# Copyright (c) 2019, Alyf and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Dunning(Document):
	pass

def resolve_dunnings_for_payment_entry(doc, state):
	for reference in doc.references:
		if reference.reference_doctype == 'Sales Invoice' and reference.outstanding_amount <= 0:
			dunnings = frappe.get_list('Dunning', filters={'sales_invoice': reference.reference_name, 'status': ('!=', 'Resolved')})
			
			for dunning in dunnings:
				dunning_obj = frappe.get_doc('Dunning', dunning.name)
				dunning_obj.status = 'Resolved'
				dunning_obj.save()