import { Avatar, DatePicker, Image, Input, Radio, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";

import { SvgIcon } from "@/components/icon";

import { themeVars } from "@/theme/theme.css";
import type { Task } from "./types";

type Props = {
	task: Task;
};
export default function TaskDetail({ task }: Props) {
	const { title, reporter, assignee = [], tags = [], date, priority, description, attachments, comments = [] } = task;
	return (
		<>
			<Container>
				<div className="item">
					<Typography.Title level={4}>{title}</Typography.Title>
				</div>
				<div className="item">
					<div className="label">Reporter</div>
					<Avatar shape="circle" src={reporter} size={40} />
				</div>
				<div className="item">
					<div className="label">Assignee</div>

					<Space>
						{assignee.map((item) => (
							<Avatar key={item} shape="circle" src={item} size={40} />
						))}
					</Space>
				</div>
				<div className="item">
					<div className="label">Tag</div>
					<Space wrap>
						{tags.map((tag) => (
							<Tag key={tag} color={themeVars.colors.palette.info.default}>
								{tag}
							</Tag>
						))}
					</Space>
				</div>

				<div className="item">
					<div className="label">Due Date</div>
					<DatePicker variant="borderless" value={dayjs(date)} />
				</div>

				<div className="item">
					<div className="label">Priority</div>
					<div>
						<Radio.Group defaultValue={priority}>
							<Space>
								<Radio.Button value="High">
									<SvgIcon icon="ic_rise" size={20} color={themeVars.colors.palette.warning.default} />
									<span>High</span>
								</Radio.Button>

								<Radio.Button value="Medium">
									<SvgIcon
										icon="ic_rise"
										size={20}
										color={themeVars.colors.palette.success.default}
										className="rotate-90"
									/>
									<span>Medium</span>
								</Radio.Button>

								<Radio.Button value="Low">
									<SvgIcon
										icon="ic_rise"
										size={20}
										color={themeVars.colors.palette.info.default}
										className="rotate-180"
									/>
									<span>Low</span>
								</Radio.Button>
							</Space>
						</Radio.Group>
					</div>
				</div>

				<div className="item">
					<div className="label">Description</div>
					<Input.TextArea defaultValue={description} />
				</div>

				<div className="item">
					<div className="label">Attachments</div>
					<Space wrap>
						{attachments?.map((item) => (
							<Image key={item} src={item} width={62} height={62} className="rounded-lg" />
						))}
					</Space>
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
						<Avatar src={avatar} size={40} className="flex-shrink-0" />
						<div className="flex flex-grow flex-col flex-wrap gap-1 text-gray">
							<div className="flex justify-between">
								<Typography.Text>{username}</Typography.Text>
								<Typography.Text>{dayjs(time).format("DD/MM/YYYY HH:mm")}</Typography.Text>
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
    flex-shrink: 0;
    color: rgb(99, 115, 129);
    height: 40px;
    line-height: 40px;
  }
`;
