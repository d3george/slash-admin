import demoService from "@/api/services/demoService";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { useMutation } from "@tanstack/react-query";

export default function TokenExpired() {
	const tokenExpiredMutation = useMutation({
		mutationFn: demoService.mockTokenExpired,
	});
	const mockTokenExpired = () => {
		tokenExpiredMutation.mutate();
	};
	return (
		<Card>
			<CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div>
					<p>Clicking a button to simulate a token expiration scenario.</p>
				</div>
				<div>
					<Button onClick={mockTokenExpired}>Simulate Token Expired</Button>
				</div>
			</CardContent>
		</Card>
	);
}
