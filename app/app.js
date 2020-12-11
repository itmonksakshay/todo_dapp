import React,{Component,createRef} from 'react';
import Web3 from 'web3';
import { ChakraProvider,Box,Heading,List,ListItem,Checkbox } from "@chakra-ui/react";
import NewTask from './component/newTaskForm';
import TodoList from './contract/TodoList.json';
export default class App extends Component {
        
        constructor(props){
            super(props);
            this.state = {account:'',taskCount:0,tasks:[],loading:true};
            this.createTask = this.createTask.bind(this);

            this.checkbox = createRef();
        }
        componentDidMount(){
            this.loadBlockChain();
    
        }
        createTask(data){
            this.state.todolist.methods.createTask(data).send({ from: this.state.account }).once('receipt', (receipt) => {
                console.log("created"); })        
        }
        taskStatusToggle(id){
                this.state.todolist.methods.taskAction(id).send({ from: this.state.account }).once('receipt', (receipt) => {
                    console.log("Task Status is changed");
                })
        }
        async loadBlockChain(){
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            const accounts = await web3.eth.getAccounts();
            this.setState({account:accounts[0]});
            const networkId = await web3.eth.net.getId();
            const networkData = TodoList.networks[networkId];
            if(networkData) {
                const todolist = new web3.eth.Contract(TodoList.abi, networkData.address);
                this.setState({todolist});
                const taskCount = await todolist.methods.taskCount().call();
                this.setState({taskCount:taskCount});
                for (var i = 1; i <= taskCount; i++) {
                    const task = await todolist.methods.tasks(i).call()
                    this.setState({tasks:[...this.state.tasks, task]})
                }
                this.setState({loading:false})
            }
            else {
                window.alert('Todo List contract not deployed to detected network.')
             }

        }
        render(){
            return(<ChakraProvider>
                        <Box>
                            <Heading as="h4">To Do List Account:{this.state.account}</Heading>
                            <Box>
                                <NewTask createTask={this.createTask}/>
                            </Box>
                            <Box>
                                <List>
                                {this.state.tasks.map((task, key) => {
                                        console.log(task);
                                    return(<ListItem key={key}>
                                                <Checkbox id={task.id} 
                                                    size="md" 
                                                    colorScheme="green"
                                                    isDisabled={task.status}
                                                    ref={this.checkbox}
                                                    onChange={()=> this.taskStatusToggle(this.checkbox.current.id)} >{task.taskname}</Checkbox>
                                            </ListItem>);
                                })}
                                    <ListItem></ListItem>
                                </List>
                            </Box>
                        </Box>
                    </ChakraProvider>);
        }

} 
