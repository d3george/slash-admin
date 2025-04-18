import Editor from "@/components/editor";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { useState } from "react";

export default function EditorPage() {
	const [quillSimple, setQuillSimple] = useState("");
	const [quillFull, setQuillFull] = useState("");

	return (
		<>
			<Button variant="link" asChild className="mb-4 block">
				<a href="https://github.com/zenoamaro/react-quill" target="_blank" rel="noreferrer">
					https://github.com/zenoamaro/react-quill
				</a>
			</Button>
			<Card title="Editor Simple">
				<CardHeader>
					<CardTitle>Editor Simple</CardTitle>
				</CardHeader>
				<CardContent>
					<Editor id="sample-editor" sample value={quillSimple} onChange={setQuillSimple} />
				</CardContent>
			</Card>
			<div className="h-10" />
			<Card title="Editor Full">
				<CardHeader>
					<CardTitle>Editor Full</CardTitle>
				</CardHeader>
				<CardContent>
					<Editor id="full-editor" value={quillFull} onChange={setQuillFull} />
				</CardContent>
			</Card>
		</>
	);
}
