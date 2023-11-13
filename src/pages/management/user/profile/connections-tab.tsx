import { faker } from '@faker-js/faker';
import { Button, Col, Row } from 'antd';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

export default function ConnectionsTab() {
  const items = [
    {
      avatar: faker.image.avatarLegacy(),
      name: faker.person.fullName(),
      title: 'UI Designer',
      tags: ['Figma', 'Sketch'],
      projects: '18',
      tasks: '834',
      connections: '129',
      connected: true,
    },
    {
      avatar: faker.image.avatarLegacy(),
      name: faker.person.fullName(),
      title: 'Developer',
      tags: ['Angular', 'React'],
      projects: '118',
      tasks: '2.32k',
      connections: '1.29k',
      connected: false,
    },
    {
      avatar: faker.image.avatarLegacy(),
      name: faker.person.fullName(),
      title: 'Developer',
      tags: ['Html', 'React'],
      projects: '32',
      tasks: '1.25k',
      connections: '890',
      connected: false,
    },
    {
      avatar: faker.image.avatarLegacy(),
      name: faker.person.fullName(),
      title: 'UI/UX Designer',
      tags: ['Figma', 'Sketch', 'Photoshop'],
      projects: '86',
      tasks: '12.4k',
      connections: '890',
      connected: false,
    },
    {
      avatar: faker.image.avatarLegacy(),
      name: faker.person.fullName(),
      title: 'Full Stack Developer',
      tags: ['React', 'Html', 'Node.js'],
      projects: '244',
      tasks: '23.9k',
      connections: '2.14k',
      connected: true,
    },
    {
      avatar: faker.image.avatarLegacy(),
      name: faker.person.fullName(),
      title: 'SEO',
      tags: ['Analysis', 'Writing'],
      projects: '32',
      tasks: '1.28k',
      connections: '1.27k',
      connected: false,
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col span={24} md={12} lg={8} key={item.name}>
          <Card className="w-full flex-col items-center">
            <img alt="" src={item.avatar} className="h-20 w-20 rounded-full" />

            <span className="mt-4 text-xl font-semibold opacity-60">{item.name}</span>
            <span className="opacity-50">{item.title}</span>

            <div className="mt-4 flex gap-4">
              {item.tags.map((tag) => (
                <ProTag color={faker.color.rgb()} key={tag}>
                  {tag}
                </ProTag>
              ))}
            </div>

            <div className="mt-4 flex gap-4">
              <div className="[ flex flex-col  items-center">
                <span className="text-xl font-semibold">{item.projects}</span>
                <span className="opacity-60">Projects</span>
              </div>
              <div className="[ flex flex-col  items-center">
                <span className="text-xl font-semibold">{item.tasks}</span>
                <span className="opacity-60">Tasks</span>
              </div>
              <div className="[ flex flex-col  items-center">
                <span className="text-xl font-semibold">{item.connections}</span>
                <span className="opacity-60">Tasks</span>
              </div>
            </div>

            <div className="mt-4 flex">
              <Button type={item.connected ? 'primary' : 'dashed'}>
                <Iconify icon="ri:user-add-line" size={14} />
                <span className="ml-2">CONNECTED</span>
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
