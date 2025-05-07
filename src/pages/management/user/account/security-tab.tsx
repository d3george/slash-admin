import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FieldType = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export default function SecurityTab() {
	const form = useForm<FieldType>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const handleSubmit = () => {
		// Handle form submission here
		toast.success("Update success!");
	};

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="oldPassword"
							rules={{ required: "Old password is required" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Old Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="newPassword"
							rules={{ required: "New password is required" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							rules={{
								required: "Please confirm your new password",
								validate: (value) => value === form.getValues("newPassword") || "Passwords do not match",
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm New Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex w-full justify-end">
							<Button type="submit">Save Changes</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
