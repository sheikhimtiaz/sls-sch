var initObj ={
    taskCount : 1,
    tasks : [
        { description: "Eat Some Kacchi",
          status: "Active"}
          
    ]
};
//localStorage.clear();
if(localStorage.getItem("mainObject")==null){
    localStorage.setItem('mainObject',JSON.stringify(initObj));
}

var mainObject=JSON.parse(localStorage.getItem("mainObject"));

function addNewTask(){
    var t1=document.getElementById('inputNewTaskId').value;
    var t2="Active";
    var tempObj={
        description: t1,
        status: t2
    };
    mainObject.tasks.push(tempObj);
    mainObject.taskCount++;
    console.log(mainObject);
    localStorage.setItem('mainObject',JSON.stringify(mainObject));
    var reset=document.getElementById('inputNewTaskId');
    reset.value="";
}


function buildThePage(){
    var mainIDhtml=document.getElementById('listOftasks');

    while(mainIDhtml.childElementCount > 0 )
    {
        mainIDhtml.removeChild(mainIDhtml.firstChild);
    }

    var len=mainObject.taskCount;
    var pushCount=0; 
    var index=(currentPage-1)*5;
    while(pushCount<5 && index < mainObject.taskCount){
        var mainID=document.createElement('div');
        
        var newChild=document.createElement('div');
        var space=document.createTextNode("0" + (pushCount+1).toString() + ". ");
        newChild.appendChild(space);
        
        var name=document.createElement('div');
        name.innerHTML=mainObject.tasks[index].firstName + " " + mainObject.tasks[index].lastName;
        name.setAttribute('id',index);
        newChild.appendChild(name);

        // var space2=document.createElement('div');
        // space2.innerHTML="---------";
        
        // newChild.appendChild(space2);
        newChild.classList.add("firstChildClass");
        mainID.appendChild(newChild);

        var newChild2=document.createElement('div');

        var num=document.createTextNode(mainObject.tasks[index].phoneNumber);
        newChild2.appendChild(num);
        newChild2.classList.add('taskListClass');

        mainID.appendChild(newChild2);
        
        var newChild3=document.createElement('div');

        var ubtn=document.createElement('button');
        ubtn.appendChild(document.createTextNode("Update"));
        ubtn.setAttribute('id','u'+String(index));
        ubtn.setAttribute('class','addContract');
        ubtn.onclick = updateInfo(index);
        newChild3.appendChild(ubtn);

        var dbtn=document.createElement('button');
        dbtn.appendChild(document.createTextNode('Delete'));
        dbtn.setAttribute('id','d'+String(index));
        dbtn.setAttribute('class','addContract');
        dbtn.onclick = deleteInfo(index);
        newChild3.appendChild(dbtn);

        newChild3.classList.add('btngroupClass');
        mainID.appendChild(newChild3);

        mainID.classList.add('mainidclass');

        mainIDhtml.appendChild(mainID);

        index++;
        pushCount++;
    }
    showPNF();
    
    var pws=document.getElementById('pws');
    pws.onclick = submitInfo();
}

console.log(mainObject);

buildThePage();
