import { HIDE_MODAL, SHOW_MODAL } from "../actions"

const initialState = {
  modalType: null,
  modalProps: {},
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
      }

    case HIDE_MODAL:
      return initialState

    default:
      return state
  }
}
