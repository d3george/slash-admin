import { USER_LIST } from "@/_mock/assets";
import { useParams } from "@/router/hooks";
import { Card, CardContent } from "@/ui/card";
import type { UserInfo } from "#/entity";

const USERS: UserInfo[] = USER_LIST as UserInfo[];

export default function UserDetail() {
	const { id } = useParams();
	const user = USERS.find((user) => user.id === id);
	return (
		<Card>
			<CardContent>
				<p>This is the detail page of {user?.username}</p>
			</CardContent>
		</Card>
	);
}
