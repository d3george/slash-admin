import { Form, Modal, Input, InputNumber, Radio, Tree } from 'antd';
import { useEffect } from 'react';

import { PERMISSION_LIST } from '@/_mock/assets';
import { flattenTrees } from '@/utils/tree';

import { Permission, Role } from '#/entity';
import { BasicStatus } from '#/enum';

export type RoleModalProps = {
  formValue: Role;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};
const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function RoleModal({ title, show, formValue, onOk, onCancel }: RoleModalProps) {
  const [form] = Form.useForm();

  const flattenedPermissions = flattenTrees(formValue.permission);
  const checkedKeys = flattenedPermissions.map((item) => item.id);
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
        <Form.Item<Role> label="Name" name="name" required>
          <Input />
        </Form.Item>

        <Form.Item<Role> label="Label" name="label" required>
          <Input />
        </Form.Item>

        <Form.Item<Role> label="Order" name="order">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item<Role> label="Status" name="status" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={BasicStatus.ENABLE}> Enable </Radio>
            <Radio value={BasicStatus.DISABLE}> Disable </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<Role> label="Desc" name="desc">
          <Input.TextArea />
        </Form.Item>

        <Form.Item<Role> label="Permission" name="permission">
          <Tree
            checkable
            checkedKeys={checkedKeys}
            treeData={PERMISSIONS}
            fieldNames={{
              key: 'id',
              children: 'children',
              title: 'name',
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
