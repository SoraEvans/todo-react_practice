import styled from 'styled-components/macro';
import { Button, Form, Input } from "antd";
import { HOVER_GREEN, MAIN_GREEN, SECOND_GREEN } from "../../constants";

export const StyledInput = styled(Input)`

`
export const StyledButton = styled(Button)`
  background-color: ${MAIN_GREEN};
  margin-left: 0.5rem;

  &:hover {
    background-color: ${HOVER_GREEN} !important;
  }

  &:active {
    background-color: ${HOVER_GREEN} !important;
  }
`
export const StyledForm = styled(Form)`
  display: flex;
  margin-bottom: 1rem;

  .ant-input:hover {
    border-color: ${MAIN_GREEN} !important;
  }

  .ant-input:focus {
    border-color: ${MAIN_GREEN};
    box-shadow: 0 0 0 2px ${SECOND_GREEN};
`
