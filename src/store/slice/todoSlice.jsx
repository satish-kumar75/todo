import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
};

export const todoSlice = createSlice({
  initialState,
  name: "todo",
  reducers: {
    addTask: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };

      state.todo.push(todo);
    },

    updateTask: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todo.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },

    removeTask: (state, action) => {
      state.todo = state.todo.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTask, removeTask,updateTask } = todoSlice.actions;
export default todoSlice.reducer;
