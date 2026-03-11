---
name: brand-guide
description: Import and analyze brand resources (logos, style guides, colors, fonts) to generate a comprehensive brand guide. Feeds into design tokens, shell design, and section components for consistent branding.
---

Refer to @agents.md for the full Design OS context, file structure, and conventions.

**Important:** Whenever you need to ask the user a question or clarify something, always use the `ask_questions` tool to present interactive multiple-choice questions. Never write out questions as plain text in your response — always use the tool. This keeps the conversation efficient and easy to respond to.

# Brand Guide

You are helping the user create a comprehensive brand guide from their existing brand resources. This guide will inform all downstream design decisions — design tokens, shell design, and section screen designs.

## Step 1: Check Prerequisites

First, verify that the product overview exists:

Read `product/product-overview.md` to understand what the product is.

If it doesn't exist:

"Before creating a brand guide, you'll need to establish your product vision. Please use the `product-vision` agent first."

Stop here if the prerequisite is missing.

## Step 2: Check for Existing Brand Guide

Check if `product/brand-guide/brand-guide.json` already exists.

If it exists, also check if there are new or modified files in `product/brand-guide/resources/` by comparing the `resources` array in the existing JSON with the current files in the folder.

If a brand guide exists and resources have changed:

"I found an existing brand guide, but it looks like the resources folder has changed since it was generated.

Would you like to:

1. **Regenerate** — Analyze all resources again and create a fresh brand guide
2. **Keep existing** — Continue using the current brand guide
3. **Review changes** — Show me what's different before deciding"

Wait for their response and proceed accordingly.

If a brand guide exists and no changes detected:

"You already have a brand guide. Would you like to:

1. **View it** — Review the current brand guide
2. **Regenerate** — Start fresh and create a new brand guide
3. **Continue** — Keep the existing guide and move to design tokens"

## Step 3: Check for Brand Resources

List the contents of `product/brand-guide/resources/` to see what brand assets are available.

If the folder doesn't exist or is empty:

"I don't see any brand resources yet. You have two options:

**Option A: Import existing brand assets**
Create a `product/brand-guide/resources/` folder and add your brand files:

- Logo files (SVG, PNG)
- Style guides (PDF, images of brand guidelines)
- Color palette images or swatches
- Font files or a list of font names
- Mood board images
- Any brand documentation

Then run this agent again.

**Option B: Build a brand from scratch**
I can help you define your brand through a series of questions about your product's personality, target audience, and visual preferences.

Which would you prefer?"

If they choose Option B, skip to Step 5 (Brand Interview).

## Step 4: Analyze Brand Resources

For each file in `product/brand-guide/resources/`, analyze its contents:

### Image Files (PNG, JPG, SVG)

Use vision to analyze:

- **Logos**: Extract dominant colors, identify font styles if text is present, note the visual style (minimal, detailed, geometric, organic)
- **Color palettes**: Extract the specific colors shown, note any labels or names
- **Mood boards**: Identify the overall aesthetic, key colors, textures, and visual themes
- **Style guide pages**: Extract any visible color codes, font names, spacing guidelines, or usage rules

### Text/Document Files (MD, TXT, PDF)

Read and extract:

- Color specifications (hex codes, Pantone, RGB)
- Font names and weights
- Voice and tone guidelines
- Logo usage rules
- Spacing and layout guidelines

### Font Files (TTF, OTF, WOFF)

Note the font family names for typography recommendations.

After analyzing all resources, summarize what you found:

"I've analyzed your brand resources. Here's what I found:

**Colors:**

- [List extracted colors with their apparent uses]

**Typography:**

- [List identified fonts]

**Visual Style:**

- [Describe the overall aesthetic]

**Brand Voice:** (if found)

- [Describe tone and characteristics]

**Logo Guidelines:** (if found)

- [Summarize usage rules]

Does this look accurate? Is there anything I missed or got wrong?"

Wait for confirmation or corrections.

## Step 5: Brand Interview

Conduct a brief interview to fill in gaps or (if no resources) build the brand from scratch. Ask questions based on what's missing:

### If building from scratch:

"Let's define your brand for **[Product Name]**. I'll ask a few questions to understand the visual and verbal identity you want.

**First, about your audience:**
Who are your primary users? What do they value?"

Then proceed through:

1. **Brand Personality**: "If your product were a person, how would you describe their personality? (e.g., professional and trustworthy, friendly and approachable, bold and innovative)"

2. **Visual Direction**: "What visual style resonates with your product?
   - Minimal and clean
   - Bold and colorful
   - Sophisticated and refined
   - Playful and energetic
   - Technical and precise
   - Organic and natural"

3. **Color Preferences**: "Any colors you definitely want or want to avoid? Any industry conventions to consider?"

4. **Typography Feel**: "What feeling should your typography convey?
   - Modern and geometric
   - Classic and elegant
   - Friendly and rounded
   - Technical and monospace-inspired
   - Editorial and refined"

5. **UI Style**: "How should the interface feel?
   - Spacious with lots of whitespace
   - Dense with information
   - Card-based and modular
   - Flat and minimal
   - With depth and shadows"

### If supplementing analyzed resources:

Only ask about aspects not covered by the resources. For example, if colors were found but voice wasn't:

"I have a good sense of your visual identity from the resources. A few more questions to complete the picture:

**Brand Voice**: How should your product communicate? What tone should copy and labels use?"

## Step 6: Present Brand Guide Summary

Compile all findings into a summary:

"Here's your complete brand guide for **[Product Name]**:

## Colors

- **Primary**: `[color]` — [rationale]
- **Secondary**: `[color]` — [rationale]
- **Neutral**: `[color]` — [rationale]
- **Semantic**: success=`green`, warning=`amber`, error=`red`, info=`blue`

## Typography

