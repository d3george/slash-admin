import { LineLoading } from "@/components/loading";
import DashboardLayout from "@/layouts/dashboard";
import AuthGuard from "@/routes/components/auth-guard";
import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

// dashboard
const WorkbenchPage = lazy(() => import("@/pages/dashboard/workbench"));
const AnalysisPage = lazy(() => import("@/pages/dashboard/analysis"));

// custom components
const AnimatePage = lazy(() => import("@/pages/components/animate"));
const ScrollPage = lazy(() => import("@/pages/components/scroll"));
const MultiLanguagePage = lazy(() => import("@/pages/components/multi-language"));
const IconPage = lazy(() => import("@/pages/components/icon"));
const UploadPage = lazy(() => import("@/pages/components/upload"));
const ChartPage = lazy(() => import("@/pages/components/chart"));
const ToastPage = lazy(() => import("@/pages/components/toast"));
const ClipboardPage = lazy(() => import("@/pages/functions/clipboard"));
const TokenExpiredPage = lazy(() => import("@/pages/functions/token-expired"));

// error
const Page403 = lazy(() => import("@/pages/sys/error/Page403"));
const Page404 = lazy(() => import("@/pages/sys/error/Page404"));
const Page500 = lazy(() => import("@/pages/sys/error/Page500"));

// management
const ProfilePage = lazy(() => import("@/pages/management/user/profile"));
const AccountPage = lazy(() => import("@/pages/management/user/account"));
const OrganizationPage = lazy(() => import("@/pages/management/system/organization"));
const PermissioPage = lazy(() => import("@/pages/management/system/permission"));
const RolePage = lazy(() => import("@/pages/management/system/role"));
const UserPage = lazy(() => import("@/pages/management/system/user"));
const UserDetailPage = lazy(() => import("@/pages/management/system/user/detail"));

// others
const ExternalLink = lazy(() => import("@/pages/sys/others/iframe/external-link"));
const Iframe = lazy(() => import("@/pages/sys/others/iframe"));
const Calendar = lazy(() => import("@/pages/sys/others/calendar"));
const Kanban = lazy(() => import("@/pages/sys/others/kanban"));
const Blank = lazy(() => import("@/pages/sys/others/blank"));

// menu level
const MenuLevel1a = lazy(() => import("@/pages/menu-level/menu-level-1a"));
const MenuLevel2a = lazy(() => import("@/pages/menu-level/menu-level-1b/menu-level-2a"));
const MenuLevel3a = lazy(() => import("@/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3a"));
const MenuLevel3b = lazy(() => import("@/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3b"));

export const dashboardRoutes: RouteObject[] = [
	{
		path: "/",
		element: (
			<AuthGuard>
				<Suspense fallback={<LineLoading />}>
					{/* outlet inside DashboardLayout */}
					<DashboardLayout />
				</Suspense>
			</AuthGuard>
		),
		children: [
			{ index: true, element: <Navigate to={HOMEPAGE} replace /> },
			{
				path: "dashboard",
				children: [
					{ index: true, element: <WorkbenchPage /> },
					{ path: "workbench", element: <WorkbenchPage /> },
					{ path: "analysis", element: <AnalysisPage /> },
				],
			},
			{
				path: "components",
				children: [
					{ index: true, element: <AnimatePage /> },
					{ path: "animate", element: <AnimatePage /> },
					{ path: "scroll", element: <ScrollPage /> },
					{ path: "multi-language", element: <MultiLanguagePage /> },
					{ path: "icon", element: <IconPage /> },
					{ path: "upload", element: <UploadPage /> },
					{ path: "chart", element: <ChartPage /> },
					{ path: "toast", element: <ToastPage /> },
				],
			},
			{
				path: "functions",
				children: [
					{ index: true, element: <Navigate to="clipboard" replace /> },
					{ path: "clipboard", element: <ClipboardPage /> },
					{ path: "token-expired", element: <TokenExpiredPage /> },
				],
			},
			{
				path: "management",
				children: [
					{ index: true, element: <Navigate to="user" replace /> },
					{
						path: "user",
						children: [
							{ index: true, element: <Navigate to="profile" replace /> },
							{ path: "profile", element: <ProfilePage /> },
							{ path: "account", element: <AccountPage /> },
						],
					},
					{
						path: "system",
						children: [
							{ index: true, element: <Navigate to="organization" replace /> },
							{ path: "organization", element: <OrganizationPage /> },
							{ path: "permission", element: <PermissioPage /> },
							{ path: "role", element: <RolePage /> },
							{ path: "user", element: <UserPage /> },
							{ path: "user/:id", element: <UserDetailPage /> },
						],
					},
				],
			},
			{
				path: "error",
				children: [
					{ index: true, element: <Navigate to="403" replace /> },
					{ path: "403", element: <Page403 /> },
					{ path: "404", element: <Page404 /> },
					{ path: "500", element: <Page500 /> },
				],
			},
			{
				path: "menu_level",
				children: [
					{ index: true, element: <Navigate to="menu_level_1a" replace /> },
					{ path: "menu_level_1a", element: <MenuLevel1a /> },
					{
						path: "menu_level_1b",
						children: [
							{ index: true, element: <Navigate to="menu_level_2a" replace /> },
							{ path: "menu_level_2a", element: <MenuLevel2a /> },
							{
								path: "menu_level_2b",
								children: [
									{ index: true, element: <Navigate to="menu_level_3a" replace /> },
									{ path: "menu_level_3a", element: <MenuLevel3a /> },
									{ path: "menu_level_3b", element: <MenuLevel3b /> },
								],
							},
						],
					},
				],
			},
			{
				path: "iframe",
				children: [
					{ index: true, element: <Navigate to="iframe" replace /> },
					{ path: "iframe", element: <Iframe src="https://ant.design/index-cn" /> },
					{ path: "external-link", element: <ExternalLink src="https://ant.design/index-cn" /> },
				],
			},
			{ path: "calendar", element: <Calendar /> },
			{ path: "kanban", element: <Kanban /> },
			{ path: "blank", element: <Blank /> },
		],
	},
];
