// Top navigation links shown in the header (desktop + mobile).
// Use relative app routes here.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Scrolling sale text displayed in the announcement strip below the navbar.
export const SALE_MESSAGE =
  "Handmade pieces made to order | Ships across India | Final price confirmed before payment";

// Footer quick links list.
// This can differ from NAV_LINKS if needed.
export const FOOTER_QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Small trust statements shown in the home hero section.
export const HOME_TRUST_BADGES = [
  { label: "100% Handmade" },
  { label: "Made to order" },
  { label: "Ships across India" },
];

// Feature highlights shown in the home "About" section.
export const HOME_ABOUT_FEATURES = [
  { title: "Natural Materials", desc: "Premium cotton yarn" },
  { title: "Made to Order", desc: "Fresh for every customer" },
  { title: "Custom Options", desc: "Pick your colour & size" },
  { title: "Safe Packaging", desc: "Delivered with care" },
];

// Ordered process timeline for the About page.
// Keep step values as strings to preserve formatting like "01", "02", etc.
export const ABOUT_CRAFT_STEPS = [
  {
    step: "01",
    title: "Inspiration & Sketching",
    desc: "Every piece begins with an idea - a texture, a colour, a memory. Designs are visualised and planned before the crafting starts.",
  },
  {
    step: "02",
    title: "Gathering Materials",
    desc: "From premium yarn for crochet to clay and tools for mudwork - careful selection ensures quality, finish, and durability.",
  },
  {
    step: "03",
    title: "Crafting by Hand",
    desc: "Crochet, mudwork, and other handmade techniques are created stitch-by-stitch and shape-by-shape - always with patience and detail.",
  },
  {
    step: "04",
    title: "Details, Drying & Finishing",
    desc: "Work is refined, dried/finished as required, and checked closely so each artwork looks as beautiful as it feels.",
  },
  {
    step: "05",
    title: "Packed with Care",
    desc: "Each artwork is packed thoughtfully, ready to be gifted or cherished - because the unboxing experience matters.",
  },
];

// Value proposition cards on the About page.
export const ABOUT_VALUES = [
  {
    title: "Handcrafted with Love",
    desc: "Every piece is made by hand - from crochet to mudwork - with care, patience, and true craftsmanship.",
  },
  {
    title: "Quality Materials",
    desc: "Carefully chosen supplies, finishes, and tools - so your artwork looks beautiful and lasts longer.",
  },
  {
    title: "Made with Intention",
    desc: "Nothing is rushed. We create each artwork with attention to detail, one step at a time.",
  },
  {
    title: "Custom & Personal",
    desc: "We bring your ideas to life - colours, designs, themes, and preferences - whatever makes it truly yours.",
  },
];

// FAQ content for the Contact page.
// q = question, a = answer.
export const CONTACT_FAQS = [
  {
    q: "How long does delivery take?",
    a: "Most orders are dispatched within 3-5 business days. Delivery takes an additional 2-7 days depending on your location across India.",
  },
  {
    q: "Can I customise the colours?",
    a: "Absolutely! Just mention your preferred colours when you WhatsApp us and we'll do our best to accommodate. We have a wide range of yarn colours available.",
  },
  {
    q: "Do you accept bulk or gifting orders?",
    a: "Yes! We love creating personalised gift sets and bulk orders for events like baby showers, weddings, and corporate gifting. Message us for special pricing.",
  },
  {
    q: "How do I care for my handmade product?",
    a: "Hand wash gently in cold water with mild soap. Lay flat to dry. Avoid wringing or machine washing to preserve the shape and texture.",
  },
];

// Reusable prefilled WhatsApp message templates used across the site.
// Keep plain text here; components apply encodeURIComponent when building URLs.
export const WHATSAPP_TEMPLATES = {
  // Home hero: "Chat with us" button.
  homeCollection: "Hi! I'd love to see your crochet collection.",
  // Home CTA: custom order button.
  homeCustomOrder: "Hi! I'd like to place a custom crochet order.",
  // Contact page: intro chat card.
  contactIntro: "Hi! I'd like to get in touch about your handmade products.",
  // Contact page: custom order starter with placeholders.
  contactCustomOrder:
    "Hi! I'd like to request a custom handmade piece.\n\nWhat I want: \nColours: \nOccasion: \nBudget: ",
  // Footer: custom order button.
  footerCustomOrder:
    "Hi! I'd like to place a custom crochet order. Here are my requirements:",
  // Floating WhatsApp button.
  floatInterested: "Hi! I'm interested in your crochet products.",
};
