import * as React from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";
import { ListItem, ListContent, List } from "semantic-ui-react";

function MailingList({ emails, deletemail }) {
  const [open, setOpen] = React.useState(false);
  const handledelete = (index) => {
    deletemail(index);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>See List</Button>}
    >
      <ModalHeader>Your Mailing List</ModalHeader>
      <ModalContent image>
        <ModalDescription>
          <Header>Default Profile Image</Header>

          {emails.map((item, index) => (
            <List key={index} divided verticalAlign="middle">
              <ListItem>
                <ListContent floated="right">
                  <span style={{ color: "red" }}>
                    {item.blacklisted ? "Blacklisted" : null}
                  </span>
                  <Button onClick={() => handledelete(index)}>Delete</Button>
                </ListContent>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                />
                <ListContent>{item.email}</ListContent>
              </ListItem>
            </List>
          ))}
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          content="Next"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  );
}

export default MailingList;
