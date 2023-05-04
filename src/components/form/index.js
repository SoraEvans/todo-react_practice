import { StyledButton, StyledForm, StyledInput } from './style';
import React, { useRef } from 'react';
import { Form } from "antd";

const FormComponent = ({ setAllTasks }) => { // props из App.js
  const [form] = Form.useForm(); // хук формы
  const inputRef = useRef(null); // якорный хук - отслеживание инпута для автофокуса
  const addTask = (values) => {
    // записываем в allTasks новый массив, в который деструктуризируем изначальный массив и сохраняем новый объект(задачу)
    setAllTasks(prevState => [...prevState, { text: values.taskText, id: Date.now(), done: false, edit: false }]);
    form.resetFields(); // очистка инпута формы
    inputRef.current.focus({ cursor: 'start' });
  }
  return (
    <StyledForm
      form={form} // связь с конкретной формой
      name="basic"
      // автостилизация формы из antd
      onFinish={addTask} // вызов функции при отправке формы
      autoComplete="off" // запоминание задач
    >
      {/*внутренний элемент формы*/}
      <Form.Item
        name="taskText"
        rules={[
          {
            required: true,
            message: 'Сначала введите текст задачи',
          },
        ]}
        style={{ flex: 1 }}
      >
        <StyledInput ref={inputRef}
                     autoFocus
                     placeholder="Добавьте задачу"/>
      </Form.Item>
      <Form.Item>
        {/*кнопка, которая вызывает onFinish*/}
        <StyledButton type="primary" htmlType="submit">
          Добавить
        </StyledButton>
      </Form.Item>
    </StyledForm>
  )
}


export default FormComponent;
