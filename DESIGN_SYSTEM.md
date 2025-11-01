# MSADDI Design System

**Version:** 2.0.0
**Last Updated:** 2025-11-01
**Status:** Production Ready

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Design Tokens](#design-tokens)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing](#spacing)
6. [Components](#components)
7. [Industrial UX Patterns](#industrial-ux-patterns)
8. [Usage Guide](#usage-guide)
9. [Best Practices](#best-practices)

---

## Introduction

The MSADDI Design System is a comprehensive set of design standards, components, and patterns specifically created for the metal fabrication industry. It ensures consistency, accessibility, and professional aesthetics across all touchpoints.

### Design Philosophy

1. **Industrial Aesthetic** - Professional, trustworthy, precision-focused
2. **High Contrast** - Readable in manufacturing environments
3. **Metal Color Palette** - Industry-appropriate colors
4. **Accessibility First** - WCAG 2.1 Level AA compliance
5. **Scalability** - Works from mobile to large displays

---

## Design Tokens

All design values are centralized in [lib/design-tokens.ts](lib/design-tokens.ts).

### Import Tokens

```typescript
import { designTokens } from '@/lib/design-tokens';

const { colors, typography, spacing, borderRadius, shadows } = designTokens;
```

### Why Design Tokens?

- ✅ **Single Source of Truth** - Change once, update everywhere
- ✅ **Type Safety** - TypeScript ensures correct usage
- ✅ **Consistency** - All components use same values
- ✅ **Maintainability** - Easy to update brand colors

---

## Color System

### Primary Colors

```typescript
colors.primary[500]  // #2196F3 - Main brand color (Steel Blue)
colors.primary[400]  // #42A5F5 - Light variant
colors.primary[700]  // #1976D2 - Dark variant
```

**When to Use:**
- Primary buttons
- Links
- Selected states
- Main CTAs

### Secondary Colors

```typescript
colors.secondary[600]  // #757575 - Main secondary (Metallic Gray)
colors.secondary[400]  // #BDBDBD - Light variant
colors.secondary[800]  // #424242 - Dark variant
```

**When to Use:**
- Secondary buttons
- Less important actions
- Dividers
- Borders

### Accent Colors

```typescript
colors.accent[500]  // #FF9800 - Safety Orange
```

**When to Use:**
- Important CTAs
- Urgent notifications
- Highlighted features

### Semantic Colors

```typescript
colors.success[500]  // #4CAF50 - Green (Approved, Quality)
colors.warning[500]  // #FFEB3B - Yellow (Caution)
colors.error[500]    // #F44336 - Red (Error, Rejected)
```

**When to Use:**
- Success: Approved status, success messages
- Warning: Pending status, warnings
- Error: Errors, rejected status

### Industry-Specific Colors

#### Material Colors

```typescript
designTokens.industry.materials.steel       // #8B9DC3
designTokens.industry.materials.stainless   // #C0C0C0
designTokens.industry.materials.aluminum    // #848789
designTokens.industry.materials.copper      // #B87333
designTokens.industry.materials.brass       // #B5A642
designTokens.industry.materials.bronze      // #CD7F32
```

**Usage:**
```tsx
import { MaterialChip } from '@/components/ui';

<MaterialChip material="stainless" specification="316L" />
```

#### Process Colors

```typescript
designTokens.industry.processes.cutting     // Blue
designTokens.industry.processes.bending     // Orange
designTokens.industry.processes.welding     // Yellow
designTokens.industry.processes.finishing   // Green
designTokens.industry.processes.assembly    // Gray
```

**Usage:**
```tsx
import { ProcessBadge } from '@/components/ui';

<ProcessBadge process="cutting" />
<ProcessBadge process="welding" />
```

#### Quality Indicators

```typescript
designTokens.industry.quality.approved      // Green
designTokens.industry.quality.pending       // Yellow
designTokens.industry.quality.rejected      // Red
designTokens.industry.quality.inProgress    // Blue
```

**Usage:**
```tsx
import { StatusIndicator } from '@/components/ui';

<StatusIndicator status="approved" label="Quality Check Passed" />
```

---

## Typography

### Font Families

```typescript
typography.fontFamily.primary    // Inter (body text, UI)
typography.fontFamily.secondary  // Roboto (alternative)
typography.fontFamily.mono       // Roboto Mono (code, specifications)
```

### Font Sizes

```typescript
typography.fontSize.xs    // 0.75rem  (12px)
typography.fontSize.sm    // 0.875rem (14px)
typography.fontSize.base  // 1rem     (16px)
typography.fontSize.lg    // 1.125rem (18px)
typography.fontSize.xl    // 1.25rem  (20px)
typography.fontSize['2xl'] // 1.5rem  (24px)
typography.fontSize['3xl'] // 1.875rem (30px)
typography.fontSize['4xl'] // 2.25rem (36px)
typography.fontSize['5xl'] // 3rem    (48px)
typography.fontSize['6xl'] // 3.75rem (60px)
typography.fontSize['7xl'] // 4.5rem  (72px)
```

### Font Weights

```typescript
typography.fontWeight.light      // 300
typography.fontWeight.regular    // 400
typography.fontWeight.medium     // 500
typography.fontWeight.semibold   // 600
typography.fontWeight.bold       // 700
typography.fontWeight.extrabold  // 800
```

### Usage Example

```tsx
<Typography
  sx={{
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  }}
>
  Metal Fabrication Excellence
</Typography>
```

---

## Spacing

All spacing uses an **8px grid system**.

```typescript
spacing[0]  // 0
spacing[1]  // 0.25rem (4px)
spacing[2]  // 0.5rem  (8px)
spacing[3]  // 0.75rem (12px)
spacing[4]  // 1rem    (16px)
spacing[5]  // 1.25rem (20px)
spacing[6]  // 1.5rem  (24px)
spacing[8]  // 2rem    (32px)
spacing[10] // 2.5rem  (40px)
spacing[12] // 3rem    (48px)
spacing[16] // 4rem    (64px)
spacing[20] // 5rem    (80px)
spacing[24] // 6rem    (96px)
```

### Usage Example

```tsx
<Box
  sx={{
    padding: spacing[4],        // 16px padding
    marginBottom: spacing[8],   // 32px margin
    gap: spacing[2],            // 8px gap
  }}
>
  Content
</Box>
```

---

## Components

### Button

```tsx
import { Button } from '@/components/ui';

// Primary Button
<Button variant="primary" size="lg">
  Get Quote
</Button>

// Secondary Button
<Button variant="secondary" size="md">
  Learn More
</Button>

// Outline Button
<Button variant="outline" size="sm">
  View Details
</Button>

// Loading State
<Button variant="primary" loading={isLoading}>
  Submit
</Button>

// With Icons
<Button variant="primary" startIcon={<CheckIcon />}>
  Approved
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `startIcon`: ReactNode
- `endIcon`: ReactNode

---

### Badge

```tsx
import { Badge } from '@/components/ui';

// Status Badges
<Badge variant="success">In Stock</Badge>
<Badge variant="warning">Low Stock</Badge>
<Badge variant="error">Out of Stock</Badge>

// Info Badge
<Badge variant="info">New</Badge>

// Dot Indicator
<Badge variant="success" dot />
```

**Props:**
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean

---

### StatusIndicator

**Industrial Component** for manufacturing status.

```tsx
import { StatusIndicator } from '@/components/ui';

// Order Status
<StatusIndicator status="approved" />
<StatusIndicator status="pending" label="Awaiting Review" />
<StatusIndicator status="rejected" label="Quality Issue" />
<StatusIndicator status="inProgress" label="Manufacturing" />

// Sizes
<StatusIndicator status="approved" size="sm" />
<StatusIndicator status="approved" size="lg" />

// Without Icon
<StatusIndicator status="approved" showIcon={false} />
```

**Props:**
- `status`: 'approved' | 'pending' | 'rejected' | 'inProgress'
- `label`: string (optional)
- `showIcon`: boolean
- `size`: 'sm' | 'md' | 'lg'

---

### MaterialChip

**Industrial Component** for material type indication.

```tsx
import { MaterialChip } from '@/components/ui';

// Basic Material
<MaterialChip material="steel" />
<MaterialChip material="stainless" />
<MaterialChip material="aluminum" />

// With Specification
<MaterialChip material="stainless" specification="304" />
<MaterialChip material="stainless" specification="316L" />
<MaterialChip material="aluminum" specification="6061-T6" />

// Without Color Dot
<MaterialChip material="copper" showColorDot={false} />

// Sizes
<MaterialChip material="brass" size="sm" />
<MaterialChip material="bronze" size="lg" />
```

**Props:**
- `material`: 'steel' | 'stainless' | 'aluminum' | 'copper' | 'brass' | 'bronze'
- `specification`: string (optional)
- `showColorDot`: boolean
- `size`: 'sm' | 'md' | 'lg'

---

### ProcessBadge

**Industrial Component** for manufacturing process indication.

```tsx
import { ProcessBadge } from '@/components/ui';

// Process Indicators
<ProcessBadge process="cutting" />
<ProcessBadge process="bending" />
<ProcessBadge process="welding" />
<ProcessBadge process="finishing" />
<ProcessBadge process="assembly" />

// Custom Label
<ProcessBadge process="welding" label="TIG Welding" />

// Without Icon
<ProcessBadge process="cutting" showIcon={false} />

// Sizes
<ProcessBadge process="bending" size="sm" />
<ProcessBadge process="welding" size="lg" />
```

**Props:**
- `process`: 'cutting' | 'bending' | 'welding' | 'finishing' | 'assembly'
- `label`: string (optional)
- `showIcon`: boolean
- `size`: 'sm' | 'md' | 'lg'

---

## Industrial UX Patterns

### Pattern 1: Product Card with Material & Status

```tsx
import { MaterialChip, Badge, Button, StatusIndicator } from '@/components/ui';

<Card>
  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
    <Badge variant="primary">Featured</Badge>
    <Badge variant="success">In Stock</Badge>
  </Box>

  <Typography variant="h5">Custom Metal Part</Typography>

  <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
    <MaterialChip material="stainless" specification="316L" />
    <StatusIndicator status="approved" size="sm" />
  </Box>

  <Button variant="primary" fullWidth>
    Request Quote
  </Button>
</Card>
```

---

### Pattern 2: Manufacturing Process Flow

```tsx
import { ProcessBadge } from '@/components/ui';

<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  <ProcessBadge process="cutting" />
  <ArrowForwardIcon />
  <ProcessBadge process="bending" />
  <ArrowForwardIcon />
  <ProcessBadge process="welding" />
  <ArrowForwardIcon />
  <ProcessBadge process="finishing" />
</Box>
```

---

### Pattern 3: RFQ Status Dashboard

```tsx
import { StatusIndicator, MaterialChip } from '@/components/ui';

<Table>
  <TableRow>
    <TableCell>RFQ-2024-001</TableCell>
    <TableCell>
      <MaterialChip material="aluminum" specification="6061" size="sm" />
    </TableCell>
    <TableCell>
      <StatusIndicator status="inProgress" size="sm" />
    </TableCell>
    <TableCell>$2,450</TableCell>
  </TableRow>
</Table>
```

---

## Usage Guide

### Getting Started

1. **Import Design Tokens:**
```typescript
import { designTokens } from '@/lib/design-tokens';
```

2. **Import Components:**
```typescript
import { Button, Badge, StatusIndicator } from '@/components/ui';
```

3. **Use in JSX:**
```tsx
<Button variant="primary" size="lg">
  Get Started
</Button>
```

---

### Do's and Don'ts

#### ✅ Do

- Use design tokens for all values
- Use components from the library
- Follow spacing grid (8px)
- Use semantic colors appropriately
- Test in RTL and LTR modes

#### ❌ Don't

- Hardcode color values
- Use arbitrary spacing
- Create custom buttons (use Button component)
- Mix design systems
- Ignore accessibility guidelines

---

## Best Practices

### 1. Consistent Spacing

**Good:**
```tsx
<Box sx={{ padding: spacing[4], marginBottom: spacing[8] }}>
  Content
</Box>
```

**Bad:**
```tsx
<Box sx={{ padding: '15px', marginBottom: '35px' }}>
  Content
</Box>
```

---

### 2. Use Semantic Colors

**Good:**
```tsx
<Alert severity="success">Order approved!</Alert>
<StatusIndicator status="approved" />
```

**Bad:**
```tsx
<Alert style={{ backgroundColor: '#4CAF50' }}>Order approved!</Alert>
```

---

### 3. Component Composition

**Good:**
```tsx
<Card>
  <Badge variant="success">In Stock</Badge>
  <MaterialChip material="stainless" specification="316" />
  <Button variant="primary">Order Now</Button>
</Card>
```

**Bad:**
```tsx
<div>
  <span style={{ color: 'green' }}>In Stock</span>
  <span>Stainless 316</span>
  <button style={{ backgroundColor: 'blue' }}>Order Now</button>
</div>
```

---

### 4. Responsive Design

**Good:**
```tsx
<Typography
  variant="h2"
  sx={{
    fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
  }}
>
  Responsive Heading
</Typography>
```

---

### 5. Accessibility

**Good:**
```tsx
<Button
  variant="primary"
  aria-label="Submit quote request"
  disabled={isDisabled}
>
  Submit Quote
</Button>
```

**Bad:**
```tsx
<div onClick={handleClick} style={{ cursor: 'pointer' }}>
  Submit Quote
</div>
```

---

## Accessibility Guidelines

### Minimum Touch Targets

All interactive elements must be **at least 44px × 44px**.

```typescript
designTokens.accessibility.minTouchTarget  // "44px"
```

### Focus States

All interactive elements have visible focus rings:

```typescript
designTokens.accessibility.focusRing.width   // "2px"
designTokens.accessibility.focusRing.offset  // "2px"
designTokens.accessibility.focusRing.color   // colors.primary[500]
```

### Color Contrast

- **Normal Text:** 4.5:1 minimum
- **Large Text (18px+):** 3:1 minimum
- **UI Components:** 3:1 minimum

---

## Theme Customization

### Updating Theme Colors

To update brand colors globally, edit [lib/design-tokens.ts](lib/design-tokens.ts:22-35):

```typescript
export const colors = {
  primary: {
    500: '#YOUR_NEW_COLOR',  // Update main brand color
  },
  // ...
};
```

All components will automatically update.

---

### Adding New Tokens

To add new design tokens:

1. **Add to design-tokens.ts:**
```typescript
export const newToken = {
  value: '...',
} as const;
```

2. **Export in designTokens object:**
```typescript
export const designTokens = {
  // ... existing tokens
  newToken,
} as const;
```

3. **Use in components:**
```typescript
import { designTokens } from '@/lib/design-tokens';
const { newToken } = designTokens;
```

---

## Support

### Resources

- **Design Tokens:** [lib/design-tokens.ts](lib/design-tokens.ts)
- **Theme:** [lib/theme.ts](lib/theme.ts)
- **Components:** [components/ui/](components/ui/)
- **Phase 2 Docs:** [PHASE_2_COMPLETION.md](PHASE_2_COMPLETION.md)

### Questions?

For design system questions or component requests, consult:
1. PHASE_2_COMPLETION.md
2. Component source code in [components/ui/](components/ui/)
3. Design tokens reference in [lib/design-tokens.ts](lib/design-tokens.ts)

---

**Version:** 2.0.0
**Last Updated:** 2025-11-01
**Maintainer:** MSADDI Development Team
