var res= document.getElementById('result');
var add=document.getElementById('additem');
var resex=document.getElementById('exp');
var resin=document.getElementById('inc');


var resnumin=document.createElement('span');
resnumin.className='number_1'

var resnumex=document.createElement('span');
resnumex.className='number_1'

add.addEventListener('click',additem);

var ulin= document.getElementById('in');
var ulex= document.getElementById('ex');
ulin.addEventListener('click',removeItemin)
ulex.addEventListener('click',removeItemex)

var resmain=0;
var resultex=0;
var resultin=0;
function additem(){
    var select = document.getElementById('plus')  
    var description = document.getElementById('tex');
    var value = document.getElementById('val');
    if(isNaN(value.value.replace(',','.')%1)==false){

    var li = document.createElement('li');
    li.className='list-group-item'; 
    li.appendChild(document.createTextNode(description.value));
    var linum=document.createElement('span');
    linum.className='number';
    linum.appendChild(document.createTextNode(select.value+value.value))

    
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  deleteBtn.appendChild(document.createTextNode("X"));
  li.appendChild(deleteBtn);


    if(select.value==='+'){
        
        ulin.appendChild(li)
        li.appendChild(linum)


        resultin+=parseFloat(value.value.replace(',','.'))

        resmain=resmain+parseFloat(value.value.replace(',','.'))
        res.innerHTML=resmain.toFixed(2);

       
    resin.appendChild(resnumin)
    resnumin.innerHTML='+'+resultin.toFixed(2);

    }
    else{
        
        ulex.appendChild(li);
        li.appendChild(linum);    
    
    
        resultex=resultex-parseFloat(value.value.replace(',','.'))
        resmain=resmain-parseFloat(value.value.replace(',','.'))
        res.innerHTML=resmain.toFixed(2);
        
    resex.appendChild(resnumex)
    resnumex.innerHTML=resultex.toFixed(2);
        
    }

    value.value=''
    description.value=''
    select.value = '+'
}
else{
    alert('mora biti broj')
}
    
}

function removeItemin(e) {
    if (e.target.classList.contains("delete")) {
      if (confirm("Are you sure?")) {
        var li = e.target.parentElement;
        ulin.removeChild(li);
        var numin=li.querySelector("span").textContent.slice(1);
        
        resultin-=parseFloat(numin.replace(',','.'))

           
    resin.appendChild(resnumin)
    resnumin.innerHTML='+'+resultin.toFixed(2);

        resmain=resmain-parseFloat(numin.replace(',','.'))
        res.innerHTML=resmain.toFixed(2);
      }
    }
  }
  function removeItemex(e) {
      if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
          var li = e.target.parentElement;
          ulex.removeChild(li);
          var numex=li.querySelector("span").textContent.slice(1);
  
          resultex+=parseFloat(numex.replace(',','.'))

           
          resin.appendChild(resnumin)
          resnumex.innerHTML='+'+resultin.toFixed(2);
      
              resmain=resmain+parseFloat(numex.replace(',','.'))
              res.innerHTML=resmain.toFixed(2);
        }
      }
    }

    var d = new Date();
    var n = d.getMonth();
    var mth;
    if(n==0){
        mth='January'
    }
    
    if(n==1){
        mth='February'
    }
    if(n==2){
        mth='March'
    }
    
    if(n==3){
        mth='April'
    }
    if(n==4){
        mth='May'
    }
    if(n==5){
        mth='June'
    }
    if(n==6){
        mth='July'
    }
    if(n==7){
        mth='jAugust'
    }
    if(n==8){
        mth='Sept'
    }
    if(n==9){
        mth='Oct'
    }
    console.log(n)
    var date = document.getElementById('p');
    date.innerHTML=date.textContent+mth;
