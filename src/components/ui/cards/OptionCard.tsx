// src/components/ui/cards/OptionCard.tsx

interface OptionCardProps {
	title: string;
	desc: string;
	image: string;
	hoverImage?: string;
	onClick: () => void;
	bgClass?: string;
}

const OptionCard = ({
	title,
	desc,
	image,
	hoverImage,
	onClick,
	bgClass = "bg-slate-100",
}: OptionCardProps) => {
	return (
		<button
			onClick={onClick}
			className=" group text-left w-full rounded-xl border bg-white p-4
								 hover:bg-brand-800 hover:border-brand-200
       							 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
        						transition flex items-center gap-4"
		>
			{/* Image slot */}
			<div
				className={`w-12 h-12 flex-shrink-0 rounded-lg grid place-items-center ${bgClass} group-hover:bg-brand-800 transition-colors`}
			>
				{hoverImage ? (
					<>
						<img
							src={image}
							alt={title}
							className="w-9 h-9 object-contain block group-hover:hidden transition"
						/>
						<img
							src={hoverImage}
							alt={`${title} hover`}
							className="w-9 h-9 object-contain hidden group-hover:block transition"
						/>
					</>
				) : (
					<img src={image} alt={title} className="w-9 h-9 object-contain" />
				)}
			</div>

			{/* Text */}
			<div>
				<div className="text-sm font-semibold text-slate-900 group-hover:text-white transition-colors">
					{title}
				</div>
				<div className="text-xs text-slate-900 group-hover:text-white transition-colors mt-1">
					{desc}
				</div>
			</div>
		</button>
	);
};

export default OptionCard;
