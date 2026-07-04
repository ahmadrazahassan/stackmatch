export type Status = "published" | "draft";
export type ReviewStatus = "published" | "hidden";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  software_count: number;
  display_order: number;
  created_at: string;
}

export interface PricingPlan {
  name: string;
  price: number | string;
  currency: string;
  billing: string;
  features: string[];
}

export interface Software {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description_short: string;
  description_full: string;
  logo_url: string | null;
  screenshots: string[];
  category_id: string | null;

  starting_price: number | null;
  price_currency: string;
  billing_period: string;
  free_trial: boolean;
  free_version: boolean;
  pricing_plans: PricingPlan[];

  features: string[];
  top_features: string[];
  /** Optional — requires supabase/add_integrations.sql */
  integrations?: string[];

  /** Admin-set accent colour (hex). Falls back to lib/brandColors.ts. */
  brand_color: string | null;

  affiliate_url: string | null;
  vendor_website: string | null;

  vendor_name: string | null;
  founded_year: number | null;
  support_types: string[];
  countries_available: string[];
  languages: string[];

  overall_rating: number;
  ease_of_use_rating: number;
  value_for_money_rating: number;
  customer_service_rating: number;
  functionality_rating: number;
  review_count: number;

  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;

  status: Status;
  featured: boolean;
  created_at: string;
  updated_at: string;

  // joined
  category?: Category | null;
}

export interface Review {
  id: string;
  software_id: string;

  reviewer_name: string;
  reviewer_job_title: string | null;
  reviewer_company: string | null;
  reviewer_industry: string | null;
  reviewer_company_size: string | null;
  reviewer_country: string;
  reviewer_avatar_url: string | null;
  verified_linkedin: boolean;
  verified_badge: string | null;

  used_for_duration: string | null;

  overall_rating: number;
  ease_of_use: number | null;
  value_for_money: number | null;
  customer_service: number | null;
  functionality: number | null;

  review_title: string;
  summary: string | null;
  pros: string | null;
  cons: string | null;

  vendor_response: string | null;
  vendor_response_date: string | null;

  review_date: string;
  helpful_count: number;
  status: ReviewStatus;
  created_at: string;

  // joined
  software?: Pick<Software, "id" | "name" | "slug" | "logo_url"> | null;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  category_tag: string | null;
  related_software_id: string | null;

  author_name: string;
  author_bio: string | null;
  author_avatar_url: string | null;
  author_title: string | null;

  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  read_time_minutes: number;

  status: Status;
  featured: boolean;
  published_date: string | null;
  created_at: string;
  updated_at: string;

  // joined
  related_software?: Pick<Software, "id" | "name" | "slug" | "logo_url" | "overall_rating" | "review_count" | "description_short"> | null;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface Comparison {
  id: string;
  software_a_id: string;
  software_b_id: string;
  custom_verdict: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  created_at: string;

  // joined
  software_a?: Software | null;
  software_b?: Software | null;
}

export interface AffiliateClick {
  id: string;
  software_id: string | null;
  software_name: string | null;
  affiliate_url: string | null;
  clicked_at: string;
  ip_hash: string | null;
  user_agent: string | null;
  referrer: string | null;
  country_code: string | null;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

export type NewsletterStatus = "pending" | "confirmed" | "unsubscribed";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: NewsletterStatus;
  interests: string[];
  confirm_token: string | null;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  consent_ip_hash: string | null;
  consent_source: string | null;
  user_agent: string | null;
  created_at: string;
}
