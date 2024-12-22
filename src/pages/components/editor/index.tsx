import Editor from "@/components/editor";
import { themeVars } from "@/theme/theme.css";
import { Card, Typography } from "antd";
import { useState } from "react";

export default function EditorPage() {
	const [quillSimple, setQuillSimple] = useState("");
	const [quillFull, setQuillFull] = useState("");

	return (
		<>
			<Typography.Link
				href="https://github.com/zenoamaro/react-quill"
				style={{ color: themeVars.colors.palette.primary.default }}
				className="mb-4 block"
			>
				https://github.com/zenoamaro/react-quill
			</Typography.Link>
			<Card title="Editor Simple">
				<Editor id="sample-editor" sample value={quillSimple} onChange={setQuillSimple} />
			</Card>
			<div className="h-10" />
			<Card title="Editor Full">
				<Editor id="full-editor" value={quillFull} onChange={setQuillFull} />
			</Card>
		</>
	);
}
