// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract TodoList {
    uint public taskCount=0;

    struct Task {
        uint id;
        string taskname;
        bool status;    
    }
    mapping(uint => Task) public tasks;
    event TaskCreated(uint id,string taskname,bool status);
    event TaskToggle(uint id,bool status);
    constructor() public {
     createTask("Create Todo List Dapp");
    }
    function createTask(string memory _task) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount,_task,false);
        emit TaskCreated(taskCount,_task,false);
    }
    function taskAction(uint _id) public {
        Task memory _task = tasks[_id];
        _task.status = !_task.status;
        tasks[_id] = _task;
        emit TaskToggle(_id,_task.status);
    }

}
