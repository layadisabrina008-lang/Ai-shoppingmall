export default {
darkMode: ["class"],
content: [
"./app/**/*.{ts,tsx}",
"./components/**/*.{ts,tsx}",
],
theme: {
extend: {
colors: {
onyx: "#0b0b0e",
charcoal: "#141418",
ivory: "#f6f4ef",
gold: { DEFAULT: "#b48a56", light: "#d4b37c" },
},
boxShadow: {
glass: "0 8px 24px rgba(0,0,0,0.35)",
glow: "0 0 30px rgba(180,138,86,0.45)",
},
backgroundImage: {
aurum: "linear-gradient(135deg,#0b0b0e,#141418 45%,#0b0b0e)",
},
borderRadius: { xl: "1.25rem", "2xl": "1.5rem" },
},
},
plugins: [],
} as const;
