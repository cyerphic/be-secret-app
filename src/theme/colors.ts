export type ProductTheme = 'app';
export type ThemeTone = 'light' | 'dark';

type Palette = {
  primary: string;              
  background: string;           

  // first layer
  surface: string;              
  onSurface: string;            

  // second layer
  surfaceVariant: string;       
  onSurfaceVariant: string;     

  // third layer
  primaryContainer: string;     
  onPrimaryContainer: string;   

  // Structural elements
  outline: string;              

  // // Semantic States
  error: string;
  errorContainer: string;
  onErrorContainer: string;

  warning: string;
  warningContainer: string;
  onWarningContainer: string;

  success: string;
  successContainer: string;
  onSuccessContainer: string;
};

type ProductPalette = Record<ThemeTone, Palette>;

export const appPalette: ProductPalette = {
  light: {
    // === Brand Colors (Modern iOS/Material Blue) ===
    primary: '#0B5FFF',
    background: '#F8FAFC',

    // === Surface Levels ===
    surface: '#FFFFFF',              // white
    onSurface: '#0F172A',            // slate-900

    surfaceVariant: '#F1F5F9',       // slate-100
    onSurfaceVariant: '#475569',     // slate-600

    primaryContainer: '#DBEAFE',     // blue-100
    onPrimaryContainer: '#1E3A8A',   // blue-900

    outline: '#D0D7E2',              // divider

    // === Semantic States ===

    // Error (System Red)
    error: '#DC2626',                // red-600
    errorContainer: '#FEE2E2',       // red-100
    onErrorContainer: '#7F1D1D',     // red-900

    warning: '#D97706',              // amber-600
    warningContainer: '#FEF3C7',     // amber-100
    onWarningContainer: '#78350F',   // amber-900

    // Success (Emerald Green)
    success: '#16A34A',              // green-600
    successContainer: '#DCFCE7',     // green-100
    onSuccessContainer: '#14532D',   // green-900
  },

  dark: {
    // === Brand Colors (Elevated Brightness for OLED) ===
    primary: '#82A9FF',
    background: '#0B1220',

    // === Surface Levels ===
    surface: '#111827',              // slate-900
    onSurface: '#E5E7EB',            // gray-200

    surfaceVariant: '#1F2937',       // slate-800
    onSurfaceVariant: '#9CA3AF',     // gray-400

    primaryContainer: '#1E3A8A',
    onPrimaryContainer: '#DBEAFE',

    outline: '#374151',              // gray-700

    // === Semantic States (Adjusted for Dark Mode Contrast) ===

    error: '#F87171',                // red-400
    errorContainer: '#7F1D1D',       // red-900
    onErrorContainer: '#FEE2E2',

    warning: '#FBBF24',              // amber-400
    warningContainer: '#78350F',
    onWarningContainer: '#FEF3C7',

    success: '#4ADE80',              // green-400
    successContainer: '#14532D',
    onSuccessContainer: '#DCFCE7',
  },
};

export const productPalette: Record<ProductTheme, ProductPalette> = {
  app: appPalette,
};