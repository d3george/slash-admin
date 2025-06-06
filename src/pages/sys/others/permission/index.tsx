import { DB_USER } from "@/_mock/assets_backup";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useSignIn, useUserInfo } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { Text } from "@/ui/typography";
import { Link } from "react-router";

export default function PermissionPage() {
	const { permissions, roles, username } = useUserInfo();
	const signIn = useSignIn();

	const handleSwitch = (_username: string) => {
		if (_username === username) return;
		const user = DB_USER.find((user) => user.username === _username);
		if (user) {
			signIn({ username: user.username, password: user.password });
		}
	};
	return (
		<div className="flex flex-col gap-4">
			<div className="w-full flex  items-center justify-center">
				<Text variant="subTitle1">当前用户：</Text>
				<ToggleGroup type="single" size="lg" onValueChange={handleSwitch} value={username}>
					{DB_USER.map((user) => (
						<ToggleGroupItem key={user.username} value={user.username} aria-label="Toggle bold">
							{user.username}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>
			<Card>
				<CardContent>
					<div className="flex items-center gap-2">
						<Text variant="body1">当前用户角色：</Text>
						{permissions && permissions.length > 0 ? (
							<Text variant="body1">[{roles?.map((role) => role.name).join(", ")}]</Text>
						) : (
							<Text variant="body1">[]</Text>
						)}
					</div>
					<div className="flex items-center gap-2">
						<Text variant="body1">当前用户权限：</Text>
						{permissions && permissions.length > 0 ? (
							<Text variant="body1">[{permissions?.map((permission) => permission.code).join(", ")}]</Text>
						) : (
							<Text variant="body1">[]</Text>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>页面鉴权测试</CardTitle>
					<CardDescription>点击下面按钮，当拥有页面指定权限时正常显示，否则显示403</CardDescription>
				</CardHeader>
				<CardContent>
					<Link to="/permission/page-test">
						<Button>跳转页面</Button>
					</Link>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>组件鉴权测试</CardTitle>
					<CardDescription>
						使用组件<Text variant="code">&lt;AuthGuard /&gt;</Text>包裹相应组件
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2">
						<AuthGuard
							check="permission:delete"
							baseOn="permission"
							fallback={
								<Text variant="body1" color="error">
									没有<Text variant="code">permission:delete</Text>权限
								</Text>
							}
						>
							<Button variant="destructive" className="w-20">
								删除
							</Button>
						</AuthGuard>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
