// src/components/Navbar.tsx

// ----------------------------------------------
import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import CalculateModal from "../../components/ui/modals/CalculateModal";
import { useAuth } from "../../state/useAuth";
import { Menu, X } from "lucide-react";

// ------------------------------ NAVBAR COMPONENT --------------------------------
function NavItem({
	to,
	children,
	onClick,
	className = "",
}: {
	to?: string;
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}) {
	if (to) {
		return (
			<NavLink
				to={to}
				onClick={onClick}
				className={({ isActive }) =>
					`block text-sm font-medium px-3 py-2 rounded ${
						isActive
							? "text-brand-700 bg-brand-50"
							: "text-slate-700 hover:text-brand-700 hover:bg-slate-50"
					} ${className}`
				}
			>
				{children}
			</NavLink>
		);
	}

	return (
		<button
			onClick={onClick}
			className={`block text-sm font-medium px-3 py-2 rounded text-slate-700 hover:text-brand-700 hover:bg-slate-50 ${className}`}
		>
			{children}
		</button>
	);
}

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const { authenticated, logout, loading } = useAuth();

	const [openCalc, setOpenCalc] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	if (loading) return null;

	const isCalculateActive = location.pathname.startsWith("/calculate");

	function closeMobile() {
		setMobileOpen(false);
	}

	const authButton = (
		<button
			onClick={() => (authenticated ? logout() : navigate("/signin"))}
			className="px-3 py-2 rounded border text-sm hover:bg-slate-50 w-full sm:w-auto"
		>
			{authenticated ? "Logout" : "Login"}
		</button>
	);

	const navItems: Array<{
		label: string;
		path?: string;
		action?: () => void;
		authOnly?: boolean;
		isCalculate?: boolean;
	}> = [
		{ label: "Home", path: "/" },
		{ label: "Calculate", action: () => setOpenCalc(true), isCalculate: true },
		{ label: "History", path: "/history", authOnly: true },
		{ label: "Tax Guides", path: "/taxguide" },
		{ label: "About", path: "/about" },
	];

	const filteredNavItems = navItems.filter(
		(item) => !item.authOnly || authenticated,
	);

	return (
		<>
			<header className="bg-white border-b w-full">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
					{/* ======================= LEFT: Logo ======================= */}
					<Link to="/" className="flex items-center gap-2 shrink-0">
						<div className="w-9 h-9 rounded bg-brand-700 text-white grid place-items-center font-bold">
							T
						</div>
						<div className="leading-tight">
							<div className="text-sm font-semibold">TAXLATOR</div>
							<div className="text-[11px] text-slate-500 -mt-0.5">
								Nigeria Tax Tools
							</div>
						</div>
					</Link>

					{/* ======================= CENTER: Desktop nav ======================= */}
					<nav className="hidden md:flex flex-1 items-center justify-center gap-2">
						{filteredNavItems.map((item, idx) =>
							item.path ? (
								<NavItem key={idx} to={item.path}>
									{item.label}
								</NavItem>
							) : item.isCalculate ? (
								<NavItem
									key={idx}
									onClick={item.action}
									className={
										isCalculateActive ? "text-brand-700 bg-brand-50" : ""
									}
								>
									{item.label}
								</NavItem>
							) : (
								<NavItem key={idx} onClick={item.action}>
									{item.label}
								</NavItem>
							),
						)}
					</nav>

					{/* ======================= RIGHT: Auth + Mobile ======================= */}
					<div className="ml-auto flex items-center gap-2 shrink-0">
						<button
							onClick={() => setMobileOpen((v) => !v)}
							className="md:hidden w-9 h-9 rounded border grid place-items-center hover:bg-slate-50"
							aria-label={mobileOpen ? "Close menu" : "Open menu"}
						>
							{mobileOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>

						<div className="hidden sm:inline-flex">{authButton}</div>
					</div>
				</div>

				{/*======================= MOBILE DROPDOWN ======================= */}
				{mobileOpen && (
					<div className="md:hidden border-t bg-white">
						<div className="max-w-6xl mx-auto px-4 py-3 grid gap-1">
							{filteredNavItems.map((item, idx) =>
								item.path ? (
									<NavItem key={idx} to={item.path} onClick={closeMobile}>
										{item.label}
									</NavItem>
								) : (
									<NavItem
										key={idx}
										onClick={() => {
											closeMobile();
											item.action?.();
										}}
										className={`w-full text-left ${
											item.isCalculate && isCalculateActive
												? "text-brand-700 bg-brand-50"
												: ""
										}`}
									>
										{item.label}
									</NavItem>
								),
							)}

							{/* ======================= Mobile auth button ======================= */}
							<div className="pt-2 border-t mt-2">{authButton}</div>
						</div>
					</div>
				)}
			</header>

			<CalculateModal
				open={openCalc}
				onClose={() => setOpenCalc(false)}
				onPick={(path) => {
					setOpenCalc(false);
					navigate(path);
				}}
			/>
		</>
	);
}
