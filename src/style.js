import styled from "styled-components/macro";
import { Button, List, Pagination, Tabs } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { MAIN_GREEN } from "./constants";

const { Item } = List;

export const StyledItem = styled(Item)`
  display: flex !important;
  overflow: auto;
  padding: 1rem !important;

  &::-webkit-scrollbar {
    display: none;
  }

  .ant-list-item-action {
    margin-inline-start: 1rem !important;

    & > li {
      padding: 0 !important;

      & > a {
        color: rgba(241, 9, 9, 0.68);
        font-weight: 600;
      }
    }
  }
`
export const StyledContainer = styled.div`
  padding: 10px;
  max-width: 50rem;
  margin: 5rem auto;
  font-family: 'Golos Text Regular', sans-serif;
`
export const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: fit-content;
  font-family: 'Golos Text Bold', sans-serif;

  & > span:first-child {
    font-size: 56px;
    font-weight: 800;
    color: #46484b;
  }

  & > span:nth-child(2) {
    font-size: 24px;
    font-weight: 600;
    color: #66696e;
  }
`
export const StyledCheckbox = styled(Checkbox)`
  margin-right: 0.75rem;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${MAIN_GREEN};
    border-color: ${MAIN_GREEN};
  }

  .ant-checkbox-inner {
    width: 18px;
    height: 18px;

    &::after {
      width: 7px;
      height: 10px;
      top: 45%;
    }
  }
`
export const StyledSpan = styled.span`
  flex: 1;
  text-decoration: ${props => props.color && 'line-through'};
  color: ${props => props.color ? '#CDCDCD' : 'black'};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const StyledButton = styled(Button)`
  background-color: ${MAIN_GREEN};
  color: white;
`

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    &::before {
      border-bottom: none;
    }

    margin: 0 0 -1px 0;
  }

  .ant-tabs-tab {
    border-color: #d9d9d9 !important;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${MAIN_GREEN} !important;
  }

  .ant-tabs-tab:not(.ant-tabs-tab-active) {
    background-color: #d0d2d9 !important;
    color: #686a6c;
  }
`

export const StyledList = styled(List)`
  background-color: white;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
`

export const StyledPagination = styled(Pagination)`
  .ant-pagination-item-active {
    background-color: ${MAIN_GREEN};
    border-color: ${MAIN_GREEN};

    & > a {
      color: white;
    }
  }
`

export const StyledEmptyBlock = styled.li`
  padding: 2rem 0;
`