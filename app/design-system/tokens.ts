export const fennecDesignSystem = {
  brand: {
    primary: '#c8171d',
    primaryHover: '#a91017',
    secondary: '#111827',
  },
  breakpoints: {
    mobile: 620,
    tablet: 900,
    desktop: 1180,
    wide: 1440,
  },
  containers: {
    default: 1180,
    narrow: 880,
  },
} as const

export type FennecBreakpoint = keyof typeof fennecDesignSystem.breakpoints
