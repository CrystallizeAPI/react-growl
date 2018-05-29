import styled from 'styled-components';

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

  ${p =>
    p.show &&
    `
    min-width: 100px;
    max-width: 40vw;
  `};
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

export const Growl = styled.div.attrs({
  className: getItemClassNames
})`
  padding: 10px 20px;
  background: ${getBackground};
  box-shadow: 0 0 5px #000;
  cursor: pointer;
  color: #333;

  transition: transform 100ms, opacity 100ms;
  transform: ${p => (p.animatedIn ? 'none' : 'scale(.75)')};
  opacity: ${p => (p.animatedIn ? '1' : '0')};

  &:not(:first-child) {
    margin-top: 5px;
  }
`;
