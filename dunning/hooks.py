# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "dunning"
app_title = "Dunning"
app_publisher = "Alyf"
app_description = "Dunning"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "Alyf.de"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/dunning/css/dunning.css"
# app_include_js = "/assets/dunning/js/dunning.js"

# include js, css files in header of web template
# web_include_css = "/assets/dunning/css/dunning.css"
# web_include_js = "/assets/dunning/js/dunning.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "dunning.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "dunning.install.before_install"
# after_install = "dunning.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "dunning.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Payment Entry": {
		"on_submit": "dunning.dunning.doctype.dunning.dunning.resolve_dunnings_for_payment_entry"
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"dunning.tasks.all"
# 	],
# 	"daily": [
# 		"dunning.tasks.daily"
# 	],
# 	"hourly": [
# 		"dunning.tasks.hourly"
# 	],
# 	"weekly": [
# 		"dunning.tasks.weekly"
# 	]
# 	"monthly": [
# 		"dunning.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "dunning.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "dunning.event.get_events"
# }

