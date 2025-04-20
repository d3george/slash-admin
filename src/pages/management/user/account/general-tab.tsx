import { UploadAvatar } from "@/components/upload";
import { useUserInfo } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { Textarea } from "@/ui/textarea";
import { faker } from "@faker-js/faker";
import { Form } from "antd";
import { toast } from "sonner";

type FieldType = {
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
	city?: string;
	code?: string;
	about: string;
};
export default function GeneralTab() {
	const { avatar, username, email } = useUserInfo();
	const initFormValues = {
		name: username,
		email,
		phone: faker.phone.number(),
		address: faker.location.county(),
		city: faker.location.city(),
		code: faker.location.zipCode(),
		about: faker.lorem.paragraphs(),
	};
	const handleClick = () => {
		toast.success("Update success!");
	};
	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<div className="flex-1">
				<Card className="flex-col px-6! pb-10! pt-20!">
					<UploadAvatar defaultAvatar={avatar} />

					<div className="flex items-center py-6 gap-2">
						<div>Public Profile</div>
						<Switch />
					</div>

					<Button variant="destructive">Delete User</Button>
				</Card>
			</div>
			<div className="flex-2">
				<Card>
					<CardContent>
						<Form layout="vertical" initialValues={initFormValues} labelCol={{ span: 8 }} className="w-full">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<Form.Item<FieldType> label="Username" name="name">
									<Input />
								</Form.Item>
								<Form.Item<FieldType> label="Email" name="email">
									<Input />
								</Form.Item>
								<Form.Item<FieldType> label="Phone" name="phone">
									<Input />
								</Form.Item>
								<Form.Item<FieldType> label="Address" name="address">
									<Input />
								</Form.Item>
								<Form.Item<FieldType> label="City" name="city">
									<Input />
								</Form.Item>
								<Form.Item<FieldType> label="Code" name="code">
									<Input />
								</Form.Item>
								<Form.Item<FieldType> label="About" name="about">
									<Textarea />
								</Form.Item>
							</div>
						</Form>
					</CardContent>
					<CardFooter>
						<Button onClick={handleClick}>Save Changes</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
