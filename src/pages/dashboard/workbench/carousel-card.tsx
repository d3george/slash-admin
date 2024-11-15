import { Carousel } from "antd";

export default function CarouselCard() {
	const contentStyle: React.CSSProperties = {
		margin: 0,
		height: "160px",
		color: "#000000",
		lineHeight: "160px",
		textAlign: "center",
		background: "#364d79",
	};
	return (
		<Carousel>
			<div>
				<h3 style={contentStyle}>1</h3>
			</div>
			<div>
				<h3 style={contentStyle}>2</h3>
			</div>
			<div>
				<h3 style={contentStyle}>3</h3>
			</div>
			<div>
				<h3 style={contentStyle}>4</h3>
			</div>
		</Carousel>
	);
}
