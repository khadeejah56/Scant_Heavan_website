// Shared easing curve for consistent motion across the site.
// Typed as a readonly tuple so it satisfies Framer Motion's BezierDefinition
// type when used inside explicitly-typed `Variants` objects.
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;
