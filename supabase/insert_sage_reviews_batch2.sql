-- ============================================================================
-- SQL Seed File for Sage Accounting Reviews — Batch 2 (Capterra pages 2, 3, 4, 8)
-- 99 additional reviews. APPENDS to existing reviews (no DELETE) — run after
-- insert_sage_reviews.sql. Dollar-quoted strings ($q$...$q$) avoid escaping issues.
-- Edgars D. (page 8) is skipped: already seeded in batch 1.
-- ============================================================================

BEGIN;

INSERT INTO reviews (
  software_id,
  reviewer_name,
  reviewer_job_title,
  reviewer_company,
  reviewer_industry,
  reviewer_company_size,
  reviewer_country,
  verified_linkedin,
  verified_badge,
  used_for_duration,
  overall_rating,
  ease_of_use,
  value_for_money,
  customer_service,
  functionality,
  review_title,
  summary,
  pros,
  cons,
  vendor_response,
  vendor_response_date,
  review_date,
  helpful_count,
  status
) VALUES

-- ===================== Page 2 (reviews 26-50) =====================
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Czarina C.', 'Senior Finance Officer', NULL, 'Non-Profit Organization Management', '11-50', 'South Africa', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Great tool for small not for profit organizations$q$,
  $q$Overall, our experience with Sage Accounting has been positive, particularly for managing day-to-day financial tasks in a straightforward and efficient way. The platform is easy to use, which made onboarding staff and volunteers relatively smooth, even for those without a strong accounting background. For a not-for-profit organization, it has been effective in handling core functions like tracking income and expenses, reconciling accounts, and maintaining accurate financial records. The automation features, such as bank feeds, have helped reduce manual data entry and improve efficiency. In summary, Sage Accounting has been a reliable and cost-effective solution for our current scale of operations, but organizations with more complex reporting or compliance needs may find it somewhat limiting over time.$q$,
  $q$We appreciated how user-friendly the system is — staff and volunteers with varying levels of accounting experience can navigate it with minimal training. Features like automated bank feeds and real-time financial visibility help reduce manual work and improve accuracy, which is important when resources are limited. Finally, the affordability and scalability make it a practical choice for a not-for-profit. It provides the core functionality needed to maintain transparency and accountability to stakeholders, while still being flexible enough to grow with the organization's needs.$q$,
  $q$What we liked least about Sage Accounting was its limited functionality for not-for-profit-specific needs. While it handles basic bookkeeping well, it lacks more advanced features such as fund accounting, detailed grant tracking, and restricted fund management, which are often essential for not-for-profit organizations. We also found that reporting can be somewhat inflexible. Customizing reports to meet the specific requirements of donors, boards, or regulatory bodies can be challenging without additional manual work or exporting data to other tools.$q$,
  NULL, NULL, '2026-05-04', 18, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Marnie M.', 'CPA', NULL, 'Accounting', '2-10', 'Canada', true, 'Verified LinkedIn User', '2+ years',
  5, 5, 5, 4, 5,
  $q$Great professional software$q$,
  $q$We've used this software for over 20 years and love it. It has all of the features we need to quickly get our work done and it's not glitchy like Quickbooks.$q$,
  $q$This is a professional level software at a very good price. My firm uses it for all our clients. It's easy to use if you know bookkeeping basics and has a lot of functionality.$q$,
  $q$Nothing. Sage is great. The only issue is that the desktop version doesn't have the ability to download transactions. We tried auto-entry but it doesn't meet our needs. We'd love to be able to import bank statements and have them auto-code the items. Auto-entry only matched with items that have already been entered.$q$,
  NULL, NULL, '2026-03-20', 21, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jill W.', 'President', NULL, 'Construction', '2-10', 'Canada', false, NULL, '2+ years',
  1, 1, 2, 1, 1,
  $q$Online Version is TERRIBLE. Desktop is GREAT$q$,
  $q$Sage Online I would never recommend it is horrible, unreliable, frustrating, the worse online accounting software I have ever used. Sage 50 desktop I highly recommend.$q$,
  $q$Access anywhere, can see if client opened the invoice or quotes. That is the only pro to this software.$q$,
  $q$Unreliable, if there is any internet issues or their server issues, you may have duplicated or dropped entries. Server is slow. Careful when entering just a slight touch of a key and you may post something unintentionally or incomplete. File capacity for attachment for invoicing is too small. You have to attach multiple files and the allotment for that is too small. I end up emailing customers their files. Waste of time and irritates my customers. There is also not a proper receipt to send to customers. Too many steps involved for everything, you cannot see more than one thing at a time. For example open 2 tabs for comparison. The desktop version is superior.$q$,
  NULL, NULL, '2026-01-23', 27, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Heike F.', 'President', NULL, 'Broadcast Media', '2-10', 'Canada', false, NULL, '1-2 years',
  3, 4, 2, 1, 3,
  $q$Accountant cannot access my online files$q$,
  $q$Overall completely dissatisfied with this Sage product with my accountant not being able to access my files as promised. I will revise my review if and when Sage offers a solution to my dilemma. Thinking of switching to Quickbooks online which means I lose another year of data.$q$,
  $q$I am using business cloud and I like many of the features. It is relative easy to learn and easy to use. I like that I can access my files from a PC and from a Mac.$q$,
  $q$I switched to business cloud on the recommendation of my accountant who uses Sage 50. I wanted my accountant to have direct access to my files, but the accountant firm was not able to migrate the data because they could not gain access to my account. I even gave them my personal sign in but they were unable to migrate the data. I lost a whole year worth of historical data and had to start a new file. At the end of this year my new accountant ran into the same problem — he was not able to access my accounts and Sage support was not able to solve the problem. He spent several hours with them in chat (phone support is not provided). The problem has not been solved to date. I am stuck paying the subscription for Sage cloud even though it does not do what I was promised. I find this very questionable and deceptive.$q$,
  NULL, NULL, '2026-01-21', 19, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Alain L.', 'IT', NULL, 'Computer Networking', '11-50', 'South Africa', true, 'Verified LinkedIn User', '2+ years',
  5, 5, 5, 3, 4,
  $q$Sage Accounting$q$,
  $q$Sage Accounting is a reliable and affordable solution for small to medium-sized businesses that need strong invoicing and financial reporting tools. Its intuitive interface, secure cloud-based platform, and clear visibility into cash flow make it a practical choice for everyday accounting tasks. While customer support and mobile performance could be improved, and customization options are somewhat limited compared to premium competitors, Sage delivers solid value for money. For organizations seeking a balance of functionality, security, and cost-effectiveness, Sage Accounting remains a dependable option.$q$,
  $q$What I appreciated most about Sage Accounting is its ease of use combined with powerful invoicing and reporting features. The platform makes it simple to create and send professional invoices, track when clients view them, and manage payments efficiently. On top of that, the financial reporting tools are robust, giving clear visibility into cash flow, profit and loss, and tax summaries without requiring advanced accounting knowledge. I also liked the security and role-based access controls, which gave me confidence that sensitive financial data was protected. Overall, Sage strikes a good balance between affordability, functionality, and reliability, making it a strong choice for small and medium-sized businesses.$q$,
  $q$The main drawbacks I experienced with Sage Accounting were related to customer support and mobile performance. While the platform itself is reliable, support can be inconsistent — sometimes quick and helpful, but other times slow to resolve more complex issues. The mobile app is noticeably less powerful than the desktop version, with slower load times and limited functionality for reporting and invoicing. Another limitation is that customization options for financial reports are not as advanced as those offered by competitors like QuickBooks or Xero, which may frustrate businesses needing highly tailored insights. Finally, while the pricing is fair for small and medium businesses, larger organizations may find the feature set too limited compared to full ERP solutions.$q$,
  NULL, NULL, '2025-12-08', 16, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Mark H.', 'CEO', NULL, 'Retail', '2-10', 'South Africa', false, NULL, '6-12 months',
  3, 3, 3, 3, 2,
  $q$Okay. Could be more Mobile Friendly.$q$,
  $q$Good for simple task. I am always on the move so I do 90% of my work on my phone. I hate how limited the app is and I have to sign onto my computer.$q$,
  $q$Good for simple tasks and basic accounting on the go.$q$,
  $q$The mobile app is very limited — most of the work still requires signing in on a computer.$q$,
  NULL, NULL, '2026-01-17', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Renaud L.', 'Président', NULL, 'Broadcast Media', '2-10', 'Canada', false, NULL, '1-2 years',
  2, 1, 2, 1, 2,
  $q$Not very happy$q$,
  $q$Slow to operate, not user-friendly at all... no possibilities to talk to a human when we need it. And the chat is not helpful because most of times, people on the other side are far away, doesn't understand the problem we have and have a very basic knowledge about the product. It seems that they even don't talk the same language than us. It appears that it's a machine that translate. And it doesn't translate well.$q$,
  $q$There is nothing I like in the only affordable version. Don't forget this: if we use the basic platform it is because we are not professionals. We run small businesses and we do not have the luxury to waste time with a system that is not easy to use.$q$,
  $q$Unfortunately, we need an accounting system but I'd rather use any other than yours. The only thing that retains me is the time needed to migrate over another platform. But be sure I will do as soon as I can if you don't review the whole thing to work better and be more user-friendly.$q$,
  NULL, NULL, '2025-12-02', 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Mohammed F.', 'Accounting Manager', NULL, 'Education Management', '51-200', 'South Africa', true, 'Verified LinkedIn User', '2+ years',
  5, 5, 5, 3, 5,
  $q$A Trustworthy Accounting Tool that saves time and reduces stress$q$,
  $q$Using Sage Accounting, my overall experience has been positive. Invoice processing, bank reconciliation and generating financial statement has proven to be a reliable accounting software.$q$,
  $q$Using sage small business cloud accounting I can confidently say it has given a completely different way we manage our accounts and finances. First of all, it is well organized and with minimal training you can use it. The financial reports are clear — generating Profit and Loss Account, Balance Sheet, Trial balance and Cash Flow statement is just a few clicks. It is also time saving as you can reconcile automated bank transactions. You can generate recurring invoices. It is highly recommended for small to medium sized business.$q$,
  $q$I know sage accounting software is user friendly but few areas need improvement. For example, customer support is not always easy for online or cloud accounting compared with desktop sage accounting. This is not helpful when you need a quick answer.$q$,
  NULL, NULL, '2026-04-21', 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Melinda M.', 'Senior Manager', NULL, 'Accounting', '11-50', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 4, 3,
  $q$Desktop great, Online a work in progress$q$,
  $q$Overall I prefer the desktop for its reliability, but I have high hopes the online version will only continue to improve as that is the direction I think the industry is headed.$q$,
  $q$I have found Sage Desktop to be a consistent product. I have been using it for over 15 years and I find it is extremely reliable and rarely experiences bugs. As someone who is incredibly busy I value this immensely.$q$,
  $q$As a hybrid worker when I finish work on my office PC and don't let it sync completely before opening the file on my home laptop, I have experienced sync issues and data corruption. I see the potential, but I think there is still much work to be done on the cloud side of Sage.$q$,
  NULL, NULL, '2026-04-27', 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Angèle M.', 'Consultante PME', NULL, 'Management Consulting', '1', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 3, 3,
  $q$Consultante PME$q$,
  $q$C'est certainement la solution la mieux adaptée lorsque j'ai besoin que mes clients qui s'y connaissent moins en comptabilité puissent faire les inscriptions de base et avoir un portrait rapide que je peux ensuite réguler et concilier. C'est une économie pour eux de faire une partie du travail eux-même et ça maximise mon temps.$q$,
  $q$Accès en ligne et partagé et contrôle des accès aux différents intervenants. Possibilité d'inscrire les transactions récurrentes.$q$,
  $q$Lenteur en ligne. Difficulté à accéder à plusieurs pages à la fois. Manque de flexibilité pour les factures clients.$q$,
  NULL, NULL, '2025-12-08', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Joshua M.', 'Vice President', NULL, 'Hospital & Health Care', '2-10', 'South Africa', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Pros and Cons with Sage Account$q$,
  $q$Overall I strongly believe that Sage online offers very good value. Being able to do my accounting anywhere is very useful. The price is a great selling point as well. I have not found any major issues worth leaving. My small medical office enjoys the benefits of using Sage.$q$,
  $q$Sage online follows the KISS principle. They don't bog down the product with a large amount of bloat that never gets used. I've used a few accounting programs, and Sage wins on price, usability, not needing a 5 hr course to know where to find basic items, and mobility — I can do my accounting anywhere that I have internet.$q$,
  $q$There are 2 things that Sage online does poorly compared to other products: 1. There is a slight lag from when you type an account number to when the system knows what you are looking for. The only way to avoid this is to have a desktop accounting software. 2. No tutorials. Quickbooks has a learning library with videos to watch and follow along, I have not found the same with Sage.$q$,
  NULL, NULL, '2025-12-11', 17, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Verified Reviewer', 'VP of Finance and Operations', NULL, 'Computer & Network Security', '11-50', 'South Africa', true, 'Verified LinkedIn User', '1-2 years',
  5, 4, 5, 3, 4,
  $q$Sage Accounting review$q$,
  $q$Sage Accounting is a good fit for small businesses that need a proper financial system but don't need a full-blown ERP. We use it across multiple small businesses, and it does the job well without being overly complex. It's reliable, practical, and easy to access remotely.$q$,
  $q$Cloud-based, so it can be accessed from anywhere, works well for core accounting needs without ERP-level complexity. Good visibility into cash flow and financial reporting. Suitable for multiple small businesses with similar requirements. Straightforward to use once set up.$q$,
  $q$Not as flexible or customizable as larger ERP systems. Some features feel basic if a business starts to grow or needs more complexity. Customer support can be inconsistent at times.$q$,
  NULL, NULL, '2026-03-13', 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Sophie S.', 'Admin Manager', NULL, 'Accounting', '11-50', 'South Africa', false, NULL, '2+ years',
  4, 4, 4, 3, 4,
  $q$Great product - would recommend!$q$,
  $q$My overall experience with Sage Accounting has been quite positive. The software is user-friendly and offers a range of features that streamline financial management. It has helped me keep track of my accounts efficiently, making it easier to generate reports and manage invoices. Overall, I find it to be a reliable tool for my accounting needs.$q$,
  $q$What I liked most about Sage Accounting is its comprehensive reporting capabilities. The software allows me to generate detailed financial reports with ease, providing valuable insights into my business's performance. I also appreciate the integration with other tools, which enhances its functionality and makes managing finances more efficient.$q$,
  $q$One aspect I liked least about Sage Accounting is that it can sometimes be slow to load, especially when handling large datasets. Additionally, I found the customer support response times to be longer than expected, which can be frustrating when urgent issues arise. These factors can hinder the overall user experience at times.$q$,
  NULL, NULL, '2026-04-21', 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Dan S.', 'President', NULL, 'Commercial Real Estate', '2-10', 'Canada', false, NULL, '2+ years',
  2, 3, 2, 1, 2,
  $q$Too Limited$q$,
  $q$Frustrated that START purposely lacks some key features to entice upgrading. Next upgrade is Sage STANDARD which is too large of a jump in features and cost for very small businesses. START support is terrible.$q$,
  $q$Sage START is a simple and affordable online accounting solution for very small business. Sage products are widely used so book keepers and accountants may have some familiarity with START.$q$,
  $q$Sage START lacks some key features such as ability to do credit invoices, very limited and poor support and only one user login. A 2nd 2FA notification option would at least allow two people (owners, spouses, book keeper) to log in as the same user.$q$,
  NULL, NULL, '2026-03-13', 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Donnie K.', 'Owner', NULL, 'Accounting', '1', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 3, 3,
  $q$Great for bank entry heavy business$q$,
  $q$Overall it is good for small businesses, though I would be considering a more functional program in the future when I grow.$q$,
  $q$The best part of Sage is the banking connections. Although they sometimes disconnect, the ability to load in transactions drastically reduces the administrative load of bookkeeping.$q$,
  $q$No YE closing date so you have to remove prior year P&L to allow for COA to be accurate in current year. There should be a close period to allow for YOY performance comparison. Auto-reversing accruals also not an option for JE.$q$,
  NULL, NULL, '2026-04-21', 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Laurel P.', 'Bookkeeper', NULL, 'Food & Beverages', '11-50', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 4, 4,
  $q$My Experience$q$,
  $q$Sage Accounting has made it easy for me to give my employer the information they need quickly and accurately. My work matters a lot to me, and using a program that boosts my abilities is something I truly value.$q$,
  $q$I really like the consistency of Sage Accounting. Frequent updates always make Sage better, and more simple to use. Payroll through Sage is also very easy, and filing T4's at the end of the year is very efficient. Sage makes the hard work seem easy!$q$,
  $q$It would be very helpful to be able to pull up payment transactions through a paid invoice rather than having to jump from one screen to another.$q$,
  NULL, NULL, '2025-12-02', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Luc N.', 'Administration', NULL, 'Broadcast Media', '2-10', 'Canada', false, NULL, 'Free trial',
  1, 2, 1, 1, 1,
  $q$Difficulté à rejoindre le support technique pour me faire aider. Trop long donc vire de bord.$q$,
  $q$J'ai débuté par essayer de prendre contact avec SAGE mais j'ai dû chercher toute sorte de moyen d'accessibilité pour me faire dépanner. C'est la lenteur avec laquelle vous n'avez pas été en mesure de me répondre qui a fait que j'ai dû canceller cette possibilité de faire affaire avec SAGE. Comme le processus a été beaucoup trop lent, que la communication directe par téléphone ne fonctionnait pas, j'ai dû prendre contact avec un autre fournisseur de service pour me faire aider. De plus, j'ai dû faire des paiements jusqu'à la fin novembre alors que je n'ai eu aucun service, très déçu.$q$,
  $q$Pour une petite PME comme la nôtre, tout allait dans le bon sens pour utiliser un programme qui m'a été recommandé par un de mes fournisseurs de services avec qui je fais affaire depuis de nombreuses années.$q$,
  $q$Lorsque j'ai tenté d'implanter le système, j'ai eu plein d'empêchements informatiques. Comme le temps pressait pour sortir la facturation, je ne pouvais me permettre d'attendre 2 semaines plus ou moins.$q$,
  NULL, NULL, '2025-12-15', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Alejandro R.', 'Finance Director', NULL, 'Human Resources', '51-200', 'South Africa', true, 'Verified LinkedIn User', '6-12 months',
  5, 4, 5, 4, 4,
  $q$Strong Fundamentals, but User Experience Needs Improvement$q$,
  $q$Overall, my experience with Sage Accounting has been positive. It is a reliable platform that covers essential accounting needs such as invoicing, expense tracking, and bank reconciliation, making it suitable for managing day-to-day financial operations efficiently. The system provides a good level of structure and control, which is particularly valuable for small to medium-sized businesses. Over time, I have found it to be stable and dependable, especially for maintaining organized financial records and generating standard reports.$q$,
  $q$Sage Accounting stands out for its user-friendly interface and solid core accounting features, making it easy to manage day-to-day financial operations efficiently. The platform offers reliable tools for invoicing, expense tracking, and bank reconciliation, which help streamline workflows and save time. Another strong advantage is its integration capabilities with other business tools, allowing for smoother financial management across systems. Additionally, Sage provides good reporting functionalities, enabling clear visibility into financial performance and supporting informed decision-making.$q$,
  $q$While Sage Accounting offers solid core features, there are some limitations that can affect the overall experience. The interface, although functional, can feel somewhat outdated compared to more modern competitors, and certain workflows are not as intuitive as they could be. Customization options are also limited, particularly when it comes to reporting and adapting the platform to more complex business needs. Additionally, integration with some third-party tools can require extra steps or may not be as seamless as expected.$q$,
  NULL, NULL, '2026-04-27', 14, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Julia K.', 'Commis comptable', NULL, 'Real Estate', '2-10', 'Canada', false, NULL, '1-2 years',
  4, 5, 4, 3, 4,
  $q$Logiciel comptable simple et efficace pour les petites entreprises$q$,
  $q$Mon expérience avec Sage Accounting a été positive dans l'ensemble. Le logiciel facilite la gestion quotidienne de la comptabilité et permet de suivre les finances efficacement. Il convient particulièrement bien aux petites entreprises et aux travailleurs autonomes qui recherchent une solution simple et fiable sans complexité excessive.$q$,
  $q$Interface simple et facile à utiliser, même pour les personnes ayant peu d'expérience en comptabilité. La gestion des factures et des dépenses est rapide, et les rapports financiers sont clairs. J'ai aussi apprécié l'accès en ligne qui permet de travailler à distance et la synchronisation bancaire qui fait gagner du temps.$q$,
  $q$Certaines fonctionnalités avancées sont limitées comparativement à des solutions plus complètes. Le service client peut parfois être lent à répondre et quelques options de personnalisation des rapports pourraient être améliorées.$q$,
  NULL, NULL, '2026-05-08', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Leslie H.', 'Owner', NULL, 'Retail', '2-10', 'Canada', false, NULL, '1-2 years',
  1, 1, 1, 1, 1,
  $q$Don't walk, run (away)$q$,
  $q$Run, run far away from this awful software. I'm in the process of switching to Quickbooks. I wouldn't use Sage again if it was free.$q$,
  $q$Literally nothing. Sage 50 was at least usable, the cloud accounting is absolutely terrible. Not intuitive at all.$q$,
  $q$Linked bank accounts only update after several days (one hasn't updated for 21 days at the moment). They un-sync constantly. We have 2 separate companies, only one uses Sage Accounting, but the other company uses Sage Payroll (only payroll). Somehow an employee of the company that uses payroll-only software suddenly had their name as the main person in the accounting software even though they don't work for this company. Bank rules don't work — I've watched every video, and tried a dozen ways (including having someone online try and help). They simply don't work. The Payroll software is just as bad.$q$,
  NULL, NULL, '2026-05-01', 23, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Gaetan G.', 'Président', NULL, 'Electrical/Electronic Manufacturing', '2-10', 'Canada', false, NULL, '1-2 years',
  3, 2, 2, 1, 2,
  $q$Unsatisfied — stuck with a mobile app that should help me to do things faster$q$,
  $q$I'm not impressed by the way it progresses year after year — nothing has changed. For the cost it's expensive. Maybe with the desktop app it's better, but me on the road I'm stuck with all these things that I can't do on my pad or my phone.$q$,
  $q$The mobility it is supposed to give me, but nothing apart from making a bill in place. When you have a problem or a question there's nobody to answer you — you have to chat or check the FAQ.$q$,
  $q$When I'm billing, if I touch the screen outside I lose all my work. The app should register the entries that have been done. It happens too often that I lose like 2 hours of work. Now I register each box to be sure to lose nothing and that makes the work longer, but it's better than losing everything. There are so many little things that could be easy to arrange but the app never changes — it's like a simple app that never progresses to facilitate the user.$q$,
  NULL, NULL, '2025-12-02', 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Amit N.', 'Treasurer', NULL, 'Non-Profit Organization Management', '11-50', 'South Africa', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Cloud Accounting is a HIT!!$q$,
  $q$Overall, very satisfying experience so far. We are using the same to manage the books of our charitable organization and also a few of our businesses and the flexibility of using this product made us replace the others with this one.$q$,
  $q$The cloud accounting functionality gives you the flexibility to work from anywhere and the option to integrate bank statements along with rules set up makes accounting very easy.$q$,
  $q$Certain times, the bank linking fails and you have to resort to manual import of statements. Also tracking journal entries needs to be simplified.$q$,
  NULL, NULL, '2025-12-02', 15, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Alexis B.', 'Sales Associate', NULL, 'Retail', '11-50', 'South Africa', false, NULL, '2+ years',
  4, 4, 4, 4, 3,
  $q$Great program for variety of businesses$q$,
  $q$It works well for what it is, adding products and customers are fairly easy and simple to learn. It is a great tool for running a small business.$q$,
  $q$You can email the invoices to customers instantly for requesting payment, or as a form of receipt. The invoice system is simple to understand and finding products is easy as well — so long as you know exactly what you are looking for.$q$,
  $q$Returns/refunds are confusing and writing stock off for store use is also a little difficult, as you need to open two tabs and search each item individually for their cost.$q$,
  NULL, NULL, '2026-05-05', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Annie C.', 'CEO', NULL, 'Alternative Medicine', '1', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 4, 5,
  $q$Possibility on the app$q$,
  $q$I love that and its overall easy to use but I would need more explanation overall for using the app more.$q$,
  $q$Everything at large — invoicing, financial reports, the attachment possibility for my clients in coaching.$q$,
  $q$In French — rapprochement bancaire — because I didn't find information to do this action correctly.$q$,
  NULL, NULL, '2026-05-04', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Janice L.', 'Owner, Digital Content Creator', NULL, 'Internet', '1', 'Canada', false, NULL, '1-2 years',
  4, 3, 3, 3, 4,
  $q$Good for keeping track but pricey$q$,
  $q$Works fine and good but I find it very pricey for a small business. The price increased recently but I don't think any extra services or features were added.$q$,
  $q$I like the reports and how organized I feel when I take the time to fill in my income and expenses regularly. I don't use it for invoicing yet, just small business bookkeeping.$q$,
  $q$You have to understand basic bookkeeping with ledgers and all (rather different from just having a spreadsheet of income and expenses). It's hard to know the categories for expenses — took a lot of googling because there's nowhere on the site with that info. I think it would be best to work with a bookkeeper or accountant to set up all the ledgers/categories so you best utilize the site from day one.$q$,
  NULL, NULL, '2026-01-26', 8, 'published'
),

