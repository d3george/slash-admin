import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import { cn } from "@/utils";
import { useState } from "react";
import { type CodeBlockProps, HighlightCode } from ".";
import { Icon } from "../icon";

export function CodeBlock({ title, description, children, code, options, className, ...props }: CodeBlockProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className={cn("w-full", className)} {...props}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter className="flex items-center justify-between">
				<Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex flex-col gap-2 w-full">
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="icon" className="size-8 w-full">
							<Icon icon="lucide:code-xml" size={20} />
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col gap-2 w-full">
						<HighlightCode code={code} options={options} />
					</CollapsibleContent>
				</Collapsible>
			</CardFooter>
		</Card>
	);
}
