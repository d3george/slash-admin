import AreaDownload from "./area-download";
import BannerCard from "./banner-card";
import { Applications, Conversion } from "./conversion_applications";
import CurrentDownload from "./current-download";
import NewInvoice from "./new-invoice";
import TopAuthor from "./top-authors";
import TopInstalled from "./top-installed";
import TopRelated from "./top-related";
import TotalCard from "./total-card";

function Workbench() {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex-1 md:flex-2">
					<BannerCard />
				</div>
				<div className="flex-1">
					<div className="flex flex-col justify-between h-full gap-2">
						<Conversion />
						<Applications />
					</div>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex-1">
					<TotalCard
						title="Total Active Users"
						increase
						count="18,765"
						percent="2.6%"
						chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
					/>
				</div>

				<div className="flex-1">
					<TotalCard
						title="Total Installed"
						increase
						count="4,876"
						percent="0.2%"
						chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
					/>
				</div>

				<div className="flex-1">
					<TotalCard
						title="Total Downloads"
						increase={false}
						count="678"
						percent="0.1%"
						chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex-1">
					<CurrentDownload />
				</div>
				<div className="flex-1">
					<AreaDownload />
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex-1">
					<NewInvoice />
				</div>
				<div className="flex-1">
					<TopRelated />
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex-1">
					<TopInstalled />
				</div>

				<div className="flex-1">
					<TopAuthor />
				</div>
			</div>
		</div>
	);
}

export default Workbench;
