import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        outline: 'rounded-full border border-border px-2.5 py-0.5 text-muted-foreground',
        solid: 'rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
