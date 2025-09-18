import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import type { CaseInfo } from "#/entity";
import { BasicStatus } from "#/enum";
import CaseModal, { type CaseModalProps } from "./case-modal";

const defaultPermissionValue: CaseInfo = {
	id: "",
	pid: "",
	cid: "",
	age: 0,
	gender: "",
	studyDate: "",
	impression: "",
	results: "",
	clinicalResults: "",
	history: "",
	patientDesc: "",
	status: BasicStatus.ENABLE,
};
export default function CasePage() {
	const [permissionModalProps, setPermissionModalProps] = useState<CaseModalProps>({
		formValue: { ...defaultPermissionValue },
		title: "New",
		show: false,
		onOk: () => {
			setPermissionModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			setPermissionModalProps((prev) => ({ ...prev, show: false }));
		},
	});

	const columns: ColumnsType<CaseInfo> = [
		{
			title: "年龄",
			dataIndex: "age",
			fixed: "left",
		},
		{
			title: "性别",
			dataIndex: "gender",
			fixed: "left",
		},
		{
			title: "患者编号",
			dataIndex: "pid",
		},
		{
			title: "病例号",
			dataIndex: "cid",
		},
		{
			title: "检查日期",
			dataIndex: "studyDate",
		},
		{
			title: "影像所见",
			dataIndex: "impression",
			width: 290,
		},
		{
			title: "影像结论",
			dataIndex: "results",
			fixed: "left",
			width: 190,
		},
		{
			title: "临床/病理结果",
			dataIndex: "clinicalResults",
			width: 190,
		},
		{
			title: "既往病史",
			dataIndex: "history",
			width: 190,
		},
		{
			title: "主诉",
			dataIndex: "patientDesc",
		},
		{
			title: "状态",
			dataIndex: "status",
			align: "center",
			width: 120,
			fixed: "right",
			render: (status) => (
				<Badge variant={status === BasicStatus.DISABLE ? "error" : "success"}>
					{status === BasicStatus.DISABLE ? "Disable" : "Enable"}
				</Badge>
			),
		},
		{
			title: "动作",
			key: "operation",
			align: "center",
			width: 100,
			fixed: "right",
			render: (_, record) => (
				<div className="flex w-full justify-end text-gray">
					<Button variant="ghost" size="icon" onClick={() => onEdit(record)}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant="ghost" size="icon">
						<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
					</Button>
				</div>
			),
		},
	];

	const dataSource: CaseInfo[] = [
		{
			id: "4",
			pid: "P004",
			cid: "C004",
			age: 58,
			gender: "男",
			studyDate: "2023-10-04",
			impression:
				"腹部CT平扫及增强扫描显示，肝脏右叶S6段可见一大小约5.8cm x 4.5cm的不规则低密度肿块，边界不清，增强扫描动脉期呈不均匀环形强化，门脉期及延迟期强化程度减低，呈“快进快出”样改变。肿块内部可见片状坏死区。肝内胆管未见扩张，门静脉主干及其分支未见癌栓形成。脾脏不大，胰腺形态及密度未见异常。双肾未见异常。腹膜后未见肿大淋巴结。",
			results:
				"肝右叶占位性病变，考虑为原发性肝细胞癌（HCC）可能性大，建议结合甲胎蛋白（AFP）检查及临床表现综合判断，必要时行穿刺活检以明确病理诊断。",
			clinicalResults:
				"血清甲胎蛋白（AFP）水平显著升高至800 ng/mL。超声引导下肝穿刺活检病理结果回报：中分化肝细胞癌。患者已转至肝胆外科准备接受进一步治疗，方案可能包括手术切除或经导管动脉化疗栓塞术（TACE）。",
			history:
				"患者有超过20年的乙型肝炎病史，长期口服抗病毒药物治疗，但依从性不佳。近10年有大量饮酒史，平均每日饮用白酒约200ml。无肝癌家族史。",
			patientDesc:
				"患者主诉近三个月来感觉右上腹部持续性隐痛不适，伴有食欲不振、乏力、体重下降约5公斤。近期出现皮肤及巩膜轻度黄染。无恶心、呕吐、发热等症状。",
			status: BasicStatus.ENABLE,
		},
		{
			id: "5",
			pid: "P005",
			cid: "C005",
			age: 71,
			gender: "女",
			studyDate: "2023-10-05",
			impression:
				"胸部高分辨率CT（HRCT）显示，双肺弥漫性网格状及蜂窝状改变，主要分布于双下肺及胸膜下区域，符合典型的寻常型间质性肺炎（UIP）影像学表现。可见牵拉性支气管扩张。肺主动脉主干未见增宽。纵隔内未见肿大淋巴结。",
			results:
				"双肺弥漫性间质性改变，符合特发性肺纤维化（IPF）的UIP型影像学特征。建议结合肺功能检查及临床症状进行综合评估。",
			clinicalResults:
				"肺功能测试显示限制性通气功能障碍，用力肺活量（FVC）为预计值的65%，一氧化碳弥散量（DLCO）显著下降。血气分析提示静息状态下轻度低氧血症。临床诊断为特发性肺纤维化。",
			history: "患者有超过30年的类风湿性关节炎病史，长期服用免疫抑制剂治疗。无吸烟史，无明确职业粉尘暴露史。",
			patientDesc:
				"患者近一年来逐渐出现活动后气短，爬两层楼梯即感明显呼吸困难，伴有持续性干咳。症状进行性加重，严重影响日常生活质量。",
			status: BasicStatus.ENABLE,
		},
		{
			id: "6",
			pid: "P006",
			cid: "C006",
			age: 25,
			gender: "男",
			studyDate: "2023-10-06",
			impression:
				"右膝关节MRI平扫显示，前交叉韧带（ACL）信号增高、增粗，连续性中断，股骨附着点处可见骨挫伤信号。内侧半月板后角可见水平撕裂信号，延伸至关节囊缘。外侧半月板形态及信号正常。关节腔内可见大量积液。",
			results:
				"1. 前交叉韧带（ACL）完全撕裂伴股骨髁骨挫伤。 2. 内侧半月板后角水平撕裂。 3. 关节腔大量积液。建议骨科会诊，考虑关节镜手术治疗。",
			clinicalResults:
				"体格检查：前抽屉试验及Lachman试验均为阳性，麦氏试验阳性。诊断明确为前交叉韧带断裂合并内侧半月板损伤。患者已安排接受关节镜下前交叉韧带重建及半月板修复手术。",
			history: "无特殊既往病史，身体健康。否认膝关节既往损伤史。",
			patientDesc:
				"患者于两天前参加篮球比赛时，在跳跃落地时扭伤右膝，当时听到“啪”的一声，随即出现膝关节剧烈疼痛、肿胀，无法站立及行走。",
			status: BasicStatus.DISABLE,
		},
	];

	const onCreate = (parentId?: string) => {
		setPermissionModalProps((prev) => ({
			...prev,
			show: true,
			...defaultPermissionValue,
			title: "新增病例",
			formValue: { ...defaultPermissionValue, parentId: parentId ?? "" },
		}));
	};

	const onEdit = (formValue: CaseInfo) => {
		setPermissionModalProps((prev) => ({
			...prev,
			show: true,
			title: "编辑",
			formValue,
		}));
	};
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium">病例库</h3>
					<Button onClick={() => onCreate()}>新增病例</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey="id"
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={dataSource}
				/>
			</CardContent>
			<CaseModal {...permissionModalProps} />
		</Card>
	);
}
