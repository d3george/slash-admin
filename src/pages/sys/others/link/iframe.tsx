import { LineLoading } from "@/components/loading";
import { useState } from "react";

type Props = {
	src: string;
};
export default function Iframe({ src = "" }: Props) {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoad = () => {
		setIsLoading(false);
	};

	const handleError = () => {
		setIsLoading(false);
	};

	return (
		<div className="h-full w-full relative flex flex-col items-center justify-center grow-1">
			{isLoading && <LineLoading />}

			<iframe
				src={src}
				title="iframe-page"
				className="h-full w-full grow-1"
				onLoad={handleLoad}
				onError={handleError}
			/>
		</div>
	);
}
