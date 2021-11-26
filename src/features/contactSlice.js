import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contactList: []
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        saveContact: (state, action) => {
            state.contactList.push(action.payload);
        }
    }
});

export const { saveContact } = contactSlice.actions;

export const selectContactList = state => state.contacts.contactList;

export default contactSlice.reducer