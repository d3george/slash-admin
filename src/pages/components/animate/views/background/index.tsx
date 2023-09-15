import { Card, Row, Col } from 'antd';
import { useMemo, useState } from 'react';

import ControlPanel from '../../control-panel';

import ContainerView from './container';
import Toolbar from './toolbar';

export default function BackgroundView() {
  const defaultValue = useMemo(() => {
    return {
      selectedVariant: 'kenburnsTop',
    };
  }, []);
  const [selectedVariant, setSelectedVariant] = useState(defaultValue.selectedVariant);

  const onRefresh = () => {
    setSelectedVariant(defaultValue.selectedVariant);
  };
  return (
    <Card>
      <Row>
        <Col xs={24} md={18}>
          <Toolbar onRefresh={onRefresh} />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col xs={24} md={18}>
          <ContainerView variant={selectedVariant} />
        </Col>
        <Col xs={24} md={5}>
          <ControlPanel
            variantKey={variantKey}
            selectedVariant={selectedVariant}
            onChangeVarient={(varient) => setSelectedVariant(varient)}
          />
        </Col>
      </Row>
    </Card>
  );
}
const variantKey = [
  {
    type: 'kenburns',
    values: ['kenburnsTop', 'kenburnsBottom', 'kenburnsLeft', 'kenburnsRight'],
  },
  {
    type: 'pan',
    values: ['panTop', 'panBottom', 'panLeft', 'panRight'],
  },
  {
    type: 'color change',
    values: ['color2x', 'color3x', 'color4x', 'color5x'],
  },
];
