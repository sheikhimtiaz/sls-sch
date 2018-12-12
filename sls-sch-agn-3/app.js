window.onload = function(){
    var initObj ={
        taskCount : 4,
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
    if(localStorage.getItem("mainObject")==null){
        localStorage.setItem('mainObject',JSON.stringify(initObj));
    }
    
    var mainObject=JSON.parse(localStorage.getItem("mainObject"));
    var mainBody=document.getElementsByTagName('body')[0];
    mainBody.className = 'mainPage';

    var loadStatus=0;
    var updateTaskIndex;
    function clearMainBody(){
        while(mainBody.childElementCount > 0 )
        {
            mainBody.removeChild(mainBody.firstChild);
        }
    }

    function addNewTask(){
        var t1=document.getElementById('inputNewTaskId').value;
        if(t1==""){
            alert("Please type a valid task!");
            return;
        }
        var t2="Active";
        var tempObj={
            description: t1,
            status: t2
        };
        mainObject.tasks.push(tempObj);
        mainObject.taskCount++;
        localStorage.setItem('mainObject',JSON.stringify(mainObject));
        mainObject=JSON.parse(localStorage.getItem("mainObject"));
        var reset=document.getElementById('inputNewTaskId');
        reset.value="";
        console.log(mainObject);
        loadTasks();
    }

    function addHeader(){
        var header=document.createElement('div');
        header.className = 'header';

        var h1=document.createElement('h1');
        h1.className = 'mainTitle';
        h1.innerHTML = "TO DO APP";
        header.appendChild(h1);

        var acFlex = document.createElement('div');
        acFlex.className = 'acFlex';

        var space = document.createElement('div');
        space.className = 'space';
        
        acFlex.appendChild(space);

        var input = document.createElement('input');
        input.className = 'iputNewTask';
        input.type = 'text';
        input.id = 'inputNewTaskId';
        input.placeholder = 'type task';
        acFlex.appendChild(input);

        var button = document.createElement('button');
        button.onclick = addNewTask;
        button.className = 'addTask';
        button.textContent = "ADD NEW TASK";
        acFlex.appendChild(button);

        var space2 = document.createElement('div');
        space2.className = 'space';
        
        acFlex.appendChild(space2);

        header.appendChild(acFlex);
        mainBody.appendChild(header);
    }
    
    function addFooter(){
        var footer = document.createElement('div');
        footer.innerHTML = "Assignment 03, Date: December 09, 2018. @SeliseSchool";
        footer.className="footer";
        mainBody.appendChild(footer);
    }

    function addListOfTasksPart(){
        var paddingLeft=document.createElement('div');
        paddingLeft.className = 'paddingLeft';

        var p=document.createElement('p');
        p.className = 'clDesign';
        p.textContent = 'To Do List';

        paddingLeft.appendChild(p);

        var listOfTasks=document.createElement('div');
        listOfTasks.className = 'locClass';
        listOfTasks.id = 'listOfTasks';

        paddingLeft.appendChild(listOfTasks);

        mainBody.appendChild(paddingLeft);
    }

    function showAll(){
        loadStatus=0;
        loadTasks();
    }

    function showCompleted(){
        loadStatus=1;
        loadTasks();
    }

    function showActive(){
        loadStatus=2;
        loadTasks();
    }

    function clearTaskList(){
        var tmp=document.getElementById('taskListId');
        while(tmp.childElementCount > 0 )
        {
            tmp.removeChild(tmp.firstChild);
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
            document.getElementById('imgId'+String(updateTaskIndex+1)).style.filter = "grayscale(100%)";
        }
        else{
            mainObject.tasks[updateTaskIndex].status = 'Active';
            document.getElementById('imgId'+String(updateTaskIndex+1)).style.filter = "grayscale(0%)";
        }
        localStorage.setItem('mainObject',JSON.stringify(mainObject));
        mainObject=JSON.parse(localStorage.getItem("mainObject"));
        loadTasks();
    }

    function loadTasks(){
        clearTaskList();

        var tmp=document.getElementById('taskListId');

        var index=0;

        while(index < mainObject.taskCount){
            if(loadStatus==0){
                var tDiv= document.createElement('div');
                tDiv.className = 'taskRow';
                if(mainObject.tasks[index].status == 'Active'){
                    var btn = document.createElement('button');
                    btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tick2.png" />';
                    btn.id = 'taskId'+String(index+1);
                    btn.onclick = updateThis(index);
                    tDiv.appendChild(btn);
                }
                else{
                    var btn = document.createElement('button');
                    btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tickGrey.png" />';
                    btn.id = 'taskId'+String(index+1);
                    btn.onclick = updateThis(index);
                    tDiv.appendChild(btn);
                }
    
                var temp = document.createElement('div');
                temp.innerHTML = mainObject.tasks[index].description;
                temp.className = 'taskText';
                tDiv.appendChild(temp);
    
                tmp.appendChild(tDiv);
            }

            else if (loadStatus==1 && mainObject.tasks[index].status == 'Completed'){
                var tDiv= document.createElement('div');
                tDiv.className = 'taskRow';
    
                var btn = document.createElement('button');
                btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tickGrey.png" />';
                btn.id = 'taskId'+String(index+1);
                btn.onclick = updateThis(index);
                tDiv.appendChild(btn);
    
                var temp = document.createElement('div');
                temp.innerHTML = mainObject.tasks[index].description;
                temp.className = 'taskText';
                tDiv.appendChild(temp);
    
                tmp.appendChild(tDiv);
            }

            else if (loadStatus==2 && mainObject.tasks[index].status == 'Active'){
                var tDiv= document.createElement('div');
                tDiv.className = 'taskRow';
    
                var btn = document.createElement('button');
                btn.innerHTML = '<img id="imgId'+String(index+1) +'" src="img/tick2.png" />';
                btn.id = 'taskId'+String(index+1);
                btn.onclick = updateThis(index);
                tDiv.appendChild(btn);
    
                var temp = document.createElement('div');
                temp.innerHTML = mainObject.tasks[index].description;
                temp.className = 'taskText';
                tDiv.appendChild(temp);
    
                tmp.appendChild(tDiv);
            }
            
            index++;
        }

        var tmpFinal = document.getElementById('listOfTasks');
        tmpFinal.appendChild(tmp);
    }

    function loadTheToDoList(){
        var listOfTasks=document.getElementById('listOfTasks');

        var btnGroup =document.createElement('div');
        btnGroup.className = 'acaBtnGroup';

        var space = document.createElement('div');
        space.className = 'space';
        btnGroup.appendChild(space);
        
        var btnAll = document.createElement('button');
        btnAll.onclick = showAll;
        btnAll.textContent = 'ALL';
        btnAll.className = 'addTask';
        btnGroup.appendChild(btnAll);

        var btnCompleted = document.createElement('button');
        btnCompleted.onclick = showCompleted;
        btnCompleted.textContent = 'Completed';
        btnCompleted.className = 'addTask';
        btnGroup.appendChild(btnCompleted);

        var btnActive = document.createElement('button');
        btnActive.onclick = showActive;
        btnActive.textContent = 'Active';
        btnActive.className = 'addTask';
        btnGroup.appendChild(btnActive);

        var space2 = document.createElement('div');
        space2.className = 'space';
        btnGroup.appendChild(space2);

        listOfTasks.appendChild(btnGroup);
        
        var taskList = document.createElement('div');
        taskList.id= 'taskListId';
        listOfTasks.appendChild(taskList);

        loadTasks();
    }
    
    function buildThePage(){

        clearMainBody(); 

        addHeader();

        addListOfTasksPart();
    
        loadTheToDoList();

        addFooter();
    
    }
    
    
    buildThePage();
    
    console.log(mainObject);
}
