var initObj ={
    contactCount : 16,
    contacts : [
        { firstName: "Imtiaz",
          lastName: "Ahmed",
          phoneNumber: "01849325209",
          address: "Mirhajir bagh, Dhaka"},
        { firstName: "Ahmed",
          lastName: "Imtiaz",
          phoneNumber: "01849325209",
          address: "Mirhajir bagh, Dhaka"},
        { firstName: "Blubalb",
          lastName: "Ahmed",
          phoneNumber: "01849325209",
          address: "Mirhajir bagh, Dhaka"},
        { firstName: "Ulalalla",
          lastName: "Ahmed",
          phoneNumber: "01849325209",
          address: "Mirhajir bagh, Dhaka"},
        { firstName: "I. ",
          lastName: "Ahmed",
          phoneNumber: "01849325209",
          address: "Mirhajir bagh, Dhaka"},
        { firstName: "Sheikh",
          lastName: "Imtiaz",
          phoneNumber: "01849325209",
          address: "Mirhajir bagh, Dhaka"},
          {
              firstName: "Arco",
              lastName: "Mahmud",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Adib",
              lastName: "Mehedi",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Nabir",
              lastName: "Rahman",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Md",
              lastName: "Kamruzzaman",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Dilshad",
              lastName: "Ferdousi",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Sakib",
              lastName: "Al Hasan",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Rashed",
              lastName: "Al Nur",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Riad",
              lastName: "Shaheb",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
              firstName: "Riad",
              lastName: "Sins",
              phoneNumber: "01542879421",
              address: "Dhaka"
          },
          {
            firstName: "Riad",
            lastName: "Bro",
            phoneNumber: "01542879421",
            address: "Dhaka"
          }
          
    ]
};

//localStorage.clear();

if(localStorage.getItem("mainObject")==null){
    localStorage.setItem('mainObject',JSON.stringify(initObj));
}

var mainObject=JSON.parse(localStorage.getItem("mainObject"));

var currentPage=1;

function buildThePageTwo(){
    var mainID=document.getElementById('listOfContacts');

    while(mainID.childElementCount > 0 )
    {
        mainID.removeChild(mainID.firstChild);
    }

    var len=mainObject.contactCount;
    var pushCount=0; 
    var index=(currentPage-1)*5;
    while(pushCount<5 && index < mainObject.contactCount){
        var newChild=document.createElement('div');

        var space=document.createTextNode("0" + (pushCount+1).toString() + ". ");
        newChild.appendChild(space);

        //var name=document.createTextNode(mainObject.contacts[pushCount].firstName + " " + mainObject.contacts[pushCount].lastName);
        var name=document.createElement('div');
        name.innerHTML=mainObject.contacts[index].firstName + " " + mainObject.contacts[index].lastName;
        name.setAttribute('id',index);
        newChild.appendChild(name);

        var space2=document.createElement('div');
        space2.innerHTML="---------------";
        
        newChild.appendChild(space2);

        var num=document.createTextNode(mainObject.contacts[index].phoneNumber);
        newChild.appendChild(num);

        var ubtn=document.createElement('button');
        ubtn.appendChild(document.createTextNode("U"));
        ubtn.setAttribute('id','u'+String(index));
        ubtn.setAttribute('class','addContract');
        ubtn.onclick = updateInfo(index);

        newChild.appendChild(ubtn);

        var dbtn=document.createElement('button');
        dbtn.appendChild(document.createTextNode('D'));
        dbtn.setAttribute('id','d'+String(index));
        dbtn.setAttribute('class','addContract');
        dbtn.onclick = deleteInfo(index);
        newChild.appendChild(dbtn);

        newChild.classList.add('contactListClass');

        mainID.appendChild(newChild);

        index++;
        pushCount++;
    }
    showPNF();

}

function showPNF(){
    var spn=document.getElementById('showPageNumber');

    while(spn.childElementCount > 0 )
    {
        spn.removeChild(spn.firstChild);
    }

    var pn=document.createElement('div');
    pn.innerHTML="Page number : " + currentPage;
    spn.appendChild(pn);
}

function updateInfo(index){
    return function(){

    };
}

function  deleteInfo(index){
    return function(){
        var name=mainObject.contacts[index].firstName + " "+mainObject.contacts[index].lastName;
        var rogerThat=confirm("You want to delete '" + name + "' ?");
        if(rogerThat== true)
        {
            //do it.
        }
    }
}

buildThePage();

function addNewContact(){
    var getId=document.getElementById('popUpId');
    getId.style.display = "block";
}
var modal=document.getElementById("popUpId");
// var span=document.getElementsByClassName("close")[0];

// span.onclick = function() {
//     modal.style.display = "none";
// }

function cancelClose(){
    modal.style.display = "none";
}

function submitInfo(){
    var t1=document.getElementById('fnId').value;
    var t2=document.getElementById('lnId').value;
    var t3=document.getElementById('phnId').value;
    var t4=document.getElementById('addrsId').value;

    if(t1==""){
        alert("Please enter a valid first name!");
        return;
    }
    if(t2==""){
        alert("Please enter a valid last name!");
        return;
    }
    if(t3=="" || t3.length != 11){
        alert("Please enter a valid number!");
        return;
    }
    if(t4==""){
        alert("Please enter a valid address!");
        return;
    }

    var tempObj={ 
        firstName: t1,
        lastName: t2,
        phoneNumber: t3,
        address: t4
    };

    mainObject.contacts.push(tempObj);
    mainObject.contactCount++;
    modal.style.display = "none";
    localStorage.setItem('mainObject',JSON.stringify(mainObject));
    buildThePage();
    
    document.getElementById('fnId').value = "";
    document.getElementById('lnId').value = "";
    document.getElementById('phnId').value = "";
    document.getElementById('addrsId').value = "";
}

function buildThePage(){
    var mainIDhtml=document.getElementById('listOfContacts');

    while(mainIDhtml.childElementCount > 0 )
    {
        mainIDhtml.removeChild(mainIDhtml.firstChild);
    }

    var len=mainObject.contactCount;
    var pushCount=0; 
    var index=(currentPage-1)*5;
    while(pushCount<5 && index < mainObject.contactCount){
        var mainID=document.createElement('div');
        
        var newChild=document.createElement('div');
        var space=document.createTextNode("0" + (pushCount+1).toString() + ". ");
        newChild.appendChild(space);
        
        var name=document.createElement('div');
        name.innerHTML=mainObject.contacts[index].firstName + " " + mainObject.contacts[index].lastName;
        name.setAttribute('id',index);
        newChild.appendChild(name);

        // var space2=document.createElement('div');
        // space2.innerHTML="---------";
        
        // newChild.appendChild(space2);
        newChild.classList.add("firstChildClass");
        mainID.appendChild(newChild);

        var newChild2=document.createElement('div');

        var num=document.createTextNode(mainObject.contacts[index].phoneNumber);
        newChild2.appendChild(num);
        newChild2.classList.add('contactListClass');

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

}

function goForward(){
    if((currentPage)*5 < mainObject.contactCount){
        currentPage+= 1;
        buildThePage();
    }
    else{
        alert("You can't go forward!");
    }
}

function goBackward(){
    if(currentPage>1){
        currentPage-=1;
        buildThePage();
    }
    else{
        alert("You can't go back!");
    }
}


console.log(mainObject);
