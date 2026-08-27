export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },
  DASHBOARD: {
    SUMMARY: "/dashboard/summary",
  },
  SEO: {
    SUMMARY: "/seo/summary",
  },
  BLOG: {
    LIST: "/blog",
  },
  SUBSCRIBERS: {
    LIST: "/subscribers",
  },
  EMAIL: {
    TEMPLATES: "/email/templates",
  },
  SOCIAL: {
    LIST: "/social",
  },
  SECURITY: {
    LOGIN_HISTORY: "/login-history",
  },
  SETTINGS: {
    SITE: "/settings/site",
  },
} as const;
