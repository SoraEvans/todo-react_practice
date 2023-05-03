import styled from 'styled-components/macro';
import { Button, Form, Input } from "antd";
import { MAIN_GREEN } from "../../constants";

export const StyledInput = styled(Input)`
 
`
export const StyledButton = styled(Button)`
  background-color: ${MAIN_GREEN};
  margin-left: 0.5rem;
`
export const StyledForm = styled(Form)`
  display: flex;
  margin-bottom: 1rem;
`
