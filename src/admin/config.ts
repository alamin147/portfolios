/**
 * Base path for the admin section. Obscured on purpose (security-by-obscurity
 * on top of the JWT auth). Change this one value to move the whole admin area.
 */
export const ADMIN_BASE = "/xtcnfz-adm-xtcn-in";

/** Build an admin URL, e.g. adminPath("home/create-blog"). */
export const adminPath = (sub = "") =>
  sub ? `${ADMIN_BASE}/${sub}` : ADMIN_BASE;
