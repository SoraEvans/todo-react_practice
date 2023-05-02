import styled from "styled-components/macro";
import { List } from "antd";

const { Item } = List;

export const StyledItem = styled(Item)`
  display: flex !important;
  overflow: auto;

  & ::-webkit-scrollbar {
    display: none;
  }
`