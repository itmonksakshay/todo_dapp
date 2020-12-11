import React,{useState} from 'react';
import {Box,FormControl,FormLabel,Input,Button} from '@chakra-ui/react';
export default function NewTask({createTask}){

        const [taskName,setTaskName] = useState("");
        return(  <Box>
                        <FormControl>
                            <FormLabel>Create A Task</FormLabel>
                            <Input placeholder="Task Name" value={taskName} onChange={event =>setTaskName(event.target.value)}/>
                        </FormControl>
                        <Button type="submit" onClick={()=>createTask(taskName)}>Create Task</Button>
        </Box>)
}
