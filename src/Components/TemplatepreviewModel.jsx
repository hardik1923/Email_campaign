import React from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
function ModalExampleModal({ open, setOpen }) {
  const Templatehtml = useSelector((state) => state.Template.Templatehtml);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <ModalHeader>Template Preview</ModalHeader>
      <ModalContent>
        <ModalDescription>
          {/* <Header>Default Profile Image</Header> */}
        </ModalDescription>
        {parse(Templatehtml || "Unable to fetch")}
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          content="Edit Teamplate "
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  );
}

export default ModalExampleModal;
