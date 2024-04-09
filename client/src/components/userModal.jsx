import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Widget } from "@uploadcare/react-widget";
import { Form, FormGroup, Input } from "reactstrap";
import "./userModal.css";

const UserModal = (props) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const { name, about, image } = props.user;
    setAbout(about);
    setImage(image);
    setName(name);
  }, [props]);

  const { modalState, toggle, edit } = props;

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handleImageChange = (info) => {
    const image = info.cdnUrl;
    setImage(image);
  };

  const handleAboutChange = (e) => {
    const about = e.target.value;
    setAbout(about);
  };

  const saveEdit = () => {
    const newUser = {
      name: name,
      image: image,
      about: about,
    };
    edit(newUser);
    toggle();
  };

  return (
    <div>
      <Modal isOpen={modalState} toggle={() => toggle()} autoFocus={false}>
        <div className="">
          <ModalHeader>Update Your Info</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup align="center">
                <div className="row m-2 pb-3">
                  <img
                    src={image}
                    alt="current dp"
                    height="150"
                    width="150"
                    className="col-5"
                    loading="lazy"
                  ></img>
                  <div className="upload-btn-wrapper col d-flex justify-content-start align-items-center">
                    <Widget
                      onChange={(info) => handleImageChange(info)}
                      publicKey="08beda5d9c305076f509"
                      id="file"
                      imagesOnly={true}
                      previewStep={true}
                      crop={"1:1"}
                      imageShrink={"1024x1024"}
                    />
                  </div>
                </div>
                <Input
                  type="text"
                  name="text"
                  placeholder="username"
                  id="changeusername"
                  value={name}
                  onChange={(event) => handleNameChange(event)}
                  className="mb-3"
                  spellCheck={false}
                  autoFocus
                />
                <Input
                  type="textarea"
                  name="text"
                  placeholder="About yourself in 600 characters or less...  "
                  id="changeabout"
                  value={about}
                  onChange={(event) => handleAboutChange(event)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => saveEdit()}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={() => toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default UserModal;
