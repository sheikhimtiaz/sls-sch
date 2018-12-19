window.onload = function(){
    var initObj ={
        taskCount : 4,
        loadStatus : 0,
        tasks : [
            { description: "Eat Some Kacchi",
              status: "Active"},
            { description: "Work Hard",
              status: "Active"},
            { description: "Sleep Well",
              status: "Active"},
            { description: "Get things done",
              status: "Active"}
              
        ]
    };
    //localStorage.clear();

    var mainObject;

    function getData(){    
        if(localStorage.getItem("mainObject")==null){
            localStorage.setItem('mainObject',JSON.stringify(initObj));
        }
        mainObject=JSON.parse(localStorage.getItem("mainObject"));
    }

    function setData(){
        localStorage.setItem('mainObject',JSON.stringify(mainObject));
    }

    var mainBody=document.getElementsByTagName('body')[0];
    mainBody.className = 'mainPage';

    var updateTaskIndex;
    function clearMainBody(){
        while(mainBody.childElementCount > 0 )
        {
            mainBody.removeChild(mainBody.firstChild);
        }
    }

    function clearInputField(){
        var reset=document.getElementById('inputNewTaskId');
        reset.value="";
    }

    function addNewTask(){
        var taskDescription=document.getElementById('inputNewTaskId').value;
        if(taskDescription==""){
            alert("Please type a valid task!");
            return;
        }
        var initStatus="Active";
        var newTask={
            description: taskDescription,
            status: initStatus
        };
        mainObject.tasks.push(newTask);
        mainObject.taskCount++;
        setData();
        getData();
        clearInputField();
        loadTasks();
    }

    function addHeader(){
        var header=document.createElement('div');
        header.className = 'header';

        var h1=document.createElement('h1');
        h1.className = 'mainTitle';
        h1.innerHTML = "TO DO APP";
        header.appendChild(h1);

        var taskInputButtonRow = document.createElement('div');
        taskInputButtonRow.className = 'taskInputButtonRow';

        var space = document.createElement('div');
        space.className = 'space';
        
        taskInputButtonRow.appendChild(space);

        var input = document.createElement('input');
        input.className = 'iputNewTask';
        input.type = 'text';
        input.id = 'inputNewTaskId';
        input.placeholder = 'type task';
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                //document.getElementById("addNewTaskButton").click();
                addNewTask();
             }
        });
        taskInputButtonRow.appendChild(input);

        var button = document.createElement('button');
        button.id = "addNewTaskButton";
        button.onclick = addNewTask;
        button.className = 'greenButton';
        button.textContent = "ADD NEW TASK";
        taskInputButtonRow.appendChild(button);

        var space2 = document.createElement('div');
        space2.className = 'space';
        
        taskInputButtonRow.appendChild(space2);

        header.appendChild(taskInputButtonRow);
        mainBody.appendChild(header);
    }
    
    function addFooter(){
        var footer = document.createElement('div');
        footer.innerHTML = "Assignment 03, Date: December 20, 2018. @SeliseSchool";
        footer.className="footer";
        mainBody.appendChild(footer);
    }

    function addListHeader(){
        var paddingLeft=document.createElement('div');
        paddingLeft.className = 'paddingLeft';

        var p=document.createElement('p');
        p.className = 'listHeaderClass';
        p.textContent = 'To Do List';

        paddingLeft.appendChild(p);

        var taskAndStatusButtonSection=document.createElement('div');
        taskAndStatusButtonSection.className = 'taskAndStatusButtonSectionClass';
        taskAndStatusButtonSection.id = 'taskAndStatusButtonSection';

        paddingLeft.appendChild(taskAndStatusButtonSection);

        mainBody.appendChild(paddingLeft);
    }

    function showAll(){
        mainObject.loadStatus=0;
        loadTasks();
        setData();
    }

    function showCompleted(){
        mainObject.loadStatus=1;
        loadTasks();
        setData();
    }

    function showActive(){
        mainObject.loadStatus=2;
        loadTasks();
        setData();
    }

    function clearTaskList(){
        var taskListFull=document.getElementById('taskListId');
        while(taskListFull.childElementCount > 0 )
        {
            taskListFull.removeChild(taskListFull.firstChild);
        }
    }

    function updateThis(index){
        return function(){
            updateTaskIndex=index;
            console.log(mainObject.tasks[updateTaskIndex].description);
    
            updateTaskStatus();
        }
    }

    function updateTaskStatus(){
        if(mainObject.tasks[updateTaskIndex].status == 'Active'){
            mainObject.tasks[updateTaskIndex].status = 'Completed';
        }
        else{
            mainObject.tasks[updateTaskIndex].status = 'Active';
        }
        setData();
        getData();
        loadTasks();
    }

    function setInputFieldToUpdate(index){
        return function(){
            var getButton=document.getElementById('addNewTaskButton');
            getButton.textContent = "Update Task";
            getButton.onclick = updateTaskInformation(index);

            var getInput=document.getElementById('inputNewTaskId');
            getInput.value = mainObject.tasks[index].description;
            getInput.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.getElementById("addNewTaskButton").click();
                    //updateTaskInformation(index);
                 }
            });
        };
    }

    function updateTaskInformation(index){
        return function(){
            var getInput = document.getElementById('inputNewTaskId');
            if(getInput.value == ''){
                alert('Please give a valid input!');
                return;
            }
            mainObject.tasks[index].description = getInput.value;
            setData();
            getData();
            loadTasks();

            var getButton=document.getElementById('addNewTaskButton');
            getButton.textContent = "ADD NEW TASK";
            getButton.onclick = addNewTask;

            getInput.value = "";
            getInput.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.getElementById("addNewTaskButton").click();
                    //addNewTask();
                 }
            });
        };
    }

    function deleteTaskInformation(index){
        return function(){
            var description=mainObject.tasks[index].description;
            var rogerThat=confirm("You want to delete '" + description + "' ?");
            if(rogerThat == true)
            {
                mainObject.tasks.splice(index, 1);
                mainObject.taskCount--;
                setData();
                getData();
                loadTasks();
            }
        };
    }

    function loadTasks(){
        clearTaskList();

        var taskListFull=document.getElementById('taskListId');

        var index=0;

        while(index < mainObject.taskCount){
            if(mainObject.loadStatus==0){
                var eachTaskRow= document.createElement('li');
                eachTaskRow.className = 'taskRow';

                var eachTaskRowText = document.createElement('div');
                eachTaskRowText.className = 'taskRowText';

                if(mainObject.tasks[index].status == 'Active'){
                    var btn = document.createElement('button');
                    btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tick2.png" />';
                    btn.id = 'taskId'+String(index+1);
                    btn.onclick = updateThis(index);
                    eachTaskRowText.appendChild(btn);
                }
                else{
                    var btn = document.createElement('button');
                    btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tickGrey.png" />';
                    btn.id = 'taskId'+String(index+1);
                    btn.onclick = updateThis(index);
                    eachTaskRowText.appendChild(btn);
                }

                var taskText=document.createElement('p');
                taskText.className = 'taskText';
                taskText.innerHTML = mainObject.tasks[index].description;
                eachTaskRowText.appendChild(taskText);

                eachTaskRow.appendChild(eachTaskRowText);

                var taskRowActionButtonGroup=document.createElement('div');
                taskRowActionButtonGroup.className = 'taskRowActionButtonGroupClass';

                var updateTaskDescription=document.createElement('button');
                updateTaskDescription.onclick = setInputFieldToUpdate(index) ;
                updateTaskDescription.textContent = "Update";
                updateTaskDescription.className = 'greenButton';
                taskRowActionButtonGroup.appendChild(updateTaskDescription);

                var deleteTaskDescription=document.createElement('button');
                deleteTaskDescription.onclick = deleteTaskInformation(index) ;
                deleteTaskDescription.textContent = "Delete";
                deleteTaskDescription.className = 'greenButton';
                taskRowActionButtonGroup.appendChild(deleteTaskDescription);

                eachTaskRow.appendChild(taskRowActionButtonGroup);

                taskListFull.appendChild(eachTaskRow);
            }

            else if (mainObject.loadStatus==1 && mainObject.tasks[index].status == 'Completed'){
                var eachTaskRow= document.createElement('li');
                eachTaskRow.className = 'taskRow';

                var eachTaskRowText = document.createElement('div');
                eachTaskRowText.className = 'taskRowText';
    
                var btn = document.createElement('button');
                btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tickGrey.png" />';
                btn.id = 'taskId'+String(index+1);
                btn.onclick = updateThis(index);
                eachTaskRowText.appendChild(btn);
    
                var taskText=document.createElement('p');
                taskText.className = 'taskText';
                taskText.innerHTML = mainObject.tasks[index].description;
                eachTaskRowText.appendChild(taskText);
    
                eachTaskRow.appendChild(eachTaskRowText);

                var taskRowActionButtonGroup=document.createElement('div');
                taskRowActionButtonGroup.className = 'taskRowActionButtonGroupClass';

                var updateTaskDescription=document.createElement('button');
                updateTaskDescription.onclick = setInputFieldToUpdate(index) ;
                updateTaskDescription.textContent = "Update";
                updateTaskDescription.className = 'greenButton';
                taskRowActionButtonGroup.appendChild(updateTaskDescription);

                var deleteTaskDescription=document.createElement('button');
                deleteTaskDescription.onclick = deleteTaskInformation(index) ;
                deleteTaskDescription.textContent = "Delete";
                deleteTaskDescription.className = 'greenButton';
                taskRowActionButtonGroup.appendChild(deleteTaskDescription);

                eachTaskRow.appendChild(taskRowActionButtonGroup);

                taskListFull.appendChild(eachTaskRow);
            }

            else if (mainObject.loadStatus==2 && mainObject.tasks[index].status == 'Active'){
                var eachTaskRow= document.createElement('li');
                eachTaskRow.className = 'taskRow';

                var eachTaskRowText = document.createElement('div');
                eachTaskRowText.className = 'taskRowText';
    
                var btn = document.createElement('button');
                btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tick2.png" />';
                btn.id = 'taskId'+String(index+1);
                btn.onclick = updateThis(index);
                eachTaskRowText.appendChild(btn);
    
                var taskText=document.createElement('p');
                taskText.className = 'taskText';
                taskText.innerHTML = mainObject.tasks[index].description;
                eachTaskRowText.appendChild(taskText);
    
                eachTaskRow.appendChild(eachTaskRowText);

                var taskRowActionButtonGroup=document.createElement('div');
                taskRowActionButtonGroup.className = 'taskRowActionButtonGroupClass';

                var updateTaskDescription=document.createElement('button');
                updateTaskDescription.onclick = setInputFieldToUpdate(index) ;
                updateTaskDescription.textContent = "Update";
                updateTaskDescription.className = 'greenButton';
                taskRowActionButtonGroup.appendChild(updateTaskDescription);

                var deleteTaskDescription=document.createElement('button');
                deleteTaskDescription.onclick = deleteTaskInformation(index) ;
                deleteTaskDescription.textContent = "Delete";
                deleteTaskDescription.className = 'greenButton';
                taskRowActionButtonGroup.appendChild(deleteTaskDescription);

                eachTaskRow.appendChild(taskRowActionButtonGroup);

                taskListFull.appendChild(eachTaskRow);
            }
            
            index++;
        }

        var taskListFullFinal = document.getElementById('taskAndStatusButtonSection');
        taskListFullFinal.appendChild(taskListFull);
    }

    function addStatusButton(){
        var taskAndStatusButtonSection=document.getElementById('taskAndStatusButtonSection');

        var btnGroup =document.createElement('div');
        btnGroup.className = 'statusButtonGroup';

        var space = document.createElement('div');
        space.className = 'space';
        btnGroup.appendChild(space);
        
        var btnAll = document.createElement('button');
        btnAll.onclick = showAll;
        btnAll.textContent = 'ALL';
        btnAll.className = 'greenButton';
        btnGroup.appendChild(btnAll);

        var btnCompleted = document.createElement('button');
        btnCompleted.onclick = showCompleted;
        btnCompleted.textContent = 'Completed';
        btnCompleted.className = 'greenButton';
        btnGroup.appendChild(btnCompleted);

        var btnActive = document.createElement('button');
        btnActive.onclick = showActive;
        btnActive.textContent = 'Active';
        btnActive.className = 'greenButton';
        btnGroup.appendChild(btnActive);

        var space2 = document.createElement('div');
        space2.className = 'space';
        btnGroup.appendChild(space2);

        taskAndStatusButtonSection.appendChild(btnGroup);
        
        var taskList = document.createElement('ul');
        taskList.id= 'taskListId';
        taskAndStatusButtonSection.appendChild(taskList);
    }
    
    function buildThePage(){

        clearMainBody(); 
        
        getData();

        addHeader();

        addListHeader();

        addStatusButton();

        loadTasks();

        addFooter();
    
    }
    
    
    buildThePage();
    
    console.log(mainObject);
}
