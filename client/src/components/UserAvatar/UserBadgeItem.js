import React from 'react';
import { Box } from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';

const UserBadgeItem = ({user, handleFunction})=>{
    return (
        <Box px={2} py={1} borderRadius={"lg"} m={1} mb={2} varient="solid" fontSize={12} bgColor="magenta" color={"white"} cursor={"pointer"} onClick={handleFunction} >
            {user.name} <CloseIcon pl={1} />
        </Box>
    )
}

export default UserBadgeItem;