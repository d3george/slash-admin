import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Textarea } from "@/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { H4, Muted } from "@/ui/typography";
import { Avatar, DatePicker, Image } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import { type Task, TaskPriority } from "./types";

type Props = {
	task: Task;
};
export default function TaskDetail({ task }: Props) {
	const { title, reporter, assignee = [], tags = [], date, priority, description, attachments, comments = [] } = task;
	return (
		<>
			<Container>
				<div className="item">
					<H4>{title}</H4>
				</div>
				<div className="item">
					<div className="label">Reporter</div>
					<Avatar shape="circle" src={reporter} size={40} />
				</div>
				<div className="item">
					<div className="label">Assignee</div>

					<div className="flex gap-2">
						{assignee.map((item) => (
							<Avatar key={item} shape="circle" src={item} size={40} />
						))}
					</div>
				</div>
				<div className="item">
					<div className="label">Tag</div>
					<div className="flex gap-2 flex-wrap">
						{tags.map((tag) => (
							<Badge key={tag} variant="info">
								{tag}
							</Badge>
						))}
					</div>
				</div>

				<div className="item">
					<div className="label">Due Date</div>
					<DatePicker variant="borderless" value={dayjs(date)} />
				</div>

				<div className="item">
					<div className="label">Priority</div>
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
					<div className="label">Description</div>
					<Textarea defaultValue={description} />
				</div>

				<div className="item">
					<div className="label">Attachments</div>
					<div className="flex gap-2 flex-wrap">
						{attachments?.map((item) => (
							<Image key={item} src={item} width={62} height={62} className="rounded-lg" />
						))}
					</div>
				</div>
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
						<Avatar src={avatar} size={40} className="shrink-0" />
						<div className="flex grow flex-col flex-wrap gap-1 text-gray">
							<div className="flex justify-between">
								<Muted>{username}</Muted>
								<Muted>{dayjs(time).format("DD/MM/YYYY HH:mm")}</Muted>
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
  padding: 24px 20px 40px;
  .item {
    display: flex;
    align-items: center;
  }
  .label {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    width: 100px;
    color: rgb(99, 115, 129);
    height: 40px;
    line-height: 40px;
  }
`;
