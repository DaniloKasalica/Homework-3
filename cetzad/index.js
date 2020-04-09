var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
const list = document.getElementById("list");
const ul = document.getElementById('list');
var cont = document.getElementById('cont')
var check = document.getElementsByClassName('check')

var uri= './tasks.json';
var req = new Request(uri)
// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event

filter.addEventListener('focus', statrtlist);
filter.addEventListener('keyup', searchlist);
filter.addEventListener("keyup", filterItems);









for( let i =  0; i<check.length;i++ ){
 check[i].addEventListener('click',checkin)
}
function checkin(e){
    console.log(e.target)
    if (e.target.value=='on'){
        e.target.value='off';
        done();

    }
    else{
        e.target.value='on'
        done ()
    }
}
function done(){
    check = document.getElementsByClassName('check');
    var items = document.getElementsByClassName('list-group-item');
    for (let i = 0; i<items.length;i++){
        if (check[i].value=='off'){
            items[i].style.textDecoration='line-through'
        }
        else{
            items[i].style.textDecoration= 'none';
        }

    }
}
function statrtlist(e){
  
  var items = document.getElementsByClassName('list-group-item');
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    var li = document.createElement('li')
    ul.appendChild(li)
    li.appendChild(document.createTextNode(itemName));
  })
}

function removelist(e){
  li= document.getElementsByTagName('.list-grop li')
  ul.removeChild('li');

}
function searchlist(e){
   // convert text to lowercase
   var text = e.target.value.toLowerCase();

   // Get list items
   var items = ul.getElementsByTagName("li");
 console.log(items)
   // Convert HTMLCollection to an array
   Array.from(items).forEach(function(item) {
     var itemName = item.firstChild.textContent;
     if (itemName.toLowerCase().indexOf(text) != -1) {
       item.style.display = "block";
 
     } else {
       item.style.display = "none";
     }
   });
  
}
//
// Add item
function addItem(e) {
  e.preventDefault();
  var newItem = document.getElementById("item").value;
  var li = document.createElement("li");
  li.className = "list-group-item";
  li.appendChild(document.createTextNode(newItem));
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  deleteBtn.appendChild(document.createTextNode("X"));
  li.appendChild(deleteBtn);
  itemList.appendChild(li);
  var inp = document.createElement('input');
  inp.className='check';
  inp.setAttribute('type','checkbox');
  li.appendChild(inp);
  inp.addEventListener('click',checkin)


}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();

  // Get list items
  var items = itemList.getElementsByTagName("li");

  // Convert HTMLCollection to an array
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";

    } else {
      item.style.display = "none";
    }
  });
}
var arr=[];
var obj  = {
    title: '',
    done: true
};

var myjson;
var save = document.getElementById('save');
var myid;
save.addEventListener('click',saveme)

function saveme(){
  console.log('save')
    var checkcheck =document.getElementsByClassName('check');
    var checkitems =document.getElementsByClassName('list-group-item');


    for(var i=0;i<checkitems.length;i++){
        arr[i]=Object.assign({}, obj);
        arr[i]['title']=checkitems[i].textContent.slice(0,checkitems[i].textContent.length-1);
        
        if(checkcheck[i].value=='on'){
            arr[i]['done']=true;
        }
        else{
            arr[i]['done']=false;
        }

}
myjson= JSON.stringify(arr)
myid = 1;
var uri= 'https://jsonplaceholder.typicode.com/posts';
var req = new Request(uri, {
    method:"post",
    body: myjson
})

localStorage.setItem('id',myid);
localStorage.setItem('json',myjson)

fetch(req)
.then((resp) => {
    if(resp.ok){
        
        return resp.json();
    }
    else{
        throw new Error('neee')
    }
})
.then ((date)=>{
    myid=date.id
    localStorage.setItem('id',myid);
    localStorage.setItem('json',myjson)

})
.catch((err)=>{
  console.log(err)

})
}

if(localStorage.getItem('id')){
  itemList.innerHTML=''
  myjson=localStorage.getItem('json');
  newobj=JSON.parse(myjson)
  for(let i = 0; i<=newobj.length;i++){

    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(newobj[i].title));
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);
    itemList.appendChild(li);
    var inp = document.createElement('input');
    inp.className='check';
    inp.setAttribute('type','checkbox');
    li.appendChild(inp);
    inp.addEventListener('click',checkin)
    if(newobj[i].done==false){
      check[i].value='off'
      var checked = document.createAttribute('checked');
      check[i].setAttributeNode(checked)
      done()
    }
    else{
      check[i].value='on'
      done()
    }
  }
}