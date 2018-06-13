import styled from 'styled-components';
import posed from 'react-pose';

export const Outer = styled.div.attrs({
  className: 'crystallize-growl',
  role: 'alert',
  'aria-live': 'assertive'
})`
  position: fixed;
  z-index: 999;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 100px;
  max-width: 40vw;
`;

function getItemClassNames({ type }) {
  const classes = ['__item'];
  if (type) {
    classes.push(`__item--${type}`);
  }
  return classes.map(c => `crystallize-growl${c}`).join(' ');
}

function getBackground({ type }) {
  switch (type) {
    case 'error':
      return '#f58ea5';
    case 'warning':
      return 'orangered';
    default:
      return '#fff';
  }
}

const GrowlPosed = posed.div({
  enter: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: 100 }
});

export const Growl = styled(GrowlPosed).attrs({
  className: getItemClassNames
})`
  padding: 10px 20px;
  background: ${getBackground};
  box-shadow: 0 0 5px #000;
  cursor: default;
  color: #333;
  white-space: nowrap;
  box-sizing: border-box;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  ::selection {
    background: transparent;
  }
`;
