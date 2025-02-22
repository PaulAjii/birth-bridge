declare module 'tailwindcss/tailwind-config' {
	export interface TailwindConfig {
		content: string[];
		theme: {
			extend: {
				colors: {
					primary: Record<string, string>;
					neutral: Record<string, string>;
				};
				fontFamily: {
					manrope: string[];
				};
				fontSize: {
					h1: [string, { lineHeight: string }];
					h2: [string, { lineHeight: string }];
					h3: [string, { lineHeight: string }];
					h4: [string, { lineHeight: string }];
					h5: [string, { lineHeight: string }];
					h6: [string, { lineHeight: string }];
				};
				fontWeight: {
					regular: string;
					medium: string;
					semibold: string;
					bold: string;
					xbold: string;
				};
			};
		};
		plugins: any[];
	}
}
