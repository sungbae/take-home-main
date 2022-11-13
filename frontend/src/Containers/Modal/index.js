import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../../actions"
import {
  ModalBlock,
  ModalBody,
  ModalClose,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./styles.js"

class Modal extends Component {
  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.props.closeModal()
  }

  render() {
    if (!this.props.modalType) {
      return null
    }
    return (
      <>
        <ModalBlock>
          <ModalOverlay onClick={() => this.closeModal()}></ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{this.props.modalProps.title}</ModalTitle>
              <ModalClose onClick={() => this.closeModal()}>X</ModalClose>
            </ModalHeader>
            <ModalBody>{this.props.modalProps.body}</ModalBody>
          </ModalContainer>
        </ModalBlock>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { modal } = state
  return { ...modal }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeModal: actions.closeModal,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
