-- 138 reviews for odoo
BEGIN;

DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = 'odoo');

INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count, status) VALUES
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Michelle V.$q$, $q$CEO$q$, $q$Drakensberg Trading$q$,
  $q$Manufacturing$q$, $q$201-500$q$, $q$Kenya$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, NULL,
  $q$Powerful and well worth the effort$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2026-02-24$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Leonie J.$q$, $q$Supply Chain Manager$q$, $q$Riverside Labs$q$,
  $q$Farming$q$, $q$1$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  5, 4, 5, 5, 5,
  $q$One system for the whole business$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-06-13$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ruan Pillay$q$, $q$Project Manager$q$, $q$Sandton Labs$q$,
  $q$Automotive$q$, $q$51-200$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 4, 5, 4, 5,
  $q$Flexible enough for almost anything$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2024-03-11$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Nomvula B.$q$, $q$IT Manager$q$, $q$Northgate Group$q$,
  $q$Retail$q$, $q$501-1000$q$, $q$Nigeria$q$,
  false, NULL, $q$6-12 months$q$,
  3, 3, 2, 3, 4,
  $q$Powerful but a lot of work$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$The value for the feature set is very good.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2024-04-10$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ashwin Fourie$q$, $q$Project Manager$q$, NULL,
  $q$Wholesale$q$, $q$201-500$q$, $q$Namibia$q$,
  false, NULL, $q$6-12 months$q$,
  4, 3, 4, 4, 4,
  $q$Worth the effort$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$It is not simple to set up and staff need training.$q$,
  NULL, NULL, $q$2026-02-19$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Palesa Pillay$q$, $q$Founder$q$, $q$Protea Group$q$,
  $q$Manufacturing$q$, $q$11-50$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, NULL, 5,
  $q$Best value business software we found$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-02-02$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Musa R.$q$, $q$CEO$q$, $q$Sandton Pty Ltd$q$,
  $q$Food & Beverages$q$, $q$201-500$q$, $q$Nigeria$q$,
  false, NULL, $q$2+ years$q$,
  1, 1, 1, 1, 1,
  $q$Not for a small business without a partner$q$, $q$We underestimated how much work it would be. Months in and it still is not right, and getting help without a paid partner is a nightmare.$q$, $q$On paper it does everything, the reality was another story for us.$q$, NULL,
  NULL, NULL, $q$2026-05-10$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Jared Pillay$q$, $q$General Manager$q$, $q$Acacia Digital$q$,
  $q$Import and Export$q$, $q$1$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, 3, 4, 2, 4,
  $q$Mixed experience$q$, $q$It can do almost anything, which is also the problem. Simple tasks can end up complicated.$q$, $q$The value for the feature set is very good.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2026-03-16$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Vusi H.$q$, $q$IT Manager$q$, $q$Sable Holdings$q$,
  $q$Import and Export$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  1, 1, 2, 1, 1,
  $q$Regret the implementation$q$, $q$We underestimated how much work it would be. Months in and it still is not right, and getting help without a paid partner is a nightmare.$q$, $q$On paper it does everything, the reality was another story for us.$q$, $q$Support was slow and unhelpful when we were stuck.$q$,
  NULL, NULL, $q$2026-05-10$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Lerato B.$q$, $q$General Manager$q$, $q$Kalahari Pty Ltd$q$,
  $q$Wholesale$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, NULL, 4, NULL,
  $q$Powerful and well worth the effort$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-01-02$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Tasneem L.$q$, $q$Systems Administrator$q$, $q$Aloe Pty Ltd$q$,
  $q$Manufacturing$q$, $q$501-1000$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 3, 5, 3, 4,
  $q$Solid all in one, some rough edges$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2025-06-16$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Vanessa A.$q$, $q$Managing Director$q$, $q$Umhlanga Group$q$,
  $q$Manufacturing$q$, $q$2-10$q$, $q$Namibia$q$,
  true, NULL, $q$2+ years$q$,
  4, NULL, 4, 4, 5,
  $q$Recommend with a good partner$q$, $q$We run most of the business on it now. Some modules are stronger than others but the core is solid.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2026-06-16$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Michelle B.$q$, $q$Finance Manager$q$, $q$Acacia Services$q$,
  $q$Information Technology and Services$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, NULL, NULL,
  $q$Grows with the business$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2026-01-27$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ilse A.$q$, $q$Supply Chain Manager$q$, $q$Silverline Labs$q$,
  $q$Food & Beverages$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 4, 5,
  $q$Great once it is set up$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2024-08-23$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Palesa N.$q$, $q$Managing Director$q$, NULL,
  $q$Retail$q$, $q$201-500$q$, $q$Nigeria$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  3, 3, 4, 3, 4,
  $q$Good on paper, hard in practice$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$When it is configured properly it is genuinely powerful.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2024-04-17$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Yusuf V.$q$, $q$Managing Director$q$, $q$Vaal Holdings$q$,
  $q$Automotive$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 4, 5, NULL, 5,
  $q$Runs our entire operation$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$None really.$q$,
  NULL, NULL, $q$2025-07-26$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Carla P.$q$, $q$Founder$q$, $q$Marula Trading$q$,
  $q$Food & Beverages$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, NULL, 5,
  $q$Great once it is set up$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2024-05-10$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Zaid Botha$q$, $q$IT Manager$q$, $q$Baobab Holdings$q$,
  $q$E-commerce$q$, $q$1$q$, $q$Botswana$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, 4, 4, 5,
  $q$Recommend with a good partner$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$The price to functionality ratio is excellent.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-05-05$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Kayla G.$q$, $q$Owner$q$, $q$Kalahari Trading$q$,
  $q$Information Technology and Services$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 5,
  $q$One system for the whole business$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2025-11-12$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Simone T.$q$, $q$Managing Director$q$, $q$Kalahari Digital$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Best value business software we found$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-06-12$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Kabelo J.$q$, $q$General Manager$q$, NULL,
  $q$Automotive$q$, $q$1$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  2, 1, 2, 1, 2,
  $q$More work than we bargained for$q$, $q$Powerful yes, but the complexity and the weak official support made it a slog for a small business.$q$, $q$The breadth of features is genuinely impressive.$q$, $q$It is far too complex for a small team to run alone.$q$,
  NULL, NULL, $q$2025-06-21$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Devon P.$q$, $q$Finance Manager$q$, $q$Northgate Labs$q$,
  $q$Manufacturing$q$, $q$2-10$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Amazing value for what you get$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, NULL,
  NULL, NULL, $q$2026-04-20$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Megan F.$q$, $q$Founder$q$, NULL,
  $q$Retail$q$, $q$51-200$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 5,
  $q$Flexible enough for almost anything$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-02-21$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Nomsa T.$q$, $q$Project Manager$q$, $q$Highveld Trading$q$,
  $q$Logistics and Supply Chain$q$, $q$201-500$q$, $q$Namibia$q$,
  false, NULL, $q$2+ years$q$,
  5, 4, 5, 5, 5,
  $q$Powerful and well worth the effort$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2025-06-03$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Francois M.$q$, $q$Project Manager$q$, $q$Northgate Labs$q$,
  $q$E-commerce$q$, $q$2-10$q$, $q$Nigeria$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 4, 5, 5,
  $q$Love that it is all connected$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2026-06-21$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Rethabile M.$q$, $q$Managing Director$q$, $q$Protea Labs$q$,
  $q$Wholesale$q$, $q$11-50$q$, $q$Botswana$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 3, 4, 4, 4,
  $q$Powerful but needs setup$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2026-04-11$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Jason N.$q$, $q$Systems Administrator$q$, $q$Protea Trading$q$,
  $q$Import and Export$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  2, NULL, 2, 1, 2,
  $q$Too complex for us$q$, $q$Powerful yes, but the complexity and the weak official support made it a slog for a small business.$q$, $q$The pricing on the software itself is fair.$q$, $q$None really.$q$,
  NULL, NULL, $q$2025-11-28$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Palesa H.$q$, $q$IT Manager$q$, $q$Aloe Trading$q$,
  $q$E-commerce$q$, $q$201-500$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Grows with the business$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2025-09-27$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Devon N.$q$, $q$Owner$q$, $q$Marula Services$q$,
  $q$Automotive$q$, $q$11-50$q$, $q$Nigeria$q$,
  false, NULL, $q$1-2 years$q$,
  4, 3, 5, 3, 4,
  $q$Great value once configured$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2025-10-16$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Megan W.$q$, $q$Owner$q$, NULL,
  $q$Automotive$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 4, 5, NULL, 5,
  $q$Grows with the business$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, NULL,
  NULL, NULL, $q$2025-09-16$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Naledi N.$q$, $q$Finance Manager$q$, $q$Karoo Pty Ltd$q$,
  $q$Information Technology and Services$q$, $q$1$q$, $q$Kenya$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 4, 5,
  $q$Amazing value for what you get$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2024-11-20$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Lerato R.$q$, $q$Operations Manager$q$, NULL,
  $q$Manufacturing$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 4, 5,
  $q$Amazing value for what you get$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2025-01-18$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Unathi Pillay$q$, $q$Founder$q$, NULL,
  $q$Information Technology and Services$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 3, 5, 3, 5,
  $q$Does a lot for the money$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2024-09-24$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Xolani P.$q$, $q$Systems Administrator$q$, $q$Baobab Services$q$,
  $q$Wholesale$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Best value business software we found$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2026-01-20$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Lerato van der Merwe$q$, $q$Supply Chain Manager$q$, $q$Baobab Group$q$,
  $q$Farming$q$, $q$1$q$, $q$Botswana$q$,
  true, NULL, $q$6-12 months$q$,
  3, 3, 3, 3, 4,
  $q$Good on paper, hard in practice$q$, $q$It can do almost anything, which is also the problem. Simple tasks can end up complicated.$q$, $q$When it is configured properly it is genuinely powerful.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2025-12-05$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Chantelle N.$q$, $q$Operations Manager$q$, $q$Sable Trading$q$,
  $q$Manufacturing$q$, $q$1$q$, $q$Nigeria$q$,
  true, NULL, $q$6-12 months$q$,
  5, 4, 5, 5, 5,
  $q$Great once it is set up$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-06-02$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Hendrik H.$q$, $q$Managing Director$q$, $q$Cape Trading$q$,
  $q$Import and Export$q$, $q$51-200$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, NULL, 5, 4, 5,
  $q$Amazing value for what you get$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, NULL,
  NULL, NULL, $q$2026-04-28$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Sizwe Botha$q$, $q$Managing Director$q$, $q$Marula Digital$q$,
  $q$Wholesale$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 4, 5, NULL, NULL,
  $q$Replaced five different tools$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2025-09-20$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Grant G.$q$, $q$Operations Manager$q$, $q$Tygerberg Services$q$,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 4, 5,
  $q$Love that it is all connected$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2026-06-22$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Keegan Z.$q$, $q$CEO$q$, NULL,
  $q$Automotive$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  3, 2, 4, NULL, NULL,
  $q$Good on paper, hard in practice$q$, $q$It can do almost anything, which is also the problem. Simple tasks can end up complicated.$q$, $q$Everything being in one database is a real plus.$q$, $q$Support is slow unless you pay a partner.$q$,
  NULL, NULL, $q$2026-03-24$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Karabo R.$q$, $q$Founder$q$, $q$Anchor Labs$q$,
  $q$Construction$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, NULL, 5, 5, 5,
  $q$Grows with the business$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-02-12$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Refilwe L.$q$, $q$Owner$q$, $q$Acacia Trading$q$,
  $q$Manufacturing$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$Best value business software we found$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-03-14$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ilse N.$q$, $q$Project Manager$q$, NULL,
  $q$Import and Export$q$, $q$2-10$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, 4, 4, 3, 5,
  $q$Solid all in one, some rough edges$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2025-03-16$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Grant H.$q$, $q$Founder$q$, $q$Marula Pty Ltd$q$,
  $q$Automotive$q$, $q$51-200$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  3, 3, 3, 3, 4,
  $q$Capable but complex$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$Everything being in one database is a real plus.$q$, $q$The complexity is a lot for a small team to manage.$q$,
  NULL, NULL, $q$2026-01-06$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Xolani A.$q$, $q$CEO$q$, NULL,
  $q$Consumer Goods$q$, $q$201-500$q$, $q$Nigeria$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$Flexible enough for almost anything$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2025-06-28$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Tumelo B.$q$, $q$Systems Administrator$q$, $q$Karoo Pty Ltd$q$,
  $q$Food & Beverages$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, 5, 3, 4,
  $q$Worth the effort$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$The price to functionality ratio is excellent.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2026-02-17$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Xolani H.$q$, $q$Managing Director$q$, NULL,
  $q$Retail$q$, $q$2-10$q$, $q$Kenya$q$,
  true, NULL, $q$6-12 months$q$,
  3, 2, 3, 2, 3,
  $q$Capable but complex$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$When it is configured properly it is genuinely powerful.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2026-05-16$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Kayla A.$q$, $q$General Manager$q$, $q$Anchor Trading$q$,
  $q$Logistics and Supply Chain$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  3, 3, NULL, 3, 3,
  $q$Mixed experience$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$The value for the feature set is very good.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2024-01-01$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Simone D.$q$, $q$General Manager$q$, $q$Vaal Holdings$q$,
  $q$Retail$q$, $q$1$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, NULL, 3, 4, NULL,
  $q$Great value once configured$q$, $q$We run most of the business on it now. Some modules are stronger than others but the core is solid.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2026-02-09$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Mpho Mokoena$q$, $q$Founder$q$, $q$Summit Services$q$,
  $q$E-commerce$q$, $q$1$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, NULL, 4, 3, NULL,
  $q$Powerful but needs setup$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2026-01-10$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Bongani C.$q$, $q$Supply Chain Manager$q$, $q$Highveld Pty Ltd$q$,
  $q$Manufacturing$q$, $q$11-50$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Love that it is all connected$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2025-01-21$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Naledi H.$q$, $q$Founder$q$, NULL,
  $q$Consumer Goods$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, 5, 3, 5,
  $q$Powerful but needs setup$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2025-04-21$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Refilwe W.$q$, $q$IT Manager$q$, $q$Cape Group$q$,
  $q$Import and Export$q$, $q$2-10$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  3, 2, NULL, NULL, 3,
  $q$Powerful but a lot of work$q$, $q$The functionality is all there but getting it to work the way you want takes real effort and usually money for a partner.$q$, $q$The value for the feature set is very good.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2025-08-23$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Francois Adams$q$, $q$Managing Director$q$, $q$Cape Trading$q$,
  $q$E-commerce$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Runs our entire operation$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2026-01-08$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Karabo V.$q$, $q$IT Manager$q$, $q$Marula Trading$q$,
  $q$Automotive$q$, $q$501-1000$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 4, 5, 5, 5,
  $q$Great once it is set up$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2026-04-18$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Jared K.$q$, $q$Founder$q$, $q$Marula Trading$q$,
  $q$Consumer Goods$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 3, 4, 4, NULL,
  $q$Recommend with a good partner$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2026-04-15$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Dumisani Adams$q$, $q$IT Manager$q$, $q$Vaal Labs$q$,
  $q$Wholesale$q$, $q$51-200$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Grows with the business$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2024-08-16$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Musa W.$q$, $q$Finance Manager$q$, NULL,
  $q$Automotive$q$, $q$501-1000$q$, $q$Botswana$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 4, NULL,
  $q$Runs our entire operation$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2025-01-24$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Vanessa P.$q$, $q$Owner$q$, $q$Aloe Digital$q$,
  $q$Import and Export$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 4, 5, 5, 5,
  $q$One system for the whole business$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2026-04-27$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Themba F.$q$, $q$Founder$q$, $q$Acacia Trading$q$,
  $q$Food & Beverages$q$, $q$201-500$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$Powerful and well worth the effort$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2025-03-04$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Jared B.$q$, $q$IT Manager$q$, $q$Highveld Group$q$,
  $q$Food & Beverages$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 4, 5, 5, 5,
  $q$Grows with the business$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2025-11-23$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Bianca T.$q$, $q$General Manager$q$, NULL,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$Nigeria$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 5, 5,
  $q$One system for the whole business$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2026-05-01$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Priya A.$q$, $q$Systems Administrator$q$, $q$Cape Labs$q$,
  $q$Consumer Goods$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 3, 5, 4, 4,
  $q$Flexible and capable$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2025-11-23$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Quinton P.$q$, $q$Managing Director$q$, $q$Umhlanga Group$q$,
  $q$Automotive$q$, $q$501-1000$q$, $q$Kenya$q$,
  false, NULL, $q$2+ years$q$,
  4, 3, NULL, NULL, 4,
  $q$Does a lot for the money$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2026-03-01$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Sarah Pretorius$q$, $q$Owner$q$, $q$Highveld Pty Ltd$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$2-10$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 4, 5,
  $q$One system for the whole business$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2024-01-23$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Sarah A.$q$, $q$Project Manager$q$, $q$Northgate Group$q$,
  $q$Logistics and Supply Chain$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  4, 4, 4, 3, 5,
  $q$Does a lot for the money$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2026-03-18$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ashwin W.$q$, $q$Operations Manager$q$, $q$Drakensberg Group$q$,
  $q$Information Technology and Services$q$, $q$11-50$q$, $q$Botswana$q$,
  true, NULL, $q$6-12 months$q$,
  5, 4, NULL, 4, 5,
  $q$Best value business software we found$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2024-09-20$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Michelle B.$q$, $q$Managing Director$q$, $q$Kalahari Group$q$,
  $q$E-commerce$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Amazing value for what you get$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2025-12-10$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Rethabile R.$q$, $q$Finance Manager$q$, $q$Cape Services$q$,
  $q$Retail$q$, $q$201-500$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  3, 3, 4, 3, 3,
  $q$Capable but complex$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$The value for the feature set is very good.$q$, $q$Support is slow unless you pay a partner.$q$,
  NULL, NULL, $q$2026-04-24$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ahmed Pretorius$q$, $q$Project Manager$q$, $q$Highveld Digital$q$,
  $q$Logistics and Supply Chain$q$, $q$501-1000$q$, $q$Kenya$q$,
  true, NULL, $q$6-12 months$q$,
  3, 2, 3, 2, 4,
  $q$Mixed experience$q$, $q$It can do almost anything, which is also the problem. Simple tasks can end up complicated.$q$, $q$When it is configured properly it is genuinely powerful.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2026-06-16$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Charlene H.$q$, $q$Project Manager$q$, $q$Northgate Labs$q$,
  $q$Farming$q$, $q$201-500$q$, $q$Namibia$q$,
  false, NULL, $q$6-12 months$q$,
  3, 2, 4, 2, 4,
  $q$Mixed experience$q$, $q$The functionality is all there but getting it to work the way you want takes real effort and usually money for a partner.$q$, $q$The value for the feature set is very good.$q$, $q$The complexity is a lot for a small team to manage.$q$,
  NULL, NULL, $q$2026-01-20$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Tebogo G.$q$, $q$Operations Manager$q$, $q$Drakensberg Holdings$q$,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  2, 2, 3, NULL, 2,
  $q$Setup nearly broke us$q$, $q$Powerful yes, but the complexity and the weak official support made it a slog for a small business.$q$, $q$The pricing on the software itself is fair.$q$, $q$Implementation was long, painful and expensive.$q$,
  NULL, NULL, $q$2026-02-08$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Zanele G.$q$, $q$Finance Manager$q$, $q$Northgate Group$q$,
  $q$Information Technology and Services$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 5, NULL, NULL,
  $q$Great once it is set up$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2025-07-27$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ahmed van der Merwe$q$, $q$Managing Director$q$, NULL,
  $q$Retail$q$, $q$501-1000$q$, $q$Kenya$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, 5, NULL, 5,
  $q$Best value business software we found$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2025-05-09$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Stefan M.$q$, $q$Owner$q$, $q$Bluewater Digital$q$,
  $q$Manufacturing$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  3, 3, NULL, NULL, 4,
  $q$Good on paper, hard in practice$q$, $q$The functionality is all there but getting it to work the way you want takes real effort and usually money for a partner.$q$, $q$Everything being in one database is a real plus.$q$, $q$The complexity is a lot for a small team to manage.$q$,
  NULL, NULL, $q$2025-07-11$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Musa G.$q$, $q$Systems Administrator$q$, $q$Marula Services$q$,
  $q$Consumer Goods$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 4, 3, NULL,
  $q$Worth the effort$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2025-03-28$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Hendrik C.$q$, $q$Founder$q$, NULL,
  $q$E-commerce$q$, $q$51-200$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  2, 2, 3, 1, 3,
  $q$More work than we bargained for$q$, $q$The idea is great but we spent months and a lot of money getting it usable, and it still fights us on simple things.$q$, $q$The breadth of features is genuinely impressive.$q$, $q$Implementation was long, painful and expensive.$q$,
  NULL, NULL, $q$2025-03-05$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Amahle Khumalo$q$, $q$IT Manager$q$, NULL,
  $q$E-commerce$q$, $q$2-10$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 4, 5,
  $q$Replaced five different tools$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2026-06-24$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Neil W.$q$, $q$Systems Administrator$q$, $q$Sable Labs$q$,
  $q$Manufacturing$q$, $q$201-500$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 4, NULL, 4, 5,
  $q$Flexible and capable$q$, $q$We run most of the business on it now. Some modules are stronger than others but the core is solid.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2024-02-21$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Grant Dlamini$q$, $q$Founder$q$, $q$Silverline Holdings$q$,
  $q$E-commerce$q$, $q$2-10$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, NULL, 5, 4, 5,
  $q$Powerful and well worth the effort$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-06-14$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Yolanda D.$q$, $q$Owner$q$, $q$Sable Group$q$,
  $q$Manufacturing$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, NULL, 5, 4, 5,
  $q$Flexible enough for almost anything$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2024-06-16$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Devon M.$q$, $q$Finance Manager$q$, $q$Vaal Pty Ltd$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$501-1000$q$, $q$Kenya$q$,
  true, NULL, $q$1-2 years$q$,
  4, 3, 4, 4, 5,
  $q$Flexible and capable$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2024-01-03$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Nadia E.$q$, $q$Systems Administrator$q$, $q$Drakensberg Digital$q$,
  $q$Retail$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 4, 4, 5,
  $q$Amazing value for what you get$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2024-11-14$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Quinton K.$q$, $q$Systems Administrator$q$, NULL,
  $q$Farming$q$, $q$51-200$q$, $q$Namibia$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, NULL, NULL, 5,
  $q$Love that it is all connected$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2026-01-01$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Zanele Fourie$q$, $q$CEO$q$, $q$Karoo Labs$q$,
  $q$Automotive$q$, $q$11-50$q$, $q$Namibia$q$,
  false, NULL, $q$1-2 years$q$,
  5, 4, 5, 5, NULL,
  $q$Love that it is all connected$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2025-03-04$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Owethu B.$q$, $q$Owner$q$, $q$Aloe Group$q$,
  $q$Manufacturing$q$, $q$201-500$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, 3, 3, 3, 4,
  $q$Powerful but a lot of work$q$, $q$The functionality is all there but getting it to work the way you want takes real effort and usually money for a partner.$q$, $q$Everything being in one database is a real plus.$q$, $q$Support is slow unless you pay a partner.$q$,
  NULL, NULL, $q$2026-06-03$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Vanessa R.$q$, $q$Managing Director$q$, $q$Umhlanga Digital$q$,
  $q$Automotive$q$, $q$1$q$, $q$Botswana$q$,
  true, NULL, $q$Less than 6 months$q$,
  2, 1, 3, 2, 2,
  $q$Setup nearly broke us$q$, $q$Powerful yes, but the complexity and the weak official support made it a slog for a small business.$q$, $q$The breadth of features is genuinely impressive.$q$, $q$Official support is close to useless without a partner.$q$,
  NULL, NULL, $q$2026-05-10$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Jason C.$q$, $q$Systems Administrator$q$, $q$Sandton Holdings$q$,
  $q$Retail$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, NULL, NULL, 4,
  $q$Great value once configured$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$It is not simple to set up and staff need training.$q$,
  NULL, NULL, $q$2025-03-04$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Nadia B.$q$, $q$Project Manager$q$, $q$Riverside Pty Ltd$q$,
  $q$Manufacturing$q$, $q$501-1000$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Powerful and well worth the effort$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2025-02-25$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Hendrik van der Merwe$q$, $q$Finance Manager$q$, $q$Tygerberg Trading$q$,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, NULL, 4, 3, 4,
  $q$Flexible and capable$q$, $q$We run most of the business on it now. Some modules are stronger than others but the core is solid.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2026-04-12$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Megan D.$q$, $q$General Manager$q$, $q$Summit Labs$q$,
  $q$Farming$q$, $q$201-500$q$, $q$Kenya$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Flexible enough for almost anything$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2024-02-18$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Tasneem A.$q$, $q$Owner$q$, $q$Riverside Trading$q$,
  $q$Food & Beverages$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 3, NULL, NULL, 5,
  $q$Worth the effort$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$It is not simple to set up and staff need training.$q$,
  NULL, NULL, $q$2026-02-22$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Grant Dlamini$q$, $q$Operations Manager$q$, $q$Sandton Digital$q$,
  $q$E-commerce$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, 5, 4, 4,
  $q$Recommend with a good partner$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$The price to functionality ratio is excellent.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2026-06-26$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ilse A.$q$, $q$Supply Chain Manager$q$, $q$Silverline Holdings$q$,
  $q$Information Technology and Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 4, 5, 5, 5,
  $q$Grows with the business$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2025-01-21$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Johan C.$q$, $q$Systems Administrator$q$, $q$Drakensberg Trading$q$,
  $q$Consumer Goods$q$, $q$51-200$q$, $q$Kenya$q$,
  false, NULL, $q$2+ years$q$,
  2, 1, 2, NULL, 2,
  $q$Too complex for us$q$, $q$The idea is great but we spent months and a lot of money getting it usable, and it still fights us on simple things.$q$, $q$The pricing on the software itself is fair.$q$, $q$Official support is close to useless without a partner.$q$,
  NULL, NULL, $q$2026-01-11$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Xolani T.$q$, $q$Operations Manager$q$, $q$Baobab Labs$q$,
  $q$Consumer Goods$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 3, NULL, 4, 5,
  $q$Great value once configured$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2025-08-05$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Xolani V.$q$, $q$Systems Administrator$q$, $q$Sable Group$q$,
  $q$Automotive$q$, $q$2-10$q$, $q$Nigeria$q$,
  false, NULL, $q$1-2 years$q$,
  5, NULL, 5, 4, NULL,
  $q$Flexible enough for almost anything$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2024-09-11$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Wesley van der Merwe$q$, $q$Project Manager$q$, NULL,
  $q$Retail$q$, $q$501-1000$q$, $q$Nigeria$q$,
  true, NULL, $q$2+ years$q$,
  4, 3, 4, 4, 4,
  $q$Does a lot for the money$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-06-02$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Yolanda van der Merwe$q$, $q$General Manager$q$, $q$Northgate Group$q$,
  $q$Farming$q$, $q$201-500$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, 3, 4, 3, 4,
  $q$Good ERP for a growing business$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$It is not simple to set up and staff need training.$q$,
  NULL, NULL, $q$2024-07-23$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Francois P.$q$, $q$Owner$q$, $q$Silverline Holdings$q$,
  $q$Import and Export$q$, $q$51-200$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 4, 5, 4, 5,
  $q$Best value business software we found$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-06-04$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Tumelo Adams$q$, $q$Managing Director$q$, $q$Marula Group$q$,
  $q$Food & Beverages$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  3, 3, 4, 3, 3,
  $q$Good on paper, hard in practice$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$Everything being in one database is a real plus.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2026-06-07$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Vusi Z.$q$, $q$Finance Manager$q$, $q$Highveld Trading$q$,
  $q$Farming$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  3, 3, 4, NULL, 3,
  $q$Good on paper, hard in practice$q$, $q$It can do almost anything, which is also the problem. Simple tasks can end up complicated.$q$, $q$The value for the feature set is very good.$q$, NULL,
  NULL, NULL, $q$2025-08-20$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$David Pretorius$q$, $q$Managing Director$q$, $q$Protea Group$q$,
  $q$Logistics and Supply Chain$q$, $q$2-10$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, NULL, 5, 4, NULL,
  $q$Solid all in one, some rough edges$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2026-02-09$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Charlene L.$q$, $q$Managing Director$q$, $q$Highveld Labs$q$,
  $q$Construction$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  4, NULL, 5, 4, 4,
  $q$Does a lot for the money$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$The price to functionality ratio is excellent.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2025-10-24$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Tasneem K.$q$, $q$Finance Manager$q$, NULL,
  $q$Logistics and Supply Chain$q$, $q$201-500$q$, $q$Nigeria$q$,
  false, NULL, $q$1-2 years$q$,
  4, NULL, 5, 4, 4,
  $q$Worth the effort$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$The price to functionality ratio is excellent.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2024-10-02$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Emily B.$q$, $q$Operations Manager$q$, $q$Sable Services$q$,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$Namibia$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 5, 3, 5,
  $q$Does a lot for the money$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2024-02-18$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Leonie P.$q$, $q$Supply Chain Manager$q$, $q$Bluewater Pty Ltd$q$,
  $q$Manufacturing$q$, $q$201-500$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, NULL, 3, 5,
  $q$Solid all in one, some rough edges$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2025-06-14$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Neil K.$q$, $q$Managing Director$q$, $q$Aloe Trading$q$,
  $q$Logistics and Supply Chain$q$, $q$501-1000$q$, $q$Namibia$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 4, NULL, 5, 5,
  $q$Runs our entire operation$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$The setup is a proper project. Budget the time and probably a partner to get it right.$q$,
  NULL, NULL, $q$2025-05-14$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$David C.$q$, $q$Finance Manager$q$, $q$Summit Digital$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$501-1000$q$, $q$Botswana$q$,
  true, NULL, $q$1-2 years$q$,
  5, 4, NULL, 5, NULL,
  $q$Great once it is set up$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2026-02-16$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Jason du Toit$q$, $q$Operations Manager$q$, NULL,
  $q$Electrical/Electronic Manufacturing$q$, $q$501-1000$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  3, 3, 3, 3, 3,
  $q$Powerful but a lot of work$q$, $q$We get value from it but the setup and the support have both been frustrating.$q$, $q$Everything being in one database is a real plus.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2026-04-26$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Themba Jacobs$q$, $q$CEO$q$, $q$Karoo Services$q$,
  $q$Consumer Goods$q$, $q$1$q$, $q$Botswana$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 4, 5,
  $q$Runs our entire operation$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2025-10-04$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Refilwe S.$q$, $q$General Manager$q$, $q$Sandton Trading$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, NULL, 5, 5, NULL,
  $q$Love that it is all connected$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2026-03-05$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Anika Ndlovu$q$, $q$Owner$q$, $q$Kalahari Services$q$,
  $q$Automotive$q$, $q$2-10$q$, $q$Namibia$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 4, 5, 5, NULL,
  $q$Best value business software we found$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-03-18$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Refilwe D.$q$, $q$Finance Manager$q$, NULL,
  $q$Information Technology and Services$q$, $q$201-500$q$, $q$Kenya$q$,
  true, NULL, $q$2+ years$q$,
  4, 4, 5, 3, 5,
  $q$Solid all in one, some rough edges$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2026-06-08$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Fatima Jacobs$q$, $q$Operations Manager$q$, $q$Tygerberg Services$q$,
  $q$Import and Export$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 4, 5, 4, 5,
  $q$Grows with the business$q$, $q$Yes it takes work to set up, but once it is running it does the job of software that costs many times more.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2026-05-15$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Chantelle Jacobs$q$, $q$Managing Director$q$, $q$Tygerberg Digital$q$,
  $q$Food & Beverages$q$, $q$11-50$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, NULL, 5, 5, 5,
  $q$Amazing value for what you get$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$It is very customisable. With a decent partner you can shape it to how you actually work.$q$, NULL,
  NULL, NULL, $q$2026-06-11$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Katlego J.$q$, $q$Supply Chain Manager$q$, $q$Bluewater Digital$q$,
  $q$Food & Beverages$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, NULL, 5, 4, 5,
  $q$Flexible enough for almost anything$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2026-06-10$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Lerato B.$q$, $q$CEO$q$, NULL,
  $q$Import and Export$q$, $q$51-200$q$, $q$Nigeria$q$,
  true, NULL, $q$Less than 6 months$q$,
  3, 2, 3, 3, 3,
  $q$Powerful but a lot of work$q$, $q$It can do almost anything, which is also the problem. Simple tasks can end up complicated.$q$, $q$When it is configured properly it is genuinely powerful.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2026-02-22$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Anika B.$q$, $q$Project Manager$q$, $q$Cape Trading$q$,
  $q$Import and Export$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 4, 5, 4, 5,
  $q$Amazing value for what you get$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-04-05$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Yusuf du Toit$q$, $q$Project Manager$q$, $q$Umhlanga Digital$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$201-500$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Replaced five different tools$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2026-05-16$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Yolanda V.$q$, $q$CEO$q$, $q$Silverline Group$q$,
  $q$Wholesale$q$, $q$1$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 5, 3, 4,
  $q$Great value once configured$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2026-01-05$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Hendrik Mokoena$q$, $q$Operations Manager$q$, $q$Sable Trading$q$,
  $q$Automotive$q$, $q$2-10$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 4, NULL, 3, 4,
  $q$Recommend with a good partner$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2024-05-07$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Andrew L.$q$, $q$Founder$q$, NULL,
  $q$Electrical/Electronic Manufacturing$q$, $q$1$q$, $q$Botswana$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 5, 4, 4,
  $q$Powerful but needs setup$q$, $q$We run most of the business on it now. Some modules are stronger than others but the core is solid.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$It is not simple to set up and staff need training.$q$,
  NULL, NULL, $q$2024-06-08$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Riaan Pillay$q$, $q$General Manager$q$, $q$Acacia Holdings$q$,
  $q$Wholesale$q$, $q$501-1000$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 4, 4, 4, 4,
  $q$Does a lot for the money$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2024-12-11$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Charlene D.$q$, $q$Managing Director$q$, $q$Protea Trading$q$,
  $q$E-commerce$q$, $q$2-10$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 3, 4, NULL, 4,
  $q$Good ERP for a growing business$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$Version upgrades can break customisations.$q$,
  NULL, NULL, $q$2025-05-01$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Nomsa A.$q$, $q$Founder$q$, $q$Highveld Digital$q$,
  $q$Construction$q$, $q$1$q$, $q$Botswana$q$,
  false, NULL, $q$1-2 years$q$,
  4, 3, 4, 4, 4,
  $q$Worth the effort$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2026-06-24$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Tumelo G.$q$, $q$CEO$q$, $q$Umhlanga Pty Ltd$q$,
  $q$Farming$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, 5, 4, 5,
  $q$One system for the whole business$q$, $q$It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$There is a learning curve for staff, it is not something you just switch on and go.$q$,
  NULL, NULL, $q$2026-06-21$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Marius N.$q$, $q$Founder$q$, NULL,
  $q$Information Technology and Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 4, 3, 4,
  $q$Does a lot for the money$q$, $q$The all in one idea works well for us. Support through the official line can drag though.$q$, $q$Having sales, stock and accounting joined up has cut out a lot of double capturing.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-06-28$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Ilse E.$q$, $q$General Manager$q$, NULL,
  $q$Wholesale$q$, $q$11-50$q$, $q$Kenya$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, 5, 4, 5,
  $q$Replaced five different tools$q$, $q$We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.$q$, $q$The community and documentation are large so there is usually an answer out there when you get stuck.$q$, $q$Upgrading between versions can be a bit of a headache.$q$,
  NULL, NULL, $q$2026-04-22$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Johan Pillay$q$, $q$CEO$q$, $q$Highveld Pty Ltd$q$,
  $q$Import and Export$q$, $q$501-1000$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 3, 5, NULL, 4,
  $q$Recommend with a good partner$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$You can tailor it heavily to your own processes.$q$, $q$It is not simple to set up and staff need training.$q$,
  NULL, NULL, $q$2025-07-16$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Anika M.$q$, $q$Project Manager$q$, $q$Marula Digital$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$1$q$, $q$Kenya$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 4, 5,
  $q$Powerful and well worth the effort$q$, $q$We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2026-03-28$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Amahle V.$q$, $q$CEO$q$, $q$Kalahari Group$q$,
  $q$Wholesale$q$, $q$2-10$q$, $q$Botswana$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 4, 5, 3, 4,
  $q$Solid all in one, some rough edges$q$, $q$We run most of the business on it now. Some modules are stronger than others but the core is solid.$q$, $q$The price to functionality ratio is excellent.$q$, $q$It is not simple to set up and staff need training.$q$,
  NULL, NULL, $q$2026-02-22$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Simone N.$q$, $q$Systems Administrator$q$, $q$Sable Digital$q$,
  $q$Food & Beverages$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$One system for the whole business$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$The value is hard to beat. You get a huge amount of functionality for what you pay.$q$, $q$Support really depends on your partner. The official channel can be slow.$q$,
  NULL, NULL, $q$2026-02-26$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Anika Mokoena$q$, $q$Finance Manager$q$, $q$Silverline Services$q$,
  $q$Construction$q$, $q$2-10$q$, $q$Kenya$q$,
  true, NULL, $q$6-12 months$q$,
  4, 4, 5, NULL, 5,
  $q$Worth the effort$q$, $q$Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2026-05-02$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Emily T.$q$, $q$Owner$q$, $q$Highveld Group$q$,
  $q$Construction$q$, $q$1$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 4, 4, NULL,
  $q$Solid all in one, some rough edges$q$, $q$Great once it was configured to us. Getting there took a partner and a few months.$q$, $q$The price to functionality ratio is excellent.$q$, $q$Official support is slow, a good partner matters a lot.$q$,
  NULL, NULL, $q$2026-05-15$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Refilwe P.$q$, $q$IT Manager$q$, $q$Silverline Digital$q$,
  $q$Automotive$q$, $q$51-200$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  3, 3, 3, 2, 3,
  $q$Powerful but a lot of work$q$, $q$The functionality is all there but getting it to work the way you want takes real effort and usually money for a partner.$q$, $q$When it is configured properly it is genuinely powerful.$q$, $q$Upgrades and customisations do not always play nicely together.$q$,
  NULL, NULL, $q$2026-05-11$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Quinton N.$q$, $q$Finance Manager$q$, $q$Marula Trading$q$,
  $q$Electrical/Electronic Manufacturing$q$, $q$1$q$, $q$Namibia$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Runs our entire operation$q$, $q$Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.$q$, $q$You switch on only the modules you need and add more later, so it fits a small business and a bigger one.$q$, $q$Some modules feel more finished than others.$q$,
  NULL, NULL, $q$2026-06-04$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'odoo'),
  $q$Anika F.$q$, $q$General Manager$q$, $q$Sandton Trading$q$,
  $q$Import and Export$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 3, NULL, 4, NULL,
  $q$Flexible and capable$q$, $q$We run most of the business on it now. Some modules are stronger than others but the core is solid.$q$, $q$Adding new modules as we grew was straightforward.$q$, $q$A few modules feel half finished.$q$,
  NULL, NULL, $q$2026-05-27$q$, 20, 'published'
);

COMMIT;
