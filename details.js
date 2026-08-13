const inventory=[

{
id:1,
name:"Coming Soon",
category:"Pistol",
image:"",
description:"Description goes here."
},

{
id:2,
name:"Coming Soon",
category:"Rifle",
image:"",
description:"Description goes here."
},

{
id:3,
name:"Coming Soon",
category:"SMG",
image:"",
description:"Description goes here."
}

];

const id=Number(localStorage.getItem("selectedItem"));

const item=inventory.find(i=>i.id===id);

if(item){

document.getElementById("title").innerHTML=item.name;

document.getElementById("category").innerHTML="<strong>Category:</strong> "+item.category;

document.getElementById("description").innerHTML=item.description;

}