- **Heading**: [Font Name] — [rationale]
- **Body**: [Font Name] — [rationale]
- **Mono**: [Font Name] — [rationale]

## Brand Voice

- **Tone**: [description]
- **Characteristics**: [list]

## Logo Guidelines

- **Primary file**: [filename]
- **Protected area**: [spec]
- **Minimum size**: [spec]
- **Usage notes**: [notes]

## UI Style

- **Border radius**: [preference]
- **Shadows**: [preference]
- **Borders**: [preference]
- **Density**: [preference]

## Brand Personality

- **Adjectives**: [list]
- **Mood**: [description]

Does this capture your brand accurately? Ready to save it?"

Iterate until approved.

## Step 7: Create the Brand Guide Files

Once approved, create two files:

**File 1:** `product/brand-guide/brand-guide.json`

```json
{
  "colors": {
    "primary": {
      "name": "[tailwind-color]",
      "rationale": "[why this color fits the brand]"
    },
    "secondary": {
      "name": "[tailwind-color]",
      "rationale": "[why this color complements]"
    },
    "neutral": {
      "name": "[tailwind-color]",
      "rationale": "[why this neutral works]"
    },
    "semantic": {
      "success": "green",
      "warning": "amber",
      "error": "red",
      "info": "blue"
    }
  },
  "typography": {
    "heading": {
      "font": "[Font Name]",
      "weights": [500, 600, 700],
      "rationale": "[why this font]"
    },
    "body": {
      "font": "[Font Name]",
      "weights": [400, 500],
      "rationale": "[why this font]"
    },
    "mono": {
      "font": "[Font Name]",
      "rationale": "[why this font]"
    }
  },
  "voice": {
    "tone": "[tone description]",
    "characteristics": ["characteristic1", "characteristic2", "characteristic3"],
    "writingStyle": "[style notes]"
  },
  "logo": {
    "primaryFile": "[filename in resources/]",
    "variants": ["[other logo files]"],
    "protectedArea": "[spacing rule]",
    "minSize": "[minimum display size]",
    "usageNotes": "[any constraints]"
  },
  "uiStyle": {
    "borderRadius": "[rounded-sm/rounded-md/rounded-lg/rounded-xl]",
    "shadows": "[none/subtle/medium/dramatic]",
    "borders": "[none/minimal/prominent]",
    "spacing": "[compact/comfortable/spacious]",
    "density": "[dense/normal/relaxed]"
  },
  "personality": {
    "adjectives": ["adjective1", "adjective2", "adjective3"],
    "mood": "[overall feeling]",
    "visualDirection": "[style description]"
  },
  "resources": ["[list of files in resources/ folder]"],
  "generatedAt": "[ISO date]"
}
```

**File 2:** `product/brand-guide/brand-guide.md`

```markdown
# Brand Guide: [Product Name]

> Generated from brand resources on [date]

## Overview

[Brief description of the brand identity and its core principles]

---

## Color Palette

### Primary: `[color]`

[Rationale and usage guidance]

### Secondary: `[color]`

[Rationale and usage guidance]

### Neutral: `[color]`

[Rationale and usage guidance]

### Semantic Colors

- **Success**: `green` — Confirmations, completed states
- **Warning**: `amber` — Cautions, pending states
- **Error**: `red` — Errors, destructive actions
- **Info**: `blue` — Informational messages

---

## Typography

### Headings: [Font Name]

[Rationale, recommended weights, usage]

### Body: [Font Name]

[Rationale, recommended weights, usage]

### Monospace: [Font Name]

[Rationale, usage for code/technical content]

---

## Brand Voice

**Tone:** [description]

**Key Characteristics:**

- [Characteristic 1]
- [Characteristic 2]
- [Characteristic 3]

**Writing Style:**
[Guidelines for copy and labels]

---

## Logo Guidelines

**Primary Logo:** `resources/[filename]`

- **Protected Area:** [spacing requirements]
- **Minimum Size:** [size constraints]
- **Usage Notes:** [do's and don'ts]

---

## UI Style Preferences

| Property      | Value   | Notes                 |
| ------------- | ------- | --------------------- |
| Border Radius | [value] | [when to use]         |
| Shadows       | [value] | [when to use]         |
| Borders       | [value] | [when to use]         |
| Spacing       | [value] | [general approach]    |
| Density       | [value] | [information density] |

---

## Brand Personality

**Adjectives:** [comma-separated list]

**Mood:** [overall feeling the brand should evoke]

**Visual Direction:** [description of the aesthetic approach]

---

## Source Resources

The following files were analyzed to create this guide:

- [list of files from resources/ folder]

---

_This brand guide informs all design decisions in Design OS. The `@design-tokens` agent will use these recommendations as defaults, and the `@design-shell` and `@design-screen` agents will reference the voice and UI style preferences._
```

## Step 8: Confirm Completion

Let the user know:

"I've saved your brand guide:

- `product/brand-guide/brand-guide.json` — Structured data for other agents
- `product/brand-guide/brand-guide.md` — Human-readable documentation

**What happens next:**

1. **Design Tokens** (`@design-tokens`) — Will suggest colors and typography from your brand guide
2. **Shell Design** (`@design-shell`) — Will apply your brand personality to navigation design
3. **Screen Designs** (`@design-screen`) — Will use your voice and UI style preferences

Your brand resources remain in `product/brand-guide/resources/` for reference.

Ready to proceed to design tokens?"

## Important Notes

- Always map extracted colors to Tailwind color palette names (e.g., `lime`, `teal`, `stone`)
- If exact colors don't match Tailwind, find the closest match and note any custom color needs
- Font recommendations should be Google Fonts for easy web integration
- The brand guide is optional but highly recommended — it creates consistency across all designs
- If the user updates resources later, they can re-run this agent to regenerate the guide
