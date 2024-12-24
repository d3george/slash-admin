import { StyledToolbar } from "./styles";

const HEADINGS = ["Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5", "Heading 6"];

export const formats = [
	"align",
	"background",
	"blockquote",
	"bold",
	"bullet",
	"code",
	"code-block",
	"color",
	"direction",
	"font",
	"formula",
	"header",
	"image",
	"indent",
	"italic",
	"link",
	"list",
	"script",
	"size",
	"strike",
	"table",
	"underline",
	"video",
];

type EditorToolbarProps = {
	id: string;
	isSimple?: boolean;
};

export default function Toolbar({ id, isSimple }: EditorToolbarProps) {
	return (
		<StyledToolbar>
			<div id={id}>
				<div className="ql-formats">
					<select className="ql-header" defaultValue="">
						{HEADINGS.map((heading, index) => (
							<option key={heading} value={index + 1}>
								{heading}
							</option>
						))}
						<option value="">Normal</option>
					</select>
				</div>

				<div className="ql-formats">
					<button type="button" className="ql-bold" />
					<button type="button" className="ql-italic" />
					<button type="button" className="ql-underline" />
					<button type="button" className="ql-strike" />
				</div>

				{!isSimple && (
					<div className="ql-formats">
						<select className="ql-color" />
						<select className="ql-background" />
					</div>
				)}

				<div className="ql-formats">
					<button type="button" className="ql-list" value="ordered" />
					<button type="button" className="ql-list" value="bullet" />
					{!isSimple && <button type="button" className="ql-indent" value="-1" />}
					{!isSimple && <button type="button" className="ql-indent" value="+1" />}
				</div>

				{!isSimple && (
					<div className="ql-formats">
						<button type="button" className="ql-script" value="super" />
						<button type="button" className="ql-script" value="sub" />
					</div>
				)}

				{!isSimple && (
					<div className="ql-formats">
						<button type="button" className="ql-code-block" />
						<button type="button" className="ql-blockquote" />
					</div>
				)}

				<div className="ql-formats">
					<button type="button" className="ql-direction" value="rtl" />
					<select className="ql-align" />
				</div>

				<div className="ql-formats">
					<button type="button" className="ql-link" />
					<button type="button" className="ql-image" />
					<button type="button" className="ql-video" />
				</div>

				<div className="ql-formats">
					{!isSimple && <button type="button" className="ql-formula" />}
					<button type="button" className="ql-clean" />
				</div>
			</div>
		</StyledToolbar>
	);
}
