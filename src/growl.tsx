import React from 'react';

import { CloseIcon, ErrorIcon, InfoIcon, WarningIcon } from './icons';
import { GrowlComponent, RemoveButton, Text, Title } from './styles';

const icons = {
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

interface GrowlProps {
  message: React.ReactNode;
  remove: () => void;
  sticky: boolean;
  title: string;
  type: GrowlType;
}

export function Growl(props: GrowlProps) {
  const { message, remove, sticky, title, type } = props;
  const Icon = icons[type] || icons.info;

  return (
    <GrowlComponent type={type}>
      <Icon />
      <Text>
        {title && <Title>{title}</Title>}
        {message}
      </Text>
      {!sticky && (
        <RemoveButton type="button" aria-label="Close" onClick={remove}>
          <CloseIcon />
        </RemoveButton>
      )}
    </GrowlComponent>
  );
}
