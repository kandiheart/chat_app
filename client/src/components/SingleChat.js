import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, Text, IconButton, Spinner, FormControl, Input, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from '../components/miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

import io from 'socket.io-client';
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain})=>{
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const {user, selectedChat, setSelectedChat, notification, setNotification} = ChatState();
    const toast = useToast();

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on('connected', ()=>{ setSocketConnected(true)});
        socket.on('typing', ()=>setIsTyping(true));
        socket.on('stop typing', ()=>setIsTyping(false));
    },[]);

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(()=>{
        socket.on('message received', (newMessageReceived)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
                if(!notification.includes(newMessageReceived)){
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const fetchMessages = async ()=>{
        if(!selectedChat) return;

        try{
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`,
                },
            };

            setLoading(true);
            const {data} = await axios.get(`/api/message/${selectedChat._id}`, config);
            setMessages(data);
            setLoading(false);

            socket.emit('join chat', selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to send the message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const sendMessage = async (event)=>{
        if(event.key === "Enter" && newMessage){
            socket.emit('stop typing', selectedChat._id);
            try{
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    },
                };

                setNewMessage("");
                const {data} = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                socket.emit('new message', data);
                setMessages([...messages,data]);
            } catch (error) {
                toast({
                    title: "Error Occured",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    const typingHandler =(e)=>{
        setNewMessage(e.target.value);

        // Typing Indicator Logic
        if(!socketConnected) return;
        if(!typing){
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(()=>{
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if(timeDiff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength)
    };

    return(
        <>
        {
            selectedChat ? (<>
                <Text fontSize={{base: "28px", md: "30px"}} pb={3} px={2} w={"100%"} display={"flex"} 
                    justifyContent={{base: "space-between"}} alignItems={"center"} fontFamily={'Orbitron'} >
                        <IconButton display={{base: "flex", md: "none"}} icon={<ArrowBackIcon/>} onClick={()=> setSelectedChat("")} />
                        {!selectedChat.isGroupChat ? (<>
                        {getSender(user, selectedChat.users)}
                        <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                        </>):(
                        <>{selectedChat.chatName.toUpperCase()}
                        <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
                        </>)}
                    </Text>
                    <Box display={"flex"} flexDir={"column"} justifyContent={"flex-end"} p={3} bg={"#E8E8E8"} 
                        w={"100%"} h={"100%"} borderRadius={"lg"} overflowY={"hidden"} >
                            {loading ? (
                                <Spinner size={"xl"} w={20} h={20} alignSelf={"center"} margin={"auto"} />
                            ): (
                                <div display="flex" flexDir={"column"} overflowY="scroll" scrollbar-width="none" >
                                    <ScrollableChat messages={messages} />
                                </div>
                            )}
                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                                {isTyping?<Player autoplay loop src={"https://assets10.lottiefiles.com/packages/lf20_nZBVpi.json"}
                                    style={{height: "50px", width: "70px", marginBottom: 10, marginLeft: 0}}>
                                    <Controls visible={false}/></Player>:<></>}
                                <Input variant={"filled"} bg={"#E0E0E0"} placeholder='Enter a message...' onChange={typingHandler} value={newMessage} />
                            </FormControl>
                    </Box>
                    </>
            ) : (
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100%"} >
                    <Text fontSize={"3xl"} pb={3} fontFamily={'Orbitron'}>Click on a User to Start Chatting</Text>
                </Box>
            )
        }
        </>
    );
};

export default SingleChat;