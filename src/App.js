import React, { useState } from 'react';
import Form from "./components/form";
import { Checkbox, Input, List, Pagination, Tabs } from "antd";
import { StyledItem } from "./style";

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
  const filterTask = (tab) => {
    if (tab === 'Все задачи') {
      setFilteredTasks([])
    } else {
      const filterResult= allTasks.filter(item => tab === 'Готовые' ? item.done : !item.done)
      setFilteredTasks(filterResult);
    }
  }
  return (
    <div>
      {/*передаем setAllTasks внутрь компонента Form (props)*/}
      <Form setAllTasks={setAllTasks}/>
      <Tabs
        type="card"
        items={['Все задачи', 'Готовые', 'Альденте'].map((tab, i) => {
          const id = String(i + 1);
          //через фильтр создаем новый массив, который отображает задачи по статуту "готовности"
          filterTask(tab);
          return {
            label: tab, // имя таба
            key: id,
            children: // контент внутри каждого таба
              <List
                bordered
                dataSource={tab === 'Все задачи' ? allTasks : filteredTasks}
                renderItem={(item) => ( // мапим массив allTasks/filteredTasks и возвращаем новый, измененный
                  <>
                    <StyledItem
                      actions={[
                        <a key="list-loadmore-more" onClick={() => removeTask(item.id)}>
                          Удалить
                        </a>]}
                    >
                      <Checkbox checked={item.done}
                                onChange={() => handleCheckbox(item)}/> {/*меняем checkbox*/}
                      {item.edit
                        ? <Input value={item.text}
                                 onBlur={() => handleEdit(item)}
                                 onChange={(event) => editText(event.target.value, item)}
                                 onPressEnter={() => handleEdit(item)}
                        />
                        : <span style={{ color: item.done && 'red' }}
                                onDoubleClick={() => handleEdit(item)}>{item.text}
                        </span>
                      }
                    </StyledItem>
                  </>
                )}
              />,
          };
        })}
      />
      <Pagination
        pageSize={5}
        total={!filteredTasks.length ? allTasks.length : filteredTasks.length}
        onChange={(event) => setPage(event)}
      />
    </div>
  );
}

export default App;
