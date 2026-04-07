import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showProductView: false,
  showCartSidebar: false,
  showMobileFilterBox: false,
  isSideBarOpen: false,
  searchQuery: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowProductView: (state, action) => {
      state.showProductView = action.payload;
    },
    setShowCartSidebar: (state, action) => {
      state.showCartSidebar = action.payload;
    },
    setShowMobileFilterBox: (state, action) => {
      state.showMobileFilterBox = action.payload;
    },
    setIsSideBarOpen: (state, action) => {
      state.isSideBarOpen = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleCartSidebar: (state) => {
      state.showCartSidebar = !state.showCartSidebar;
    },
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

export const {
  setShowProductView,
  setShowCartSidebar,
  setShowMobileFilterBox,
  setIsSideBarOpen,
  setSearchQuery,
  toggleCartSidebar,
  toggleSideBar,
} = uiSlice.actions;

export default uiSlice.reducer;
