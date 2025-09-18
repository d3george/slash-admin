import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Textarea } from "@/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { Text, Title } from "@/ui/typography";
import dayjs from "dayjs";
import styled from "styled-components";
import { type Task, TaskPriority } from "./types";

type Props = {
	task: Task;
};
export default function TaskDetail({ task }: Props) {
	const { title, tags = [], priority, comments = [], pid, cid, studyDate, impression, results } = task;
	return (
		<>
			<Container>
				<div className="item">
					<Title as="h4">{title}</Title>
				</div>
				<div className="item">
					<div className="label">影像号</div>
					<div className="label">
						{pid}-{cid}
					</div>
				</div>
				<div className="item">
					<div className="label">检查日期</div>
					<div className="label">{studyDate}</div>
				</div>
				<div className="item">
					<div className="label">标签/亚专业</div>
					<div className="flex gap-2 flex-wrap">
						{tags.map((tag) => (
							<Badge key={tag} variant="info">
								{tag}
							</Badge>
						))}
					</div>
				</div>
				<div className="item">
					<div className="label">等级</div>
					<ToggleGroup type="single" defaultValue={priority}>
						<ToggleGroupItem value={TaskPriority.HIGH}>
							<Icon icon="local:ic-rise" size={20} color={themeVars.colors.palette.warning.default} />
						</ToggleGroupItem>
						<ToggleGroupItem value={TaskPriority.MEDIUM}>
							<Icon
								icon="local:ic-rise"
								size={20}
								color={themeVars.colors.palette.success.default}
								className="rotate-90"
							/>
						</ToggleGroupItem>
						<ToggleGroupItem value={TaskPriority.LOW}>
							<Icon
								icon="local:ic-rise"
								size={20}
								color={themeVars.colors.palette.info.default}
								className="rotate-180"
							/>
						</ToggleGroupItem>
					</ToggleGroup>
				</div>

				<div className="item">
					<div className="label">影像所见</div>
					<Textarea defaultValue={impression} />
				</div>
				<div className="item">
					<div className="label">影像结论</div>
					<Textarea defaultValue={results} />
				</div>
				{/* <div className="item">
					<div className="label">Attachments</div>
					<div className="flex gap-2 flex-wrap">
						{attachments?.map((item) => (
							<img key={item} src={item} width={62} height={62} className="rounded-lg" alt="" />
						))}
					</div>
				</div> */}
			</Container>
			{/* comments */}
			<div
				className="flex flex-col gap-4"
				style={{
					padding: "24px 20px 40px",
				}}
			>
				{comments?.map(({ avatar, username, content, time }) => (
					<div key={username} className="flex gap-4">
						<Avatar>
							<AvatarImage src={avatar} alt="@shadcn" />
						</Avatar>
						<div className="flex grow flex-col flex-wrap gap-1 text-gray">
							<div className="flex justify-between">
								<Text variant="caption" color="secondary">
									{username}
								</Text>
								<Text variant="caption" color="secondary">
									{dayjs(time).format("DD/MM/YYYY HH:mm")}
								</Text>
							</div>
							<p>{content}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0px 24px;
  .item {
    display: flex;
    align-items: center;
  }
  .label {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    width: 100px;
    color: ${themeVars.colors.text.secondary};
    height: 40px;
    line-height: 40px;
  }
`;
