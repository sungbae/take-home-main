export const SHOW_MODAL = "INSERT_MODAL"
export const HIDE_MODAL = "INSERT_MODAL"

export const openModal = (modalParams) => {
  return { type: SHOW_MODAL, ...modalParams }
}

export const closeModal = () => {
  return { type: HIDE_MODAL }
}
