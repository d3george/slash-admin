import { Form, Modal, Input, InputNumber, Radio, TreeSelect } from 'antd';
import { useEffect } from 'react';

import { useUserPermission } from '@/store/userStore';

import { Permission } from '#/entity';
import { BasicStatus, PermissionType } from '#/enum';

export type PermissionModalProps = {
  formValue: Permission;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

export default function PermissionModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: PermissionModalProps) {
  const [form] = Form.useForm();
  const permissions = useUserPermission();

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  return (
    <Modal title={title} open={show} onOk={onOk} onCancel={onCancel}>
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item<Permission> label="Type" name="type" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={PermissionType.CATALOGUE}>CATALOGUE</Radio>
            <Radio value={PermissionType.MENU}>MENU</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<Permission> label="Name" name="name" required>
          <Input />
        </Form.Item>

        <Form.Item<Permission>
          label="Label"
          name="label"
          required
          tooltip="internationalization config"
        >
          <Input />
        </Form.Item>

        <Form.Item<Permission> label="Parent" name="parentId" required>
          <TreeSelect
            fieldNames={{
              label: 'name',
              value: 'id',
              children: 'children',
            }}
            treeData={permissions}
          />
        </Form.Item>

        <Form.Item<Permission> label="Route" name="route" required>
          <Input />
        </Form.Item>

        <Form.Item<Permission>
          label="Component"
          name="component"
          required={formValue.type === PermissionType.MENU}
        >
          <Input />
        </Form.Item>

        <Form.Item<Permission> label="Icon" name="icon" tooltip="local icon should start with ic">
          <Input />
        </Form.Item>

        <Form.Item<Permission> label="Hide" name="hide" tooltip="hide in menu">
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={false}>Show</Radio>
            <Radio value>Hide</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<Permission> label="Order" name="order">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item<Permission> label="Status" name="status" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={BasicStatus.ENABLE}> Enable </Radio>
            <Radio value={BasicStatus.DISABLE}> Disable </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
