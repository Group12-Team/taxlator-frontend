// src/components/ui/TinyFooter.tsx
// ------------------------------------
function TinyFooter() {
	return (
		<footer className="bg-white border-t w-full text-xs text-slate-600">
			<div className="w-full flex justify-between px-4 py-4">
				{/* Copyright */}
				<div className="w-[60%]">
					<p>© {new Date().getFullYear()} Taxlator.</p>
				</div>

				{/* About */}
				<div className="flex flex-col items-end lg:flex-row justify-between gap-2 flex-1">
					<a href="/about" className="hover:text-brand-700">
						About Us
					</a>
					<a href="/Privacy_Policy" className="hover:text-brand-700">
						Privacy Policy
					</a>
					<a href="/feedback" className="hover:text-brand-700">
						Feedback
					</a>
				</div>
			</div>
		</footer>
	);
}
export default TinyFooter;
