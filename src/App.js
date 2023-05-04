import React, { useEffect, useState } from 'react';
import Form from "./components/form";
import { Input } from "antd";
import {
  StyledButton,
  StyledCheckbox,
  StyledContainer, StyledEmptyBlock,
  StyledItem, StyledList, StyledPagination,
  StyledSpan,
  StyledTabs,
  StyledTitle
} from "./style";
import emptyList from './assets/emptyList.svg'

const tabsArray = ['Все задачи', 'Готовые', 'Не готовые'];
const ELEM_ON_PAGE = 5;
// создаем глобальную компоненту
const App = () => {
  const [allTasks, setAllTasks] = useState(JSON.parse(localStorage.getItem('allTasks')) || []); // хук для создания состояния
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('1');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const removeTask = (id) => {
    setAllTasks(prevState => prevState.filter(item => item.id !== id)); // перезаписываем allTasks по фильтру
  }
  const editText = (newText, item) => {
    setAllTasks(prevState => prevState.map(task => {
      // при совпадении id переписываем значение text у текущей задачи, иначе возвращаем неизменененую задачу
      return (task.id === item.id) ? { ...task, text: newText } : task;
    }))
  }
  const handleEdit = item => {
    setAllTasks(prevState => prevState.map(task => {
      // при совпадении id переписываем значение edit у текущей задачи, иначе возвращаем неизменененую задачу
      return (task.id === item.id) ? { ...task, edit: !task.edit } : task;
    }))
  }
  const handleCheckbox = item => {
    setAllTasks(prevState => prevState.map(task => {
      // при совпадении id переписываем значение done у текущей задачи, иначе возвращаем неизменененую задачу
      return (task.id === item.id) ? { ...task, done: !task.done } : task;
    }))
  }

  const clearTaskList = () => {
    if (filteredTasks.length) {
      setAllTasks(prevState => prevState.filter((item) => +tab === 2 ? !item.done : item.done))
      setFilteredTasks([])
    } else setAllTasks([])

    setTab('1')
  }

  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(allTasks))
    setPage(!filteredTasks.length
      ? Math.ceil(allTasks.length / ELEM_ON_PAGE)
      : Math.ceil(filteredTasks.length / ELEM_ON_PAGE))
  }, [allTasks])

  useEffect(() => {
    if (+tab === 1) {
      setFilteredTasks([])
    } else setFilteredTasks(allTasks.filter(item => +tab === 2 ? item.done : !item.done))
  }, [allTasks, tab])

  return (
    <StyledContainer>
      <StyledTitle>
        <span>Just Do It!</span>
        <span>список задач</span>
      </StyledTitle>
      {/*передаем setAllTasks внутрь компонента Form (props)*/}
      <Form setAllTasks={setAllTasks}/>
      <StyledTabs
        type="card"
        activeKey={tab}
        onChange={tabNum => setTab(tabNum)}

        items={tabsArray.map((tab, i) => {
          const id = String(i + 1);
          const start = (page - 1) * ELEM_ON_PAGE;
          const end = start + ELEM_ON_PAGE;

          return {
          label: tab, // имя таба
          key: id,
          children: // контент внутри каждого таба
          <StyledList
          locale={{
          emptyText:
          <StyledEmptyBlock>
          <img src={emptyList} alt="Empty" width="48"/>
          <div>Список дел пуст</div>
          </StyledEmptyBlock>
        }}
          bordered
          dataSource={tab === 'Все задачи' ? allTasks.slice(start, end) : filteredTasks.slice(start, end)}
          renderItem={(item) => ( // мапим массив allTasks/filteredTasks и возвращаем новый, измененный
          <StyledItem
          actions={[
          <a
          key="list-loadmore-more"
          onClick={() => removeTask(item.id)}
          >
          Удалить
          </a>]}
          >
          <StyledCheckbox checked={item.done}
          onChange={() => handleCheckbox(item)}
          /> {/*меняем checkbox*/}
        {item.edit
          ? <Input value={item.text}
          onBlur={() => handleEdit(item)}
          onChange={(event) => editText(event.target.value, item)}
          onPressEnter={() => handleEdit(item)}
          />
          : <StyledSpan taskColor={item.done} // цвет выполненной задачи
          onDoubleClick={() => handleEdit(item)}
          >
        {item.text}
          </StyledSpan>
        }
          </StyledItem>
          )}
          />,
        };
        })}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        {allTasks.length
          ? <StyledButton type="primary"
                          onClick={clearTaskList}>Удалить {tabsArray[+tab - 1].toLowerCase()}
          </StyledButton>
          : ''}
        <StyledPagination
          current={page}
          pageSize={ELEM_ON_PAGE}
          total={!filteredTasks.length ? allTasks.length : filteredTasks.length}
          onChange={(event) => setPage(event)}
          onShowSizeChange={(event, n) => console.log(event, n)}
          hideOnSinglePage
        />
      </div>
    </StyledContainer>
  );
}

export default App;
