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

function getTheme({ type }) {
  switch (type) {
    case 'error':
      return `
        background: orangered;
        color: #fff;
      `;
    case 'warning':
      return `
        background: #f58ea5;
        box-shadow: 0 0 5px hsl(347, 84%, 26%);
      `;
    default:
      return `
        background: #fff;
      `;
  }
}

const GrowlPosed = posed.div({
  enter: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: 100 }
});

export const Growl = styled(GrowlPosed).attrs({
  className: getItemClassNames
})`
  box-shadow: 0 0 5px #000;
  padding: 10px 20px;
  cursor: default;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  max-width: calc(100vw - 30px);
  ${getTheme};

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  ::selection {
    background: transparent;
  }
`;
