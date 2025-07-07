import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				gryd: {
					bg: '#fafafa',
					text: '#111111',
					soft: '#666666',
					accent: '#d97706',
				}
			},
			fontFamily: {
				'headline': ['Platypi', 'serif'],
				'body': ['Fraunces', 'serif'],
				'sans': ['"Schibsted Grotesk"', 'sans-serif'],
			},
			fontSize: {
				'headline': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'subhead': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
				'body': ['1.125rem', { lineHeight: '1.7' }],
				'caption': ['0.875rem', { lineHeight: '1.5' }],
			},
			spacing: {
				'section': '8rem',
				'article': '4rem',
				'paragraph': '2rem',
			},
			maxWidth: {
				'article': '65ch',
				'wide': '1400px',
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		}
	},
	plugins: [animate],
} satisfies Config;
