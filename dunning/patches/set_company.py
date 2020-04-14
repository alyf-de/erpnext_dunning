import frappe

def execute():
    frappe.reload_doctype('Dunning')

    dunning_names = frappe.get_list('Dunning', filters={'company':''})

    for dunning_name in dunning_names:
        dunning = frappe.get_doc('Dunning', dunning_name.get('name'))
        sales_invoice = frappe.get_doc('Sales Invoice', dunning.sales_invoice)

        frappe.db.set_value('Dunning', dunning.name, 'company', sales_invoice.company)