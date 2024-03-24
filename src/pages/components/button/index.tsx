import { Button, Card, message } from 'antd';

import { AuthWrapper } from '@/components/AuthPermission';

export default function showButtonPermission() {
  const handleClick = () => {
    message.info('您点击了按钮');
  };
  return (
    <Card title="按钮权限">
      <p className="p-2">默认Admin 有增删改查的权,Text只有查询权限</p>
      <p className="p-2">模式一:没有权限按钮就会无法点击</p>
      <div className="flex justify-around">
        <AuthWrapper auth="ADD">
          {(authorized: boolean) => (
            <Button type="primary" disabled={!authorized} onClick={handleClick}>
              增加
            </Button>
          )}
        </AuthWrapper>
        <AuthWrapper auth="DELETE">
          {(authorized: boolean) => (
            <Button danger type="primary" disabled={!authorized} onClick={handleClick}>
              删除
            </Button>
          )}
        </AuthWrapper>
        <AuthWrapper auth="CHANGE">
          {(authorized: boolean) => (
            <Button type="primary" disabled={!authorized} onClick={handleClick}>
              修改
            </Button>
          )}
        </AuthWrapper>
        <AuthWrapper auth="SEARCH">
          {(authorized: boolean) => (
            <Button type="primary" disabled={!authorized} onClick={handleClick}>
              查询
            </Button>
          )}
        </AuthWrapper>
      </div>
      <p className="p-2">模式二:没有权限按钮就不会显示</p>
      <div className="flex justify-around">
        <AuthWrapper auth="ADD">
          <Button type="primary" onClick={handleClick}>
            增加
          </Button>
        </AuthWrapper>
        <AuthWrapper auth="DELETE">
          <Button danger type="primary" onClick={handleClick}>
            删除
          </Button>
        </AuthWrapper>
        <AuthWrapper auth="CHANGE">
          <Button type="primary" onClick={handleClick}>
            修改
          </Button>
        </AuthWrapper>
        <AuthWrapper auth="SEARCH">
          <Button type="primary" onClick={handleClick}>
            查询
          </Button>
        </AuthWrapper>
      </div>
    </Card>
  );
}
