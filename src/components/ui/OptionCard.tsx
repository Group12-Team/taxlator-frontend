// src/components/ui/optionCard.tsx
// ------------------------------------
function OptionCard({
	title,
	desc,
	image,
	onClick,
}: {
	title: string;
	desc: string;
	image: string; // path to image/icon
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="text-left w-full rounded-xl border bg-white p-4 hover:shadow-soft hover:border-brand-200 transition flex items-center gap-4"
		>
			{/* Image slot */}
			<div className="w-12 h-12 flex-shrink-0 rounded-lg grid place-items-center">
				<img src={image} alt={title} className="w-9 h-9 object-contain" />
			</div>

			{/* Text */}
			<div>
				<div className="text-sm font-semibold text-slate-900">{title}</div>
				<div className="text-xs text-slate-600 mt-1">{desc}</div>
			</div>
		</button>
	);
}
export default OptionCard;
