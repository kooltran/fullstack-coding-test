import React, { useState } from "react";
import {
  Text,
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const BlogItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        key={item.id}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        cursor="pointer"
        onClick={handleOpen}>
        <Text fontSize="lg" textAlign="center" textTransform="capitalize" marginBottom="5px">
          {item.title}
        </Text>
        <Image width="100%" src={item.url} alt={item.title} />
      </Box>

      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignContent="center">
            <Image width="100%" src={item.url} alt={item.title} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlogItem;
