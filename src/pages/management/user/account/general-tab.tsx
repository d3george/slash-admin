import { UploadAvatar } from "@/components/upload";
import { useUserInfo } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { Textarea } from "@/ui/textarea";
import { faker } from "@faker-js/faker";
import { useForm } from "react-hook-form";
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
	const form = useForm<FieldType>({
		defaultValues: {
			name: username,
			email,
			phone: faker.phone.number(),
			address: faker.location.county(),
			city: faker.location.city(),
			code: faker.location.zipCode(),
			about: faker.lorem.paragraphs(),
		},
	});

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
						<Form {...form}>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="address"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Code</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="about"
									render={({ field }) => (
										<FormItem>
											<FormLabel>About</FormLabel>
											<FormControl>
												<Textarea {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
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
