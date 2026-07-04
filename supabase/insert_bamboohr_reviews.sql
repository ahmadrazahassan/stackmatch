-- 118 reviews for bamboohr
BEGIN;

DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = 'bamboohr');

INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count, status) VALUES
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Tebogo R.$q$, $q$Head of People$q$, $q$Umhlanga Services$q$,
  $q$Non-Profit Organization Management$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  1, 2, NULL, 1, 1,
  $q$Not worth the money for us$q$, $q$We paid a lot and used a fraction of it. Too much of the product assumes a US setup and support could not bridge the gap.$q$, $q$It looked polished, I will give it that.$q$, $q$Far too expensive for what a small business here actually uses.$q$,
  NULL, NULL, $q$2026-06-25$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Owethu K.$q$, $q$Talent Manager$q$, $q$Acacia Holdings$q$,
  $q$Information Technology and Services$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 4, 5, 4,
  $q$Best HR system we have used$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2024-01-25$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Johan P.$q$, $q$HR Manager$q$, $q$Kalahari Trading$q$,
  $q$Consumer Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  3, 4, 3, 4, 3,
  $q$Mixed feelings on value$q$, $q$Works fine for records and leave. The reporting and some features feel limited for the price.$q$, $q$Records are neatly kept in one place.$q$, $q$Several features are clearly built for the US market.$q$,
  NULL, NULL, $q$2025-12-06$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Quinton V.$q$, $q$Head of People$q$, $q$Protea Trading$q$,
  $q$Retail$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 5, 4, 4, 3,
  $q$Solid and easy to use$q$, $q$Happy with it. Self service and onboarding save real time even if setup took a bit of thought.$q$, $q$Keeping records, leave and documents together has cleaned up our admin.$q$, $q$The occasional setting is hard to find without asking.$q$,
  NULL, NULL, $q$2026-02-01$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ahmed G.$q$, $q$Founder$q$, $q$Tygerberg Services$q$,
  $q$Marketing and Advertising$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Clean and easy to use$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-02-21$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$David B.$q$, $q$HR Business Partner$q$, NULL,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$United Kingdom$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, NULL, 5, 5, 5,
  $q$Clean and easy to use$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$None really, we are very happy with it.$q$,
  NULL, NULL, $q$2026-04-11$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Grant V.$q$, $q$Office Manager$q$, $q$Karoo Digital$q$,
  $q$Education Management$q$, $q$51-200$q$, $q$Namibia$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 4, NULL, 5,
  $q$Staff love the self service$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-03-26$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ahmed M.$q$, $q$Managing Director$q$, $q$Protea Digital$q$,
  $q$Staffing and Recruiting$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 4, NULL, 5,
  $q$Everything in one place at last$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$None really, we are very happy with it.$q$,
  NULL, NULL, $q$2026-03-06$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ilse T.$q$, $q$People Operations Lead$q$, $q$Anchor Services$q$,
  $q$Information Technology and Services$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, NULL, 3, 3, 4,
  $q$Recommend for small to mid teams$q$, $q$It covers the core HR admin nicely. A few features are more built for the US than for us here.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, $q$The occasional setting is hard to find without asking.$q$,
  NULL, NULL, $q$2026-04-09$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Fatima G.$q$, $q$Office Manager$q$, $q$Protea Trading$q$,
  $q$Staffing and Recruiting$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 4, NULL, 5,
  $q$Simple and does what we need$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2024-04-02$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Willem V.$q$, $q$Head of People$q$, $q$Highveld Pty Ltd$q$,
  $q$Computer Software$q$, $q$51-200$q$, $q$United Kingdom$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 4, 5, 4,
  $q$So glad we moved to it$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2024-03-05$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Hendrik Z.$q$, $q$HR Business Partner$q$, $q$Umhlanga Pty Ltd$q$,
  $q$Consumer Services$q$, $q$501-1000$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 4, 5, 5,
  $q$So glad we moved to it$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-05-14$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ruan Jacobs$q$, $q$Talent Manager$q$, $q$Cape Trading$q$,
  $q$Computer Software$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  2, 2, 2, 3, 1,
  $q$Too costly for our needs$q$, $q$It looks great but we are paying a premium for features that do not suit a South African business.$q$, $q$Leave and records are handled fine.$q$, $q$Reporting is limited unless you pay more.$q$,
  NULL, NULL, $q$2025-11-27$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Tumelo C.$q$, $q$HR Generalist$q$, NULL,
  $q$Computer Software$q$, $q$1$q$, $q$Namibia$q$,
  true, NULL, $q$2+ years$q$,
  5, NULL, 4, NULL, 5,
  $q$Great for a small HR team$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2026-04-27$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Thandeka B.$q$, $q$HR Generalist$q$, $q$Tygerberg Group$q$,
  $q$Retail$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Our team actually enjoys using it$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, NULL,
  NULL, NULL, $q$2025-01-23$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ilse Ndlovu$q$, $q$People Operations Lead$q$, $q$Umhlanga Holdings$q$,
  $q$Non-Profit Organization Management$q$, $q$501-1000$q$, $q$United Kingdom$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 4, 5, 5,
  $q$Onboarding is a breeze now$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$None really, we are very happy with it.$q$,
  NULL, NULL, $q$2024-02-27$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Katlego M.$q$, $q$Operations Manager$q$, $q$Baobab Labs$q$,
  $q$Computer Software$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 4,
  $q$Best HR system we have used$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2024-11-27$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Andrew C.$q$, $q$Operations Manager$q$, $q$Aloe Trading$q$,
  $q$Legal Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 4, 4, 5,
  $q$Makes HR admin so much easier$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2025-05-24$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Nadia Ndlovu$q$, $q$HR Administrator$q$, NULL,
  $q$Health, Wellness and Fitness$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Best HR system we have used$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2024-02-22$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Mpho J.$q$, $q$Founder$q$, NULL,
  $q$Hospitality$q$, $q$201-500$q$, $q$Namibia$q$,
  true, NULL, $q$2+ years$q$,
  5, NULL, 5, 4, 5,
  $q$Great for a small HR team$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-05-27$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Gugu Ndlovu$q$, $q$Talent Manager$q$, $q$Riverside Pty Ltd$q$,
  $q$Manufacturing$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 5, 4, 3, 4,
  $q$Tidy and reliable$q$, $q$It covers the core HR admin nicely. A few features are more built for the US than for us here.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2025-02-18$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Tasneem Z.$q$, $q$Operations Manager$q$, $q$Umhlanga Group$q$,
  $q$Non-Profit Organization Management$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, NULL, 4, 5, NULL,
  $q$So glad we moved to it$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2026-04-14$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Mpho R.$q$, $q$Founder$q$, $q$Acacia Labs$q$,
  $q$Manufacturing$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  2, 2, NULL, 3, 2,
  $q$Expected more for the price$q$, $q$The system is fine, the value is not. We could not justify the renewal for what we actually use.$q$, $q$The interface is nice and staff found it easy.$q$, $q$Reporting is limited unless you pay more.$q$,
  NULL, NULL, $q$2026-02-25$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Rebecca Nkosi$q$, $q$People Operations Lead$q$, NULL,
  $q$Consumer Services$q$, $q$51-200$q$, $q$United Kingdom$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, NULL, NULL, NULL,
  $q$Our team actually enjoys using it$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2024-12-15$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Xolani Mahlangu$q$, $q$HR Business Partner$q$, $q$Northgate Trading$q$,
  $q$Hospitality$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, NULL, 4, 5, 4,
  $q$Took the paperwork away$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-05-16$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Keegan C.$q$, $q$HR Business Partner$q$, $q$Acacia Digital$q$,
  $q$Financial Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, NULL, 4, 5, 4,
  $q$Our team actually enjoys using it$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, NULL,
  NULL, NULL, $q$2025-01-03$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Charlene B.$q$, $q$People Operations Lead$q$, $q$Summit Labs$q$,
  $q$Legal Services$q$, $q$201-500$q$, $q$United Kingdom$q$,
  false, NULL, $q$6-12 months$q$,
  4, 5, 3, 4, 5,
  $q$Tidy and reliable$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2025-01-02$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Fatima N.$q$, $q$Founder$q$, $q$Summit Digital$q$,
  $q$Education Management$q$, $q$201-500$q$, $q$United Kingdom$q$,
  true, NULL, $q$1-2 years$q$,
  5, NULL, 5, 5, NULL,
  $q$Staff love the self service$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-03-26$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Kabelo Z.$q$, $q$Managing Director$q$, $q$Karoo Group$q$,
  $q$Education Management$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Staff love the self service$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2024-07-22$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Wesley S.$q$, $q$HR Generalist$q$, $q$Highveld Pty Ltd$q$,
  $q$Non-Profit Organization Management$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 4, 5, 5,
  $q$Clean and easy to use$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-04-21$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Emily Adams$q$, $q$Talent Manager$q$, $q$Vaal Services$q$,
  $q$Consumer Services$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$So glad we moved to it$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2024-03-19$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ahmed R.$q$, $q$Operations Manager$q$, $q$Vaal Services$q$,
  $q$Non-Profit Organization Management$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, NULL, NULL, 4, 4,
  $q$Good HR system with a couple of gaps$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$Support is helpful when I reach out.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-02-06$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Karabo C.$q$, $q$HR Business Partner$q$, $q$Kalahari Holdings$q$,
  $q$Consumer Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, NULL, 5, 5, NULL,
  $q$Our team actually enjoys using it$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-02-12$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Anika C.$q$, $q$HR Manager$q$, $q$Highveld Digital$q$,
  $q$Consumer Services$q$, $q$51-200$q$, $q$Namibia$q$,
  false, NULL, $q$6-12 months$q$,
  2, 2, 2, 2, 2,
  $q$Not the right fit for a small SA team$q$, $q$It looks great but we are paying a premium for features that do not suit a South African business.$q$, $q$The interface is nice and staff found it easy.$q$, $q$A lot of it is built for the US and does not apply to us.$q$,
  NULL, NULL, $q$2024-06-06$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Fatima N.$q$, $q$Office Manager$q$, $q$Vaal Trading$q$,
  $q$Legal Services$q$, $q$1$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Best HR system we have used$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, NULL,
  NULL, NULL, $q$2026-02-28$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Devon Dlamini$q$, $q$HR Manager$q$, NULL,
  $q$Retail$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  4, 4, 4, NULL, 4,
  $q$Good HR system with a couple of gaps$q$, $q$Happy with it. Self service and onboarding save real time even if setup took a bit of thought.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2026-02-09$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Rebecca B.$q$, $q$Managing Director$q$, NULL,
  $q$Hospitality$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, NULL, 4, 5, 3,
  $q$Does most of what we need$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2024-05-03$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Pieter van der Merwe$q$, $q$HR Business Partner$q$, $q$Karoo Trading$q$,
  $q$Manufacturing$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  3, NULL, 3, 4, 3,
  $q$Mixed feelings on value$q$, $q$Works fine for records and leave. The reporting and some features feel limited for the price.$q$, $q$It is easy to navigate for everyone on the team.$q$, $q$Reporting does not go as deep as I would like.$q$,
  NULL, NULL, $q$2025-07-04$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Zaid W.$q$, $q$HR Generalist$q$, $q$Sandton Trading$q$,
  $q$Consumer Services$q$, $q$201-500$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 4, 5, 5,
  $q$Great for a small HR team$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2025-02-23$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Michelle Dlamini$q$, $q$People Operations Lead$q$, $q$Acacia Trading$q$,
  $q$Non-Profit Organization Management$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 4, 3, 4, 5,
  $q$Worth it despite the price$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, $q$The occasional setting is hard to find without asking.$q$,
  NULL, NULL, $q$2026-01-13$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Andrew W.$q$, $q$People Operations Lead$q$, NULL,
  $q$Education Management$q$, $q$501-1000$q$, $q$United Kingdom$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, 4, 4, 5, 4,
  $q$Great for people admin$q$, $q$It covers the core HR admin nicely. A few features are more built for the US than for us here.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2025-08-04$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ahmed Mokoena$q$, $q$HR Manager$q$, NULL,
  $q$Manufacturing$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, NULL, 5, 5, 5,
  $q$Staff love the self service$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2025-07-16$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Thandeka D.$q$, $q$Founder$q$, $q$Umhlanga Labs$q$,
  $q$Education Management$q$, $q$1$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 3, 4, 3,
  $q$Does most of what we need$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$Support is helpful when I reach out.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2026-03-09$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Palesa W.$q$, $q$Founder$q$, $q$Northgate Digital$q$,
  $q$Legal Services$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  4, 4, 4, 5, NULL,
  $q$Recommend for small to mid teams$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$Keeping records, leave and documents together has cleaned up our admin.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2026-01-28$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Amahle Adams$q$, $q$Operations Manager$q$, $q$Drakensberg Services$q$,
  $q$Retail$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, NULL, 5, NULL,
  $q$Our team actually enjoys using it$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2025-05-20$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Yusuf F.$q$, $q$HR Manager$q$, $q$Sandton Services$q$,
  $q$Staffing and Recruiting$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 4, NULL, 4,
  $q$Simple and does what we need$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2026-03-02$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Nadia E.$q$, $q$Managing Director$q$, $q$Drakensberg Trading$q$,
  $q$Marketing and Advertising$q$, $q$2-10$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 4,
  $q$Onboarding is a breeze now$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-05-24$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Kabelo R.$q$, $q$Operations Manager$q$, NULL,
  $q$Consumer Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, NULL, 3, NULL, 4,
  $q$Great for people admin$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$The employee self service takes a load of little requests off my plate.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2026-02-28$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Elandri R.$q$, $q$HR Manager$q$, NULL,
  $q$Hospitality$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, NULL, 4, 5, 5,
  $q$Simple and does what we need$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-05-12$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Lerato C.$q$, $q$Talent Manager$q$, $q$Cape Group$q$,
  $q$Legal Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Took the paperwork away$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-04-27$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ahmed H.$q$, $q$Head of People$q$, $q$Northgate Services$q$,
  $q$Computer Software$q$, $q$1$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, 3, 3, 4, 2,
  $q$Okay HR tool$q$, $q$Works fine for records and leave. The reporting and some features feel limited for the price.$q$, $q$Staff self service and leave tracking are the parts we actually use and they work well.$q$, $q$Several features are clearly built for the US market.$q$,
  NULL, NULL, $q$2024-08-16$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Tebogo P.$q$, $q$Operations Manager$q$, $q$Anchor Trading$q$,
  $q$Legal Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Simple and does what we need$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-03-25$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ruan N.$q$, $q$Office Manager$q$, NULL,
  $q$Financial Services$q$, $q$11-50$q$, $q$Namibia$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 4, 4, 5, 4,
  $q$Tidy and reliable$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$Support is helpful when I reach out.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2025-02-19$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Stefan G.$q$, $q$Talent Manager$q$, $q$Kalahari Digital$q$,
  $q$Non-Profit Organization Management$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 4, 5, 4,
  $q$Our team actually enjoys using it$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-02-24$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Vanessa M.$q$, $q$Operations Manager$q$, $q$Cape Pty Ltd$q$,
  $q$Health, Wellness and Fitness$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 4, 5,
  $q$Time off tracking finally sorted$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-10-22$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Thandeka N.$q$, $q$HR Manager$q$, $q$Anchor Pty Ltd$q$,
  $q$Retail$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, NULL, 3, 4, 5,
  $q$Tidy and reliable$q$, $q$It covers the core HR admin nicely. A few features are more built for the US than for us here.$q$, $q$Support is helpful when I reach out.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2026-05-14$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Vanessa R.$q$, $q$HR Administrator$q$, $q$Marula Group$q$,
  $q$Health, Wellness and Fitness$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, 4, 4, 4, 5,
  $q$Happy overall$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$The employee self service takes a load of little requests off my plate.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2026-04-11$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Stefan M.$q$, $q$Founder$q$, $q$Baobab Trading$q$,
  $q$Financial Services$q$, $q$11-50$q$, $q$Kenya$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 4, 5, 5,
  $q$Clean and easy to use$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, NULL,
  NULL, NULL, $q$2025-01-15$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Mpho L.$q$, $q$Office Manager$q$, $q$Aloe Pty Ltd$q$,
  $q$Legal Services$q$, $q$11-50$q$, $q$United Kingdom$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$So glad we moved to it$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-02-22$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Michelle E.$q$, $q$HR Business Partner$q$, $q$Protea Labs$q$,
  $q$Retail$q$, $q$201-500$q$, $q$United Kingdom$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 5, NULL, NULL,
  $q$Great for a small HR team$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2025-05-15$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Dumisani K.$q$, $q$HR Generalist$q$, $q$Protea Trading$q$,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$United Kingdom$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Everything in one place at last$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2026-02-27$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ilse C.$q$, $q$Operations Manager$q$, $q$Aloe Services$q$,
  $q$Non-Profit Organization Management$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 4,
  $q$Onboarding is a breeze now$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2026-03-25$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Sipho V.$q$, $q$HR Administrator$q$, $q$Riverside Trading$q$,
  $q$Information Technology and Services$q$, $q$501-1000$q$, $q$Namibia$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$Our team actually enjoys using it$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2026-02-21$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Rebecca B.$q$, $q$HR Administrator$q$, $q$Vaal Digital$q$,
  $q$Computer Software$q$, $q$501-1000$q$, $q$United Kingdom$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, 3, 4, 5,
  $q$Great for people admin$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$The employee self service takes a load of little requests off my plate.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2024-05-11$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Emily H.$q$, $q$HR Business Partner$q$, $q$Acacia Labs$q$,
  $q$Computer Software$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 5, 3, NULL, 4,
  $q$Recommend for small to mid teams$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$The employee self service takes a load of little requests off my plate.$q$, NULL,
  NULL, NULL, $q$2026-01-19$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Tasneem P.$q$, $q$Office Manager$q$, $q$Northgate Trading$q$,
  $q$Consumer Services$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, NULL, 5, 5, 5,
  $q$Our team actually enjoys using it$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-04-25$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Zaid R.$q$, $q$HR Administrator$q$, $q$Vaal Pty Ltd$q$,
  $q$Marketing and Advertising$q$, $q$11-50$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 3, NULL, 4,
  $q$Good HR system with a couple of gaps$q$, $q$Happy with it. Self service and onboarding save real time even if setup took a bit of thought.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2024-01-26$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Johan K.$q$, $q$HR Generalist$q$, $q$Karoo Trading$q$,
  $q$Legal Services$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Everything in one place at last$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-04-15$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Stefan K.$q$, $q$Founder$q$, NULL,
  $q$Health, Wellness and Fitness$q$, $q$11-50$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, 4, 3, 4, 4,
  $q$Worth it despite the price$q$, $q$It covers the core HR admin nicely. A few features are more built for the US than for us here.$q$, $q$Keeping records, leave and documents together has cleaned up our admin.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2026-05-17$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Yusuf Z.$q$, $q$Talent Manager$q$, NULL,
  $q$Legal Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$So glad we moved to it$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2026-02-15$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Carla Adams$q$, $q$HR Manager$q$, NULL,
  $q$Non-Profit Organization Management$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 4, 5, 5,
  $q$Everything in one place at last$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2024-03-27$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Musa E.$q$, $q$Talent Manager$q$, $q$Kalahari Trading$q$,
  $q$Education Management$q$, $q$51-200$q$, $q$Kenya$q$,
  false, NULL, $q$Less than 6 months$q$,
  2, NULL, 1, 3, 2,
  $q$Too costly for our needs$q$, $q$It looks great but we are paying a premium for features that do not suit a South African business.$q$, $q$The interface is nice and staff found it easy.$q$, $q$Pricing is steep for a small team.$q$,
  NULL, NULL, $q$2025-05-16$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Lindiwe E.$q$, $q$Office Manager$q$, $q$Marula Labs$q$,
  $q$Marketing and Advertising$q$, $q$201-500$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 3, 4, NULL, 3,
  $q$Happy overall$q$, $q$It covers the core HR admin nicely. A few features are more built for the US than for us here.$q$, $q$The employee self service takes a load of little requests off my plate.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2026-03-24$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Refilwe D.$q$, $q$Operations Manager$q$, $q$Vaal Digital$q$,
  $q$Hospitality$q$, $q$2-10$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Clean and easy to use$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2026-06-21$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Willem E.$q$, $q$HR Business Partner$q$, $q$Northgate Group$q$,
  $q$Non-Profit Organization Management$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, NULL, 4, 5, 5,
  $q$Makes HR admin so much easier$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-09-20$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$David T.$q$, $q$Head of People$q$, $q$Bluewater Holdings$q$,
  $q$Retail$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, NULL, 4,
  $q$Onboarding is a breeze now$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2026-01-28$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Kayla A.$q$, $q$HR Business Partner$q$, $q$Cape Trading$q$,
  $q$Financial Services$q$, $q$51-200$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 5, 4, 4, 5,
  $q$Happy overall$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2026-02-05$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Yusuf R.$q$, $q$Operations Manager$q$, $q$Cape Digital$q$,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, NULL, 5, 5, NULL,
  $q$Worth it despite the price$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2026-04-10$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Themba Z.$q$, $q$Founder$q$, $q$Baobab Digital$q$,
  $q$Health, Wellness and Fitness$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, 3, 3, 4, 3,
  $q$Fine but pricey for what we use$q$, $q$It is a decent system and easy enough, but for our size we are paying for a lot we never touch.$q$, $q$Staff self service and leave tracking are the parts we actually use and they work well.$q$, $q$For a small team the pricing is hard to justify against how much we use.$q$,
  NULL, NULL, $q$2024-05-06$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Simone G.$q$, $q$Operations Manager$q$, $q$Anchor Services$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Best HR system we have used$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2025-08-16$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Wesley W.$q$, $q$HR Generalist$q$, $q$Kalahari Digital$q$,
  $q$Hospitality$q$, $q$1$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, NULL, 4,
  $q$Simple and does what we need$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-05-23$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Gugu A.$q$, $q$Founder$q$, $q$Protea Labs$q$,
  $q$Financial Services$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, NULL, 4, 5, 5,
  $q$Best HR system we have used$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-01-06$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Thandeka M.$q$, $q$Head of People$q$, $q$Bluewater Group$q$,
  $q$Legal Services$q$, $q$2-10$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, NULL, 5, 5, 4,
  $q$Recommend for small to mid teams$q$, $q$Happy with it. Self service and onboarding save real time even if setup took a bit of thought.$q$, $q$Support is helpful when I reach out.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-05-19$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Priya Nkosi$q$, $q$HR Business Partner$q$, NULL,
  $q$Legal Services$q$, $q$11-50$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 5, NULL, 4, 5,
  $q$Good HR system with a couple of gaps$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, $q$The occasional setting is hard to find without asking.$q$,
  NULL, NULL, $q$2026-03-24$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Charlene G.$q$, $q$HR Business Partner$q$, $q$Baobab Digital$q$,
  $q$Financial Services$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 4, 3, 4, 5,
  $q$Worth it despite the price$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2026-04-09$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Lindiwe R.$q$, $q$HR Manager$q$, $q$Baobab Group$q$,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  2, 2, 2, 2, 2,
  $q$Not the right fit for a small SA team$q$, $q$The system is fine, the value is not. We could not justify the renewal for what we actually use.$q$, $q$The interface is nice and staff found it easy.$q$, $q$A lot of it is built for the US and does not apply to us.$q$,
  NULL, NULL, $q$2025-03-19$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Themba Pillay$q$, $q$HR Business Partner$q$, $q$Silverline Group$q$,
  $q$Information Technology and Services$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 4, 5, 5,
  $q$Clean and easy to use$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$None really, we are very happy with it.$q$,
  NULL, NULL, $q$2024-02-18$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Unathi A.$q$, $q$Founder$q$, $q$Cape Trading$q$,
  $q$Education Management$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, NULL, 4, 5, 5,
  $q$Clean and easy to use$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$None really, we are very happy with it.$q$,
  NULL, NULL, $q$2026-06-03$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Nomvula L.$q$, $q$HR Manager$q$, $q$Riverside Labs$q$,
  $q$Non-Profit Organization Management$q$, $q$11-50$q$, $q$United Kingdom$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 4, 5, 5,
  $q$Onboarding is a breeze now$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2024-07-05$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Hendrik Nkosi$q$, $q$HR Administrator$q$, $q$Tygerberg Holdings$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Great for a small HR team$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-01-18$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Sipho G.$q$, $q$HR Manager$q$, $q$Anchor Digital$q$,
  $q$Manufacturing$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, NULL, 4,
  $q$Simple and does what we need$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-02-06$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Neil R.$q$, $q$Office Manager$q$, $q$Northgate Digital$q$,
  $q$Financial Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 5,
  $q$So glad we moved to it$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2025-04-21$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Chantelle D.$q$, $q$Office Manager$q$, $q$Umhlanga Trading$q$,
  $q$Information Technology and Services$q$, $q$1$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 5, 3, 3, 3,
  $q$Does most of what we need$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$The occasional setting is hard to find without asking.$q$,
  NULL, NULL, $q$2026-02-25$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Kabelo Naidoo$q$, $q$Head of People$q$, $q$Drakensberg Trading$q$,
  $q$Consumer Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 4, 5, 5,
  $q$Staff love the self service$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$Nothing major. It does what we need day to day.$q$,
  NULL, NULL, $q$2026-06-12$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Emily V.$q$, $q$HR Manager$q$, $q$Summit Trading$q$,
  $q$Consumer Services$q$, $q$501-1000$q$, $q$United Kingdom$q$,
  true, NULL, $q$6-12 months$q$,
  3, NULL, 2, 4, 4,
  $q$Does the basics well enough$q$, $q$Good on the day to day, but a chunk of it is aimed at bigger US companies and does not apply to us.$q$, $q$Staff self service and leave tracking are the parts we actually use and they work well.$q$, $q$For a small team the pricing is hard to justify against how much we use.$q$,
  NULL, NULL, $q$2026-03-16$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ashwin T.$q$, $q$Head of People$q$, NULL,
  $q$Retail$q$, $q$1$q$, $q$Namibia$q$,
  true, NULL, $q$2+ years$q$,
  4, 4, 3, 3, 5,
  $q$Happy overall$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2026-06-20$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Themba V.$q$, $q$Founder$q$, $q$Drakensberg Digital$q$,
  $q$Manufacturing$q$, $q$1$q$, $q$United Kingdom$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 4, 5, 5,
  $q$Makes HR admin so much easier$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.$q$,
  NULL, NULL, $q$2025-05-12$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$David A.$q$, $q$HR Administrator$q$, $q$Marula Trading$q$,
  $q$Computer Software$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  4, 4, 4, NULL, 5,
  $q$Tidy and reliable$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2025-01-03$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Nomsa N.$q$, $q$HR Generalist$q$, NULL,
  $q$Manufacturing$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  4, 5, 5, 4, 4,
  $q$Solid and easy to use$q$, $q$It covers the core HR admin nicely. A few features are more built for the US than for us here.$q$, $q$The employee self service takes a load of little requests off my plate.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2025-01-28$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Emily C.$q$, $q$Operations Manager$q$, NULL,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$United Kingdom$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, NULL, 5, 5, 5,
  $q$Onboarding is a breeze now$q$, $q$It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2025-07-15$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Johan R.$q$, $q$Founder$q$, $q$Baobab Digital$q$,
  $q$Legal Services$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  3, NULL, 2, NULL, 2,
  $q$Okay HR tool$q$, $q$Good on the day to day, but a chunk of it is aimed at bigger US companies and does not apply to us.$q$, $q$It is easy to navigate for everyone on the team.$q$, $q$Several features are clearly built for the US market.$q$,
  NULL, NULL, $q$2026-05-11$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Unathi V.$q$, $q$Office Manager$q$, $q$Northgate Services$q$,
  $q$Education Management$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, NULL, 4, 5, NULL,
  $q$Everything in one place at last$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-06-05$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Johan K.$q$, $q$Office Manager$q$, $q$Karoo Pty Ltd$q$,
  $q$Retail$q$, $q$2-10$q$, $q$Kenya$q$,
  true, NULL, $q$2+ years$q$,
  2, 2, 2, 2, 1,
  $q$Not the right fit for a small SA team$q$, $q$It looks great but we are paying a premium for features that do not suit a South African business.$q$, $q$Leave and records are handled fine.$q$, $q$Pricing is steep for a small team.$q$,
  NULL, NULL, $q$2024-09-21$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Francois W.$q$, $q$Operations Manager$q$, $q$Anchor Holdings$q$,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$United Kingdom$q$,
  false, NULL, $q$6-12 months$q$,
  4, 5, 3, 4, 4,
  $q$Recommend for small to mid teams$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$A few features assume a US setup and are not that useful to us.$q$,
  NULL, NULL, $q$2024-01-24$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Riaan C.$q$, $q$Operations Manager$q$, $q$Karoo Pty Ltd$q$,
  $q$Health, Wellness and Fitness$q$, $q$2-10$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 4, NULL, 4,
  $q$Best HR system we have used$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2024-01-08$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Xolani Naidoo$q$, $q$Managing Director$q$, NULL,
  $q$Financial Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  2, 2, 2, 2, 1,
  $q$Not the right fit for a small SA team$q$, $q$The system is fine, the value is not. We could not justify the renewal for what we actually use.$q$, $q$Leave and records are handled fine.$q$, $q$Reporting is limited unless you pay more.$q$,
  NULL, NULL, $q$2024-04-23$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Emily V.$q$, $q$Talent Manager$q$, $q$Riverside Trading$q$,
  $q$Education Management$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, NULL, 5, 5,
  $q$Great for a small HR team$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2026-02-02$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Unathi B.$q$, $q$HR Administrator$q$, $q$Vaal Digital$q$,
  $q$Hospitality$q$, $q$501-1000$q$, $q$United Kingdom$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, NULL, 5, 5,
  $q$Best HR system we have used$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$Leave requests and approvals are simple and everyone can see their own balance at a glance.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2025-05-16$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Tasneem V.$q$, $q$Managing Director$q$, NULL,
  $q$Consumer Services$q$, $q$51-200$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, NULL, 4, 5, NULL,
  $q$Great for people admin$q$, $q$Happy with it. Self service and onboarding save real time even if setup took a bit of thought.$q$, $q$It is genuinely easy for non technical staff to pick up.$q$, NULL,
  NULL, NULL, $q$2025-07-26$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Francois Mokoena$q$, $q$HR Manager$q$, $q$Protea Services$q$,
  $q$Consumer Services$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Time off tracking finally sorted$q$, $q$We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2024-01-15$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ruan J.$q$, $q$People Operations Lead$q$, $q$Northgate Services$q$,
  $q$Staffing and Recruiting$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, NULL, 4, 5, NULL,
  $q$Worth it despite the price$q$, $q$We have been on it about a year and it runs well. The price is the only thing that makes me pause.$q$, $q$Onboarding new people is far smoother than it used to be.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2025-11-01$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Michelle M.$q$, $q$Founder$q$, $q$Baobab Group$q$,
  $q$Education Management$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 4,
  $q$Took the paperwork away$q$, $q$Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.$q$, $q$Having every record, contract and review in one place has been a huge tidy up for us.$q$, $q$It sits at the pricier end and a few features are add ons on top.$q$,
  NULL, NULL, $q$2025-02-20$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Grant P.$q$, $q$Talent Manager$q$, $q$Silverline Services$q$,
  $q$Marketing and Advertising$q$, $q$201-500$q$, $q$Namibia$q$,
  true, NULL, $q$1-2 years$q$,
  4, 4, NULL, 4, 3,
  $q$Tidy and reliable$q$, $q$Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.$q$, $q$Keeping records, leave and documents together has cleaned up our admin.$q$, $q$Reporting is a little thin if you want to dig into the numbers.$q$,
  NULL, NULL, $q$2025-07-21$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Tumelo Mahlangu$q$, $q$HR Manager$q$, $q$Riverside Trading$q$,
  $q$Legal Services$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  1, 1, 1, NULL, NULL,
  $q$Wrong tool for our market$q$, $q$We paid a lot and used a fraction of it. Too much of the product assumes a US setup and support could not bridge the gap.$q$, $q$It looked polished, I will give it that.$q$, $q$Far too expensive for what a small business here actually uses.$q$,
  NULL, NULL, $q$2024-04-25$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Simone G.$q$, $q$Managing Director$q$, $q$Aloe Labs$q$,
  $q$Consumer Services$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, 3, 4, NULL,
  $q$Recommend for small to mid teams$q$, $q$Happy with it. Self service and onboarding save real time even if setup took a bit of thought.$q$, $q$Keeping records, leave and documents together has cleaned up our admin.$q$, $q$It is not cheap and some bits are paid add ons.$q$,
  NULL, NULL, $q$2025-08-09$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Bianca C.$q$, $q$Office Manager$q$, $q$Silverline Group$q$,
  $q$Education Management$q$, $q$201-500$q$, $q$United Kingdom$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 4, 5, 4,
  $q$Took the paperwork away$q$, $q$Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.$q$, $q$The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.$q$, $q$A couple of the settings are tucked away and I had to ask support where to find them.$q$,
  NULL, NULL, $q$2024-08-23$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Ahmed P.$q$, $q$People Operations Lead$q$, NULL,
  $q$Hospitality$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Staff love the self service$q$, $q$The time off side alone was worth it. No more long email chains just to approve a day of leave.$q$, $q$Support has been quick and genuinely helpful the couple of times I needed them.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2026-05-10$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'bamboohr'),
  $q$Gugu du Toit$q$, $q$Managing Director$q$, NULL,
  $q$Computer Software$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 4,
  $q$Time off tracking finally sorted$q$, $q$We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.$q$, $q$It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.$q$, $q$Payroll is not really built for South Africa so we run that side separately.$q$,
  NULL, NULL, $q$2026-02-08$q$, 6, 'published'
);

COMMIT;