-- ===================== Page 3 (reviews 51-75) =====================
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jane P.', 'Administrative Assistant Receptionist', NULL, 'Health, Wellness and Fitness', '11-50', 'South Africa', false, NULL, '6-12 months',
  3, 4, 3, 3, 3,
  $q$Sage and its quirks - positive and negative$q$,
  $q$Overall, I like the simplicity of the program. I have no problem recommending it due to my past experience.$q$,
  $q$Sage is a fairly simple program that I have used in multiple job settings. It is an easy program to use and I love the configuration for Sage Cloud.$q$,
  $q$Sage has a habit of constantly deleting clients. We have noticed this over many years and can't seem to find out why. I also find that it will randomly stop working. The Transaction Manager constantly stops working and slows things down.$q$,
  NULL, NULL, '2026-01-16', 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Liz B.', 'Accountant', NULL, 'Construction', '11-50', 'South Africa', false, NULL, '2+ years',
  4, 4, 5, 3, 4,
  $q$Sage for small business$q$,
  $q$Sage will do everything a small or medium company requires for payroll, invoicing, payables and reporting.$q$,
  $q$Relatively inexpensive for small business, easy to set up, like the ability to track jobs, and set up departments.$q$,
  $q$Support documentation on processes is sometimes lacking. Ability to inactivate jobs, vendors or customers is very time consuming. Would be nice if JV could be copied.$q$,
  NULL, NULL, '2026-04-21', 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Marco G.', 'Technicien comptable', NULL, 'Retail', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Un outil incontournable pour les propriétaires de PME$q$,
  $q$Entièrement satisfait. Offre un très bon rapport qualité-prix. Étant totalement en ligne, nous avons toujours les données à jour.$q$,
  $q$Simplicité et facilité d'utilisation. Le logiciel est très intuitif et l'on peut se retrouver dans les différents menus facilement.$q$,
  $q$Ne permet pas de créer des rapports "Favoris" et des raccourcis. Il serait aussi apprécié de pouvoir épingler un client ou un fournisseur lorsque nous avons plusieurs écritures à faire pour le même.$q$,
  NULL, NULL, '2025-12-11', 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Renée G.', 'Podologue', NULL, 'Individual & Family Services', '1', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 5, 5,
  $q$Tellement satisfaite$q$,
  $q$J'utilise Sage Accounting depuis quelques années et j'adore mon expérience. Cette année j'ai dû procéder à mon inscription aux taxes et j'ai été en mesure de tout créer moi-même dans mon système. Aujourd'hui SAGE crée mon rapport de taxes aux 3 mois et j'adore.$q$,
  $q$J'aime beaucoup sa facilité d'utilisation. Avec l'option Créer tu trouves rapidement l'endroit où tu dois faire tes entrées.$q$,
  $q$Honnêtement il n'y a pas d'aspects que je n'apprécie pas. Il est facile de trouver réponse à nos questions, comme par exemple dans la section Rapports toute l'information est là pour te diriger vers le rapport qui te donnera l'information recherchée.$q$,
  NULL, NULL, '2025-12-02', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Heather R.', 'Owner and Bookkeeper', NULL, 'Real Estate', '2-10', 'South Africa', false, NULL, '2+ years',
  5, 5, 5, 5, 4,
  $q$Highly Recommend Sage!$q$,
  $q$I have been working with Sage since 2018 and have loved it all. I haven't had to use support in a while, but it has always been really easy to contact someone and they are always super friendly and helpful. I love being able to add notes to invoices, credits and expenses as well as upload supporting documents. I know they are always easily accessible.$q$,
  $q$Ease of use, ability to attach receipts to expenses, financial reporting — all great value for the cost of a subscription.$q$,
  $q$I just have a base membership for this particular company of mine and it doesn't allow for expenses to be entered, then paid later like a higher grade membership does, but I make it work.$q$,
  NULL, NULL, '2026-01-20', 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Éliane G.', 'Technicienne Comptable', NULL, 'Accounting', '2-10', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 4, 4,
  $q$Avis honnête$q$,
  $q$Je l'apprécie beaucoup, je le trouve simple et un beau visuel. Il y a quelques améliorations à apporter comme n'importe quel logiciel.$q$,
  $q$Simple à utiliser avec un beau visuel.$q$,
  $q$Quelques améliorations à apporter comme n'importe quel logiciel.$q$,
  NULL, NULL, '2025-09-17', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Raphael D.', 'Accounting', NULL, 'Health, Wellness and Fitness', '11-50', 'Canada', false, NULL, '2+ years',
  2, 3, 3, 2, 2,
  $q$Problème banque Desjardins$q$,
  $q$Il serait intéressant de créer une fonction pour imprimer tous les rapports par projet en même temps au lieu de devoir changer le projet à chaque fois.$q$,
  $q$Téléversement des factures fournisseur. Ça aide beaucoup à aller plus vite et à réduire les erreurs de frappe.$q$,
  $q$Qu'on ne peut pas connecter la banque Desjardins depuis 1 an. Avant on pouvait mais depuis que vous avez changé on ne peut plus.$q$,
  NULL, NULL, '2025-09-18', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jon H.', 'VP, Finance', NULL, 'Real Estate', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 5, 4,
  $q$Sage Business Cloud Review$q$,
  $q$I have used it for several years for a small real estate development company and it has met all my needs. The customer support has been great when needed and the value for the money spent has exceeded my expectations.$q$,
  $q$The ease of filing GST and maintaining the books online. It is easy for several people to access the information anywhere and at the same time. It is easy to invoice customers as well as pay vendors.$q$,
  $q$Financial reporting can be a bit difficult at times depending on the information you are trying to extract.$q$,
  NULL, NULL, '2026-04-30', 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Linda C.', 'RPN Footcare Nurse', NULL, 'Health, Wellness and Fitness', '1', 'Canada', false, NULL, '2+ years',
  4, 5, 4, 3, 4,
  $q$User friendly software$q$,
  $q$I find it's easy to use and what I need for my small business. I've used other programs and disliked them.$q$,
  $q$User friendly. I prefer this program over others. I've had two other accounting software that were not easy to use.$q$,
  $q$Not sure there's anything that I don't like. I've had this for three years now and it's user friendly. The only problem is trying to reach out for help when I have limited time. Takes a while for someone to answer questions and most times I only get an email with "how to do". I need someone to walk me through.$q$,
  NULL, NULL, '2025-12-03', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Lyndsay K.', 'Administration', NULL, 'Business Supplies and Equipment', '2-10', 'Canada', false, NULL, '1-2 years',
  3, 2, 3, 3, 2,
  $q$Not a Sage online fan$q$,
  $q$Overall I found Sage online very frustrating to use and not user friendly. The desktop version is possibly better.$q$,
  $q$I found it worked fairly well for keeping track of expenses, although it was a time consuming process to match everything up and reconcile. We had quick access to our customer data base.$q$,
  $q$I did not like Sage online. I feel there could be many improvements made. It had a very difficult time working with my bank uploading transactions. Often times there would be many missing and I'd have to input them manually. I do not like that when I cancelled I could not download a usable file to save for tax purposes later, nor download a usable customer list. Also, in the app it would constantly sign out our guys in the field so every time they wanted to write up an invoice on site they would have to log back in. Just not user friendly.$q$,
  NULL, NULL, '2026-05-06', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Chantal L.', 'Directrice d''un organisme de formation', NULL, 'Education Management', '2-10', 'Canada', false, NULL, '1-2 years',
  4, 4, 4, 4, 4,
  $q$Erreur du logiciel ou "bug" du logiciel$q$,
  $q$Dans l'ensemble, je suis plutôt satisfaite. Je ne peux pas le comparer à d'autres logiciels comptables puisque c'est le premier que j'utilise. Quoi qu'il en soit, celui-ci convient très bien aux besoins de notre organisme et aux quelques opérations comptables que nous avons à enregistrer.$q$,
  $q$Le fonctionnement du logiciel est facile à comprendre et je peux aisément passer mes différentes écritures comptables. Je retrouve facilement les informations que je recherche. Le prix est aussi intéressant pour notre organisme. Le soutien client est bon également — je n'attends jamais bien longtemps avant de communiquer avec quelqu'un.$q$,
  $q$Au début de son utilisation, il y avait des confusions par rapport à des comptes de banque (mauvaises informations dans le plan comptable). Autre point négatif, le temps de validation d'une opération est un peu long. Il arrive que le système me dise que je ne peux pas faire cette opération alors que je viens d'en valider une du même type. Dans ce cas, je sors complètement de l'opération et je repars du début et bien souvent ça fonctionne à la deuxième tentative.$q$,
  NULL, NULL, '2025-12-02', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Danielle L.', 'Co-owner', NULL, 'Machinery', '2-10', 'Canada', false, NULL, '6-12 months',
  4, 4, 4, 2, 3,
  $q$Wish for more support for newbies$q$,
  $q$Maybe it would be better with Sage 50, I don't know. It is hard to start a business and deal with everything new at once.$q$,
  $q$Since I'm a new user of that kind of product it is relatively easy and works well for invoicing. It was easy to set up because we don't use Sage at its full potential.$q$,
  $q$For new users that do not know much about accounting, the support for learning is not helping much. It is complicated to have assistance. I wish I could have more help for the basics.$q$,
  NULL, NULL, '2026-04-27', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Maggie F.', 'Propriétaire', NULL, 'Design', '1', 'Canada', false, NULL, '1-2 years',
  4, 5, 4, 4, 3,
  $q$Facile à utiliser$q$,
  $q$Moi qui ne suis pas comptable dans la vie, j'arrive très bien à utiliser Sage. Très facile à utiliser, bon service à la clientèle.$q$,
  $q$L'interface est facile à utiliser, envoyer les relevés de compte très facile. Entrer les nouveaux clients, nouveaux produits — tout va très bien.$q$,
  $q$Lorsque je fais mes fins de trimestres, mes chiffres pour mon remboursement de taxes ne fonctionnent jamais. Je n'arrive pas à comprendre pourquoi.$q$,
  NULL, NULL, '2025-12-08', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Amanda B.', 'Part Owner and Bookkeeper', NULL, 'Automotive', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Very happy with Sage Accounting$q$,
  $q$I really enjoy using Sage Accounting. It is nice to be able to access the program by logging in anywhere, create professional invoices, and easily keep track of the financial details of our business.$q$,
  $q$One of my favorite features of Sage Accounting is the format for invoicing. It is organized and neat.$q$,
  $q$I use the online Sage Accounting service. My only issue is that it processes a bit slow. When I am entering many items, one after another, it would be nice if the system was quicker.$q$,
  NULL, NULL, '2025-11-17', 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Taras F.', 'Owner', NULL, 'Wholesale', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 5, 4,
  $q$Sage for the win$q$,
  $q$It's been amazing — anything I've needed or couldn't understand I found online or with an agent. All the agents have been easy to work with.$q$,
  $q$Easy to learn, great support from the internet and in person. I'm new to accounting and found it very easy to learn.$q$,
  $q$Honestly not much — maybe the layout could be more user friendly. I enjoy the home pages but the drop down menus are harder to figure out.$q$,
  NULL, NULL, '2025-12-08', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Colin T.', 'President', NULL, 'Marketing and Advertising', '2-10', 'Canada', false, NULL, '2+ years',
  3, 3, 3, 2, 3,
  $q$Wish it was better. But hey it does the job.$q$,
  $q$Would like a direct phone number to speak to someone each time I have a problem. Not interested in this "chat" stuff.$q$,
  $q$That it does accounting and is online so can be accessed from anywhere.$q$,
  $q$Need to be able to record payment at same time that I am doing an expense post — save steps. Also the payroll is annoying that you can't easily pay one person on random days. It insists on payruns! So lots to fix as this is just the starting point.$q$,
  NULL, NULL, '2026-01-21', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Danielle G.', 'Real Estate Broker', NULL, 'Real Estate', '1', 'Canada', false, NULL, '2+ years',
  4, 5, 5, 4, 4,
  $q$I have been using it for years!$q$,
  $q$I have been working with Sage (Simple Comptable) for more than 10 years. I stayed with it because it fits my needs as a small business. It is very easy to use and understand accounting, even for someone who is not familiar with accounting principles. There is always a way to get help and guidance.$q$,
  $q$It is worth the investment. Simple to use, every step of accounting, and you can choose which topics you need and adapt to your business. It does all the steps from invoicing, connection to your bank accounts for reconciliation. It is possible to connect all your bank accounts and credit cards for automatic reconciliation, always keeping track of your expenses.$q$,
  $q$It provides all the financial information and you can pull reports. However, the type of report is simple — I often have to export to Excel to make it more fancy for a presentation.$q$,
  NULL, NULL, '2026-04-28', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Eugene P.', 'Chief Operating Officer', NULL, 'Non-Profit Organization Management', '11-50', 'South Africa', false, NULL, '2+ years',
  4, 4, 4, 4, 3,
  $q$Chief Operating Officer$q$,
  $q$Overall happy. Despite some limitation in functions, it is flexible enough to work around. Again online access is essentially most important for us.$q$,
  $q$Online easy access is great. And customer support seems to have improved a lot, trying to get to my challenges. Also the follow-up call was great.$q$,
  $q$Lack of some functionalities. I wish to be able to control posting date, aside from invoice/document date. Also vendor detail list would be great.$q$,
  NULL, NULL, '2026-05-05', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Tonu O.', 'General Manager', NULL, 'Hospitality', '2-10', 'Canada', false, NULL, '2+ years',
  3, 3, 4, 3, 3,
  $q$Transition to Online Sage$q$,
  $q$The transfer from Sage 50 to the Online version was a stop-gap measure. I am retiring and the contract with the main consulting customer was expiring. My own business is now inactive and will cease to operate by the end of the year.$q$,
  $q$The cost of the basic online version was reasonable. I was able to transfer info from Sage 50 fairly easily.$q$,
  $q$I found the bank reconciliation to be rather convoluted. It was significantly different from what I was used to with Sage 50. It took longer than I expected to get used to the online version of Sage.$q$,
  NULL, NULL, '2025-12-08', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Karen A.', 'Treasurer', NULL, 'Non-Profit Organization Management', '11-50', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 4, 3,
  $q$A Volunteer's perspective$q$,
  $q$It has been a positive experience that allows me to enter transactions and produce within Excel a formatted financial statement for the 15 member board every month and the year end for the AGM report.$q$,
  $q$The cloud based approach was the selling point for me. I am a retired accountant who used Accpac Accounting modules. This product is a basic system that works for the seniors' activity centre where I volunteer as Treasurer and board member. I needed a system that others could access if they needed to. The cloud based system allows me to work from home.$q$,
  $q$Because my experience was with an advanced product, I find the AR and AP too simplified to work for us.$q$,
  NULL, NULL, '2026-01-17', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Anne-Sophie T.', 'Direction générale', NULL, 'Performing Arts', '2-10', 'Canada', false, NULL, '6-12 months',
  3, 2, 3, 3, 2,
  $q$Difficile prise en main$q$,
  $q$Après des mois de travail, je ne suis pas encore capable de l'utiliser malgré que je travaille à bien m'entourer et que je consulte de nombreuses ressources.$q$,
  $q$Le fait qu'une aide à la clientèle soit disponible sur le chat pour nous aider à valider les fonctionnalités ; le fait que la plateforme soit en français ; l'apparence générale des onglets.$q$,
  $q$La quasi-impossibilité de corriger des erreurs, y compris dans le journal de corrections. La difficulté de la mise en route et l'impossibilité complète d'importer nos données malgré qu'il soit bien affiché le contraire et que nous utilisions les gabarits fournis par Sage. Les comptes bancaires et de carte de crédit se désynchronisent sans arrêt. Et tout est affiché en euro ! J'ai embauché quelqu'un qui travaille avec Sage 50 depuis des années, et qui est incapable de comprendre comment utiliser Sage Comptabilité. Même les termes utilisés sont différents.$q$,
  NULL, NULL, '2026-03-17', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Michelle V.', 'Accounting Administrator', NULL, 'Accounting', '2-10', 'Canada', false, NULL, '1-2 years',
  4, 4, 5, 4, 4,
  $q$Sage Cloud Accounting works great!$q$,
  $q$I use it for my own sole proprietorship as well as a friend's. It works really well for the small amount of entries for both companies. I also like the quick switching from one company to the other — no more waiting for the backup to finish and then opening another company.$q$,
  $q$This Sage Cloud account gave me a more affordable alternative to the full program that I use at the office.$q$,
  $q$Finding an understandable and accurate Income Statement. I am still navigating the reports and they are not labeled like the full Sage program I use at work.$q$,
  NULL, NULL, '2026-05-04', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'France G.', 'Commis comptable', NULL, 'Civic & Social Organization', '2-10', 'Canada', false, NULL, '1-2 years',
  5, 5, 5, 4, 4,
  $q$Génial, j'adore.$q$,
  $q$Il est facile à utiliser, très intuitif. Je peux travailler de n'importe où sans problème. La connexion se fait très bien.$q$,
  $q$La facilité de recherche pour retrouver un client, fournisseur ou même le numéro de compte. Les recherches sont intuitives et faciles.$q$,
  $q$Il manque les projets et les récurrences qui seraient grandement appréciés. La conciliation est plus difficile que sur Sage 50.$q$,
  NULL, NULL, '2025-12-02', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Angela B.', 'Office Manager', NULL, 'Farming', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 5, 4,
  $q$Sage is the success of my business$q$,
  $q$Sage is a clean and simple software that is user friendly and includes simple terms and explanations for its features. It's a win for my business. Access from my mobile phone makes life accessible.$q$,
  $q$The support. The chat until 8:00 pm at night is fantastic for small business that work all hours. I always seem to get the answer I need.$q$,
  $q$The connection between Sage and Payment Evolution is not seamless and both companies seem to say "it's the other vendor" as the problem. I wish the bank connection for importing transactions was more than just 3 months.$q$,
  NULL, NULL, '2026-03-12', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Martine R.', 'Responsable de la comptabilité', NULL, 'International Affairs', '11-50', 'Canada', false, NULL, '6-12 months',
  3, 3, 3, 1, 3,
  $q$Choses à améliorer$q$,
  $q$J'ai un problème avec un fournisseur. Le compte ne se met jamais à zéro. Le technicien devait me rappeler et corriger. J'attends toujours depuis 3 ans. Manque de sortes de rapports.$q$,
  $q$C'est en ligne, et il est possible de travailler à plusieurs personnes à la fois. Je vois un bon potentiel mais il faut améliorer les options rapports.$q$,
  $q$Le service à la clientèle. C'est compliqué de trouver une personne responsable patiente pour nous aider et le manque de professionnalisme pour résoudre des problèmes. Aucun suivi quand il y a une demande plus compliquée qui nécessite un programmeur.$q$,
  NULL, NULL, '2025-12-17', 5, 'published'
),

