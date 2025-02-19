import React, { useState } from "react";
import { VStack, FormControl, FormLabel, Input, InputRightElement, Button, InputGroup, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useNavigate();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);
        if(pic===undefined){
            toast({
                title: "Please select an image.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if(pics.type==="image/jpeg"|| pics.type==="image/png"){
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "djatoi1ah");
            fetch("https://api.cloudinary.com/v1_1/djatoi1ah/image/upload", {
                method:'post', body:data,
            }).then((res)=>res.json()).then(data=>{
                setPic(data.url.toString());
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            });
        }else{
            toast({
                title: "Please select an image.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async()=>{
        setLoading(true);
        if(!name||!email||!password||!confirmpassword){
            toast({
                title: "Please fill all the fields.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if(password !== confirmpassword){
            toast({
                title: "Passwords do not match.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try{
            const config = {
                headers:{
                    "Content-type": "application/json",
                },
            };
            const {data} = await axios.post("/api/user",{name,email,password,pic}, config);
            toast({
                title: "User Registered Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history('/chats');
        }catch(error){
            toast({
                title: "Error Occurred",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return (<div>
    <VStack spacing={"5px"} color="black">
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}></Input>
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input type={show? "text" : "password"} placeholder="Enter Your Password" onChange={(e)=>setPassword(e.target.value)}></Input>
            <InputRightElement width={"4.5rem"}><Button h={"1.75rem"} size="sm" onClick={handleClick}>{show ? "Hide" : "Show"}</Button></InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input type={show? "text" : "password"} placeholder="Confirm Password" onChange={(e)=>setConfirmpassword(e.target.value)}></Input>
            <InputRightElement width={"4.5rem"}><Button h={"1.75rem"} size="sm" onClick={handleClick}>{show ? "Hide" : "Show"}</Button></InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="pic">
            <FormLabel>Upload Your Picture</FormLabel>
            <Input type={"file"} p={1.5} accept="image/*" onChange={(e)=> postDetails(e.target.files[0])}></Input>
        </FormControl>
        <Button colorScheme={"blue"} width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>Sign Up</Button>
    </VStack>
    </div>)
}

export default Signup