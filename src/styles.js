import styled from 'styled-components';
import posed from 'react-pose';

export const Outer = styled.div.attrs(() => ({
  className: 'crystallize-growl',
  role: 'alert',
  'aria-live': 'assertive'
}))`
  position: fixed;
  z-index: 999;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 0;
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
    case 'success':
      return `
        background: #75c575;
        color: #fff;
        box-shadow: 0 0 5px #75c575;
      `;
    default:
      return `
        background: #fff;
      `;
  }
}

const GrowlPosed = posed.div({
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 }
});

export const Growl = styled(GrowlPosed).attrs(() => ({
  className: getItemClassNames
}))`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  padding: 10px 20px;
  cursor: default;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  transition: color 100ms, background-color 100ms;
  border-radius: 20px;
  transform-origin: center center;
  min-width: 100px;
  max-width: 400vw;
  ${getTheme};

  &:not(:first-child) {
    margin-top: 5px;
  }

  ::selection {
    background: transparent;
  }
`;