-- ===================== Page 4 (reviews 76-100) =====================
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Emmanuel C.', 'Naturopath', NULL, 'Alternative Medicine', '1', 'Canada', false, NULL, '2+ years',
  4, 3, 3, 2, 4,
  $q$4-year experience with Sage Cloud Accounting$q$,
  $q$Overall satisfied but not thrilled by my daily experience. Honestly, I have been thinking about switching to a competitor.$q$,
  $q$Cloud based platform — I can use it anywhere. Secure and robust, no major issues so far. I use the reporting daily and it serves my needs fairly well though I have not used all of them.$q$,
  $q$Customer support is deficient (chatting with someone, trying to explain a problem is a challenge). I used SAGE 50 before and customer support was excellent. Price wise, I would expect a better customer support. I'm not an accountant and I need to use it for invoicing daily. Somewhat not always user-friendly.$q$,
  NULL, NULL, '2025-09-12', 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jeremy M.', 'Owner Operator', NULL, 'Consumer Services', '2-10', 'Canada', false, NULL, '1-2 years',
  5, 4, 5, 3, 4,
  $q$The app guy$q$,
  $q$It's a good accounting program for small companies. The reporting is challenging and banking doesn't work to the level I thought it would. My accountant spends more time with the program over QuickBooks. I told them to give it another year.$q$,
  $q$The app for your phone — easy to do invoices, record payments and send emails and follow up with customers on quotes.$q$,
  $q$Need better support when there are errors or issues with accounting to be able to back them out and make notes.$q$,
  NULL, NULL, '2025-12-02', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Derek K.', 'Orthotist', NULL, 'Medical Devices', '2-10', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 1, 3,
  $q$Cloud support does not exist$q$,
  $q$Sage 50 is good, support is good. Cloud? Was never able to use as my data would not migrate because I could not speak with anyone.$q$,
  $q$Sage 50 is good. Customer support is very good. Have been using for 20 years with no issues. Tried to move to Cloud... failure.$q$,
  $q$Sage Cloud customer support is terrible. You can only "chat" with support staff and they don't seem to have a clue. You cannot speak with a human about Cloud. I tried to migrate my data to Cloud, didn't work, tried for a week, could not speak with anyone. Decided to give up and go back to Sage 50. Complete and utter failure on their end.$q$,
  NULL, NULL, '2026-01-30', 11, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Kimberley C.', 'Veterinarian', NULL, 'Veterinary', '2-10', 'Canada', false, NULL, '2+ years',
  5, 4, 5, 4, 4,
  $q$Sage in Vet practice$q$,
  $q$I find it convenient and mostly easy to use. I know that there are people I can call for support and training and I will have to do that.$q$,
  $q$I like that I can upload my invoices from another software program into Sage and that I can use AutoEntry to upload my receipts. Makes reconciling the bank account so much easier.$q$,
  $q$I find it hard to correct mistakes sometimes. And when I download bulk invoices I can't see which ones are reconciled and which ones aren't very easily.$q$,
  NULL, NULL, '2025-09-18', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jeannita V.', 'Bookkeeper', NULL, 'Electrical/Electronic Manufacturing', '11-50', 'Canada', false, NULL, '1-2 years',
  5, 5, 5, 5, 4,
  $q$Great accounting software$q$,
  $q$My overall experience is very positive. It's very dependable and user friendly. I was very new to bookkeeping when I first started using Sage, and I was able to make my way around the software pretty easily.$q$,
  $q$They have awesome user support. Love the chat option especially. In all the times I've used it, I always have had an answer to my questions.$q$,
  $q$Wish we would receive or have a link to bug fixes and app upgrades. You have no idea of what has been logged as a bug or when and if it'll be fixed. Sometimes there are changes in the app that we haven't been told about. When there's an upgrade it would be nice to have a notification and have a link to read about the changes made.$q$,
  NULL, NULL, '2025-12-11', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Traci S.', 'President', NULL, 'Accounting', '2-10', 'South Africa', false, NULL, '2+ years',
  5, 5, 5, 4, 5,
  $q$The Program for Accountants$q$,
  $q$I run my small accounting firm with Sage. The majority of my clients also use Sage and I usually will not take a new client if they use any other program.$q$,
  $q$Professional-grade accounting features that work reliably for an accounting firm and its clients.$q$,
  $q$Very little — it has become the standard for my firm.$q$,
  NULL, NULL, '2025-12-02', 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Martin J.', 'Clinic Director', NULL, 'Alternative Medicine', '2-10', 'Canada', false, NULL, '1-2 years',
  4, 3, 5, 2, 3,
  $q$Good price get the job done$q$,
  $q$It is ok, it gets the job done. But I used to have QuickBooks and it was very easy to navigate around — but much more expensive, so I changed for Sage. It is hard to get used to it.$q$,
  $q$The price is very good. For the rest I would prefer something easier to use, friendlier to go around.$q$,
  $q$Not really user friendly, reports are not easy, sending T4, RL1 and summary to government not easy at all and customer support hard to get a hold of.$q$,
  NULL, NULL, '2025-12-11', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jamie K.', 'Owner', NULL, 'Environmental Services', '2-10', 'Canada', false, NULL, '2+ years',
  4, 4, 3, 3, 4,
  $q$It Works Well for What I need It for$q$,
  $q$Was very rocky at the start, but now has become very reliable for the small use we need it for. We are stuck using Sage 50 because there is no way to upgrade and transfer all the information. To upgrade you need to manually input all information to the upgraded version. One is deleted before the other can be used.$q$,
  $q$Easy and straightforward. New options are provided all the time. Invoicing is easy. Reporting is clicks of buttons.$q$,
  $q$Not being able to pin the login page for long term use on my computer without security check-in (code sent) too often. I believe pricing should be based on what you use — can be very pricey when you do not use all the functions.$q$,
  NULL, NULL, '2025-09-12', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Brandon M.', 'Electrician', NULL, 'Accounting', '2-10', 'South Africa', false, NULL, '2+ years',
  4, 5, 4, 3, 4,
  $q$Best accounting program$q$,
  $q$We have had nothing but great experience with Sage. Easy to learn how to use it and manage accounts, great customer service.$q$,
  $q$The easy flow — I learned so quickly how to use the program with no background in accounting. Sage has a great flow and easy how-to instructions.$q$,
  $q$Had trouble with over the phone support. The rep kept referring us to chat. Would be nice if phone help was available.$q$,
  NULL, NULL, '2026-01-29', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Tara I.', 'Bookkeeper', NULL, 'Non-Profit Organization Management', '11-50', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 4, 3,
  $q$Bookkeeper$q$,
  $q$I have been using the desktop and online versions for over 15 years and find that the program is constantly upgrading for more useful reporting.$q$,
  $q$Ease of use for financial reporting and expense tracking, bank reconciliation and invoicing. Integrates well with Stripe as well.$q$,
  $q$No report that captures P&L detailed together for cost centres — currently can only view one at a time. I need a report that lists all and breaks it down by income and expense for comparison.$q$,
  NULL, NULL, '2026-04-27', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jonathan H.', 'Warehouse Sales', NULL, 'Retail', '11-50', 'Canada', false, NULL, '2+ years',
  1, 2, 2, 1, 1,
  $q$Find another Accounting system$q$,
  $q$Overall the product does its job if you need something super simple and have a set customer base to input. Anything with walk-in traffic and random misc invoices will be impossible to find later and make life hell for users.$q$,
  $q$Not a lot of great things to say about it... does the job for what it is and has decent accessibility but very mid product.$q$,
  $q$Searching for invoices, the QR code for payment, invoice design, can't preset taxes per customer with exemptions, hassle to track items, customer support is brutal and very disappointing to deal with.$q$,
  NULL, NULL, '2026-03-20', 13, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Dianne B.', 'Staff Accountant', NULL, 'Accounting', '11-50', 'Canada', false, NULL, '2+ years',
  5, 5, 4, 4, 4,
  $q$Sage review$q$,
  $q$Always good! I prefer Sage to Quickbooks. I wouldn't mind taking some advanced courses in Sage, either online or in a classroom setting.$q$,
  $q$I prefer Sage as the set up and format are user friendly, easy to navigate. Backup of a file is easy to complete. I work at an accounting firm so usually just get backup files.$q$,
  $q$The cloud version of Sage I found not as easy to navigate. We had one client that was using Sage cloud and it took a while for both of us to figure out. Also I have had clients that have transactions on their bank reconciliations from prior years that they have never been able to delete and they have been told they can't be removed.$q$,
  NULL, NULL, '2025-12-02', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Audrey S.', 'Adjointe virtuelle', NULL, 'Accounting', '1', 'Canada', false, NULL, '2+ years',
  5, 5, 4, 5, 5,
  $q$Quand facilité et sécurité s'allient$q$,
  $q$Facile et sécuritaire, j'adore travailler avec SAGE ! Les clients à qui je l'ai recommandé aiment aussi la facilité avec laquelle nous pouvons travailler sur SAGE.$q$,
  $q$La sécurité de nos données, et il est facile d'avoir une réponse à nos questions. Le service à la clientèle est courtois, nous aide même avec des trucs et astuces.$q$,
  $q$Le prix est un peu élevé pour les débutants. J'aime demander à mes clients d'accéder à SAGE pour me faciliter la vie mais plusieurs reculent devant le prix.$q$,
  NULL, NULL, '2025-12-02', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Debbie I.', 'Owner', NULL, 'Accounting', '1', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Great product$q$,
  $q$Great. I am a huge fan of Sage desktop and Sage online. I also have access to QuickBooks online and prefer Sage.$q$,
  $q$Simple to use and understand. If you have basic bookkeeping you will be able to use Sage. Would recommend.$q$,
  $q$Some reporting options. I would like to see more filters and reports available to run on Sage. But not a huge issue.$q$,
  NULL, NULL, '2025-12-02', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Martin J.', 'Accounts Assistant', NULL, 'Insurance', '51-200', 'South Africa', false, NULL, '6-12 months',
  4, 4, 4, 4, 3,
  $q$Effective if not perfect accounting system$q$,
  $q$Overall it has been a pleasant experience. Moving from one accounting system to another is always difficult, however I didn't have many teething issues and on the whole the pros of using Sage Accounting outweighed the cons.$q$,
  $q$The ability to include attachments to journal postings, meaning more detailed and descriptive backing of postings and being able to locate the backing with ease.$q$,
  $q$There is no easy way of viewing and tailoring reports to, for example, show postings made by a particular employee for a certain month. Prior to using Sage I used Sun Systems Q&A which was much easier to build bespoke Excel reports that could run to show postings of relevant criteria.$q$,
  NULL, NULL, '2025-07-29', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Stephen B.', 'Managing Director', NULL, 'Construction', '11-50', 'South Africa', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Sage is Good but Could be Excellent$q$,
  $q$Overall I have a very good experience with Sage. I run another company that uses QuickBooks and Sage has a much better user experience. If Sage would read AP invoices I would be super happy.$q$,
  $q$Easy entry, shared experience with accountants. UI is really good. The value for money is good. Online access is very stable.$q$,
  $q$It doesn't automatically read invoices. You have to buy from a separate company while QuickBooks does it out of the box at no extra cost. Custom reporting is still problematic for me — I cannot seem to be able to run reports on the various tags and projects I put into the system.$q$,
  NULL, NULL, '2025-12-08', 9, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'April J.', 'Owner', NULL, 'Photography', '1', 'Canada', false, NULL, '2+ years',
  4, 3, 4, 4, 4,
  $q$Overall I like using Sage$q$,
  $q$I have used Sage for three years and still find that it is a bit of a struggle not knowing how to use some of the features. I love being able to send invoices through my phone as well as my computer. I have gotten better over the last few years and the transactions I do daily are easy to use and I have never had an issue with the speed or how well it works.$q$,
  $q$I like that I can use it on my phone as well as my computer. I have never had a glitch or any issues with the speed. Being able to run reports is a great help.$q$,
  $q$If you do not know a lot about accounting it takes a lot of time to learn how to use it correctly — I find I still struggle after 3 years.$q$,
  NULL, NULL, '2025-12-02', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Carol H.', 'Accountant', NULL, 'Accounting', '2-10', 'South Africa', false, NULL, '2+ years',
  4, 4, 4, 4, 4,
  $q$Accountant$q$,
  $q$Overall, this is an easy to use program, and I have confidence that the online version protects my data.$q$,
  $q$This product is excellent for small companies requiring reliable General Ledger, Financial reporting and basic bookkeeping.$q$,
  $q$The Financial Reports such as Profit & Loss and General Ledger can be exported to Excel, where some fine tuning regarding presentation is required.$q$,
  NULL, NULL, '2026-04-27', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Danielle R.', 'Content Creator', NULL, 'Media Production', '1', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$My Favourite Accounting Software!!$q$,
  $q$I love the product. The interface UX/UI is so much better than any other accounting software I've tried. Product is very intuitive to use.$q$,
  $q$How simple it makes tracking my expenses and write-offs. It saves me hours of stress during tax season, and makes my sales tax returns so easy because everything is already organized in one place and done for me. I also appreciate that invoices can be created, and payments can be taken in just a few clicks.$q$,
  $q$The connect to bank feature is quite glitchy, so I often have to record things manually which is unfortunate.$q$,
  NULL, NULL, '2025-09-12', 10, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Jennifer S.', 'Realtor', NULL, 'Real Estate', '1', 'Canada', false, NULL, '2+ years',
  4, 4, 4, 3, 4,
  $q$Small Business Sage User$q$,
  $q$Good product. Would love to be able to scan receipts and have automated upload. I do like the product and will continue to be its client.$q$,
  $q$Easy access. Quite user friendly and fairly easy to learn. It saves time when figuring out payroll. I can share with my bookkeeper and accountant easily.$q$,
  $q$The accounting portion continuously disconnects from my banking accounts and has to be disconnected and reconnected through the bank multiple times.$q$,
  NULL, NULL, '2025-12-11', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Lyn J.', 'Senior Manager', NULL, 'Construction', '51-200', 'South Africa', false, NULL, '1-2 years',
  4, 3, 4, 4, 4,
  $q$Sage Accounting Review$q$,
  $q$Overall my experience has been positive, however the system falls short in comparison to other competitors such as Xero.$q$,
  $q$My favourite feature within Sage Accounting is the versatile reports that are easy to use and provide a good amount of data visualisation.$q$,
  $q$My least favourite part of Sage Accounting is the initial complexity. This means it is not beginner friendly.$q$,
  NULL, NULL, '2026-04-15', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Audray-Anne G.', 'Administrator and Accounting', NULL, 'Consumer Services', '2-10', 'Canada', false, NULL, '2+ years',
  4, 5, 4, 4, 3,
  $q$Sage easy for beginner$q$,
  $q$Really good. I like that the bank is linked with the account automatically. I think it's an easy-to-go product for new beginners.$q$,
  $q$Easy conciliation with bank account, user friendly for new accountants and easy to create new products.$q$,
  $q$Not enough personalisation for invoices and statements, no possibility to put interest automatically on invoices.$q$,
  NULL, NULL, '2025-11-13', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Brenda B.', 'Bookkeeper', NULL, 'Electrical/Electronic Manufacturing', '11-50', 'Canada', false, NULL, '1-2 years',
  3, 2, 3, 2, 4,
  $q$Good and moderately user friendly.$q$,
  $q$It took a long time to get it working smoothly but it works well now. The increasing cost is a negative.$q$,
  $q$It has become easy to keep track of finances in my business with the product online. It is now user friendly. I can easily print reports for my accountant. Month ends are super easy to do. GST reporting has become simple. The online banking, once connected, makes it easy to coordinate with my daily business bookkeeping.$q$,
  $q$The learning curve is steep. It takes so much time to get an issue fixed through the help center. It is definitely not very user friendly at first. The monthly price keeps going up.$q$,
  NULL, NULL, '2026-01-03', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Matt M.', 'Owner', NULL, 'Construction', '2-10', 'South Africa', false, NULL, '6-12 months',
  5, 5, 5, 5, 5,
  $q$Great accounting program!$q$,
  $q$From day one, Sage Accounting has been great. I use it for my small business, and everything from daily bookkeeping to invoicing has been simple.$q$,
  $q$Very easy to use, it is very cost efficient, the app is also easy to use and works great, amazing for small business!$q$,
  $q$There's nothing I don't like about Sage Accounting — my overall experience has been very positive and I have nothing but good things to say.$q$,
  NULL, NULL, '2026-03-17', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Patti S.', 'President', NULL, 'Non-Profit Organization Management', '2-10', 'South Africa', false, NULL, '2+ years',
  5, 5, 5, 5, 5,
  $q$Perfect Accounting Program$q$,
  $q$Overall... easy, simple, navigating is never a problem, support is wonderful and most of all I would never switch to another program.$q$,
  $q$Everything — easy to use. Even though we are a small business it works perfect for what we need. Would suggest this program to anyone.$q$,
  $q$I find using Sage that there are no cons to this program. I personally use it at my employment and love it.$q$,
  NULL, NULL, '2025-12-12', 7, 'published'
),

