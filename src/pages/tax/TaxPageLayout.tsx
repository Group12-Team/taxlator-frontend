// src/pages/tax/TaxPageLayout.tsx
import React from "react";
import { Link } from "react-router-dom";

type Props = {
	title: string;
	subtitle: string;
	children: React.ReactNode;
	rightPanel?: React.ReactNode;
};

export default function TaxPageLayout({
	title,
	subtitle,
	children,
	rightPanel,
}: Props) {
	return (
		<div className="w-full flex justify-center bg-slate-100 min-h-[80vh] px-4 py-2 pb-8">
			{/* 🔒 HARD WIDTH LOCK */}
			<div className="w-full max-w-5xl mx-auto">
				<Link
					to="/calculate"
					className="text-sm text-slate-700 hover:text-brand-800"
				>
					← Back
				</Link>

				{/* 🔒 GRID WIDTH STABILIZER */}
				<div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start min-w-0">
					{/* ================= LEFT PANEL ================= */}
					<div className="w-full min-w-0 bg-white rounded-2xl border py-7 px-5 shadow-soft">
						<div className="text-brand-800 font-semibold">{title}</div>
						<div className="text-xs text-slate-600 mt-1">{subtitle}</div>

						<div className="mt-6">{children}</div>
					</div>

					{/* ================= RIGHT PANEL ================= */}
					<div className="w-full min-w-0 bg-white rounded-2xl border py-7 px-5 shadow-soft">
						{/* 🔒 PANEL SHELL NEVER UNMOUNTS */}
						{rightPanel ? (
							rightPanel
						) : (
							<div className="text-sm text-slate-600">
								Waiting for calculation…
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
