-- 135 reviews for payspace
BEGIN;

DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = 'payspace');

INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count, status) VALUES
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Sipho E.$q$, $q$People Manager$q$, $q$Umhlanga Foods$q$,
  $q$Non-Profit Organization Management$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, 4, NULL, 5,
  $q$Does exactly what we need$q$, $q$Solid product. We are a manufacturing business with weekly and monthly staff and it copes with all of it fine.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, NULL,
  NULL, NULL, $q$2026-01-20$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Katlego W.$q$, $q$Operations Manager$q$, $q$Baobab Holdings$q$,
  $q$Retail$q$, $q$51-200$q$, $q$Nigeria$q$,
  true, NULL, $q$2+ years$q$,
  5, 4, 5, NULL, 5,
  $q$Glad we switched$q$, $q$The tax updates come through automatically so I am not scrambling every time the budget changes. Big relief for a small HR team.$q$, $q$The employee self service is the big one for me. Staff log in, check payslips, apply for leave and update their own details, which frees up so much of my time.$q$, $q$The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.$q$,
  NULL, NULL, $q$2026-02-15$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Anika Nkosi$q$, $q$Bookkeeper$q$, $q$Kalahari Holdings$q$,
  $q$Financial Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 4, 5, 5,
  $q$Staff love the app$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2026-02-14$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Quinton P.$q$, $q$Payroll Administrator$q$, NULL,
  $q$Information Technology and Services$q$, $q$1$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  5, NULL, 5, 4, 5,
  $q$Love the self service portal$q$, $q$Solid product. We are a manufacturing business with weekly and monthly staff and it copes with all of it fine.$q$, $q$It handles our EMP201 and the SARS submissions without me having to think too hard. Tax tables update on their own when treasury changes them.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-06-07$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Gareth Mokoena$q$, $q$Office Manager$q$, $q$Karoo Group$q$,
  $q$Hospitality$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 4, 4, 5,
  $q$Does exactly what we need$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$Payslips look professional and go out by email automatically. Staff stopped coming to ask for copies.$q$, $q$The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.$q$,
  NULL, NULL, $q$2025-03-20$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Tumelo K.$q$, $q$Admin Manager$q$, $q$Vaal Holdings$q$,
  $q$Staffing and Recruiting$q$, $q$201-500$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  3, 2, 3, NULL, 4,
  $q$Average experience$q$, $q$Fine overall. It is accurate and compliant which is the main thing, but the day to day feels clunky compared to what I expected.$q$, $q$It keeps payroll and leave in one place so I am not jumping between systems.$q$, $q$Getting hold of support can take a while and the answers vary depending who you get.$q$,
  NULL, NULL, $q$2026-04-22$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Sarah Ndlovu$q$, $q$Practice Manager$q$, $q$Karoo Pty Ltd$q$,
  $q$Restaurants$q$, $q$11-50$q$, $q$Ghana$q$,
  false, NULL, $q$6-12 months$q$,
  4, NULL, 5, NULL, 4,
  $q$Strong on compliance$q$, $q$Happy with it on the whole. The self service portal saves time even if some staff needed help to get going.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2025-10-04$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Keegan C.$q$, $q$Bookkeeper$q$, $q$Vaal Logistics$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$Ghana$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 3, 4, 4, NULL,
  $q$Strong on compliance$q$, $q$Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.$q$, $q$Payslips email out automatically and look neat and professional.$q$, $q$Support response times are hit and miss. Sometimes quick, sometimes I wait a day or two.$q$,
  NULL, NULL, $q$2026-03-09$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Thandeka B.$q$, $q$CFO$q$, $q$Marula Holdings$q$,
  $q$Marketing and Advertising$q$, $q$51-200$q$, $q$Zambia$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Reliable every single month$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$Leave management is built into the same system so I am not chasing spreadsheets around the office anymore.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2025-04-16$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Nadia Botha$q$, $q$Office Manager$q$, $q$Anchor Group$q$,
  $q$Mining & Metals$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 4, 5, 5, 5,
  $q$Runs our payroll across three countries$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$Took me a while to find my way around the reports section, but once you know where things live it is fine.$q$,
  NULL, NULL, $q$2026-06-24$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Emily D.$q$, $q$Director$q$, $q$Kalahari Pty Ltd$q$,
  $q$Legal Services$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Really happy with it$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2026-06-07$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Megan H.$q$, $q$Director$q$, NULL,
  $q$Staffing and Recruiting$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, 5, 4, NULL, 5,
  $q$Happy overall with a few niggles$q$, $q$Happy with it on the whole. The self service portal saves time even if some staff needed help to get going.$q$, $q$The compliance handling is the strong point. SARS submissions and statutory stuff are taken care of so I sleep easier.$q$, $q$Support response times are hit and miss. Sometimes quick, sometimes I wait a day or two.$q$,
  NULL, NULL, $q$2026-03-23$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Emily T.$q$, $q$Payroll Administrator$q$, $q$Karoo Foods$q$,
  $q$Construction$q$, $q$11-50$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  3, NULL, 3, NULL, NULL,
  $q$Works but could be simpler$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$Once it is set up it is stable and runs each month without drama.$q$, $q$It feels built for bigger companies. As a smaller team a lot of it is overkill for us.$q$,
  NULL, NULL, $q$2024-08-03$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Fatima Fourie$q$, $q$HR Administrator$q$, $q$Tygerberg Foods$q$,
  $q$Human Resources$q$, $q$2-10$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  3, 2, 3, NULL, 4,
  $q$Works but could be simpler$q$, $q$It does what it needs to for payroll but I would not call it easy. There is a fair bit of clicking around to get simple things done.$q$, $q$Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.$q$, $q$It feels built for bigger companies. As a smaller team a lot of it is overkill for us.$q$,
  NULL, NULL, $q$2025-06-01$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Stefan D.$q$, $q$HR Manager$q$, $q$Protea Pty Ltd$q$,
  $q$Construction$q$, $q$2-10$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  3, NULL, NULL, 2, 3,
  $q$Mixed feelings$q$, $q$We use it because it works, not because we love it. Support is slow and the interface takes getting used to.$q$, $q$It keeps payroll and leave in one place so I am not jumping between systems.$q$, $q$The setup and general navigation are not intuitive. Simple tasks take more steps than they should.$q$,
  NULL, NULL, $q$2025-07-09$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ahmed Botha$q$, $q$Financial Manager$q$, $q$Tygerberg Trading$q$,
  $q$Consumer Services$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 4, 5, 4, 5,
  $q$Glad we switched$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2026-01-24$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Jared Ndlovu$q$, $q$Owner$q$, $q$Riverside Foods$q$,
  $q$Education Management$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 4, 5,
  $q$Payroll is a breeze now$q$, $q$What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2025-08-13$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Refilwe T.$q$, $q$HR and Payroll Officer$q$, $q$Northgate Pty Ltd$q$,
  $q$Legal Services$q$, $q$501-1000$q$, $q$Ghana$q$,
  true, NULL, $q$1-2 years$q$,
  2, 2, 2, 1, 3,
  $q$Not for a small team$q$, $q$We have battled with this since we moved over. The system is capable but getting it to do what you want is a fight.$q$, $q$Cloud access is useful, at least I can log in from anywhere.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-05-24$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ahmed Pretorius$q$, $q$HR and Payroll Officer$q$, $q$Umhlanga Trading$q$,
  $q$Consumer Services$q$, $q$11-50$q$, $q$Ghana$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$Sorted our whole payroll$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$Leave management is built into the same system so I am not chasing spreadsheets around the office anymore.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2026-04-21$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Wesley van der Merwe$q$, $q$Financial Manager$q$, $q$Umhlanga Holdings$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$201-500$q$, $q$Kenya$q$,
  true, NULL, $q$1-2 years$q$,
  5, 4, 5, 5, 5,
  $q$Takes the stress out of month end$q$, $q$What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.$q$, $q$It handles our EMP201 and the SARS submissions without me having to think too hard. Tax tables update on their own when treasury changes them.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2025-05-11$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Andrew P.$q$, $q$Bookkeeper$q$, $q$Kalahari Logistics$q$,
  $q$Automotive$q$, $q$201-500$q$, $q$Nigeria$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Handles our compliance for us$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-04-28$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ahmed P.$q$, $q$Accountant$q$, $q$Umhlanga Logistics$q$,
  $q$Farming$q$, $q$51-200$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 3, 3, 3, 4,
  $q$Decent value for a growing business$q$, $q$Happy with it on the whole. The self service portal saves time even if some staff needed help to get going.$q$, $q$It scales with you. We added headcount and did not have to change anything about how we run payroll.$q$, $q$Some of the screens feel cluttered and it is not always obvious where a setting lives.$q$,
  NULL, NULL, $q$2025-01-02$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Grant E.$q$, $q$Owner$q$, $q$Sandton Pty Ltd$q$,
  $q$Mining & Metals$q$, $q$11-50$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 4, 5, 4, 5,
  $q$Really happy with it$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2024-08-02$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Francois L.$q$, $q$Operations Manager$q$, $q$Marula Trading$q$,
  $q$Education Management$q$, $q$51-200$q$, $q$Zambia$q$,
  false, NULL, $q$1-2 years$q$,
  4, 4, 3, 3, 4,
  $q$Gets the job done$q$, $q$We have been on it about a year. Once you learn where everything is it runs smoothly, but the first month or two was a steep climb.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$Some of the screens feel cluttered and it is not always obvious where a setting lives.$q$,
  NULL, NULL, $q$2026-01-06$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Vanessa G.$q$, $q$Financial Controller$q$, $q$Bluewater Pty Ltd$q$,
  $q$Staffing and Recruiting$q$, $q$201-500$q$, $q$Namibia$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Best decision we made for payroll$q$, $q$Honestly one of the better payroll systems I have used in this country. Does the SARS side properly.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$Took me a while to find my way around the reports section, but once you know where things live it is fine.$q$,
  NULL, NULL, $q$2024-03-01$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Leonie D.$q$, $q$Owner$q$, $q$Marula Holdings$q$,
  $q$Marketing and Advertising$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  2, 2, 1, 2, 3,
  $q$Frustrating more often than not$q$, $q$We have battled with this since we moved over. The system is capable but getting it to do what you want is a fight.$q$, $q$The compliance side is thorough, I will give it that.$q$, $q$Far too complex for what we need. Simple changes require support or a consultant.$q$,
  NULL, NULL, $q$2025-07-02$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Nadia J.$q$, $q$Operations Manager$q$, $q$Marula Services$q$,
  $q$Financial Services$q$, $q$51-200$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Glad we switched$q$, $q$Honestly one of the better payroll systems I have used in this country. Does the SARS side properly.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$Took me a while to find my way around the reports section, but once you know where things live it is fine.$q$,
  NULL, NULL, $q$2025-05-22$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ruan A.$q$, $q$Founder$q$, $q$Sandton Trading$q$,
  $q$Hospital & Health Care$q$, $q$2-10$q$, $q$Namibia$q$,
  false, NULL, $q$1-2 years$q$,
  3, NULL, NULL, 3, 3,
  $q$Middle of the road for us$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.$q$, $q$The reporting takes real effort to configure the way you want.$q$,
  NULL, NULL, $q$2026-06-22$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Lerato H.$q$, $q$Admin Manager$q$, $q$Sandton Logistics$q$,
  $q$Food & Beverages$q$, $q$1$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, NULL, 3, 3, 4,
  $q$Gets the job done$q$, $q$Reliable and it has not let us down on a pay run yet. Support can be slow at times but they get there.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2026-03-05$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Heather E.$q$, $q$Operations Manager$q$, $q$Umhlanga Logistics$q$,
  $q$Marketing and Advertising$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  2, 2, 3, 2, 2,
  $q$Expected more$q$, $q$We have battled with this since we moved over. The system is capable but getting it to do what you want is a fight.$q$, $q$Cloud access is useful, at least I can log in from anywhere.$q$, $q$Support is slow and you often get passed around before anyone helps.$q$,
  NULL, NULL, $q$2024-09-19$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Vusi L.$q$, $q$HR and Payroll Officer$q$, $q$Silverline Logistics$q$,
  $q$Human Resources$q$, $q$51-200$q$, $q$Namibia$q$,
  true, NULL, $q$6-12 months$q$,
  1, 1, 1, NULL, 1,
  $q$Save yourself the trouble$q$, $q$The system is overcomplicated and the support is basically absent when you actually need it. Not worth the money for us.$q$, $q$It can run payroll, when it decides to cooperate.$q$, $q$Support is slow to the point of being useless when you have a real problem.$q$,
  NULL, NULL, $q$2024-04-28$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Tebogo B.$q$, $q$Financial Manager$q$, $q$Highveld Foods$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$Zambia$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  2, 1, 1, 2, NULL,
  $q$Expected more$q$, $q$It is powerful but so complicated that half the features go unused. When something goes wrong support takes forever to come back.$q$, $q$The compliance side is thorough, I will give it that.$q$, $q$Support is slow and you often get passed around before anyone helps.$q$,
  NULL, NULL, $q$2025-01-25$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Bianca Adams$q$, $q$HR Business Partner$q$, $q$Sandton Trading$q$,
  $q$Construction$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, 3, 4, 4, 4,
  $q$Works well once you get used to it$q$, $q$Reliable and it has not let us down on a pay run yet. Support can be slow at times but they get there.$q$, $q$The compliance handling is the strong point. SARS submissions and statutory stuff are taken care of so I sleep easier.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-01-14$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Rethabile E.$q$, $q$Owner$q$, $q$Riverside Trading$q$,
  $q$Mining & Metals$q$, $q$501-1000$q$, $q$Botswana$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  1, 1, 1, 1, 2,
  $q$Would not recommend$q$, $q$We lost hours every month working around problems that should never happen in a payroll system. Cannot recommend it.$q$, $q$The idea of everything in one place is good, the execution just was not there for us.$q$, $q$Overly complex, and small changes turn into big jobs.$q$,
  NULL, NULL, $q$2026-03-28$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Carla P.$q$, $q$Payroll Administrator$q$, $q$Northgate Logistics$q$,
  $q$Farming$q$, $q$2-10$q$, $q$Kenya$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 4, 4, 4, 5,
  $q$Solid but has a learning curve$q$, $q$Reliable and it has not let us down on a pay run yet. Support can be slow at times but they get there.$q$, $q$Payslips email out automatically and look neat and professional.$q$, $q$Support response times are hit and miss. Sometimes quick, sometimes I wait a day or two.$q$,
  NULL, NULL, $q$2026-02-16$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Zaid Mahlangu$q$, $q$Office Manager$q$, $q$Baobab Pty Ltd$q$,
  $q$Construction$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 4, 4, 5,
  $q$Reliable every single month$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2026-03-04$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Tasneem E.$q$, $q$Accountant$q$, $q$Cape Foods$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$1$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 4, 5,
  $q$Solid system for a growing team$q$, $q$Honestly one of the better payroll systems I have used in this country. Does the SARS side properly.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$Took me a while to find my way around the reports section, but once you know where things live it is fine.$q$,
  NULL, NULL, $q$2026-04-20$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ahmed N.$q$, $q$HR Manager$q$, $q$Vaal Services$q$,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, 3, 3, 4, 4,
  $q$Reliable payroll for us$q$, $q$We have been on it about a year. Once you learn where everything is it runs smoothly, but the first month or two was a steep climb.$q$, $q$It scales with you. We added headcount and did not have to change anything about how we run payroll.$q$, $q$None really.$q$,
  NULL, NULL, $q$2024-11-01$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Unathi W.$q$, $q$People Manager$q$, $q$Protea Group$q$,
  $q$Restaurants$q$, $q$201-500$q$, $q$Kenya$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 5, NULL, 5,
  $q$Payroll is a breeze now$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$Payslips look professional and go out by email automatically. Staff stopped coming to ask for copies.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2025-07-03$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Bianca Botha$q$, $q$Operations Manager$q$, $q$Kalahari Trading$q$,
  $q$Consumer Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, NULL, 5, 5, 5,
  $q$Glad we switched$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$Leave management is built into the same system so I am not chasing spreadsheets around the office anymore.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2026-03-05$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Johan Mahlangu$q$, $q$Bookkeeper$q$, $q$Marula Services$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$Ghana$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 4, 5, 5,
  $q$Cloud payroll done right$q$, $q$What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2026-01-22$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Marius K.$q$, $q$HR Administrator$q$, NULL,
  $q$Hospitality$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, NULL, 5,
  $q$Love the self service portal$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-05-03$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Gareth Z.$q$, $q$People Manager$q$, $q$Northgate Trading$q$,
  $q$Construction$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  2, 1, 3, 2, 3,
  $q$Not for a small team$q$, $q$It is powerful but so complicated that half the features go unused. When something goes wrong support takes forever to come back.$q$, $q$Cloud access is useful, at least I can log in from anywhere.$q$, $q$It is not friendly for someone without a payroll background at all.$q$,
  NULL, NULL, $q$2026-01-18$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Mpho C.$q$, $q$HR and Payroll Officer$q$, $q$Northgate Foods$q$,
  $q$Construction$q$, $q$501-1000$q$, $q$Zambia$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 4, 5, 4, 5,
  $q$Solid system for a growing team$q$, $q$The tax updates come through automatically so I am not scrambling every time the budget changes. Big relief for a small HR team.$q$, $q$Leave management is built into the same system so I am not chasing spreadsheets around the office anymore.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2025-01-05$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Leonie Pillay$q$, $q$Practice Manager$q$, NULL,
  $q$Hospital & Health Care$q$, $q$51-200$q$, $q$Zambia$q$,
  true, NULL, $q$2+ years$q$,
  3, 3, NULL, NULL, 3,
  $q$Mixed feelings$q$, $q$We use it because it works, not because we love it. Support is slow and the interface takes getting used to.$q$, $q$Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.$q$, $q$The reporting takes real effort to configure the way you want.$q$,
  NULL, NULL, $q$2026-02-28$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Amahle van der Merwe$q$, $q$Admin Manager$q$, $q$Riverside Trading$q$,
  $q$Hospital & Health Care$q$, $q$11-50$q$, $q$Nigeria$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, 5, 5, 5,
  $q$Reliable every single month$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.$q$,
  NULL, NULL, $q$2026-03-15$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Cindy Jacobs$q$, $q$Bookkeeper$q$, NULL,
  $q$Education Management$q$, $q$11-50$q$, $q$Zambia$q$,
  true, NULL, $q$Less than 6 months$q$,
  1, 1, 1, 1, 1,
  $q$Regret moving to it$q$, $q$Nothing but headaches since we onboarded. Queries sit open for weeks and nobody takes ownership. We are already looking to move.$q$, $q$It can run payroll, when it decides to cooperate.$q$, $q$Support is slow to the point of being useless when you have a real problem.$q$,
  NULL, NULL, $q$2026-01-20$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Faith W.$q$, $q$Payroll Administrator$q$, $q$Umhlanga Logistics$q$,
  $q$Logistics and Supply Chain$q$, $q$501-1000$q$, $q$Nigeria$q$,
  true, NULL, $q$6-12 months$q$,
  4, 4, 3, NULL, 5,
  $q$Decent value for a growing business$q$, $q$It covers payroll and basic HR in one place which suits us. A few features feel like they need polishing.$q$, $q$Self service for staff cuts down on admin. Leave, payslips and personal details are all on them now.$q$, $q$The learning curve is real. Give yourself a good few weeks before you feel comfortable.$q$,
  NULL, NULL, $q$2024-03-04$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Dumisani Adams$q$, $q$Operations Manager$q$, $q$Bluewater Holdings$q$,
  $q$Automotive$q$, $q$201-500$q$, $q$Ghana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, NULL, 5,
  $q$Staff love the app$q$, $q$What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2026-02-17$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Amahle S.$q$, $q$Founder$q$, NULL,
  $q$Education Management$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 4, 4, NULL,
  $q$Works well once you get used to it$q$, $q$It covers payroll and basic HR in one place which suits us. A few features feel like they need polishing.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$The learning curve is real. Give yourself a good few weeks before you feel comfortable.$q$,
  NULL, NULL, $q$2026-01-21$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Tasneem H.$q$, $q$Practice Manager$q$, $q$Protea Group$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  3, 3, 2, 3, 4,
  $q$Does the basics fine$q$, $q$We use it because it works, not because we love it. Support is slow and the interface takes getting used to.$q$, $q$Once it is set up it is stable and runs each month without drama.$q$, $q$The setup and general navigation are not intuitive. Simple tasks take more steps than they should.$q$,
  NULL, NULL, $q$2026-01-27$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Kabelo Naidoo$q$, $q$HR Business Partner$q$, $q$Sandton Trading$q$,
  $q$Financial Services$q$, $q$201-500$q$, $q$Ghana$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  3, 3, 2, NULL, 4,
  $q$Average experience$q$, $q$It does what it needs to for payroll but I would not call it easy. There is a fair bit of clicking around to get simple things done.$q$, $q$Once it is set up it is stable and runs each month without drama.$q$, $q$It feels built for bigger companies. As a smaller team a lot of it is overkill for us.$q$,
  NULL, NULL, $q$2026-05-14$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Charlene Naidoo$q$, $q$CFO$q$, NULL,
  $q$Food & Beverages$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 4, 5, 5, 5,
  $q$Cloud payroll done right$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-03-27$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Dineo Adams$q$, $q$Owner$q$, $q$Karoo Logistics$q$,
  $q$Retail$q$, $q$201-500$q$, $q$Botswana$q$,
  true, NULL, $q$1-2 years$q$,
  2, 1, NULL, 2, 2,
  $q$Not for a small team$q$, $q$It is powerful but so complicated that half the features go unused. When something goes wrong support takes forever to come back.$q$, $q$The compliance side is thorough, I will give it that.$q$, $q$The pricing and the billing admin were a headache from the start.$q$,
  NULL, NULL, $q$2025-08-10$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Zaid Fourie$q$, $q$HR Business Partner$q$, NULL,
  $q$Health, Wellness and Fitness$q$, $q$51-200$q$, $q$Zambia$q$,
  false, NULL, $q$2+ years$q$,
  1, 1, 1, 1, 2,
  $q$Support is the worst part$q$, $q$The system is overcomplicated and the support is basically absent when you actually need it. Not worth the money for us.$q$, $q$It can run payroll, when it decides to cooperate.$q$, $q$Support is slow to the point of being useless when you have a real problem.$q$,
  NULL, NULL, $q$2025-08-14$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Pieter N.$q$, $q$Financial Manager$q$, $q$Sable Holdings$q$,
  $q$Wholesale$q$, $q$2-10$q$, $q$Botswana$q$,
  false, NULL, $q$Less than 6 months$q$,
  3, 3, 4, 2, 3,
  $q$Fine once you fight through setup$q$, $q$It is okay. Not the worst, not the best. Ticks the boxes but nothing about it wows me.$q$, $q$Once it is set up it is stable and runs each month without drama.$q$, $q$The setup and general navigation are not intuitive. Simple tasks take more steps than they should.$q$,
  NULL, NULL, $q$2026-03-17$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Lerato E.$q$, $q$CFO$q$, $q$Summit Trading$q$,
  $q$Human Resources$q$, $q$501-1000$q$, $q$Kenya$q$,
  true, NULL, $q$2+ years$q$,
  3, NULL, 2, NULL, 4,
  $q$Middle of the road for us$q$, $q$We use it because it works, not because we love it. Support is slow and the interface takes getting used to.$q$, $q$Once it is set up it is stable and runs each month without drama.$q$, $q$The reporting takes real effort to configure the way you want.$q$,
  NULL, NULL, $q$2026-05-16$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Willem P.$q$, $q$Owner$q$, $q$Aloe Foods$q$,
  $q$Construction$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  1, 1, 1, 1, 2,
  $q$All the frustration for none of the help$q$, $q$Nothing but headaches since we onboarded. Queries sit open for weeks and nobody takes ownership. We are already looking to move.$q$, $q$The idea of everything in one place is good, the execution just was not there for us.$q$, $q$Support is slow to the point of being useless when you have a real problem.$q$,
  NULL, NULL, $q$2026-02-04$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Yusuf E.$q$, $q$Payroll Administrator$q$, $q$Bluewater Trading$q$,
  $q$Information Technology and Services$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 4, 5,
  $q$Reliable every single month$q$, $q$Honestly one of the better payroll systems I have used in this country. Does the SARS side properly.$q$, $q$The employee self service is the big one for me. Staff log in, check payslips, apply for leave and update their own details, which frees up so much of my time.$q$, $q$The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.$q$,
  NULL, NULL, $q$2026-02-08$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Palesa Pillay$q$, $q$HR and Payroll Officer$q$, NULL,
  $q$Hospital & Health Care$q$, $q$501-1000$q$, $q$Zambia$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, 3, 3, NULL,
  $q$Good for medium sized teams$q$, $q$We have been on it about a year. Once you learn where everything is it runs smoothly, but the first month or two was a steep climb.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$Some of the screens feel cluttered and it is not always obvious where a setting lives.$q$,
  NULL, NULL, $q$2026-05-05$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Aisha M.$q$, $q$HR Administrator$q$, NULL,
  $q$Accounting$q$, $q$201-500$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 4, 4, 5,
  $q$Cloud payroll done right$q$, $q$Solid product. We are a manufacturing business with weekly and monthly staff and it copes with all of it fine.$q$, $q$We run staff in a few African countries and it deals with the different tax rules for each one, which is not easy to find.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-04-02$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Simone H.$q$, $q$Owner$q$, $q$Silverline Pty Ltd$q$,
  $q$Farming$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  3, 3, NULL, 2, 3,
  $q$Does the basics fine$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.$q$, $q$The setup and general navigation are not intuitive. Simple tasks take more steps than they should.$q$,
  NULL, NULL, $q$2026-04-05$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Cindy J.$q$, $q$Office Manager$q$, $q$Bluewater Holdings$q$,
  $q$Facilities Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Glad we switched$q$, $q$Runs like clockwork. I do payroll for about 80 people and month end used to eat my whole week, now its a day at most.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2026-05-11$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Amahle P.$q$, $q$CFO$q$, $q$Baobab Foods$q$,
  $q$Wholesale$q$, $q$2-10$q$, $q$Zambia$q$,
  true, NULL, $q$1-2 years$q$,
  2, 1, 3, 1, 2,
  $q$Struggled with it$q$, $q$Too heavy for a business our size. We spend more time managing the software than doing payroll.$q$, $q$The compliance side is thorough, I will give it that.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2024-12-12$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Priya A.$q$, $q$Director$q$, NULL,
  $q$Wholesale$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  3, NULL, 3, 2, 3,
  $q$Middle of the road for us$q$, $q$We use it because it works, not because we love it. Support is slow and the interface takes getting used to.$q$, $q$It keeps payroll and leave in one place so I am not jumping between systems.$q$, $q$The setup and general navigation are not intuitive. Simple tasks take more steps than they should.$q$,
  NULL, NULL, $q$2024-08-22$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Keegan Pillay$q$, $q$Operations Manager$q$, $q$Tygerberg Foods$q$,
  $q$Construction$q$, $q$51-200$q$, $q$Botswana$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Handles our compliance for us$q$, $q$Runs like clockwork. I do payroll for about 80 people and month end used to eat my whole week, now its a day at most.$q$, $q$Payslips look professional and go out by email automatically. Staff stopped coming to ask for copies.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2026-06-23$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Gareth Mokoena$q$, $q$HR Manager$q$, NULL,
  $q$Farming$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 4, 5, NULL, 5,
  $q$Runs our payroll across three countries$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$The employee self service is the big one for me. Staff log in, check payslips, apply for leave and update their own details, which frees up so much of my time.$q$, $q$The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.$q$,
  NULL, NULL, $q$2026-04-27$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Rebecca V.$q$, $q$HR Manager$q$, $q$Umhlanga Group$q$,
  $q$Retail$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, 3, 4, 3, NULL,
  $q$Does the basics fine$q$, $q$It is okay. Not the worst, not the best. Ticks the boxes but nothing about it wows me.$q$, $q$Once it is set up it is stable and runs each month without drama.$q$, $q$The reporting takes real effort to configure the way you want.$q$,
  NULL, NULL, $q$2026-02-11$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ilse K.$q$, $q$CFO$q$, $q$Northgate Logistics$q$,
  $q$Retail$q$, $q$11-50$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 4, 4, 4,
  $q$Reliable payroll for us$q$, $q$Happy with it on the whole. The self service portal saves time even if some staff needed help to get going.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-02-08$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Cindy J.$q$, $q$Operations Manager$q$, $q$Kalahari Foods$q$,
  $q$Security and Investigations$q$, $q$2-10$q$, $q$Zambia$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  3, 2, 2, 2, 3,
  $q$Gets there in the end$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$Being able to log in from anywhere is genuinely handy.$q$, $q$The setup and general navigation are not intuitive. Simple tasks take more steps than they should.$q$,
  NULL, NULL, $q$2026-06-08$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Xolani E.$q$, $q$Owner$q$, $q$Umhlanga Logistics$q$,
  $q$Construction$q$, $q$2-10$q$, $q$Ghana$q$,
  true, NULL, $q$1-2 years$q$,
  3, 3, 4, 3, 3,
  $q$Does the basics fine$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$It keeps payroll and leave in one place so I am not jumping between systems.$q$, $q$It feels built for bigger companies. As a smaller team a lot of it is overkill for us.$q$,
  NULL, NULL, $q$2026-02-27$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Devon T.$q$, $q$Office Manager$q$, $q$Silverline Foods$q$,
  $q$Restaurants$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 4, 5, NULL,
  $q$Takes the stress out of month end$q$, $q$The tax updates come through automatically so I am not scrambling every time the budget changes. Big relief for a small HR team.$q$, $q$We run staff in a few African countries and it deals with the different tax rules for each one, which is not easy to find.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2026-04-11$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ahmed G.$q$, $q$People Manager$q$, $q$Northgate Group$q$,
  $q$Marketing and Advertising$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, NULL, 5, 4, 5,
  $q$Sorted our whole payroll$q$, $q$Solid product. We are a manufacturing business with weekly and monthly staff and it copes with all of it fine.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2026-05-19$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Michelle Dlamini$q$, $q$Bookkeeper$q$, $q$Drakensberg Trading$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  1, 1, 1, 1, 2,
  $q$Support is the worst part$q$, $q$We lost hours every month working around problems that should never happen in a payroll system. Cannot recommend it.$q$, $q$The idea of everything in one place is good, the execution just was not there for us.$q$, $q$The cost does not match the experience you get, especially for a smaller business.$q$,
  NULL, NULL, $q$2026-05-01$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Sarah B.$q$, $q$Founder$q$, $q$Umhlanga Pty Ltd$q$,
  $q$Restaurants$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 4, NULL, 5,
  $q$Best decision we made for payroll$q$, $q$What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2025-07-01$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Vusi P.$q$, $q$Accountant$q$, $q$Summit Services$q$,
  $q$Legal Services$q$, $q$11-50$q$, $q$Zambia$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 4, 4, 5,
  $q$Payroll is a breeze now$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.$q$,
  NULL, NULL, $q$2026-04-05$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Sipho van der Merwe$q$, $q$HR Manager$q$, $q$Sable Trading$q$,
  $q$Staffing and Recruiting$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 3, 3, 4, 4,
  $q$Good system, does what it says$q$, $q$Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.$q$, $q$The compliance handling is the strong point. SARS submissions and statutory stuff are taken care of so I sleep easier.$q$, $q$Support response times are hit and miss. Sometimes quick, sometimes I wait a day or two.$q$,
  NULL, NULL, $q$2025-04-18$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Braam Pretorius$q$, $q$HR Administrator$q$, $q$Aloe Logistics$q$,
  $q$Accounting$q$, $q$11-50$q$, $q$Zambia$q$,
  true, NULL, $q$6-12 months$q$,
  5, 4, NULL, 4, 5,
  $q$Love the self service portal$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$We run staff in a few African countries and it deals with the different tax rules for each one, which is not easy to find.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-04-04$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ashwin B.$q$, $q$Financial Controller$q$, $q$Drakensberg Pty Ltd$q$,
  $q$Financial Services$q$, $q$11-50$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 3, 4, 4, NULL,
  $q$Good for medium sized teams$q$, $q$It covers payroll and basic HR in one place which suits us. A few features feel like they need polishing.$q$, $q$Reporting is fairly deep once you find your way around it.$q$, $q$Support response times are hit and miss. Sometimes quick, sometimes I wait a day or two.$q$,
  NULL, NULL, $q$2025-02-13$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Elandri Naidoo$q$, $q$Financial Manager$q$, NULL,
  $q$Information Technology and Services$q$, $q$501-1000$q$, $q$Botswana$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, NULL, 4, 5,
  $q$Reliable every single month$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$I wish a few of the report layouts were easier to customise without asking support.$q$,
  NULL, NULL, $q$2024-09-16$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Unathi S.$q$, $q$Financial Controller$q$, $q$Cape Holdings$q$,
  $q$Non-Profit Organization Management$q$, $q$501-1000$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 4, 5, 5, 5,
  $q$Glad we switched$q$, $q$Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-03-25$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ruan R.$q$, $q$HR Business Partner$q$, $q$Bluewater Logistics$q$,
  $q$Financial Services$q$, $q$501-1000$q$, $q$Ghana$q$,
  false, NULL, $q$Less than 6 months$q$,
  1, NULL, 1, 1, NULL,
  $q$Save yourself the trouble$q$, $q$We lost hours every month working around problems that should never happen in a payroll system. Cannot recommend it.$q$, $q$The idea of everything in one place is good, the execution just was not there for us.$q$, $q$Support is slow to the point of being useless when you have a real problem.$q$,
  NULL, NULL, $q$2026-02-17$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Yolanda R.$q$, $q$Financial Manager$q$, $q$Umhlanga Services$q$,
  $q$Accounting$q$, $q$51-200$q$, $q$Ghana$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, NULL, 3, 3, 4,
  $q$Good system, does what it says$q$, $q$It covers payroll and basic HR in one place which suits us. A few features feel like they need polishing.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$Pricing creeps up and the add on modules add to it.$q$,
  NULL, NULL, $q$2024-12-20$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Themba L.$q$, $q$Founder$q$, $q$Vaal Trading$q$,
  $q$Farming$q$, $q$2-10$q$, $q$Zambia$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 4, 4, 4, 4,
  $q$Would recommend with small caveats$q$, $q$Overall a good experience. It does everything we need for payroll and the compliance side is handled well, I just found the setup a bit fiddly.$q$, $q$Self service for staff cuts down on admin. Leave, payslips and personal details are all on them now.$q$, $q$The learning curve is real. Give yourself a good few weeks before you feel comfortable.$q$,
  NULL, NULL, $q$2026-04-26$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Carla Khumalo$q$, $q$Practice Manager$q$, NULL,
  $q$Mining & Metals$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, NULL, 5, 5, 5,
  $q$Best decision we made for payroll$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$It handles our EMP201 and the SARS submissions without me having to think too hard. Tax tables update on their own when treasury changes them.$q$, $q$I wish a few of the report layouts were easier to customise without asking support.$q$,
  NULL, NULL, $q$2026-02-05$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Tumelo S.$q$, $q$Owner$q$, $q$Silverline Pty Ltd$q$,
  $q$Accounting$q$, $q$2-10$q$, $q$Nigeria$q$,
  false, NULL, $q$2+ years$q$,
  5, 4, 5, 4, 5,
  $q$Solid system for a growing team$q$, $q$Solid product. We are a manufacturing business with weekly and monthly staff and it copes with all of it fine.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2026-01-06$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Thandeka Khumalo$q$, $q$Operations Manager$q$, NULL,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$Nigeria$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, 4, 3, 5,
  $q$Strong on compliance$q$, $q$Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$Custom reports usually mean a support ticket, which is a bit frustrating.$q$,
  NULL, NULL, $q$2026-02-15$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Jason Mokoena$q$, $q$Financial Controller$q$, $q$Sable Logistics$q$,
  $q$Accounting$q$, $q$2-10$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 4, 5, 5, NULL,
  $q$Sorted our whole payroll$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-03-24$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Unathi J.$q$, $q$Financial Controller$q$, $q$Summit Holdings$q$,
  $q$Health, Wellness and Fitness$q$, $q$201-500$q$, $q$Botswana$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, NULL, 5, 5,
  $q$Love the self service portal$q$, $q$The tax updates come through automatically so I am not scrambling every time the budget changes. Big relief for a small HR team.$q$, $q$It handles our EMP201 and the SARS submissions without me having to think too hard. Tax tables update on their own when treasury changes them.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2026-03-09$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Keegan G.$q$, $q$Operations Manager$q$, $q$Silverline Trading$q$,
  $q$Farming$q$, $q$2-10$q$, $q$Kenya$q$,
  true, NULL, $q$1-2 years$q$,
  5, NULL, 5, NULL, 5,
  $q$Reliable every single month$q$, $q$Honestly one of the better payroll systems I have used in this country. Does the SARS side properly.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$I wish a few of the report layouts were easier to customise without asking support.$q$,
  NULL, NULL, $q$2025-02-15$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Dumisani H.$q$, $q$Director$q$, $q$Aloe Trading$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  1, 1, NULL, 1, 2,
  $q$Save yourself the trouble$q$, $q$Nothing but headaches since we onboarded. Queries sit open for weeks and nobody takes ownership. We are already looking to move.$q$, $q$It can run payroll, when it decides to cooperate.$q$, $q$We ran into glitches often enough that I stopped trusting it.$q$,
  NULL, NULL, $q$2024-05-13$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Nomsa Ndlovu$q$, $q$CFO$q$, NULL,
  $q$Automotive$q$, $q$51-200$q$, $q$Ghana$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 5,
  $q$Reliable every single month$q$, $q$Runs like clockwork. I do payroll for about 80 people and month end used to eat my whole week, now its a day at most.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2026-01-18$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Francois P.$q$, $q$CFO$q$, $q$Vaal Group$q$,
  $q$Non-Profit Organization Management$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  3, 4, 2, 3, 3,
  $q$Does the basics fine$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$Being able to log in from anywhere is genuinely handy.$q$, $q$The reporting takes real effort to configure the way you want.$q$,
  NULL, NULL, $q$2026-04-03$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Wesley Adams$q$, $q$Director$q$, $q$Riverside Trading$q$,
  $q$Logistics and Supply Chain$q$, $q$201-500$q$, $q$Zambia$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, 5, 4, 5,
  $q$Reliable payroll for us$q$, $q$Overall a good experience. It does everything we need for payroll and the compliance side is handled well, I just found the setup a bit fiddly.$q$, $q$Payslips email out automatically and look neat and professional.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2026-03-15$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Yolanda E.$q$, $q$Owner$q$, $q$Karoo Trading$q$,
  $q$Manufacturing$q$, $q$1$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 4, 4, 4,
  $q$Good system, does what it says$q$, $q$We have been on it about a year. Once you learn where everything is it runs smoothly, but the first month or two was a steep climb.$q$, $q$The compliance handling is the strong point. SARS submissions and statutory stuff are taken care of so I sleep easier.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2026-06-10$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Refilwe Naidoo$q$, $q$Financial Manager$q$, $q$Bluewater Group$q$,
  $q$Health, Wellness and Fitness$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, NULL, NULL, 5, 5,
  $q$Solid system for a growing team$q$, $q$Runs like clockwork. I do payroll for about 80 people and month end used to eat my whole week, now its a day at most.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2026-03-22$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Refilwe Jacobs$q$, $q$Accountant$q$, NULL,
  $q$Marketing and Advertising$q$, $q$11-50$q$, $q$Botswana$q$,
  true, NULL, $q$1-2 years$q$,
  2, NULL, 1, 2, 2,
  $q$Hard work to use$q$, $q$We have battled with this since we moved over. The system is capable but getting it to do what you want is a fight.$q$, $q$When it is set up correctly the actual pay run is accurate.$q$, $q$The pricing and the billing admin were a headache from the start.$q$,
  NULL, NULL, $q$2025-04-21$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Kabelo W.$q$, $q$Bookkeeper$q$, $q$Karoo Holdings$q$,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  3, 3, 3, 3, 4,
  $q$Average experience$q$, $q$It is okay. Not the worst, not the best. Ticks the boxes but nothing about it wows me.$q$, $q$It keeps payroll and leave in one place so I am not jumping between systems.$q$, $q$It feels built for bigger companies. As a smaller team a lot of it is overkill for us.$q$,
  NULL, NULL, $q$2026-01-13$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Zaid L.$q$, $q$Financial Manager$q$, $q$Northgate Foods$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 4, 3, 4,
  $q$Strong on compliance$q$, $q$Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.$q$, $q$Self service for staff cuts down on admin. Leave, payslips and personal details are all on them now.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-06-15$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Heather M.$q$, $q$Payroll Manager$q$, $q$Drakensberg Group$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 5, 5,
  $q$Staff love the app$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$Payslips look professional and go out by email automatically. Staff stopped coming to ask for copies.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2024-08-09$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Andrew E.$q$, $q$Managing Director$q$, $q$Karoo Services$q$,
  $q$Information Technology and Services$q$, $q$11-50$q$, $q$Ghana$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  3, 3, 3, 2, 4,
  $q$Fine once you fight through setup$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.$q$, $q$Getting hold of support can take a while and the answers vary depending who you get.$q$,
  NULL, NULL, $q$2026-02-12$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ruan S.$q$, $q$Director$q$, $q$Summit Trading$q$,
  $q$Staffing and Recruiting$q$, $q$1$q$, $q$Kenya$q$,
  true, NULL, $q$Less than 6 months$q$,
  2, 2, 2, NULL, 2,
  $q$Frustrating more often than not$q$, $q$Too heavy for a business our size. We spend more time managing the software than doing payroll.$q$, $q$The compliance side is thorough, I will give it that.$q$, $q$It is not friendly for someone without a payroll background at all.$q$,
  NULL, NULL, $q$2025-06-27$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Vanessa R.$q$, $q$Accountant$q$, $q$Karoo Foods$q$,
  $q$Accounting$q$, $q$501-1000$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  2, 2, 2, NULL, 2,
  $q$Hard work to use$q$, $q$Too heavy for a business our size. We spend more time managing the software than doing payroll.$q$, $q$Cloud access is useful, at least I can log in from anywhere.$q$, $q$Far too complex for what we need. Simple changes require support or a consultant.$q$,
  NULL, NULL, $q$2026-03-10$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Francois J.$q$, $q$Payroll Manager$q$, $q$Marula Trading$q$,
  $q$Consumer Services$q$, $q$1$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 4, 5, 5,
  $q$Payroll is a breeze now$q$, $q$Runs like clockwork. I do payroll for about 80 people and month end used to eat my whole week, now its a day at most.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$I wish a few of the report layouts were easier to customise without asking support.$q$,
  NULL, NULL, $q$2024-06-18$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Jared Mahlangu$q$, $q$Managing Director$q$, NULL,
  $q$Accounting$q$, $q$501-1000$q$, $q$Nigeria$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 4, 5,
  $q$Reliable every single month$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$Payslips look professional and go out by email automatically. Staff stopped coming to ask for copies.$q$, $q$None really.$q$,
  NULL, NULL, $q$2024-08-16$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Faith B.$q$, $q$HR and Payroll Officer$q$, $q$Summit Group$q$,
  $q$Non-Profit Organization Management$q$, $q$201-500$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  2, 2, 2, 2, 2,
  $q$Struggled with it$q$, $q$Honestly disappointed. Billing queries dragged on and the support experience soured us on the whole thing.$q$, $q$Cloud access is useful, at least I can log in from anywhere.$q$, $q$Support is slow and you often get passed around before anyone helps.$q$,
  NULL, NULL, $q$2024-08-02$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Nomsa van der Merwe$q$, $q$People Manager$q$, $q$Tygerberg Foods$q$,
  $q$Accounting$q$, $q$501-1000$q$, $q$Zambia$q$,
  false, NULL, $q$6-12 months$q$,
  4, NULL, NULL, NULL, 4,
  $q$Good for medium sized teams$q$, $q$Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.$q$, $q$The compliance handling is the strong point. SARS submissions and statutory stuff are taken care of so I sleep easier.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2024-02-18$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Fatima W.$q$, $q$Managing Director$q$, $q$Kalahari Pty Ltd$q$,
  $q$Wholesale$q$, $q$1$q$, $q$Kenya$q$,
  true, NULL, $q$1-2 years$q$,
  4, 4, 4, 3, 4,
  $q$Would recommend with small caveats$q$, $q$Happy with it on the whole. The self service portal saves time even if some staff needed help to get going.$q$, $q$Self service for staff cuts down on admin. Leave, payslips and personal details are all on them now.$q$, $q$Support response times are hit and miss. Sometimes quick, sometimes I wait a day or two.$q$,
  NULL, NULL, $q$2025-03-05$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Gugu Khumalo$q$, $q$CFO$q$, $q$Summit Group$q$,
  $q$Mining & Metals$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  2, 2, 3, NULL, 3,
  $q$Support let us down$q$, $q$It is powerful but so complicated that half the features go unused. When something goes wrong support takes forever to come back.$q$, $q$When it is set up correctly the actual pay run is accurate.$q$, $q$The pricing and the billing admin were a headache from the start.$q$,
  NULL, NULL, $q$2026-02-08$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Bianca S.$q$, $q$HR Business Partner$q$, $q$Cape Trading$q$,
  $q$Human Resources$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Love the self service portal$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$Payslips look professional and go out by email automatically. Staff stopped coming to ask for copies.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2026-05-12$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Refilwe G.$q$, $q$Director$q$, $q$Silverline Group$q$,
  $q$Education Management$q$, $q$1$q$, $q$Botswana$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 4, 4, 4, 5,
  $q$Happy overall with a few niggles$q$, $q$It covers payroll and basic HR in one place which suits us. A few features feel like they need polishing.$q$, $q$Payslips email out automatically and look neat and professional.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2025-12-20$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Pieter K.$q$, $q$HR Manager$q$, NULL,
  $q$Hospitality$q$, $q$51-200$q$, $q$Zambia$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  3, NULL, 3, 3, 3,
  $q$Gets there in the end$q$, $q$Fine overall. It is accurate and compliant which is the main thing, but the day to day feels clunky compared to what I expected.$q$, $q$Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.$q$, $q$The reporting takes real effort to configure the way you want.$q$,
  NULL, NULL, $q$2024-03-08$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Vusi E.$q$, $q$Financial Manager$q$, $q$Bluewater Logistics$q$,
  $q$Hospital & Health Care$q$, $q$51-200$q$, $q$Kenya$q$,
  true, NULL, $q$6-12 months$q$,
  2, 2, 2, 1, 2,
  $q$Struggled with it$q$, $q$We have battled with this since we moved over. The system is capable but getting it to do what you want is a fight.$q$, $q$Cloud access is useful, at least I can log in from anywhere.$q$, $q$It is not friendly for someone without a payroll background at all.$q$,
  NULL, NULL, $q$2026-04-19$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Palesa Pretorius$q$, $q$HR and Payroll Officer$q$, $q$Summit Pty Ltd$q$,
  $q$Non-Profit Organization Management$q$, $q$201-500$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  5, NULL, 5, 5, 5,
  $q$Takes the stress out of month end$q$, $q$Solid product. We are a manufacturing business with weekly and monthly staff and it copes with all of it fine.$q$, $q$The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2026-05-17$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Willem T.$q$, $q$Practice Manager$q$, $q$Anchor Foods$q$,
  $q$Consumer Services$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  4, NULL, 5, 4, 4,
  $q$Good for medium sized teams$q$, $q$Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.$q$, $q$Reporting is fairly deep once you find your way around it.$q$, NULL,
  NULL, NULL, $q$2025-05-09$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Quinton E.$q$, $q$HR Administrator$q$, $q$Karoo Group$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$501-1000$q$, $q$Botswana$q$,
  true, NULL, $q$6-12 months$q$,
  2, 1, 1, NULL, 3,
  $q$Expected more$q$, $q$Honestly disappointed. Billing queries dragged on and the support experience soured us on the whole thing.$q$, $q$When it is set up correctly the actual pay run is accurate.$q$, $q$Far too complex for what we need. Simple changes require support or a consultant.$q$,
  NULL, NULL, $q$2025-08-22$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Anika V.$q$, $q$Financial Manager$q$, $q$Baobab Foods$q$,
  $q$Farming$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, NULL, 5, 5,
  $q$Takes the stress out of month end$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$We run staff in a few African countries and it deals with the different tax rules for each one, which is not easy to find.$q$, $q$The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.$q$,
  NULL, NULL, $q$2026-02-14$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Katlego Naidoo$q$, $q$Managing Director$q$, NULL,
  $q$Automotive$q$, $q$11-50$q$, $q$Botswana$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 4, NULL,
  $q$Solid system for a growing team$q$, $q$We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.$q$, $q$Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.$q$, $q$I wish a few of the report layouts were easier to customise without asking support.$q$,
  NULL, NULL, $q$2026-01-20$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Johan H.$q$, $q$Bookkeeper$q$, NULL,
  $q$Construction$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  3, 2, 3, 2, 3,
  $q$Works but could be simpler$q$, $q$We use it because it works, not because we love it. Support is slow and the interface takes getting used to.$q$, $q$Being able to log in from anywhere is genuinely handy.$q$, $q$Getting hold of support can take a while and the answers vary depending who you get.$q$,
  NULL, NULL, $q$2026-01-22$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Musa K.$q$, $q$CFO$q$, NULL,
  $q$Legal Services$q$, $q$51-200$q$, $q$Nigeria$q$,
  true, NULL, $q$2+ years$q$,
  5, 4, 5, NULL, 5,
  $q$Does exactly what we need$q$, $q$The tax updates come through automatically so I am not scrambling every time the budget changes. Big relief for a small HR team.$q$, $q$It handles our EMP201 and the SARS submissions without me having to think too hard. Tax tables update on their own when treasury changes them.$q$, $q$The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.$q$,
  NULL, NULL, $q$2026-05-20$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Xolani V.$q$, $q$Practice Manager$q$, $q$Sandton Trading$q$,
  $q$Food & Beverages$q$, $q$1$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, NULL, 3, 4, 4,
  $q$Reliable payroll for us$q$, $q$Reliable and it has not let us down on a pay run yet. Support can be slow at times but they get there.$q$, $q$It scales with you. We added headcount and did not have to change anything about how we run payroll.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-03-26$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Charlene C.$q$, $q$Managing Director$q$, $q$Drakensberg Logistics$q$,
  $q$Security and Investigations$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, NULL, 5,
  $q$Love the self service portal$q$, $q$Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.$q$, $q$The employee self service is the big one for me. Staff log in, check payslips, apply for leave and update their own details, which frees up so much of my time.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2024-08-27$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Ashwin E.$q$, $q$Financial Controller$q$, $q$Kalahari Services$q$,
  $q$Health, Wellness and Fitness$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  2, 2, 2, 2, 2,
  $q$Support let us down$q$, $q$Too heavy for a business our size. We spend more time managing the software than doing payroll.$q$, $q$Cloud access is useful, at least I can log in from anywhere.$q$, $q$Far too complex for what we need. Simple changes require support or a consultant.$q$,
  NULL, NULL, $q$2026-01-14$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Elandri S.$q$, $q$Admin Manager$q$, $q$Summit Foods$q$,
  $q$Marketing and Advertising$q$, $q$11-50$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 4, 3, NULL,
  $q$Works well once you get used to it$q$, $q$Overall a good experience. It does everything we need for payroll and the compliance side is handled well, I just found the setup a bit fiddly.$q$, $q$Cloud access means I am not tied to one machine. That flexibility has been useful more than once.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2024-05-25$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Sarah B.$q$, $q$Admin Manager$q$, $q$Summit Pty Ltd$q$,
  $q$Automotive$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 5, 4, 4, 4,
  $q$Solid but has a learning curve$q$, $q$Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.$q$, $q$Reporting is fairly deep once you find your way around it.$q$, $q$Custom reports usually mean a support ticket, which is a bit frustrating.$q$,
  NULL, NULL, $q$2026-06-26$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Refilwe H.$q$, $q$Financial Manager$q$, $q$Riverside Pty Ltd$q$,
  $q$Accounting$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  2, 2, 3, 1, 3,
  $q$Hard work to use$q$, $q$Too heavy for a business our size. We spend more time managing the software than doing payroll.$q$, $q$The compliance side is thorough, I will give it that.$q$, $q$It is not friendly for someone without a payroll background at all.$q$,
  NULL, NULL, $q$2026-06-09$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Katlego van der Merwe$q$, $q$Managing Director$q$, NULL,
  $q$Mining & Metals$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, 3, 5, 3, 5,
  $q$Good for medium sized teams$q$, $q$We have been on it about a year. Once you learn where everything is it runs smoothly, but the first month or two was a steep climb.$q$, $q$Reporting is fairly deep once you find your way around it.$q$, $q$The mobile app is okay but it does less than the desktop version.$q$,
  NULL, NULL, $q$2026-04-08$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Zanele Z.$q$, $q$Office Manager$q$, $q$Sable Pty Ltd$q$,
  $q$Automotive$q$, $q$2-10$q$, $q$Kenya$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Really happy with it$q$, $q$Honestly one of the better payroll systems I have used in this country. Does the SARS side properly.$q$, $q$The employee self service is the big one for me. Staff log in, check payslips, apply for leave and update their own details, which frees up so much of my time.$q$, $q$Sometimes the system is a little slow first thing in the morning when everyone logs in.$q$,
  NULL, NULL, $q$2026-01-21$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Riaan K.$q$, $q$Accountant$q$, $q$Kalahari Trading$q$,
  $q$Marketing and Advertising$q$, $q$1$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 5, 3, NULL, 4,
  $q$Gets the job done$q$, $q$Reliable and it has not let us down on a pay run yet. Support can be slow at times but they get there.$q$, $q$Payslips email out automatically and look neat and professional.$q$, $q$The learning curve is real. Give yourself a good few weeks before you feel comfortable.$q$,
  NULL, NULL, $q$2024-10-05$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Andrew van der Merwe$q$, $q$HR Administrator$q$, $q$Drakensberg Trading$q$,
  $q$Manufacturing$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 3, 3, NULL,
  $q$Would recommend with small caveats$q$, $q$Reliable and it has not let us down on a pay run yet. Support can be slow at times but they get there.$q$, $q$It scales with you. We added headcount and did not have to change anything about how we run payroll.$q$, $q$The learning curve is real. Give yourself a good few weeks before you feel comfortable.$q$,
  NULL, NULL, $q$2026-05-22$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Stefan C.$q$, $q$Managing Director$q$, $q$Northgate Trading$q$,
  $q$Manufacturing$q$, $q$501-1000$q$, $q$Ghana$q$,
  false, NULL, $q$6-12 months$q$,
  2, 2, 2, 2, 3,
  $q$Struggled with it$q$, $q$It is powerful but so complicated that half the features go unused. When something goes wrong support takes forever to come back.$q$, $q$When it is set up correctly the actual pay run is accurate.$q$, $q$It is not friendly for someone without a payroll background at all.$q$,
  NULL, NULL, $q$2026-03-24$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Sarah R.$q$, $q$Financial Manager$q$, $q$Highveld Foods$q$,
  $q$Marketing and Advertising$q$, $q$501-1000$q$, $q$Namibia$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 4, NULL, 5,
  $q$Best decision we made for payroll$q$, $q$What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.$q$, $q$Leave management is built into the same system so I am not chasing spreadsheets around the office anymore.$q$, $q$None that come to mind really. We are very happy.$q$,
  NULL, NULL, $q$2025-08-01$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Sipho W.$q$, $q$Director$q$, NULL,
  $q$Non-Profit Organization Management$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  3, 2, NULL, 3, 3,
  $q$Works but could be simpler$q$, $q$Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.$q$, $q$Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.$q$, $q$The setup and general navigation are not intuitive. Simple tasks take more steps than they should.$q$,
  NULL, NULL, $q$2026-04-18$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Chantelle K.$q$, $q$HR and Payroll Officer$q$, NULL,
  $q$Staffing and Recruiting$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, NULL, 2, 3, 3,
  $q$Fine once you fight through setup$q$, $q$It does what it needs to for payroll but I would not call it easy. There is a fair bit of clicking around to get simple things done.$q$, $q$Once it is set up it is stable and runs each month without drama.$q$, $q$Getting hold of support can take a while and the answers vary depending who you get.$q$,
  NULL, NULL, $q$2026-02-24$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'payspace'),
  $q$Yolanda T.$q$, $q$HR and Payroll Officer$q$, $q$Drakensberg Foods$q$,
  $q$Manufacturing$q$, $q$2-10$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 4, NULL, 5,
  $q$Love the self service portal$q$, $q$What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.$q$, $q$Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.$q$, $q$Nothing major honestly. Maybe the mobile app could load a touch quicker.$q$,
  NULL, NULL, $q$2026-03-14$q$, 19, 'published'
);

COMMIT;