-- ===================== Page 8 (reviews 176-200; Edgars D. skipped — already seeded) =====================
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Vincent C.', 'Project Manager', NULL, 'Printing', '11-50', 'South Africa', true, 'Verified LinkedIn User', '6-12 months',
  5, 5, 4, 4, 5,
  $q$Solid Accounting Software for small businesses$q$,
  $q$Easy to use accounting software that automates tasks, offers strong reporting, and scales easily as your business grows.$q$,
  $q$Easy to use accounting software that automates tasks, offers strong reporting, and scales easily as your business grows.$q$,
  $q$Can be pricey, has a learning curve for new users, and some advanced features require higher-tier plans or add-ons.$q$,
  NULL, NULL, '2026-02-02', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Donna B.', 'Bookkeeping', NULL, 'Information Technology and Services', '2-10', 'Canada', false, NULL, '1-2 years',
  5, 5, 5, 4, 5,
  $q$Small Business Bookkeeping to YE accounting$q$,
  $q$Overall very useable. I have used Sage 50 as well and QuickBooks. Really no comparison needed. Sage is 1000 percent over and above.$q$,
  $q$Takes bookkeeping into accounting. It just makes sense. I have an accounting background and have no issues with understanding.$q$,
  $q$When giving access to just allow running reports and printing, I ran into all kinds of problems where I had to tie up my CPA for a good hour. Eventually I had to grant full admin access. Not best.$q$,
  NULL, NULL, '2025-12-15', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Myrianne C.', 'Director', NULL, 'Hospital & Health Care', '11-50', 'Canada', false, NULL, 'Less than 6 months',
  4, 4, 5, 4, 3,
  $q$Reliable and Affordable Accounting for Small Business Needs$q$,
  $q$For day-to-day bookkeeping, it generally does the job well. Tasks like invoicing, expense tracking, and simple bank reconciliation are straightforward once you get used to the system. It's also relatively stable, so users don't often worry about data loss or major bugs.$q$,
  $q$What I liked most about Sage Accounting is its good value for basic features, its ease of use for small business operations, and the availability of support when needed, making it a practical choice for everyday accounting. I like the online access.$q$,
  $q$Simple tasks (like reconciling accounts or generating reports) can take more steps than expected. Compared to competitors, Sage Accounting can feel basic. Things like advanced reporting, inventory, or integrations are often limited unless you upgrade.$q$,
  NULL, NULL, '2026-03-18', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Paul-Etienne R.', 'President', NULL, 'Computer & Network Security', '1', 'Canada', false, NULL, '1-2 years',
  1, 3, 1, 2, 2,
  $q$Need an intermediate alternative$q$,
  $q$Good product but too expensive for the current needs, as the first layer misses key items and Sage Accounting is a bit too much for a 1-2 employee company.$q$,
  $q$Complete suite and there are a lot of integrations with banks and other key systems that make our life easier.$q$,
  $q$The value for money. My company has only one employee and we need it for just basic needs, and the first layer has features regarding opening balances missing — but this product is a bit too much for those kinds of companies. It kind of needs an intermediate tier.$q$,
  NULL, NULL, '2025-12-02', 8, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'David A.', 'Owner', NULL, 'Furniture', '2-10', 'South Africa', false, NULL, '1-2 years',
  5, 5, 4, 4, 5,
  $q$Sage for small business$q$,
  $q$Good — it does exactly what we want it to do for this particular company. I would recommend this to anyone who is interested in a good accounting system.$q$,
  $q$Ease of use and integration into my POS. Having the ability to save time on entering in receipt of a sale saves us valuable time.$q$,
  $q$Nothing I can think of — the software runs as it should. If anything they should have all services included, not all the tiered plans.$q$,
  NULL, NULL, '2025-09-12', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Vanessa B.', 'Owner and Instructor', NULL, 'Health, Wellness and Fitness', '1', 'Canada', false, NULL, '1-2 years',
  4, 4, 5, 3, 4,
  $q$Sage feedback$q$,
  $q$Overall, I am very satisfied with Sage and would not switch to another software provider. It balances good user experience with price point.$q$,
  $q$Sage has made my accounting much easier! I find it's a good value for my money. I love the easy reports that make me more informed on where my business money is going. I love that it's all on the cloud so I can access it on multiple devices/locations.$q$,
  $q$I feel like the customer support could be improved — it's hard to speak with a human and takes a while to get the line.$q$,
  NULL, NULL, '2026-01-21', 7, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Dominik L.', 'President', NULL, 'Financial Services', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 4, 4,
  $q$Love the Sage app$q$,
  $q$I've been with Sage for over 15 years. I like the performance but also the simplicity of it!$q$,
  $q$Easy to use!$q$,
  $q$Would like your app to be compatible with the Dext app to be more comparable to the Intuit app.$q$,
  NULL, NULL, '2025-12-02', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Elaine C.', 'Owner', NULL, 'Construction', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 5, 5, 4,
  $q$Very enjoyable to use. Recommend Sage for sure.$q$,
  $q$Very good experience. Friendly staff support. Easy to input. Export. Reports easy to find. I will definitely continue to use this product.$q$,
  $q$Simple to use. Enjoyable. Easy to learn and understand. Simple to read for my end users. Definitely recommend.$q$,
  $q$Certain profile features you have to call in for. Nuisance when I'm busy and just want to do certain things quickly like company name change etc.$q$,
  NULL, NULL, '2025-09-17', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Joyelle S.', 'Accounting', NULL, 'Accounting', '11-50', 'Canada', false, NULL, '6-12 months',
  3, 3, 3, 3, 3,
  $q$Okay but not great$q$,
  $q$It is multi functional and has some of the same functions as QuickBooks which makes the learning curve nice, but printing performance is a real problem for us.$q$,
  $q$It is multi functional and has some of the same functions as QuickBooks which makes the learning curve nice.$q$,
  $q$The printing time is very slow — from the time we hit print until the page actually prints is way too long. We have tested it in many venues and situations and it is not our issue, it is a Sage issue.$q$,
  NULL, NULL, '2025-12-15', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Eric S.', 'Owner', NULL, 'Health, Wellness and Fitness', '2-10', 'Canada', false, NULL, '6-12 months',
  5, 5, 5, 4, 4,
  $q$Sage decision$q$,
  $q$Good accounting program with unlimited users. I had zero knowledge of accounting but it was easy with them.$q$,
  $q$Easy to use and navigate. Create reports easily. Doing my taxes every trimester is easy. Creating customers and clients is also really easy. The monthly price is really affordable.$q$,
  $q$The short period before it logs you out. It rounds to lower numbers so sometimes my manual billing doesn't fit what's in Sage by a penny.$q$,
  NULL, NULL, '2025-09-12', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Donna H.', 'Secretary-Treasurer', NULL, 'Non-Profit Organization Management', '2-10', 'Canada', false, NULL, 'Less than 6 months',
  5, 4, 5, 5, 4,
  $q$Early days using Sage$q$,
  $q$It is early days. I think it will become easier as time goes on. The onboarding support was very helpful getting us on board.$q$,
  $q$Our accountants can easily access our program. Saves time and money. Like the reports and customized invoices.$q$,
  $q$If I had not taken a course, I would be totally intimidated by the program. Needs a step by step set up so that the program is customized for the user.$q$,
  NULL, NULL, '2026-01-30', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Angela S.', 'Treasurer', NULL, 'Museums and Institutions', '2-10', 'Canada', false, NULL, 'Less than 6 months',
  4, 4, 4, 2, 3,
  $q$Meets the basic needs$q$,
  $q$It meets the very basic needs. Set up was fairly simple and bank transactions are easy to do. When I have chatted with a real person, they were no more helpful than the chatbot.$q$,
  $q$It's easy to post transactions from the bank. It's easy to customize the Chart of Accounts. It's easy to make corrections.$q$,
  $q$The chatbot is not helpful. There is very limited reporting and the Profit and Loss Statement and Balance Sheet are not customizable. The training and help materials are limited — they tell you how to click to complete a task, but they don't explain. I haven't been able to figure out the taxes, but I can work around it manually, with some inconvenience.$q$,
  NULL, NULL, '2026-05-04', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Denis Z.', 'Finance Officer', NULL, 'Environmental Services', '51-200', 'South Africa', true, 'Verified LinkedIn User', '2+ years',
  5, 5, 4, 5, 5,
  $q$Sage Accounting for accounting done right!$q$,
  $q$Extremely happy with it. We changed software to Jobpac due to a business merge.$q$,
  $q$Excellent software, lots of options that you can do on it which is completely the opposite to MYOB for example. It integrates with all other software including expense claim management systems, payroll systems etc. Easy to use, easy to manage, easy to run reports from it. Staff have been mentioning also that it's not a slow system. They seem to have a great server which makes a big difference on the daily basis usage.$q$,
  $q$A bit pricey, but I guess you have to pay the right price when it comes to accounting software!$q$,
  $q$Hi Denis - thanks for taking the time to leave us a review! It's great to hear all the benefits you have with your Sage product and the fact they are making such a difference to your daily tasks. We will take your comments about pricing into consideration as we are always striving to provide the best software at the best rates! Thanks, Anna Parker - Customer Advocacy Executive$q$,
  '2025-01-08', '2024-12-22', 12, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Michael G.', 'President', NULL, 'Logistics and Supply Chain', '2-10', 'South Africa', false, NULL, '1-2 years',
  5, 5, 5, 4, 4,
  $q$A tool that delivers a ton of value$q$,
  $q$Very positive. It drives value and value based outcomes for my business by making invoicing and expense management a breeze. Easy to use and manage workflow.$q$,
  $q$Value for money. The tool is relatively fairly priced for the value it delivers to my business. Invoicing and expense tracking are easy to use and save time.$q$,
  $q$Some minor functions are difficult to locate, such as changing payment terms for a designated account.$q$,
  NULL, NULL, '2026-04-27', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Serge T.', 'Président', NULL, 'Civil Engineering', '2-10', 'Canada', false, NULL, '6-12 months',
  5, 5, 5, 4, 5,
  $q$Fidèle depuis 30 ans$q$,
  $q$Je suis avec cette comptabilité depuis 30 ans. Au départ, ça s'appelait Bedford, ensuite ACCPAC, et tout ça est merveilleux.$q$,
  $q$Convivial, facile, actualisé et gardé en backup sans avoir à faire des mises à jour.$q$,
  $q$Rien de spécial, sauf que j'aurais bien aimé que votre sondage soit en français.$q$,
  NULL, NULL, '2026-05-05', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Paul C.', 'Accountant', NULL, 'Environmental Services', '11-50', 'South Africa', false, NULL, '6-12 months',
  5, 5, 4, 4, 4,
  $q$Sage for the W$q$,
  $q$This has been an amazing online experience at work. Keep up the good work, everyone. Sage Accounting lets us do it.$q$,
  $q$Sage Accounting made keeping track of my client's expenses much easier. I was able to familiarise myself very quickly and use it to do my job.$q$,
  $q$My client is asking me for a final report on all the categories he's given me. The vendors list lines up, however getting groups of them to report in a straight line all together is eluding me right now.$q$,
  NULL, NULL, '2026-01-16', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'JP B.', 'Owner', NULL, 'Retail', '2-10', 'Canada', false, NULL, '2+ years',
  5, 5, 4, 4, 4,
  $q$Great accounting app$q$,
  $q$A solid accounting app with a good interface and developer-friendly APIs for integration with our own app.$q$,
  $q$I like the interface, and the ease of use. I like the fact that there are APIs we can use to integrate with our app.$q$,
  $q$As a developer, I would like to be able to return to the past so I could undo some changes, but we can't.$q$,
  NULL, NULL, '2026-01-21', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Dwayne M.', 'General Manager', NULL, 'Construction', '2-10', 'Canada', false, NULL, 'Less than 6 months',
  2, 2, 2, 2, 3,
  $q$I'm disappointed$q$,
  $q$Disappointed. I was expecting more from Sage. My accountant sold me on Sage and it's cost me more than advertised. Even the beginning link was difficult and confusing to get set up.$q$,
  $q$My accountant recommended it and it covers the basics.$q$,
  $q$It cost more than advertised and the initial setup was difficult and confusing.$q$,
  NULL, NULL, '2025-12-15', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Sophie P.', 'Gestionnaire des opérations', NULL, 'Sports', '11-50', 'Canada', false, NULL, '2+ years',
  5, 5, 4, 5, 4,
  $q$Great software$q$,
  $q$Very user friendly even for someone who doesn't know accounting. Customer service is great and fast.$q$,
  $q$I really like Sage Accounting — very user friendly even for someone who doesn't know accounting. Customer service is great and fast.$q$,
  $q$I don't really have a con, but I would say it's a bit slow sometimes — when we log in or when we do a transaction and click "save" it's a bit slow.$q$,
  NULL, NULL, '2025-09-17', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Fadi M.', 'President', NULL, 'Automotive', '2-10', 'Canada', false, NULL, 'Less than 6 months',
  5, 5, 5, 5, 4,
  $q$Hands on software that makes your day to day efficient!$q$,
  $q$Excellent and satisfied. Invoicing is so easy and presentable to our customers. And tech support is accessible at all times — so that's a plus.$q$,
  $q$Ease of use — it's incredible compared to other software. It's all about efficiency and value for money!$q$,
  $q$To be honest, so far so good.$q$,
  NULL, NULL, '2026-01-16', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Stefanie M.', 'Sole Proprietor', NULL, 'Design', '1', 'Canada', false, NULL, '2+ years',
  4, 5, 4, 4, 4,
  $q$Intuitive software makes accounting easier$q$,
  $q$Excellent accounting software for a small business owner. I use this monthly — quick and easy to input and I am up to date!$q$,
  $q$The ease of inputting information. Very intuitive. I am not an accountant and have had no issues with retrieving information once inputted. Does tax returns easily.$q$,
  $q$Trying to change information once it's been reconciled. Also once invoices have been inputted it's hard to change information.$q$,
  NULL, NULL, '2026-01-21', 4, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Mitchell S.', 'Owner', NULL, 'Health, Wellness and Fitness', '2-10', 'Canada', false, NULL, '1-2 years',
  3, 4, 3, 1, 3,
  $q$Online Support Only is not great.$q$,
  $q$Everything online means I can take this wherever I go, but the support model lets it down.$q$,
  $q$Everything online, which means I can take this wherever I go and access/update my books, HR or payroll.$q$,
  $q$Customer Support is only online, not over the phone. Which makes for a difficult and frustrating experience.$q$,
  NULL, NULL, '2026-03-17', 5, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Joanna D.', 'Assurance Manager', NULL, 'Accounting', '11-50', 'Canada', false, NULL, '1-2 years',
  5, 3, 4, 3, 4,
  $q$Functional but Far from Smooth$q$,
  $q$I used it as an external accountant. Overall, the experience has been somewhat frustrating. The reporting features don't feel as intuitive as QBO, which makes it harder to get the information I need quickly. On top of that, the two-factor authentication adds extra steps that make the process feel slower and less efficient. While it works, it hasn't felt smooth or user-friendly compared to what I'm accustomed to.$q$,
  $q$Since the platform is entirely online, it allows multiple users to access the same space at once, making it easy to share ideas, update documents in real time, and work together seamlessly from different locations.$q$,
  $q$I find pulling reports in this system quite awkward and not as intuitive as what I'm used to with QBO. On top of that, the two-factor authentication process feels a bit cumbersome and adds extra steps that slow things down.$q$,
  NULL, NULL, '2025-09-17', 6, 'published'
),
(
  (SELECT id FROM software WHERE slug = 'sage-accounting'),
  'Francois C.', 'President', NULL, 'Information Technology and Services', '1', 'Canada', false, NULL, '1-2 years',
  5, 5, 5, 4, 4,
  $q$Easy to use$q$,
  $q$The web site version is easy to use. It's mostly intuitive for someone that is not an expert in accounting.$q$,
  $q$The web site version is easy to use. It's mostly intuitive for someone that is not an expert in accounting.$q$,
  $q$The default account codes didn't suit my need. I haven't found an easy way to redefine them other than deleting and recreating them one by one.$q$,
  NULL, NULL, '2025-09-12', 5, 'published'
);

COMMIT;

-- ============================================================================
-- 99 reviews inserted (pages 2, 3, 4 and 8 of Capterra's Sage Accounting reviews).
-- Run AFTER insert_sage_reviews.sql — this file appends and does not delete.
-- ============================================================================
