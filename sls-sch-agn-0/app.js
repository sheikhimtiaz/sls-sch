var initObj ={
    contactCount : 6,
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
        { firstName: "Imtiaz",
          lastName: "Ahmed",
          phoneNumber: "01849325209",
          address: "Mirhajir bagh, Dhaka"}
    ]
};

//localStorage.clear();

if(localStorage.getItem("mainObject")==null){
    localStorage.setItem('mainObject',JSON.stringify(initObj));
}

var mainObject=JSON.parse(localStorage.getItem("mainObject"));

console.log(mainObject.contacts[0].firstName);
console.log(mainObject.contacts.length);

function buildThePage(){
    //sth;
    var mainID=document.getElementById('listOfContacts');

    while(mainID.childElementCount > 0 )
    {
        mainID.removeChild(mainID.firstChild);
    }

    var len=mainObject.contactCount;
    var pushCount=0; 
    var index=mainObject.contactCount-1;
    while(pushCount<5){
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

        newChild.classList.add('contactListClass');

        mainID.appendChild(newChild);

        index--;
        pushCount++;
    }

}

buildThePage();

function addNewContact(){
    var getId=document.getElementById('popUpId');
    getId.style.display = "block";
}
var modal=document.getElementById("popUpId");
var span=document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

function cancelClose(){
    modal.style.display = "none";
}

function submitInfo(){
    var t1=document.getElementById('fnId').value;
    var t2=document.getElementById('lnId').value;
    var t3=document.getElementById('phnId').value;
    var t4=document.getElementById('addrsId').value;

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
}

function goForward(){

}

function goBackward(){

}
