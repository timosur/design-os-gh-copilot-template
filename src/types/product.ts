/**
 * Product types for Design OS v2
 */

// =============================================================================
// Product Overview
// =============================================================================

export interface Problem {
  title: string;
  solution: string;
}

export interface ProductOverview {
  name: string;
  description: string;
  problems: Problem[];
  features: string[];
}

// =============================================================================
// Product Roadmap
// =============================================================================

export interface Section {
  id: string; // slug derived from title
  title: string;
  description: string;
  order: number;
}

export interface ProductRoadmap {
  sections: Section[];
}

// =============================================================================
// Data Shape
// =============================================================================

export interface Entity {
  name: string;
  description: string;
}

export interface DataShape {
  entities: Entity[];
  relationships: string[];
}

// =============================================================================
// Design System
// =============================================================================

export interface ColorTokens {
  primary: string;
  secondary: string;
  neutral: string;
}

export interface TypographyTokens {
  heading: string;
  body: string;
  mono: string;
}

export interface DesignSystem {
  colors: ColorTokens | null;
  typography: TypographyTokens | null;
}

// =============================================================================
// Brand Guide
// =============================================================================

export interface BrandColorChoice {
  name: string;
  rationale: string;
}

export interface BrandColors {
  primary: BrandColorChoice;
  secondary: BrandColorChoice;
  neutral: BrandColorChoice;
  semantic?: {
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
}

export interface BrandFontChoice {
  font: string;
  weights?: number[];
  rationale?: string;
}

export interface BrandTypography {
  heading: BrandFontChoice;
  body: BrandFontChoice;
  mono?: BrandFontChoice;
}

export interface BrandVoice {
  tone: string;
  characteristics: string[];
  writingStyle?: string;
}

export interface BrandLogo {
  primaryFile?: string;
  variants?: string[];
  protectedArea?: string;
  minSize?: string;
  usageNotes?: string;
}

export interface BrandUIStyle {
  borderRadius?: string;
  shadows?: string;
  borders?: string;
  spacing?: string;
  density?: string;
}

export interface BrandPersonality {
  adjectives: string[];
  mood: string;
  visualDirection?: string;
}

export interface BrandGuide {
  colors?: BrandColors;
  typography?: BrandTypography;
  voice?: BrandVoice;
  logo?: BrandLogo;
  uiStyle?: BrandUIStyle;
  personality?: BrandPersonality;
  resources?: string[];
  generatedAt?: string;
}

// =============================================================================
// Application Shell
// =============================================================================

export interface ShellSpec {
  raw: string;
  overview: string;
  navigationItems: string[];
  layoutPattern: string;
}

export interface ShellInfo {
  spec: ShellSpec | null;
  hasComponents: boolean;
}

// =============================================================================
// Combined Product Data
// =============================================================================

export interface ProductData {
  overview: ProductOverview | null;
  roadmap: ProductRoadmap | null;
  dataShape: DataShape | null;
  brandGuide: BrandGuide | null;
  designSystem: DesignSystem | null;
  shell: ShellInfo | null;
}
