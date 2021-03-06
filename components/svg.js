export const downArrowSVG = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M4 6h16M4 12h16M4 18h16"
		/>
	</svg>
);

export const IdentificationSVG = ({ className = "h-6 w-6" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={`${className}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
		/>
	</svg>
);

export const LeftArrowSVG = ({ className = "h-6 w-6" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={`${className}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2}
	>
		<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
	</svg>
);
