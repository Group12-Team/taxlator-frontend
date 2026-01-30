// src/components/landing/SectionTitle.tsx
// ----------------------------------------------

// Section Title Component
// ----------------------------------------------

export default function SectionTitle({
	title,
	subtitle,
}: {
	title: string;
	subtitle?: string;
}) {
	return (
		<div className="text-center">
			<div className="text-[1.6rem] font-semibold text-brand-800">{title}</div>
			{subtitle && (
				<div className="text-lg text-slate-600 mt-1">{subtitle}</div>
			)}
		</div>
	);
}
// ----------------------------------------------
// ----------------------------------------------
