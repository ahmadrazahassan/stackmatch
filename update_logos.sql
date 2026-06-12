-- Run this script in your Supabase SQL Editor to update your existing demo software with real logos
-- and remove the emojis from the categories.

-- Update Software Logos using local public folder assets
UPDATE software SET logo_url = '/Sage_South_Africa_Logo_0.svg' WHERE slug = 'sage-accounting';
UPDATE software SET logo_url = '/Xero logo 1x1.svg' WHERE slug = 'xero';
UPDATE software SET logo_url = '/Intuit_QuickBooks_idH8urRJxv_1.svg' WHERE slug = 'quickbooks-online';
UPDATE software SET logo_url = '/PaySpace_idn0bZ1Vl4_2.svg' WHERE slug = 'payspace';
UPDATE software SET logo_url = '/simplepay.png' WHERE slug = 'simplepay';
UPDATE software SET logo_url = '/zoho.png' WHERE slug = 'zoho-crm';
UPDATE software SET logo_url = '/BambooHR_idDPHxsbaf_1.svg' WHERE slug = 'bamboohr';
UPDATE software SET logo_url = '/odoo_logo.png' WHERE slug = 'odoo';

-- Update Categories to remove emojis (for a cleaner look)
UPDATE categories SET icon = '' WHERE slug = 'accounting-software';
UPDATE categories SET icon = '' WHERE slug = 'payroll-software';
UPDATE categories SET icon = '' WHERE slug = 'hr-software';
UPDATE categories SET icon = '' WHERE slug = 'crm-software';
UPDATE categories SET icon = '' WHERE slug = 'erp-software';
UPDATE categories SET icon = '' WHERE slug = 'project-management';
