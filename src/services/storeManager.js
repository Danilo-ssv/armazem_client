import { create } from 'zustand'

export const accountPopUpManager = create(set => ({
  isOpen: false,
  setIsOpen: () => set(state => ({ isOpen: !state.isOpen }) ),
}))

export const editProductPopUpManager = create(set => ({
  isOpen: false,
  setIsOpen: () => set(state => ({ isOpen: !state.isOpen }) ),
}))

export const editProductStatusPopUp = create(set => ({
  isEditOpen: false,
  setIsEditOpen: () => set(state => ({ isEditOpen: !state.isEditOpen }) ),
}))

export const newProductStatusPopUp = create(set => ({
  isNewOpen: false,
  setIsNewOpen: () => set(state => ({ isNewOpen: !state.isNewOpen }) ),
}))

export const ProductErrorStatusPopUp = create(set => ({
  isErrorOpen: false,
  setIsErrorOpen: () => set(state => ({ isErrorOpen: !state.isErrorOpen }) ),
}))

export const homePage = create(set => ({
  page: 1,
  inc: () => set(state => ({ page: ++ state.page }) ),
  dec: () => set(state => ({ page: -- state.page }) ),
  setDefaultValue: () => set(state => ({ page: 1 }) ),
}))