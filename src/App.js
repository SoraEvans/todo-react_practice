import React, { useEffect, useState } from 'react';
import Form from "./components/form";
import { Checkbox, Input, List, Pagination, Tabs } from "antd";
import { StyledItem } from "./style";

const ELEM_ON_PAGE = 5
// создаем глобальную компаненту
const App = () => {
  const [allTasks, setAllTasks] = useState([]); // хук для создания состояния
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    setPage(!filteredTasks.length ? Math.ceil(allTasks.length / ELEM_ON_PAGE) : Math.ceil(filteredTasks.length / ELEM_ON_PAGE))
  }, [allTasks])

  return (
    <div>
      {/*передаем setAllTasks внутрь компонента Form (props)*/}
      <Form setAllTasks={setAllTasks} />
      <Tabs
        type="card"
        onChange={tabNum => {
          if (+tabNum === 1) {
            setFilteredTasks([])
          } else setFilteredTasks(allTasks.filter(item => +tabNum === 2 ? item.done : !item.done))
        }}

        items={['Все задачи', 'Готовые', 'Альденте'].map((tab, i) => {
          const id = String(i + 1);
          const start = (page - 1) * ELEM_ON_PAGE;
          const end = start + ELEM_ON_PAGE;
          //через фильтр создаем новый массив, который отображает задачи по статуту "готовности"
          return {
            label: tab, // имя таба
            key: id,
            children: // контент внутри каждого таба
              <List
                bordered
                dataSource={tab === 'Все задачи' ? allTasks.slice(start, end) : filteredTasks.slice(start, end)}
                renderItem={(item) => ( // мапим массив allTasks/filteredTasks и возвращаем новый, измененный
                  <StyledItem
                    actions={[
                      <a key="list-loadmore-more" onClick={() => removeTask(item.id)}>
                        Удалить
                      </a>]}
                  >
                    <Checkbox checked={item.done}
                              onChange={() => handleCheckbox(item)} /> {/*меняем checkbox*/}
                    {item.edit
                      ? <Input value={item.text}
                               onBlur={() => handleEdit(item)}
                               onChange={(event) => editText(event.target.value, item)}
                               onPressEnter={() => handleEdit(item)}
                      />
                      : <span style={{ color: item.done && 'red', flex: 1 }}
                              onDoubleClick={() => handleEdit(item)}>{item.text}
                        </span>
                    }
                  </StyledItem>
                )}
              />,
          };
        })}
      />
      <Pagination
        current={page}
        pageSize={ELEM_ON_PAGE}
        total={!filteredTasks.length ? allTasks.length : filteredTasks.length}
        onChange={(event) => setPage(event)}
        onShowSizeChange={(event, n) => console.log(event, n)}
        hideOnSinglePage
      />
    </div>
  );
}

export default App;
