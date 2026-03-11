/**
 * Brand guide loading utilities
 */

import type { BrandGuide } from "@/types/product";

// Load JSON file from product/brand-guide at build time
const brandGuideFiles = import.meta.glob("/product/brand-guide/*.json", {
  eager: true,
}) as Record<string, { default: BrandGuide }>;

// Load markdown file for raw content
const brandGuideMarkdown = import.meta.glob("/product/brand-guide/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Check for resources folder
const resourceFiles = import.meta.glob("/product/brand-guide/resources/*", {
  eager: true,
}) as Record<string, unknown>;

/**
 * Load the brand guide JSON
 *
 * Expected format at product/brand-guide/brand-guide.json:
 * {
 *   "colors": {
 *     "primary": { "name": "lime", "rationale": "..." },
 *     "secondary": { "name": "teal", "rationale": "..." },
 *     "neutral": { "name": "stone", "rationale": "..." }
 *   },
 *   "typography": { ... },
 *   "voice": { ... },
 *   "logo": { ... },
 *   "uiStyle": { ... },
 *   "personality": { ... }
 * }
 */
export function loadBrandGuide(): BrandGuide | null {
  const brandGuideModule = brandGuideFiles["/product/brand-guide/brand-guide.json"];
  if (!brandGuideModule?.default) return null;

  return brandGuideModule.default;
}

/**
 * Load the brand guide markdown content
 */
export function loadBrandGuideMarkdown(): string | null {
  const markdown = brandGuideMarkdown["/product/brand-guide/brand-guide.md"];
  return markdown || null;
}

/**
 * Check if a brand guide has been defined
 */
export function hasBrandGuide(): boolean {
  return "/product/brand-guide/brand-guide.json" in brandGuideFiles;
}

/**
 * Check if brand guide markdown exists
 */
export function hasBrandGuideMarkdown(): boolean {
  return "/product/brand-guide/brand-guide.md" in brandGuideMarkdown;
}

/**
 * Get list of resource files in the brand-guide/resources folder
 */
export function getBrandResourceFiles(): string[] {
  return Object.keys(resourceFiles).map((path) =>
    path.replace("/product/brand-guide/resources/", ""),
  );
}

/**
 * Check if there are any brand resources to analyze
 */
export function hasBrandResources(): boolean {
  return Object.keys(resourceFiles).length > 0;
}

/**
 * Extract color suggestions from the brand guide for design-tokens agent
 */
export function getBrandColorSuggestions(): {
  primary?: string;
  secondary?: string;
  neutral?: string;
} | null {
  const brandGuide = loadBrandGuide();
  if (!brandGuide?.colors) return null;

  return {
    primary: brandGuide.colors.primary?.name,
    secondary: brandGuide.colors.secondary?.name,
    neutral: brandGuide.colors.neutral?.name,
  };
}

/**
 * Extract typography suggestions from the brand guide for design-tokens agent
 */
export function getBrandTypographySuggestions(): {
  heading?: string;
  body?: string;
  mono?: string;
} | null {
  const brandGuide = loadBrandGuide();
  if (!brandGuide?.typography) return null;

  return {
    heading: brandGuide.typography.heading?.font,
    body: brandGuide.typography.body?.font,
    mono: brandGuide.typography.mono?.font,
  };
}
