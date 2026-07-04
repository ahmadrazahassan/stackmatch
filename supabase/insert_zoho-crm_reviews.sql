-- 96 reviews for zoho-crm
BEGIN;

DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = 'zoho-crm');

INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count, status) VALUES
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Stefan B.$q$, $q$Owner$q$, $q$Sandton Trading$q$,
  $q$Professional Training & Coaching$q$, $q$201-500$q$, $q$Nigeria$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$Customised it to fit us perfectly$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2025-04-05$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Yusuf Pretorius$q$, $q$Sales Manager$q$, NULL,
  $q$Information Technology and Services$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, NULL,
  $q$Does everything our sales team needs$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2026-05-07$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Gugu S.$q$, $q$Owner$q$, $q$Highveld Labs$q$,
  $q$Computer Software$q$, $q$201-500$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, NULL, 4, 4,
  $q$Keeps the whole team on the same page$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$There is a learning curve to get the customisation set up right.$q$,
  NULL, NULL, $q$2025-01-11$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Charlene M.$q$, $q$Head of Sales$q$, NULL,
  $q$Financial Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  3, 3, 3, NULL, 3,
  $q$Decent CRM, busy interface$q$, $q$Plenty of features for the money, though support was slow when we needed it.$q$, $q$The automation is handy when you get it going.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2026-02-09$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Gugu F.$q$, $q$Managing Director$q$, $q$Drakensberg Labs$q$,
  $q$Consumer Services$q$, $q$11-50$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, NULL, 5, 5, 5,
  $q$Brilliant value for a CRM$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2025-05-09$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Katlego van der Merwe$q$, $q$Sales Director$q$, $q$Riverside Holdings$q$,
  $q$Staffing and Recruiting$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  3, 3, 4, 3, 2,
  $q$Fine once you learn it$q$, $q$The price is great and it can do a lot, but the interface feels dated and it takes real effort to set up.$q$, $q$It is affordable and the feature list is long for the price.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2024-08-01$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Musa B.$q$, $q$Business Development Manager$q$, NULL,
  $q$Staffing and Recruiting$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  2, 2, NULL, 2, 2,
  $q$Clunky and hard to warm to$q$, $q$The price drew us in but the interface and the setup fought us the whole way. The team never really took to it.$q$, $q$It is inexpensive.$q$, $q$The interface is cluttered and dated.$q$,
  NULL, NULL, $q$2025-11-20$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Johan Nkosi$q$, $q$Sales Manager$q$, $q$Vaal Trading$q$,
  $q$Retail$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, NULL, NULL, 5, 4,
  $q$Great automation for the price$q$, $q$The automation has taken a lot of admin off my reps. Follow ups and reminders just happen now on their own.$q$, $q$The workflow automation handles the boring follow up tasks so the reps can focus on selling.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2026-05-03$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Yolanda G.$q$, $q$Marketing Manager$q$, $q$Cape Group$q$,
  $q$Computer Software$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  3, 3, NULL, 2, 3,
  $q$Decent CRM, busy interface$q$, $q$The price is great and it can do a lot, but the interface feels dated and it takes real effort to set up.$q$, $q$Once set up it keeps our deals and contacts in order.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2025-11-24$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Emily C.$q$, $q$Sales Director$q$, $q$Highveld Labs$q$,
  $q$Wholesale$q$, $q$1$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, NULL, NULL, 5,
  $q$Powerful once you set it up$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2026-04-16$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Ahmed van der Merwe$q$, $q$Sales Director$q$, $q$Drakensberg Digital$q$,
  $q$Professional Training & Coaching$q$, $q$1$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, 4, 5, 3, NULL,
  $q$Good for a small sales team$q$, $q$It fits our process well after some customising. Support has been up and down.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Some features are locked to the pricier tiers.$q$,
  NULL, NULL, $q$2025-09-13$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Refilwe J.$q$, $q$Marketing Manager$q$, $q$Silverline Holdings$q$,
  $q$Insurance$q$, $q$51-200$q$, $q$Namibia$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 4, NULL,
  $q$Does everything our sales team needs$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2025-02-09$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Sipho L.$q$, $q$Head of Sales$q$, $q$Anchor Pty Ltd$q$,
  $q$Computer Software$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Keeps the whole team on the same page$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The workflow automation handles the boring follow up tasks so the reps can focus on selling.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2024-01-21$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Ahmed Z.$q$, $q$Sales Manager$q$, $q$Baobab Labs$q$,
  $q$Computer Software$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 5, 5,
  $q$Does everything our sales team needs$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2025-07-04$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Lindiwe Z.$q$, $q$Head of Sales$q$, $q$Northgate Labs$q$,
  $q$Wholesale$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$Runs our whole sales process$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$None really.$q$,
  NULL, NULL, $q$2025-12-20$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Sarah P.$q$, $q$Founder$q$, $q$Karoo Labs$q$,
  $q$Information Technology and Services$q$, $q$201-500$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Great automation for the price$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2026-03-15$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Karabo A.$q$, $q$Marketing Manager$q$, $q$Anchor Labs$q$,
  $q$Professional Training & Coaching$q$, $q$1$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 4, 5,
  $q$Great automation for the price$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2026-01-14$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Unathi M.$q$, $q$Account Manager$q$, $q$Cape Trading$q$,
  $q$Wholesale$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 4, 5,
  $q$Really happy with the switch$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2024-06-12$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Yolanda G.$q$, $q$Owner$q$, $q$Vaal Holdings$q$,
  $q$Retail$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 5, NULL,
  $q$Our pipeline is finally organised$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The workflow automation handles the boring follow up tasks so the reps can focus on selling.$q$, $q$There is a learning curve to get the customisation set up right.$q$,
  NULL, NULL, $q$2026-05-15$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Tebogo E.$q$, $q$Sales Manager$q$, $q$Kalahari Pty Ltd$q$,
  $q$Professional Training & Coaching$q$, $q$11-50$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, NULL, 5, 4, 5,
  $q$Recommend for the price$q$, $q$Covers our pipeline and follow ups nicely. A few features sit on plans above ours.$q$, $q$It links up with the rest of the Zoho apps we use.$q$, $q$Some features are locked to the pricier tiers.$q$,
  NULL, NULL, $q$2026-01-25$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Fatima S.$q$, $q$Account Manager$q$, $q$Aloe Trading$q$,
  $q$Computer Software$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 4, 5, 4, 5,
  $q$Customised it to fit us perfectly$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2026-05-04$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Lerato Botha$q$, $q$Owner$q$, $q$Marula Trading$q$,
  $q$Insurance$q$, $q$1$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, NULL, 4, 4,
  $q$Powerful once configured$q$, $q$Really good value. It does far more than we expected for the price, you just have to put the setup time in.$q$, $q$You get a lot of CRM for very little money.$q$, $q$The interface is a bit cluttered and takes time to learn.$q$,
  NULL, NULL, $q$2026-04-22$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Emily E.$q$, $q$Sales Manager$q$, $q$Cape Services$q$,
  $q$Information Technology and Services$q$, $q$2-10$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$Brilliant value for a CRM$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2026-03-12$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Bianca B.$q$, $q$Owner$q$, $q$Marula Services$q$,
  $q$Information Technology and Services$q$, $q$1$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  2, 1, 3, NULL, NULL,
  $q$Cheap but frustrating$q$, $q$It can do a lot on paper, but between the clunky screens and slow support we struggled to get value out of it.$q$, $q$The feature set is broad for the money.$q$, $q$The interface is cluttered and dated.$q$,
  NULL, NULL, $q$2024-02-15$q$, 1, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Thandeka Dlamini$q$, $q$Sales Manager$q$, $q$Tygerberg Services$q$,
  $q$Information Technology and Services$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, NULL, 5, 4,
  $q$Does everything our sales team needs$q$, $q$The automation has taken a lot of admin off my reps. Follow ups and reminders just happen now on their own.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2025-02-19$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Owethu K.$q$, $q$Operations Manager$q$, $q$Tygerberg Trading$q$,
  $q$Business Supplies and Equipment$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, NULL, NULL, 5,
  $q$Keeps the whole team on the same page$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, NULL,
  NULL, NULL, $q$2025-05-08$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Vusi L.$q$, $q$Marketing Manager$q$, NULL,
  $q$Wholesale$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, 2, 4, 2, 3,
  $q$Good value but clunky$q$, $q$It works for tracking deals and it is cheap, I just find it fiddly to get around day to day.$q$, $q$Once set up it keeps our deals and contacts in order.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2025-01-10$q$, 28, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Owethu V.$q$, $q$Account Manager$q$, $q$Drakensberg Trading$q$,
  $q$Real Estate$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, 5, 4, NULL, 5,
  $q$Great automation for the price$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$The workflow automation handles the boring follow up tasks so the reps can focus on selling.$q$, $q$There is a learning curve to get the customisation set up right.$q$,
  NULL, NULL, $q$2026-04-02$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Carla W.$q$, $q$Head of Sales$q$, $q$Sandton Labs$q$,
  $q$Insurance$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  3, 4, NULL, NULL, 3,
  $q$Good value but clunky$q$, $q$Plenty of features for the money, though support was slow when we needed it.$q$, $q$It is affordable and the feature list is long for the price.$q$, $q$Setting it up the way you want takes time and effort.$q$,
  NULL, NULL, $q$2025-07-01$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Emily W.$q$, $q$Head of Sales$q$, $q$Kalahari Trading$q$,
  $q$Financial Services$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  3, 4, 3, 2, 4,
  $q$Decent CRM, busy interface$q$, $q$The price is great and it can do a lot, but the interface feels dated and it takes real effort to set up.$q$, $q$It is affordable and the feature list is long for the price.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2024-09-26$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Pieter B.$q$, $q$Operations Manager$q$, $q$Kalahari Trading$q$,
  $q$Wholesale$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 4, 5,
  $q$Really happy with the switch$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2025-07-11$q$, 3, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Keegan P.$q$, $q$Sales Manager$q$, $q$Drakensberg Pty Ltd$q$,
  $q$Computer Software$q$, $q$501-1000$q$, $q$Kenya$q$,
  true, NULL, $q$2+ years$q$,
  4, 5, 5, NULL, 5,
  $q$Does the job well$q$, $q$Really good value. It does far more than we expected for the price, you just have to put the setup time in.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Support quality varies depending who you get.$q$,
  NULL, NULL, $q$2026-02-20$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Refilwe S.$q$, $q$Owner$q$, NULL,
  $q$Wholesale$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Keeps the whole team on the same page$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$There is a learning curve to get the customisation set up right.$q$,
  NULL, NULL, $q$2024-02-08$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Zanele Botha$q$, $q$Business Development Manager$q$, $q$Vaal Digital$q$,
  $q$Financial Services$q$, $q$501-1000$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  3, 2, 4, 2, 3,
  $q$Mixed but affordable$q$, $q$Plenty of features for the money, though support was slow when we needed it.$q$, $q$Once set up it keeps our deals and contacts in order.$q$, $q$Support can be slow and inconsistent.$q$,
  NULL, NULL, $q$2026-03-27$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Ilse Botha$q$, $q$Head of Sales$q$, $q$Kalahari Pty Ltd$q$,
  $q$Financial Services$q$, $q$11-50$q$, $q$Namibia$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 4, 5,
  $q$Does everything our sales team needs$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2024-09-02$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Wesley Botha$q$, $q$Head of Sales$q$, $q$Bluewater Holdings$q$,
  $q$Marketing and Advertising$q$, $q$51-200$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  1, 1, 2, 1, 1,
  $q$Could not get the team to use it$q$, $q$We liked the price but never got past how awkward it felt to use day to day, and support did not help us turn it around.$q$, $q$It was cheap to try.$q$, $q$The interface was too clunky for the team to adopt.$q$,
  NULL, NULL, $q$2026-01-07$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Francois Adams$q$, $q$Account Manager$q$, $q$Northgate Group$q$,
  $q$Marketing and Advertising$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  3, 2, 3, 3, 4,
  $q$Mixed but affordable$q$, $q$It works for tracking deals and it is cheap, I just find it fiddly to get around day to day.$q$, $q$It is affordable and the feature list is long for the price.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2026-06-17$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Pieter N.$q$, $q$Business Development Manager$q$, $q$Tygerberg Pty Ltd$q$,
  $q$Marketing and Advertising$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 4, 5, 5, 4,
  $q$Customised it to fit us perfectly$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2026-05-14$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Riaan J.$q$, $q$CRM Administrator$q$, $q$Cape Trading$q$,
  $q$Marketing and Advertising$q$, $q$1$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Great automation for the price$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2026-01-21$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Themba M.$q$, $q$Sales Director$q$, $q$Marula Digital$q$,
  $q$Wholesale$q$, $q$1$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  4, 3, NULL, 4, 5,
  $q$Great value CRM with a learning curve$q$, $q$Really good value. It does far more than we expected for the price, you just have to put the setup time in.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Getting the customisation right takes patience.$q$,
  NULL, NULL, $q$2026-04-28$q$, 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Refilwe R.$q$, $q$Founder$q$, $q$Marula Labs$q$,
  $q$Insurance$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  3, 3, 2, 2, 3,
  $q$Mixed but affordable$q$, $q$It works for tracking deals and it is cheap, I just find it fiddly to get around day to day.$q$, $q$The automation is handy when you get it going.$q$, NULL,
  NULL, NULL, $q$2026-05-23$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Zaid J.$q$, $q$Account Manager$q$, NULL,
  $q$Marketing and Advertising$q$, $q$11-50$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  3, 3, 2, 3, 3,
  $q$Decent CRM, busy interface$q$, $q$The price is great and it can do a lot, but the interface feels dated and it takes real effort to set up.$q$, $q$The automation is handy when you get it going.$q$, $q$Support can be slow and inconsistent.$q$,
  NULL, NULL, $q$2026-02-13$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Vusi M.$q$, $q$Operations Manager$q$, $q$Acacia Holdings$q$,
  $q$Business Supplies and Equipment$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  4, 4, NULL, 4, 4,
  $q$Great value CRM with a learning curve$q$, $q$It fits our process well after some customising. Support has been up and down.$q$, $q$You get a lot of CRM for very little money.$q$, $q$Support quality varies depending who you get.$q$,
  NULL, NULL, $q$2026-02-27$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Kayla S.$q$, $q$Sales Director$q$, $q$Riverside Labs$q$,
  $q$Real Estate$q$, $q$201-500$q$, $q$Namibia$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  5, 5, 5, 5, NULL,
  $q$Powerful once you set it up$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$There is a learning curve to get the customisation set up right.$q$,
  NULL, NULL, $q$2026-01-04$q$, 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Chantelle F.$q$, $q$Head of Sales$q$, $q$Summit Services$q$,
  $q$Wholesale$q$, $q$2-10$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, NULL, 5, NULL,
  $q$Powerful once you set it up$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2026-03-04$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Devon Nkosi$q$, $q$Operations Manager$q$, $q$Bluewater Trading$q$,
  $q$Consumer Services$q$, $q$11-50$q$, $q$Nigeria$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 5, 5,
  $q$Brilliant value for a CRM$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-06-14$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Nomsa Z.$q$, $q$Marketing Manager$q$, NULL,
  $q$Computer Software$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$6-12 months$q$,
  4, NULL, 5, NULL, 4,
  $q$Great value CRM with a learning curve$q$, $q$It fits our process well after some customising. Support has been up and down.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Support quality varies depending who you get.$q$,
  NULL, NULL, $q$2025-07-20$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Sipho V.$q$, $q$Account Manager$q$, $q$Aloe Trading$q$,
  $q$Wholesale$q$, $q$501-1000$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  5, 5, 4, 5, 5,
  $q$Keeps the whole team on the same page$q$, $q$The automation has taken a lot of admin off my reps. Follow ups and reminders just happen now on their own.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2026-05-14$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Refilwe B.$q$, $q$Sales Manager$q$, $q$Marula Trading$q$,
  $q$Retail$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  3, NULL, 4, 2, 3,
  $q$Fine once you learn it$q$, $q$Plenty of features for the money, though support was slow when we needed it.$q$, $q$The automation is handy when you get it going.$q$, $q$Support can be slow and inconsistent.$q$,
  NULL, NULL, $q$2026-05-21$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Vusi Z.$q$, $q$Sales Director$q$, $q$Summit Pty Ltd$q$,
  $q$Business Supplies and Equipment$q$, $q$51-200$q$, $q$Kenya$q$,
  false, NULL, $q$2+ years$q$,
  4, NULL, 4, 4, 4,
  $q$Powerful once configured$q$, $q$It fits our process well after some customising. Support has been up and down.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Some features are locked to the pricier tiers.$q$,
  NULL, NULL, $q$2026-02-13$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Karabo A.$q$, $q$CRM Administrator$q$, $q$Drakensberg Group$q$,
  $q$Staffing and Recruiting$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 4, 5, 5, 5,
  $q$Great automation for the price$q$, $q$The automation has taken a lot of admin off my reps. Follow ups and reminders just happen now on their own.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2026-04-24$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Xolani van der Merwe$q$, $q$CRM Administrator$q$, $q$Sandton Group$q$,
  $q$Computer Software$q$, $q$501-1000$q$, $q$Nigeria$q$,
  false, NULL, $q$6-12 months$q$,
  5, 5, 5, NULL, 5,
  $q$So much for so little$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2026-03-19$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Chantelle J.$q$, $q$Sales Manager$q$, NULL,
  $q$Consumer Services$q$, $q$1$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 4, 5,
  $q$So much for so little$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2025-12-01$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Simone G.$q$, $q$Founder$q$, $q$Aloe Group$q$,
  $q$Financial Services$q$, $q$501-1000$q$, $q$Nigeria$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 4, NULL,
  $q$Great automation for the price$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$None really.$q$,
  NULL, NULL, $q$2024-08-23$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Pieter M.$q$, $q$CRM Administrator$q$, $q$Riverside Holdings$q$,
  $q$Consumer Services$q$, $q$51-200$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, NULL, 4, 3, 4,
  $q$Solid for the money$q$, $q$Been using it a year for our small team. The automation is the best part, the interface takes getting used to.$q$, $q$The customisation lets us match it to our sales steps.$q$, $q$Support quality varies depending who you get.$q$,
  NULL, NULL, $q$2026-03-09$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Palesa K.$q$, $q$Owner$q$, NULL,
  $q$Real Estate$q$, $q$201-500$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  5, 5, 5, 4, 5,
  $q$Powerful once you set it up$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2026-02-27$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Katlego C.$q$, $q$Owner$q$, $q$Tygerberg Holdings$q$,
  $q$Real Estate$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, 4, 5, 3, NULL,
  $q$Powerful once configured$q$, $q$It fits our process well after some customising. Support has been up and down.$q$, $q$It links up with the rest of the Zoho apps we use.$q$, $q$Support quality varies depending who you get.$q$,
  NULL, NULL, $q$2026-06-24$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Nomsa A.$q$, $q$Sales Director$q$, $q$Highveld Pty Ltd$q$,
  $q$Retail$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, NULL,
  $q$Runs our whole sales process$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2026-03-27$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Dumisani P.$q$, $q$CRM Administrator$q$, $q$Summit Trading$q$,
  $q$Consumer Services$q$, $q$201-500$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  2, 2, 3, 2, 3,
  $q$More effort than it was worth for us$q$, $q$The price drew us in but the interface and the setup fought us the whole way. The team never really took to it.$q$, $q$The feature set is broad for the money.$q$, $q$The interface is cluttered and dated.$q$,
  NULL, NULL, $q$2026-01-21$q$, 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Sizwe S.$q$, $q$Managing Director$q$, $q$Umhlanga Holdings$q$,
  $q$Retail$q$, $q$2-10$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  5, 4, 5, 5, 5,
  $q$Powerful once you set it up$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2026-01-27$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Kabelo M.$q$, $q$Business Development Manager$q$, $q$Drakensberg Trading$q$,
  $q$Retail$q$, $q$11-50$q$, $q$Kenya$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  4, 4, 4, 4, 5,
  $q$Recommend for the price$q$, $q$Been using it a year for our small team. The automation is the best part, the interface takes getting used to.$q$, $q$It links up with the rest of the Zoho apps we use.$q$, $q$The interface is a bit cluttered and takes time to learn.$q$,
  NULL, NULL, $q$2026-06-25$q$, 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Kayla M.$q$, $q$Sales Director$q$, $q$Riverside Trading$q$,
  $q$Staffing and Recruiting$q$, $q$11-50$q$, $q$Namibia$q$,
  true, NULL, $q$2+ years$q$,
  4, NULL, 5, 4, 4,
  $q$Good for a small sales team$q$, $q$Covers our pipeline and follow ups nicely. A few features sit on plans above ours.$q$, $q$You get a lot of CRM for very little money.$q$, NULL,
  NULL, NULL, $q$2026-04-04$q$, 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Stefan C.$q$, $q$Sales Director$q$, $q$Karoo Group$q$,
  $q$Information Technology and Services$q$, $q$201-500$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  3, 2, NULL, 3, 3,
  $q$Decent CRM, busy interface$q$, $q$Plenty of features for the money, though support was slow when we needed it.$q$, $q$Once set up it keeps our deals and contacts in order.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2024-01-06$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Bongani K.$q$, $q$Sales Manager$q$, $q$Drakensberg Holdings$q$,
  $q$Computer Software$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  4, NULL, 4, 4, 5,
  $q$Good for a small sales team$q$, $q$Covers our pipeline and follow ups nicely. A few features sit on plans above ours.$q$, $q$It links up with the rest of the Zoho apps we use.$q$, $q$Support quality varies depending who you get.$q$,
  NULL, NULL, $q$2026-02-11$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Charlene J.$q$, $q$Sales Manager$q$, $q$Silverline Labs$q$,
  $q$Retail$q$, $q$51-200$q$, $q$Nigeria$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  4, 4, 5, 4, 5,
  $q$Recommend for the price$q$, $q$Covers our pipeline and follow ups nicely. A few features sit on plans above ours.$q$, $q$You get a lot of CRM for very little money.$q$, $q$The interface is a bit cluttered and takes time to learn.$q$,
  NULL, NULL, $q$2026-05-14$q$, 32, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Bongani M.$q$, $q$Sales Director$q$, $q$Protea Labs$q$,
  $q$Computer Software$q$, $q$11-50$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  1, 1, 2, 1, 1,
  $q$Too fiddly for us$q$, $q$We liked the price but never got past how awkward it felt to use day to day, and support did not help us turn it around.$q$, $q$It was cheap to try.$q$, $q$Support was slow and did not resolve our issues.$q$,
  NULL, NULL, $q$2025-03-01$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Keegan B.$q$, $q$Marketing Manager$q$, $q$Vaal Digital$q$,
  $q$Real Estate$q$, $q$1$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  3, 4, 3, 2, 3,
  $q$Mixed but affordable$q$, $q$The price is great and it can do a lot, but the interface feels dated and it takes real effort to set up.$q$, $q$The automation is handy when you get it going.$q$, $q$Support can be slow and inconsistent.$q$,
  NULL, NULL, $q$2026-06-09$q$, 31, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Sizwe P.$q$, $q$Founder$q$, $q$Aloe Pty Ltd$q$,
  $q$Wholesale$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  5, 5, 5, 5, 5,
  $q$Powerful once you set it up$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$There is a learning curve to get the customisation set up right.$q$,
  NULL, NULL, $q$2026-02-26$q$, 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Yolanda N.$q$, $q$Business Development Manager$q$, NULL,
  $q$Insurance$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, 5, 4, 3, 5,
  $q$Recommend for the price$q$, $q$Really good value. It does far more than we expected for the price, you just have to put the setup time in.$q$, $q$The customisation lets us match it to our sales steps.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-02-13$q$, 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Marius H.$q$, $q$Head of Sales$q$, NULL,
  $q$Real Estate$q$, $q$1$q$, $q$Kenya$q$,
  false, NULL, $q$6-12 months$q$,
  5, 4, 5, 5, 5,
  $q$Great automation for the price$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$There is a learning curve to get the customisation set up right.$q$,
  NULL, NULL, $q$2025-04-16$q$, 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Naledi T.$q$, $q$Account Manager$q$, $q$Silverline Trading$q$,
  $q$Retail$q$, $q$11-50$q$, $q$Namibia$q$,
  true, NULL, $q$2+ years$q$,
  3, 3, NULL, 2, NULL,
  $q$Fine once you learn it$q$, $q$It works for tracking deals and it is cheap, I just find it fiddly to get around day to day.$q$, $q$It is affordable and the feature list is long for the price.$q$, $q$None really.$q$,
  NULL, NULL, $q$2026-02-18$q$, 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Vanessa Dlamini$q$, $q$Sales Manager$q$, $q$Highveld Group$q$,
  $q$Business Supplies and Equipment$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$Great automation for the price$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$A few of the nicer features only show up on the higher plans.$q$,
  NULL, NULL, $q$2024-07-05$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Lerato Adams$q$, $q$Managing Director$q$, $q$Sable Pty Ltd$q$,
  $q$Financial Services$q$, $q$501-1000$q$, $q$Kenya$q$,
  true, NULL, $q$1-2 years$q$,
  5, NULL, 5, 4, 5,
  $q$Keeps the whole team on the same page$q$, $q$The automation has taken a lot of admin off my reps. Follow ups and reminders just happen now on their own.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2026-02-12$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Keegan W.$q$, $q$Head of Sales$q$, $q$Marula Trading$q$,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  4, 4, 4, 4, 5,
  $q$Happy overall$q$, $q$Covers our pipeline and follow ups nicely. A few features sit on plans above ours.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Getting the customisation right takes patience.$q$,
  NULL, NULL, $q$2024-02-16$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Michelle H.$q$, $q$Owner$q$, $q$Sable Trading$q$,
  $q$Insurance$q$, $q$11-50$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, 5, 4, 4,
  $q$Good for a small sales team$q$, $q$Really good value. It does far more than we expected for the price, you just have to put the setup time in.$q$, $q$You get a lot of CRM for very little money.$q$, $q$Some features are locked to the pricier tiers.$q$,
  NULL, NULL, $q$2026-02-23$q$, 22, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Thandeka Mokoena$q$, $q$Founder$q$, $q$Karoo Labs$q$,
  $q$Information Technology and Services$q$, $q$51-200$q$, $q$Nigeria$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 5, 5, 5,
  $q$Our pipeline is finally organised$q$, $q$The automation has taken a lot of admin off my reps. Follow ups and reminders just happen now on their own.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2025-03-23$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Nomsa W.$q$, $q$Sales Manager$q$, $q$Silverline Group$q$,
  $q$Information Technology and Services$q$, $q$501-1000$q$, $q$South Africa$q$,
  true, NULL, $q$2+ years$q$,
  5, NULL, 5, NULL, NULL,
  $q$Our pipeline is finally organised$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2024-01-17$q$, 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Palesa L.$q$, $q$Managing Director$q$, $q$Umhlanga Labs$q$,
  $q$Business Supplies and Equipment$q$, $q$201-500$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 4, 5, 4, 5,
  $q$Powerful once you set it up$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2025-07-25$q$, 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Devon Z.$q$, $q$Sales Manager$q$, $q$Northgate Services$q$,
  $q$Computer Software$q$, $q$51-200$q$, $q$South Africa$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, NULL, NULL, 5,
  $q$Great automation for the price$q$, $q$We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2026-03-08$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Grant Adams$q$, $q$Operations Manager$q$, $q$Vaal Holdings$q$,
  $q$Staffing and Recruiting$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$1-2 years$q$,
  4, 4, 5, 3, 4,
  $q$Flexible and capable$q$, $q$Been using it a year for our small team. The automation is the best part, the interface takes getting used to.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Getting the customisation right takes patience.$q$,
  NULL, NULL, $q$2025-11-04$q$, 25, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Marius Adams$q$, $q$Owner$q$, $q$Northgate Pty Ltd$q$,
  $q$Computer Software$q$, $q$11-50$q$, $q$South Africa$q$,
  false, NULL, $q$2+ years$q$,
  5, 5, 5, 5, 5,
  $q$Runs our whole sales process$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The value is the standout. You get proper CRM features without the enterprise price tag.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2024-05-18$q$, 29, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Musa Z.$q$, $q$Founder$q$, $q$Northgate Group$q$,
  $q$Marketing and Advertising$q$, $q$1$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 5, 5, 4, 5,
  $q$So much for so little$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The workflow automation handles the boring follow up tasks so the reps can focus on selling.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2025-10-01$q$, 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Elandri F.$q$, $q$Managing Director$q$, $q$Vaal Digital$q$,
  $q$Financial Services$q$, $q$51-200$q$, $q$Namibia$q$,
  false, $q$Verified LinkedIn User$q$, $q$2+ years$q$,
  5, 5, 5, 5, 4,
  $q$Really happy with the switch$q$, $q$Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2025-05-05$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Tumelo W.$q$, $q$Marketing Manager$q$, $q$Marula Trading$q$,
  $q$Insurance$q$, $q$11-50$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, 4, 3, 5,
  $q$Good for a small sales team$q$, $q$Been using it a year for our small team. The automation is the best part, the interface takes getting used to.$q$, $q$The customisation lets us match it to our sales steps.$q$, NULL,
  NULL, NULL, $q$2026-01-24$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Gugu A.$q$, $q$Founder$q$, NULL,
  $q$Staffing and Recruiting$q$, $q$11-50$q$, $q$Namibia$q$,
  false, NULL, $q$1-2 years$q$,
  4, 4, 4, 4, 5,
  $q$Great value CRM with a learning curve$q$, $q$Covers our pipeline and follow ups nicely. A few features sit on plans above ours.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$The interface is a bit cluttered and takes time to learn.$q$,
  NULL, NULL, $q$2025-03-13$q$, 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Elandri E.$q$, $q$Operations Manager$q$, $q$Acacia Group$q$,
  $q$Professional Training & Coaching$q$, $q$501-1000$q$, $q$Nigeria$q$,
  true, NULL, $q$Less than 6 months$q$,
  5, 5, 5, NULL, 5,
  $q$Really happy with the switch$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2026-01-04$q$, 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Andrew S.$q$, $q$Operations Manager$q$, NULL,
  $q$Business Supplies and Equipment$q$, $q$51-200$q$, $q$South Africa$q$,
  false, NULL, $q$Less than 6 months$q$,
  4, 4, NULL, 3, 5,
  $q$Good for a small sales team$q$, $q$It fits our process well after some customising. Support has been up and down.$q$, $q$It links up with the rest of the Zoho apps we use.$q$, $q$Getting the customisation right takes patience.$q$,
  NULL, NULL, $q$2026-04-19$q$, 20, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Priya C.$q$, $q$CRM Administrator$q$, NULL,
  $q$Staffing and Recruiting$q$, $q$2-10$q$, $q$South Africa$q$,
  true, NULL, $q$6-12 months$q$,
  5, 4, NULL, NULL, 5,
  $q$Great automation for the price$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$The workflow automation handles the boring follow up tasks so the reps can focus on selling.$q$, $q$Support is a mixed bag, sometimes quick and sometimes slow to come back.$q$,
  NULL, NULL, $q$2026-04-17$q$, 2, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Vanessa B.$q$, $q$Owner$q$, $q$Aloe Group$q$,
  $q$Professional Training & Coaching$q$, $q$1$q$, $q$Kenya$q$,
  false, NULL, $q$1-2 years$q$,
  4, 4, 4, 5, 4,
  $q$Flexible and capable$q$, $q$It fits our process well after some customising. Support has been up and down.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Support quality varies depending who you get.$q$,
  NULL, NULL, $q$2024-06-03$q$, 30, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Pieter A.$q$, $q$Head of Sales$q$, NULL,
  $q$Business Supplies and Equipment$q$, $q$501-1000$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, NULL, 5, 5, 5,
  $q$Keeps the whole team on the same page$q$, $q$We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.$q$, $q$The dashboards give me a clear view of the pipeline at any moment.$q$, $q$It can be a lot of clicking to get where you want.$q$,
  NULL, NULL, $q$2025-01-20$q$, 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Fatima R.$q$, $q$Managing Director$q$, $q$Karoo Trading$q$,
  $q$Insurance$q$, $q$201-500$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  2, NULL, 3, NULL, 2,
  $q$Cheap but frustrating$q$, $q$It can do a lot on paper, but between the clunky screens and slow support we struggled to get value out of it.$q$, $q$It is inexpensive.$q$, $q$Support was slow when we hit problems.$q$,
  NULL, NULL, $q$2024-01-06$q$, 26, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Palesa Z.$q$, $q$Account Manager$q$, $q$Northgate Holdings$q$,
  $q$Professional Training & Coaching$q$, $q$1$q$, $q$Kenya$q$,
  false, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  3, 4, 4, NULL, 3,
  $q$Good value but clunky$q$, $q$The price is great and it can do a lot, but the interface feels dated and it takes real effort to set up.$q$, $q$It is affordable and the feature list is long for the price.$q$, $q$The interface is busy and not the easiest to learn.$q$,
  NULL, NULL, $q$2026-06-07$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Palesa C.$q$, $q$Operations Manager$q$, $q$Umhlanga Holdings$q$,
  $q$Retail$q$, $q$51-200$q$, $q$South Africa$q$,
  false, $q$Verified LinkedIn User$q$, $q$Less than 6 months$q$,
  4, NULL, 4, 4, 4,
  $q$Solid for the money$q$, $q$Covers our pipeline and follow ups nicely. A few features sit on plans above ours.$q$, $q$Automation saves the reps a lot of manual follow up.$q$, $q$Getting the customisation right takes patience.$q$,
  NULL, NULL, $q$2026-01-11$q$, 33, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Charlene Pretorius$q$, $q$CRM Administrator$q$, $q$Sandton Holdings$q$,
  $q$Financial Services$q$, $q$2-10$q$, $q$South Africa$q$,
  true, $q$Verified LinkedIn User$q$, $q$1-2 years$q$,
  5, NULL, 5, 4, 4,
  $q$Brilliant value for a CRM$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$It ties into the other Zoho tools we already use, so our data is not scattered.$q$, $q$The interface can feel busy and it took the team a little while to warm to it.$q$,
  NULL, NULL, $q$2025-03-04$q$, 34, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Tumelo P.$q$, $q$Account Manager$q$, $q$Umhlanga Digital$q$,
  $q$Consumer Services$q$, $q$501-1000$q$, $q$Nigeria$q$,
  true, $q$Verified LinkedIn User$q$, $q$6-12 months$q$,
  4, 4, 5, 4, 4,
  $q$Great value CRM with a learning curve$q$, $q$Been using it a year for our small team. The automation is the best part, the interface takes getting used to.$q$, $q$It links up with the rest of the Zoho apps we use.$q$, $q$The interface is a bit cluttered and takes time to learn.$q$,
  NULL, NULL, $q$2024-06-22$q$, 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'zoho-crm'),
  $q$Sarah D.$q$, $q$Owner$q$, $q$Marula Group$q$,
  $q$Staffing and Recruiting$q$, $q$501-1000$q$, $q$Kenya$q$,
  true, NULL, $q$1-2 years$q$,
  5, 5, 4, NULL, NULL,
  $q$So much for so little$q$, $q$It gave our small sales team the structure we were missing. Everyone can see where every deal stands.$q$, $q$It is very customisable. Fields, layouts and pipelines all bend to how we actually work.$q$, $q$Nothing so far.$q$,
  NULL, NULL, $q$2026-02-02$q$, 13, 'published'
);

COMMIT;
