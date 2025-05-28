import type { ReactNode } from "react";
import { useAuthCheck } from "./use-auth";

interface AuthWrapperProps {
	/**
	 * The content to be rendered if the user has the required permissions/roles
	 */
	children: ReactNode;
	/**
	 * The fallback content to be rendered if the user doesn't have the required permissions/roles
	 */
	fallback?: ReactNode;
	/**
	 * The permission/role to check
	 */
	check?: string;
	/**
	 * The permissions/roles to check (any one of them)
	 */
	checkAny?: string[];
	/**
	 * The permissions/roles to check (all of them)
	 */
	checkAll?: string[];
	/**
	 * The type of check to perform: 'role' or 'permission'
	 * @default 'permission'
	 */
	baseOn?: "role" | "permission";
}

/**
 * A wrapper component that conditionally renders its children based on user permissions/roles
 *
 * @example
 * // Check single permission
 * <AuthWrapper check="user.create">
 *   <button>Create User</button>
 * </AuthWrapper>
 *
 * @example
 * // Check multiple permissions (any)
 * <AuthWrapper checkAny={["user.create", "user.edit"]}>
 *   <button>Edit User</button>
 * </AuthWrapper>
 *
 * @example
 * // Check multiple permissions (all)
 * <AuthWrapper checkAll={["user.create", "user.edit"]}>
 *   <button>Advanced Edit</button>
 * </AuthWrapper>
 *
 * @example
 * // With fallback content
 * <AuthWrapper check="admin" baseOn="role" fallback={<div>Access Denied</div>}>
 *   <AdminPanel />
 * </AuthWrapper>
 */
export const AuthWrapper = ({ children, fallback = null, check, checkAny, checkAll, baseOn = "permission" }: AuthWrapperProps) => {
	const checkFn = useAuthCheck(baseOn);

	const hasAccess = check ? checkFn.check(check) : checkAny ? checkFn.checkAny(checkAny) : checkAll ? checkFn.checkAll(checkAll) : true;

	return hasAccess ? <>{children}</> : <>{fallback}</>;
};
