
//const party=fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-CPU-RM-WEB-PT/events')
//user object in the global space

const myUser={
    userList:[]
}


//define async regular function
//async function myFunction(){}

//define arrow async function

const getData=async ()=>{
    const response=await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-CPU-RM-WEB-PT/events');
    const jsonUserData=await response.json();
    console.log(jsonUserData);
    return jsonUserData;
    
}

/******************* delete button  **************************************
function deleteParty(Id){
    let URL="https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-CPU-RM-WEB-PT/events";
    let options={
        method:"DELETE"
    }
    fetch (url+"/"+Id,options)
}

/*********************************************************************************/

const displayData=async()=>
   {
    const partyListData=await getData();
    partyListData.data.forEach((party,index)=>
        {

        const list=document.querySelector("#dataDisplay");
            let li=document.createElement("li");
                li.innerHTML = `${party.name},${party.date},${party.location},${party.description}`;
                        list.appendChild(li);
                        
            let deleteButton=document.createElement("button");
                        deleteButton.textContent = "Delete";
                        deleteButton.className="DeleteB";
                        list.appendChild(deleteButton);
                        deleteButton.addEventListener("click", () => {
                        const result=party.splice(index, 1);
                        return result;
                        getData();
                                  //console.log(party);
                                   });


            //document.querySelector('.DeleteB').addEventListener('click',deleteParty(party.Index))
                     //const deleteButtonElem=document.querySelector('DeleteB');

                      //DeleteButtonElem.addEventListener("click",deleteParty(party.index));
                      

        })   
    }

getData();
displayData();

displayData();
/************************* Form input add to server **********************************************************/


const formElem= document.querySelector('form');
const parties=new URLSearchParams(FormData);

             // listens   for the submit elementt 
formElem.addEventListener('submit', (event) =>
{
             //prevents the default event
   event.preventDefault();
    
//console.log(new Date(event.target.Name.value).toISOString(),"line 205")
//const date=new Date(event.target.Name.value)
      const party= { 
                   name:event.target.name.value,
                   description:event.target.description.value,
                   date: new Date(event.target.date.value).toISOString(),
                   //date:new Date(event.target.date.value),
                  
                   location:event.target.location.value
                   
                  }    
                  console.log(party); 
  fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-CPU-RM-WEB-PT/events',
   
         {
            method:"POST",
            body:JSON.stringify(party),
            headers:{ "Content-Type": "application/json"}

         })
       .then((res) =>res.json())
       .then((party) => displayData());


       //.then renderPartyList()

        //.catch(error => console.log(error));    

});

        