import styled from 'styled-components';

export const Outer = styled.ul.attrs(() => ({
  className: 'crystallize-growl',
  role: 'alert',
  'aria-live': 'assertive',
}))`
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  list-style: none;
  padding: 5px;
  margin: 0;
  pointer-events: none;

  > li {
    display: block;
    margin: 5px;
    padding: 0;
    pointer-events: initial;
  }
`;

export const GrowlComponent = styled.div.attrs(
  ({ type }: { type: GrowlType }) => {
    return {
      className: `crystallize-growl__item crystallize-growl__item-${
        type || 'info'
      }`,
    };
  }
)`
  cursor: default;
  border-radius: 8px;
  padding: 20px 30px 20px 20px;
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 5px;
  max-width: 50vw;

  /* Defaults to info */
  background: #bff6f8;
  color: #6c7d7b;

  &.crystallize-growl__item-error {
    background: #facbcf;
    color: #967376;
  }

  &.crystallize-growl__item-warning {
    background: #fdf5bf;
    color: #9a946e;
  }

  ::selection {
    background: transparent;
  }

  > svg {
    display: inline-block;
    margin-right: 20px;
    width: 40px;
    flex: 0 0 40px;
  }
`;

export const Text = styled.div.attrs(() => ({
  className: 'crystallize-growl__item-text',
}))`
  margin-top: 5px;
  font-size: 14px;
`;

export const Title = styled.strong.attrs(() => ({
  className: 'crystallize-growl__item-title',
}))`
  display: block;
  font-size: 16px;
`;

export const RemoveButton = styled.button.attrs(() => ({
  className: 'crystallize-growl__item-remove',
}))`
  appearance: none;
  border: none;
  background: transparent;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;
