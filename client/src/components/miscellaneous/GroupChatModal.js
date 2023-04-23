import { useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Button,
    Image,
    Text } from "@chakra-ui/react";

const GroupChatModal = ({children})=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    return (<>
    <span onClick={onOpen}>{children}</span>
    <Modal  size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
            <ModalHeader fontSize="40px" display="flex" justifyContent="center"></ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                <Text fontSize={{base:"28px", md:"30px"}}> </Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
)};

export default GroupChatModal;