import "./index.css";

import { useEffect, useRef } from "react";
import ArcGISMap from "@arcgis/core/Map";
import CSVLayer from "@arcgis/core/layers/CSVLayer";
import MapView from "@arcgis/core/views/MapView";
import Legend from "@arcgis/core/widgets/Legend";

interface Props {
	mapViewProps: __esri.MapViewProperties;
	layerProps: __esri.CSVLayerProperties;
	legend?: boolean;
}

export function ArcMap({ mapViewProps, layerProps, legend }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const layer = new CSVLayer(layerProps);

		const map = new ArcGISMap({
			basemap: "gray-vector",
			layers: [layer],
		});

		const view = new MapView({
			...mapViewProps,
			container: ref.current,
			map: map,
		});

		if (legend) {
			view.ui.add(
				new Legend({
					view: view,
				}),
				"top-right",
			);
		}
		return () => {
			view.destroy();
		};
	}, [mapViewProps, layerProps, legend]);

	return <div ref={ref} className="h-full" />;
}
