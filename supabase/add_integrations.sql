-- Adds the integrations list used by the software profile "Integrations" section.
-- Run once in the Supabase SQL Editor.
ALTER TABLE software ADD COLUMN IF NOT EXISTS integrations JSONB DEFAULT '[]';

-- Optional: seed demo integrations for the demo software
UPDATE software SET integrations = '["Stripe","Zapier","PayPal","Shopify","Microsoft 365"]' WHERE slug = 'sage-accounting';
UPDATE software SET integrations = '["Stripe","Hubdoc","Zapier","Shopify","Square","PayPal"]' WHERE slug = 'xero';
UPDATE software SET integrations = '["PayPal","Shopify","Square","Gusto","Zapier"]' WHERE slug = 'quickbooks-online';
UPDATE software SET integrations = '["Xero","QuickBooks Online","Sage Accounting","Microsoft Teams"]' WHERE slug = 'payspace';
UPDATE software SET integrations = '["Xero","QuickBooks Online","Sage Accounting"]' WHERE slug = 'simplepay';
UPDATE software SET integrations = '["Zoho Books","Zoho Desk","WhatsApp Business","Mailchimp","Zapier"]' WHERE slug = 'zoho-crm';
UPDATE software SET integrations = '["Slack","Greenhouse","Zapier","Microsoft 365"]' WHERE slug = 'bamboohr';
UPDATE software SET integrations = '["Stripe","PayPal","Amazon","eBay","WooCommerce"]' WHERE slug = 'odoo';
