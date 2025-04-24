# Animate Component Library

A collection of animation components and utilities based on Framer Motion, designed to provide easy-to-use animation solutions.

## Directory Structure

```
animate/
├── motion-container.tsx    # General animation container component
├── motion-lazy.tsx        # Lazy loading animation component
├── motion-viewport.tsx    # Viewport animation component
├── types.ts              # Type definitions
├── variants/            # Animation variants
└── scroll-progress/     # Scroll progress components
```

## Component Documentation

### MotionContainer

A general-purpose animation container component that wraps content with animation effects.

```tsx
import MotionContainer from '@/components/animate/motion-container';

// Usage example
<MotionContainer>
  <YourComponent />
</MotionContainer>
```

Features:
- Automatically applies initial, animate, and exit states
- Supports custom className for styling
- Implements animation using the variants system
- Inherits animation properties to child components
- Provides consistent animation behavior across the application

Props:
- `children`: React nodes to be animated
- `className`: Optional CSS class name
- `...MotionProps`: All Framer Motion props are supported

### MotionLazy

A component for lazy loading animation features to reduce bundle size.

```tsx
import { MotionLazy } from '@/components/animate/motion-lazy';

// Usage example
<MotionLazy>
  <YourComponent />
</MotionLazy>
```

Features:
- Dynamically loads animation features on demand
- Reduces initial bundle size
- Supports strict mode for better development experience
- Wraps content in a full-height container
- Uses domMax features for optimal performance

Props:
- `children`: React nodes to be wrapped in lazy loading context

### MotionViewport

A component for implementing scroll-triggered animations.

```tsx
import MotionViewport from '@/components/animate/motion-viewport';

// Usage example
<MotionViewport>
  <YourComponent />
</MotionViewport>
```

Features:
- Triggers animations when elements enter the viewport
- Configurable trigger threshold (default: 0.3)
- Supports one-time animation triggers
- Inherits animation variants from container
- Optimized for scroll performance

Props:
- `children`: React nodes to be animated
- `className`: Optional CSS class name
- `viewport`: Viewport configuration object
  - `once`: Boolean to trigger animation only once
  - `amount`: Number (0-1) for trigger threshold
- `...MotionProps`: All Framer Motion props are supported

## Animation Variants

The `variants` directory contains predefined animation variants that can be used with these components. These variants provide consistent animation patterns across the application.

Common variants include:
- Fade in/out
- Slide in/out
- Scale
- Stagger children animations

To use custom variants:
```tsx
import { varContainer } from './variants';

const customVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

<MotionContainer variants={customVariants}>
  <YourComponent />
</MotionContainer>
```
