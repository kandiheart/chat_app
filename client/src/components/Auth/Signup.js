import React, { useState } from "react";
import { VStack, FormControl, FormLabel, Input, InputRightElement, Button, InputGroup } from "@chakra-ui/react";

const Signup = () =>{
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {};

    const submitHandler =()=>{};

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
        <Button colorScheme={"blue"} width="100%" style={{marginTop:15}} onClick={submitHandler}>Sign Up</Button>
    </VStack>
    </div>)
}

export default Signup