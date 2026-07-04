-- 97 reviews for simplepay
BEGIN;

DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = 'simplepay');

INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count, status) VALUES
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Sarah C.$q$, $q$HR Business Partner$q$, $q$Sandton Logistics$q$,
  $q$Retail$q$, $q$1$q$, $q$Botswana$q$,
  true, NULL, $q$2+ years$q$,
  4, 5, NULL, 5, NULL,
  $q$Does the job nicely$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$The support is helpful and responds fast when I get stuck.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2026-01-08$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Dumisani E.$q$, $q$Accountant$q$, $q$Silverline Foods$q$,
  $q$Hospital & Health Care$q$, $q$51-200$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 5, NULL, 4, 3,
  $q$Recommend for small business$q$, $q$It covers our small payroll well. Not fancy but reliable and that suits me fine.$q$, $q$The support is helpful and responds fast when I get stuck.$q$, $q$A few more customisation options on payslips would be welcome.$q$,
  NULL, NULL, $q$2025-10-24$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Carla P.$q$, $q$Accountant$q$, NULL,
  $q$Health, Wellness and Fitness$q$, $q$2-10$q$, $q$Botswana$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Cannot fault it$q$, $q$Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2026-04-07$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Cindy K.$q$, $q$Payroll Manager$q$, NULL,
  $q$Financial Services$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, NULL, NULL, NULL,
  $q$Simple by name and by nature$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$The help articles are so clear that I usually sort things out myself in a minute.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2025-03-20$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Mpho B.$q$, $q$Founder$q$, $q$Aloe Pty Ltd$q$,
  $q$Automotive$q$, $q$2-10$q$, $q$Botswana$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 4, 5, NULL,
  $q$So easy to use$q$, $q$I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.$q$, $q$Leave tracking is built in and easy to follow. No more spreadsheets.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-06-04$q$, 0, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Cindy Pretorius$q$, $q$Director$q$, $q$Marula Group$q$,
  $q$Hospitality$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, NULL, 4,
  $q$Best value payroll in SA$q$, $q$Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.$q$, $q$The support team is fantastic. Quick, friendly and they actually solve the problem instead of stalling you.$q$, $q$Honestly I am struggling to think of one. It does what I need.$q$,
  NULL, NULL, $q$2024-04-19$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Dineo E.$q$, $q$Owner$q$, $q$Aloe Group$q$,
  $q$Marketing and Advertising$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 4,
  $q$Straightforward and affordable$q$, $q$Been using it for three years for my little agency. It has grown with us and still costs next to nothing.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2024-07-13$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Dumisani Naidoo$q$, $q$HR Manager$q$, $q$Cape Group$q$,
  $q$Construction$q$, $q$11-50$q$, $q$Botswana$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, NULL, 3, 4, 4,
  $q$Good for what it is$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$Automatic payslips and self service take a load off my plate.$q$, $q$It is deliberately simple so bigger companies might outgrow it.$q$,
  NULL, NULL, $q$2026-01-17$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Devon W.$q$, $q$People Manager$q$, $q$Acacia Trading$q$,
  $q$Farming$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, 4, 4, 5, 3,
  $q$Does the job nicely$q$, $q$Good product. The self service and automatic payslips save me time each month.$q$, $q$Automatic payslips and self service take a load off my plate.$q$, $q$None really.$q$,
  NULL, NULL, $q$2025-05-01$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Thandeka W.$q$, $q$People Manager$q$, $q$Drakensberg Holdings$q$,
  $q$Consumer Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 4, 5, 4,
  $q$Really good for small teams$q$, $q$It covers our small payroll well. Not fancy but reliable and that suits me fine.$q$, $q$Really good value for a small business budget.$q$, $q$The reporting is a bit basic if you want to slice the numbers finely.$q$,
  NULL, NULL, $q$2026-02-27$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Xolani W.$q$, $q$Admin Manager$q$, NULL,
  $q$Restaurants$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  3, NULL, 3, 3, 2,
  $q$Decent but limited$q$, $q$It works for basic payroll and it is cheap, but the moment you want something a bit more advanced you hit the ceiling.$q$, $q$Easy enough to pick up for a simple setup.$q$, $q$The feature set is quite limited compared to bigger systems.$q$,
  NULL, NULL, $q$2026-04-11$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Braam S.$q$, $q$Accountant$q$, $q$Aloe Trading$q$,
  $q$Automotive$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Perfect for small business$q$, $q$Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2026-04-24$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Kabelo Jacobs$q$, $q$Payroll Manager$q$, $q$Baobab Trading$q$,
  $q$Accounting$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  3, 3, 2, 3, 2,
  $q$Decent but limited$q$, $q$Fine for a very small business. We started outgrowing it once we passed a certain size.$q$, $q$Support is friendly when you reach out.$q$, $q$Once you need more advanced reporting or HR features it falls short.$q$,
  NULL, NULL, $q$2026-05-07$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Bianca R.$q$, $q$Founder$q$, NULL,
  $q$Logistics and Supply Chain$q$, $q$11-50$q$, $q$Botswana$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, NULL, 4, 4,
  $q$Good for what it is$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$Simple to learn and quick to run each month, which is exactly what I wanted.$q$, NULL,
  NULL, NULL, $q$2026-03-14$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Zaid F.$q$, $q$HR Manager$q$, $q$Protea Group$q$,
  $q$Facilities Services$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, NULL, 4, 5, 4,
  $q$Best value payroll in SA$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-06-17$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Zaid R.$q$, $q$HR Manager$q$, $q$Vaal Trading$q$,
  $q$Human Resources$q$, $q$201-500$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 4, NULL, 3,
  $q$Does the job nicely$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$Automatic payslips and self service take a load off my plate.$q$, NULL,
  NULL, NULL, $q$2026-04-05$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Andrew L.$q$, $q$Owner$q$, $q$Sandton Foods$q$,
  $q$Mining & Metals$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, 5, 4, 4,
  $q$Solid little payroll system$q$, $q$Does what a small business needs without fuss. A phone app would round it off nicely.$q$, $q$The support is helpful and responds fast when I get stuck.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2025-04-02$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Yolanda Pretorius$q$, $q$Financial Manager$q$, $q$Aloe Pty Ltd$q$,
  $q$Construction$q$, $q$2-10$q$, $q$Botswana$q$,
  true, NULL, $q$6-12 months$q$,
  2, 2, 2, 3, 2,
  $q$Outgrew it quickly$q$, $q$Cheap but you get what you pay for. We ended up moving to something with more depth.$q$, $q$Setup was quick, I will give it that.$q$, $q$Far too limited once your needs grow past the basics.$q$,
  NULL, NULL, $q$2024-08-14$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Francois F.$q$, $q$HR Business Partner$q$, $q$Cape Pty Ltd$q$,
  $q$Information Technology and Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, 4, NULL, NULL, 3,
  $q$Really good for small teams$q$, $q$Good product. The self service and automatic payslips save me time each month.$q$, $q$Automatic payslips and self service take a load off my plate.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2024-04-15$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Johan T.$q$, $q$Bookkeeper$q$, $q$Cape Trading$q$,
  $q$Construction$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  4, 5, 4, 5, 4,
  $q$Great value, minor wishes$q$, $q$It covers our small payroll well. Not fancy but reliable and that suits me fine.$q$, $q$Simple to learn and quick to run each month, which is exactly what I wanted.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2026-05-27$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Johan Mokoena$q$, $q$People Manager$q$, $q$Protea Trading$q$,
  $q$Construction$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Does everything we need$q$, $q$For the price it is unbeatable. Payslips email out on their own, the SARS side is handled and I barely have to think about it.$q$, $q$Leave tracking is built in and easy to follow. No more spreadsheets.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2025-11-12$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Tasneem E.$q$, $q$Accountant$q$, NULL,
  $q$Legal Services$q$, $q$2-10$q$, $q$Namibia$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Switched and never looked back$q$, $q$Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, NULL,
  NULL, NULL, $q$2025-11-22$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Nadia Z.$q$, $q$Founder$q$, $q$Baobab Group$q$,
  $q$Restaurants$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, 3, NULL, 4,
  $q$Easy and affordable$q$, $q$Very happy with it overall. Easy to use and cheap for a small business, I just wish the reporting was a bit richer.$q$, $q$Automatic payslips and self service take a load off my plate.$q$, $q$The interface is functional rather than modern.$q$,
  NULL, NULL, $q$2024-12-10$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Jared W.$q$, $q$Managing Director$q$, $q$Bluewater Group$q$,
  $q$Accounting$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  3, 3, 4, NULL, 2,
  $q$Middle of the road$q$, $q$It works for basic payroll and it is cheap, but the moment you want something a bit more advanced you hit the ceiling.$q$, $q$Easy enough to pick up for a simple setup.$q$, $q$We outgrew it as the team got bigger.$q$,
  NULL, NULL, $q$2024-05-06$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Ahmed A.$q$, $q$Practice Manager$q$, NULL,
  $q$Facilities Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, NULL, 5,
  $q$Payroll sorted in minutes$q$, $q$Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-04-16$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Dineo Z.$q$, $q$HR Business Partner$q$, $q$Baobab Holdings$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$1$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  3, 4, 3, NULL, 2,
  $q$Middle of the road$q$, $q$Fine for a very small business. We started outgrowing it once we passed a certain size.$q$, $q$It is cheap and it does the core payroll job without fuss.$q$, $q$The feature set is quite limited compared to bigger systems.$q$,
  NULL, NULL, $q$2026-01-14$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Michelle S.$q$, $q$Payroll Administrator$q$, $q$Cape Group$q$,
  $q$Consumer Services$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  1, 2, 1, 1, 1,
  $q$Left after a few months$q$, $q$It just did not have what our business needed and we spent more time working around it than using it. Moved on.$q$, $q$It is inexpensive, which was the only reason we tried it.$q$, $q$The features simply were not enough for a business like ours.$q$,
  NULL, NULL, $q$2026-01-24$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Refilwe V.$q$, $q$Director$q$, $q$Cape Group$q$,
  $q$Facilities Services$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 4,
  $q$Cannot fault it$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$Reporting is basic, but for my size business it is more than enough.$q$,
  NULL, NULL, $q$2026-05-04$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Tasneem S.$q$, $q$People Manager$q$, $q$Anchor Group$q$,
  $q$Information Technology and Services$q$, $q$1$q$, $q$Botswana$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, NULL,
  $q$Straightforward and affordable$q$, $q$For the price it is unbeatable. Payslips email out on their own, the SARS side is handled and I barely have to think about it.$q$, $q$Leave tracking is built in and easy to follow. No more spreadsheets.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2025-12-15$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Braam H.$q$, $q$Financial Controller$q$, $q$Tygerberg Group$q$,
  $q$Non-Profit Organization Management$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, NULL, 4,
  $q$Wish I found it sooner$q$, $q$Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.$q$, $q$Great value. For a small business the pricing is honestly a pleasant surprise.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-05-25$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Ilse V.$q$, $q$Practice Manager$q$, $q$Drakensberg Holdings$q$,
  $q$Marketing and Advertising$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, 4, 4, 5, 3,
  $q$Good for what it is$q$, $q$Good product. The self service and automatic payslips save me time each month.$q$, $q$The support is helpful and responds fast when I get stuck.$q$, NULL,
  NULL, NULL, $q$2026-05-07$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Wesley N.$q$, $q$CFO$q$, $q$Baobab Trading$q$,
  $q$Financial Services$q$, $q$1$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, NULL, 4, NULL, 5,
  $q$Straightforward and affordable$q$, $q$Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2026-06-26$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Kayla van der Merwe$q$, $q$CFO$q$, $q$Tygerberg Group$q$,
  $q$Manufacturing$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$So easy to use$q$, $q$Been using it for three years for my little agency. It has grown with us and still costs next to nothing.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2024-05-25$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Sipho B.$q$, $q$Payroll Manager$q$, $q$Baobab Group$q$,
  $q$Information Technology and Services$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 4,
  $q$Payroll sorted in minutes$q$, $q$Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2025-08-22$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Ahmed E.$q$, $q$Financial Manager$q$, $q$Riverside Pty Ltd$q$,
  $q$Automotive$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, NULL, 4,
  $q$Does everything we need$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$Great value. For a small business the pricing is honestly a pleasant surprise.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-02-12$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Chantelle C.$q$, $q$Admin Manager$q$, NULL,
  $q$Information Technology and Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 4, 5, 5,
  $q$Best value payroll in SA$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-01-09$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Lindiwe S.$q$, $q$Financial Manager$q$, $q$Protea Logistics$q$,
  $q$Logistics and Supply Chain$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, NULL, 4, 4, 4,
  $q$Good for what it is$q$, $q$It covers our small payroll well. Not fancy but reliable and that suits me fine.$q$, $q$Really good value for a small business budget.$q$, $q$The interface is functional rather than modern.$q$,
  NULL, NULL, $q$2026-04-10$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Emily Naidoo$q$, $q$CFO$q$, $q$Kalahari Group$q$,
  $q$Accounting$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  4, NULL, 5, 5, 4,
  $q$Good for what it is$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$Really good value for a small business budget.$q$, NULL,
  NULL, NULL, $q$2026-05-20$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Francois T.$q$, $q$Practice Manager$q$, $q$Cape Logistics$q$,
  $q$Health, Wellness and Fitness$q$, $q$11-50$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  3, 4, NULL, 4, 3,
  $q$Fine for the basics$q$, $q$It is okay. Simple and affordable but do not expect it to do much beyond the basics.$q$, $q$It is cheap and it does the core payroll job without fuss.$q$, $q$The feature set is quite limited compared to bigger systems.$q$,
  NULL, NULL, $q$2026-03-05$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Andrew Dlamini$q$, $q$Practice Manager$q$, $q$Silverline Holdings$q$,
  $q$Non-Profit Organization Management$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Best value payroll in SA$q$, $q$The support is what wins it for me. I email a question and get a proper answer back the same day, usually within an hour.$q$, $q$The support team is fantastic. Quick, friendly and they actually solve the problem instead of stalling you.$q$, $q$Honestly I am struggling to think of one. It does what I need.$q$,
  NULL, NULL, $q$2026-05-18$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Priya K.$q$, $q$Accountant$q$, $q$Aloe Logistics$q$,
  $q$Legal Services$q$, $q$1$q$, $q$Botswana$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 4,
  $q$Payroll sorted in minutes$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$The support team is fantastic. Quick, friendly and they actually solve the problem instead of stalling you.$q$, NULL,
  NULL, NULL, $q$2025-08-17$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Faith H.$q$, $q$HR Administrator$q$, NULL,
  $q$Automotive$q$, $q$2-10$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Cannot fault it$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, $q$The look is fairly plain, though I would rather it be plain and clear than pretty and confusing.$q$,
  NULL, NULL, $q$2025-07-03$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Quinton P.$q$, $q$Payroll Administrator$q$, $q$Aloe Group$q$,
  $q$Food & Beverages$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  3, 4, 3, 4, 3,
  $q$Decent but limited$q$, $q$It is okay. Simple and affordable but do not expect it to do much beyond the basics.$q$, $q$Easy enough to pick up for a simple setup.$q$, $q$The feature set is quite limited compared to bigger systems.$q$,
  NULL, NULL, $q$2026-04-05$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Xolani A.$q$, $q$Financial Controller$q$, $q$Northgate Holdings$q$,
  $q$Mining & Metals$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, NULL, 5,
  $q$Brilliant support$q$, $q$For the price it is unbeatable. Payslips email out on their own, the SARS side is handled and I barely have to think about it.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2026-06-09$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Ashwin B.$q$, $q$Admin Manager$q$, $q$Vaal Holdings$q$,
  $q$Construction$q$, $q$2-10$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, NULL, 5, 5,
  $q$Switched and never looked back$q$, $q$Been using it for three years for my little agency. It has grown with us and still costs next to nothing.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2026-06-04$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Zanele Mokoena$q$, $q$HR and Payroll Officer$q$, $q$Highveld Group$q$,
  $q$Consumer Services$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, 3, 5, 4, 4,
  $q$Happy customer$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$Automatic payslips and self service take a load off my plate.$q$, $q$The interface is functional rather than modern.$q$,
  NULL, NULL, $q$2026-04-05$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Marius W.$q$, $q$HR Manager$q$, $q$Baobab Group$q$,
  $q$Restaurants$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Straightforward and affordable$q$, $q$Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-06-27$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Chantelle J.$q$, $q$Director$q$, $q$Riverside Pty Ltd$q$,
  $q$Legal Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  3, 3, 3, 3, 2,
  $q$Fine for the basics$q$, $q$Fine for a very small business. We started outgrowing it once we passed a certain size.$q$, $q$It is cheap and it does the core payroll job without fuss.$q$, $q$We outgrew it as the team got bigger.$q$,
  NULL, NULL, $q$2026-06-08$q$, 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Chantelle C.$q$, $q$Practice Manager$q$, $q$Kalahari Group$q$,
  $q$Logistics and Supply Chain$q$, $q$201-500$q$, $q$Botswana$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$Perfect for small business$q$, $q$Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2024-09-02$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Andrew J.$q$, $q$Payroll Administrator$q$, $q$Protea Pty Ltd$q$,
  $q$Education Management$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, NULL, 4,
  $q$Exactly what a small business needs$q$, $q$For the price it is unbeatable. Payslips email out on their own, the SARS side is handled and I barely have to think about it.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$The look is fairly plain, though I would rather it be plain and clear than pretty and confusing.$q$,
  NULL, NULL, $q$2024-03-04$q$, 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Kabelo N.$q$, $q$HR Manager$q$, $q$Vaal Foods$q$,
  $q$Food & Beverages$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  3, 4, 4, 3, 3,
  $q$Middle of the road$q$, $q$Gets payroll out fine. The reporting and HR side are thin though.$q$, $q$Easy enough to pick up for a simple setup.$q$, $q$The feature set is quite limited compared to bigger systems.$q$,
  NULL, NULL, $q$2025-05-11$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Dumisani Nkosi$q$, $q$Financial Controller$q$, NULL,
  $q$Food & Beverages$q$, $q$11-50$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, NULL, NULL,
  $q$Exactly what a small business needs$q$, $q$I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.$q$, $q$The help articles are so clear that I usually sort things out myself in a minute.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2024-08-06$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Jared N.$q$, $q$Financial Controller$q$, $q$Summit Foods$q$,
  $q$Construction$q$, $q$2-10$q$, $q$Namibia$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, NULL, NULL,
  $q$Simple by name and by nature$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2025-12-12$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Wesley Mokoena$q$, $q$HR Business Partner$q$, NULL,
  $q$Security and Investigations$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 5, NULL, 4, 4,
  $q$Happy customer$q$, $q$It covers our small payroll well. Not fancy but reliable and that suits me fine.$q$, $q$Handles the SARS submissions without any drama.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-04-25$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Kabelo S.$q$, $q$Owner$q$, NULL,
  $q$Hospitality$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, NULL, 4, NULL,
  $q$Good for what it is$q$, $q$Very happy with it overall. Easy to use and cheap for a small business, I just wish the reporting was a bit richer.$q$, $q$Really good value for a small business budget.$q$, $q$A few more customisation options on payslips would be welcome.$q$,
  NULL, NULL, $q$2026-06-22$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Cindy D.$q$, $q$Director$q$, $q$Bluewater Logistics$q$,
  $q$Health, Wellness and Fitness$q$, $q$1$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, 4, 4, 3,
  $q$Happy customer$q$, $q$Good product. The self service and automatic payslips save me time each month.$q$, $q$Really good value for a small business budget.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2025-03-05$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Johan Mahlangu$q$, $q$Accountant$q$, $q$Karoo Logistics$q$,
  $q$Hospital & Health Care$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 4,
  $q$Brilliant support$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$The help articles are so clear that I usually sort things out myself in a minute.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-05-13$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Wesley C.$q$, $q$Managing Director$q$, NULL,
  $q$Consumer Services$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$Makes payroll painless$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2025-03-18$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Lindiwe V.$q$, $q$HR Administrator$q$, NULL,
  $q$Hospital & Health Care$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 4, 3, NULL, 4,
  $q$Great value, minor wishes$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$Really good value for a small business budget.$q$, $q$The interface is functional rather than modern.$q$,
  NULL, NULL, $q$2024-08-07$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Vusi A.$q$, $q$People Manager$q$, $q$Sable Holdings$q$,
  $q$Staffing and Recruiting$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 4,
  $q$Support goes above and beyond$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$The support team is fantastic. Quick, friendly and they actually solve the problem instead of stalling you.$q$, $q$Reporting is basic, but for my size business it is more than enough.$q$,
  NULL, NULL, $q$2024-03-06$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Fatima F.$q$, $q$Admin Manager$q$, NULL,
  $q$Hospitality$q$, $q$1$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 3, 4, NULL, 4,
  $q$Does the job nicely$q$, $q$Does what a small business needs without fuss. A phone app would round it off nicely.$q$, $q$Really good value for a small business budget.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2025-04-16$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Owethu Nkosi$q$, $q$Admin Manager$q$, $q$Baobab Trading$q$,
  $q$Mining & Metals$q$, $q$11-50$q$, $q$Botswana$q$,
  true, NULL, $q$Less than 6 months$q$,
  1, 1, 1, 2, 1,
  $q$Not the right fit for us$q$, $q$It just did not have what our business needed and we spent more time working around it than using it. Moved on.$q$, $q$It is inexpensive, which was the only reason we tried it.$q$, $q$We ended up moving to another provider within months.$q$,
  NULL, NULL, $q$2024-12-02$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Fatima Jacobs$q$, $q$Admin Manager$q$, $q$Umhlanga Trading$q$,
  $q$Information Technology and Services$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Cannot fault it$q$, $q$Been using it for three years for my little agency. It has grown with us and still costs next to nothing.$q$, $q$Great value. For a small business the pricing is honestly a pleasant surprise.$q$, $q$Reporting is basic, but for my size business it is more than enough.$q$,
  NULL, NULL, $q$2024-01-11$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Priya Botha$q$, $q$Operations Manager$q$, $q$Acacia Logistics$q$,
  $q$Financial Services$q$, $q$201-500$q$, $q$Botswana$q$,
  false, NULL, $q$1-2 years$q$,
  5, NULL, 5, 5, 4,
  $q$Straightforward and affordable$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$Leave tracking is built in and easy to follow. No more spreadsheets.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2024-11-18$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Megan C.$q$, $q$People Manager$q$, $q$Silverline Logistics$q$,
  $q$Automotive$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Brilliant support$q$, $q$I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-05-26$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Jared B.$q$, $q$Owner$q$, $q$Umhlanga Holdings$q$,
  $q$Human Resources$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, NULL, 4, NULL, 4,
  $q$Recommend for small business$q$, $q$Very happy with it overall. Easy to use and cheap for a small business, I just wish the reporting was a bit richer.$q$, $q$The support is helpful and responds fast when I get stuck.$q$, $q$The interface is functional rather than modern.$q$,
  NULL, NULL, $q$2026-02-19$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Naledi M.$q$, $q$Practice Manager$q$, $q$Marula Trading$q$,
  $q$Financial Services$q$, $q$201-500$q$, $q$Namibia$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 4, 5, 4,
  $q$Cannot fault it$q$, $q$I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2024-06-04$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Katlego R.$q$, $q$HR Manager$q$, $q$Sable Services$q$,
  $q$Food & Beverages$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, 4, NULL, 4, NULL,
  $q$Solid little payroll system$q$, $q$Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.$q$, $q$The support is helpful and responds fast when I get stuck.$q$, $q$A few more customisation options on payslips would be welcome.$q$,
  NULL, NULL, $q$2026-01-18$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Lerato Khumalo$q$, $q$Financial Manager$q$, $q$Baobab Group$q$,
  $q$Facilities Services$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  3, 3, 4, NULL, 3,
  $q$Middle of the road$q$, $q$It works for basic payroll and it is cheap, but the moment you want something a bit more advanced you hit the ceiling.$q$, $q$It is cheap and it does the core payroll job without fuss.$q$, $q$Once you need more advanced reporting or HR features it falls short.$q$,
  NULL, NULL, $q$2025-08-01$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Ashwin N.$q$, $q$Director$q$, $q$Vaal Logistics$q$,
  $q$Wholesale$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Support goes above and beyond$q$, $q$The support is what wins it for me. I email a question and get a proper answer back the same day, usually within an hour.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$Reporting is basic, but for my size business it is more than enough.$q$,
  NULL, NULL, $q$2026-01-05$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Vusi Mokoena$q$, $q$Payroll Manager$q$, $q$Acacia Group$q$,
  $q$Manufacturing$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, NULL, 5, 5,
  $q$Straightforward and affordable$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$The help articles are so clear that I usually sort things out myself in a minute.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2026-02-10$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Naledi Jacobs$q$, $q$Financial Controller$q$, $q$Protea Trading$q$,
  $q$Automotive$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Payroll sorted in minutes$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2025-12-14$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Nomsa W.$q$, $q$Payroll Manager$q$, $q$Sandton Services$q$,
  $q$Retail$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 5, 5, 3,
  $q$Does the job nicely$q$, $q$Good product. The self service and automatic payslips save me time each month.$q$, $q$Handles the SARS submissions without any drama.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2026-03-09$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Tumelo Pretorius$q$, $q$HR Administrator$q$, $q$Drakensberg Holdings$q$,
  $q$Information Technology and Services$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, NULL, 5, NULL, 5,
  $q$Wish I found it sooner$q$, $q$Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2026-06-02$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Thandeka E.$q$, $q$Financial Controller$q$, $q$Aloe Pty Ltd$q$,
  $q$Legal Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, NULL, 5, 4,
  $q$Does the job nicely$q$, $q$It covers our small payroll well. Not fancy but reliable and that suits me fine.$q$, $q$Handles the SARS submissions without any drama.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2026-06-08$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$David du Toit$q$, $q$HR Business Partner$q$, $q$Sable Group$q$,
  $q$Staffing and Recruiting$q$, $q$1$q$, $q$Botswana$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 4,
  $q$Payroll sorted in minutes$q$, $q$I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2024-09-22$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Nomsa A.$q$, $q$Operations Manager$q$, $q$Umhlanga Trading$q$,
  $q$Restaurants$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, NULL, 5, 5, 5,
  $q$Makes payroll painless$q$, $q$Been using it for three years for my little agency. It has grown with us and still costs next to nothing.$q$, $q$Leave tracking is built in and easy to follow. No more spreadsheets.$q$, $q$Honestly I am struggling to think of one. It does what I need.$q$,
  NULL, NULL, $q$2026-01-25$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Jared D.$q$, $q$HR and Payroll Officer$q$, $q$Baobab Trading$q$,
  $q$Financial Services$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Simple by name and by nature$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2024-04-26$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Mpho J.$q$, $q$Founder$q$, $q$Vaal Pty Ltd$q$,
  $q$Farming$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  4, 4, 4, 4, 4,
  $q$Good for what it is$q$, $q$Does what a small business needs without fuss. A phone app would round it off nicely.$q$, $q$Really good value for a small business budget.$q$, $q$No mobile app yet, which would be handy.$q$,
  NULL, NULL, $q$2024-04-09$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Owethu A.$q$, $q$HR Business Partner$q$, NULL,
  $q$Hospitality$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, NULL, 5,
  $q$Makes payroll painless$q$, $q$For the price it is unbeatable. Payslips email out on their own, the SARS side is handled and I barely have to think about it.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2026-04-20$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Sarah T.$q$, $q$Bookkeeper$q$, $q$Drakensberg Pty Ltd$q$,
  $q$Construction$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 4, 5, 4,
  $q$Wish I found it sooner$q$, $q$The support is what wins it for me. I email a question and get a proper answer back the same day, usually within an hour.$q$, $q$Leave tracking is built in and easy to follow. No more spreadsheets.$q$, $q$Honestly I am struggling to think of one. It does what I need.$q$,
  NULL, NULL, $q$2026-06-27$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Nadia A.$q$, $q$CFO$q$, NULL,
  $q$Transportation/Trucking/Railroad$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, NULL, NULL,
  $q$Simple by name and by nature$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$The support team is fantastic. Quick, friendly and they actually solve the problem instead of stalling you.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-05-04$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Chantelle K.$q$, $q$Payroll Manager$q$, NULL,
  $q$Accounting$q$, $q$1$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 5, 5, 4,
  $q$Perfect for small business$q$, $q$I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.$q$, $q$Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.$q$, $q$A phone app would be a nice extra one day.$q$,
  NULL, NULL, $q$2026-06-06$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Fatima Fourie$q$, $q$Financial Manager$q$, $q$Northgate Foods$q$,
  $q$Hospital & Health Care$q$, $q$501-1000$q$, $q$Namibia$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 4,
  $q$Does everything we need$q$, $q$Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, NULL,
  NULL, NULL, $q$2025-02-01$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Thandeka W.$q$, $q$Payroll Administrator$q$, NULL,
  $q$Legal Services$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Wish I found it sooner$q$, $q$The support is what wins it for me. I email a question and get a proper answer back the same day, usually within an hour.$q$, $q$The help articles are so clear that I usually sort things out myself in a minute.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2026-06-07$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Refilwe Mahlangu$q$, $q$HR Administrator$q$, $q$Sandton Pty Ltd$q$,
  $q$Construction$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, 4, 5, 5, 3,
  $q$Good for what it is$q$, $q$Does what a small business needs without fuss. A phone app would round it off nicely.$q$, $q$Automatic payslips and self service take a load off my plate.$q$, $q$The interface is functional rather than modern.$q$,
  NULL, NULL, $q$2026-01-27$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Nadia Naidoo$q$, $q$HR Manager$q$, $q$Summit Trading$q$,
  $q$Retail$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 4, 5, 5,
  $q$Perfect for small business$q$, $q$We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.$q$, $q$Setup was quick and I did not need anyone to hold my hand through it.$q$, $q$Reporting is basic, but for my size business it is more than enough.$q$,
  NULL, NULL, $q$2026-04-03$q$, 24, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Lindiwe A.$q$, $q$Operations Manager$q$, $q$Riverside Services$q$,
  $q$Logistics and Supply Chain$q$, $q$51-200$q$, $q$Botswana$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$Support goes above and beyond$q$, $q$Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.$q$, $q$The SARS and EMP201 side is handled properly so I am not stressing about compliance.$q$, $q$It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.$q$,
  NULL, NULL, $q$2026-02-04$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Ilse K.$q$, $q$HR Business Partner$q$, $q$Marula Logistics$q$,
  $q$Information Technology and Services$q$, $q$201-500$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$Straightforward and affordable$q$, $q$I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2026-05-26$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Owethu Z.$q$, $q$Bookkeeper$q$, $q$Kalahari Holdings$q$,
  $q$Health, Wellness and Fitness$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Makes payroll painless$q$, $q$Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.$q$, $q$Great value. For a small business the pricing is honestly a pleasant surprise.$q$, $q$Honestly I am struggling to think of one. It does what I need.$q$,
  NULL, NULL, $q$2026-01-23$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Vanessa R.$q$, $q$HR Manager$q$, NULL,
  $q$Wholesale$q$, $q$1$q$, $q$Botswana$q$,
  true, NULL, $q$2+ years$q$,
  4, NULL, 4, 5, 3,
  $q$Does the job nicely$q$, $q$Very happy with it overall. Easy to use and cheap for a small business, I just wish the reporting was a bit richer.$q$, $q$The support is helpful and responds fast when I get stuck.$q$, $q$It is deliberately simple so bigger companies might outgrow it.$q$,
  NULL, NULL, $q$2026-03-09$q$, 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Fatima T.$q$, $q$Founder$q$, $q$Aloe Trading$q$,
  $q$Transportation/Trucking/Railroad$q$, $q$2-10$q$, $q$Botswana$q$,
  true, NULL, $q$6-12 months$q$,
  3, 3, 3, 3, 2,
  $q$Fine for the basics$q$, $q$Gets payroll out fine. The reporting and HR side are thin though.$q$, $q$Support is friendly when you reach out.$q$, $q$Once you need more advanced reporting or HR features it falls short.$q$,
  NULL, NULL, $q$2024-09-26$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Gugu Z.$q$, $q$Financial Controller$q$, $q$Aloe Trading$q$,
  $q$Hospital & Health Care$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 4, 5, 5,
  $q$Makes payroll painless$q$, $q$The support is what wins it for me. I email a question and get a proper answer back the same day, usually within an hour.$q$, $q$It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.$q$, $q$The look is fairly plain, though I would rather it be plain and clear than pretty and confusing.$q$,
  NULL, NULL, $q$2026-02-04$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Priya D.$q$, $q$Office Manager$q$, $q$Sandton Logistics$q$,
  $q$Health, Wellness and Fitness$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, 4, 3, 4, 4,
  $q$Easy and affordable$q$, $q$It covers our small payroll well. Not fancy but reliable and that suits me fine.$q$, $q$Really good value for a small business budget.$q$, $q$The reporting is a bit basic if you want to slice the numbers finely.$q$,
  NULL, NULL, $q$2026-02-08$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Sarah Jacobs$q$, $q$Owner$q$, $q$Marula Services$q$,
  $q$Marketing and Advertising$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$So easy to use$q$, $q$Everything you need for SA payroll without paying for a load of features you will never touch.$q$, $q$The help articles are so clear that I usually sort things out myself in a minute.$q$, $q$Nothing really. Even the small niggles get fixed when I mention them.$q$,
  NULL, NULL, $q$2024-01-12$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Michelle E.$q$, $q$Practice Manager$q$, $q$Kalahari Services$q$,
  $q$Retail$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 5, NULL, 4, 4,
  $q$Does the job nicely$q$, $q$Very happy with it overall. Easy to use and cheap for a small business, I just wish the reporting was a bit richer.$q$, $q$Really good value for a small business budget.$q$, $q$The interface is functional rather than modern.$q$,
  NULL, NULL, $q$2026-01-27$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'simplepay'),
  $q$Aisha T.$q$, $q$CFO$q$, $q$Drakensberg Logistics$q$,
  $q$Legal Services$q$, $q$501-1000$q$, $q$Botswana$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, NULL, 5, NULL, 4,
  $q$Great value, minor wishes$q$, $q$Does what a small business needs without fuss. A phone app would round it off nicely.$q$, $q$Simple to learn and quick to run each month, which is exactly what I wanted.$q$, $q$The reporting is a bit basic if you want to slice the numbers finely.$q$,
  NULL, NULL, $q$2026-02-23$q$, 22, 'published'
);

COMMIT;
