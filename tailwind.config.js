/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          canvas: "#F8F6F0",       // Soft Alabaster Cream
          surface: "#EFE9DF",      // Warm French Limestone Vellum
          subsurface: "#E5DDD1",   // Sandstone Accent
          ink: "#1C1917",          // Editorial Carbon Ink
          muted: "#575047",        // Warm Umber Charcoal
          border: "#D2C8B8",       // Refined Antique Brass Line
        },
        night: {
          canvas: "#121110",       // Nocturnal Obsidian Charcoal
          surface: "#1A1816",      // Warm Deep Ebony Surface
          subsurface: "#24211E",   // Dark Sandstone Accent
          ink: "#F0EAE1",          // Soft Antique Vellum White Text
          muted: "#A39A8D",        // Weathered Umber Ash
          border: "#3A342C",       // Nocturnal Antique Brass Line
        },
        odyssey: {
          primary: "#15324D",      // Aegean Deep Sea Navy
          secondary: "#BF532C",    // Attic Terracotta Clay
          highlight: "#8A7443",    // Hellenic Olive Bronze
          surface: "#ECF2F6",      // Clean Seafoam Vellum
          darkSurface: "#102030",  // Dark Seafoam Obsidian
          darkBorder: "#2C4661",
        },
        fatima: {
          primary: "#193E30",      // Alexandria Malachite Green (matching palace shutters)
          secondary: "#BA872C",    // Royal 18k Gold Leaf
          highlight: "#82292E",    // Royal Ruby / Bordeaux
          surface: "#EDF3EE",      // Limestone Sage Vellum
          darkSurface: "#0E231B",  // Dark Emerald Obsidian
          darkBorder: "#234D3D",
        },
      },
      fontFamily: {
        'arabic-title': ['Amiri', 'Amiri Quran', 'Scheherazade New', 'serif'],
        'arabic-body': ['Noto Naskh Arabic', 'Lora', 'serif'],
        'display': ['Cinzel', 'Cormorant Garamond', 'serif'],
        'narrative': ['Lora', 'Noto Naskh Arabic', 'serif'],
        'ui': ['Plus Jakarta Sans', 'Cairo', 'sans-serif'],
      },
      boxShadow: {
        'tactile-sm': '2px 2px 0px #1C1917',
        'tactile': '3px 3px 0px #1C1917',
        'tactile-lg': '5px 5px 0px #1C1917',
        'tactile-odyssey': '3px 3px 0px #15324D',
        'tactile-fatima': '3px 3px 0px #193E30',
        'tactile-brass': '3px 3px 0px #8A7443',
        'tactile-gold': '3px 3px 0px #BA872C',
        'tactile-dark-sm': '2px 2px 0px #000000',
        'tactile-dark': '3px 3px 0px #000000',
        'tactile-dark-lg': '5px 5px 0px #000000',
      },
    },
  },
  plugins: [],
}
