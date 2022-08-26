import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		displayName: '',
		uid: '',
		accessToken: '',
	},
	reducers: {
		//firebase로 받은 유저정보를 action객체로 반환하는 함수
		//해당 함수의 인수값으로 유저정보를 넣으면 자동으로 2번째 action파라미터로 전달됨
		loginUser: (state, action) => {
			state.displayName = action.payload.displayName;
			state.uid = action.payload.uid;
			state.accessToken = action.payload.accessToken;
		},
		logoutUser: (state) => {
			state.displayName = '';
			state.uid = '';
			state.accessToken = '';
		},
	},
});

//reducer에서 store에 전달될 새로운 액션객체를 만들 함수 2개를 exoport
//추후 Login컴포넌트에서 호출되어 firebase로 만들어진  user정보값을 액션객체로 반환해 리듀서에 전달해줌
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
