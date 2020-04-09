var myform = document.getElementById('myForm')
var text = document.getElementById('text');
var ime = document.getElementById('IME');
var zanr = document.getElementById('ZANR');
var ocjena =document.getElementById('ocjena');
var tbody=document.getElementById('tbod');
var uri= './games.json';
var req = new Request(uri)
var br = 1;
var more = document.getElementById('loadmore')
myform.addEventListener("submit",filter);
var n=1


function filter(e){
    
    more.removeAttribute('disabled')
    tbody.innerHTML=''
    e.preventDefault()  
   n=1;
    k=1;
    br=1;
    localStorage.setItem('text',text.value)
    if (ime.checked) {
        localStorage.setItem('ime', ime.value)
      }
      else{
        localStorage.setItem('ime', 'off')
      }
      if (zanr.checked) {
          localStorage.setItem('zanr', zanr.value)
        }
        else{
          localStorage.setItem('zanr', 'off')
        }
    localStorage.setItem('ocjena',ocjena.value)
    
load()
}


more.addEventListener('click',function addmore() {
    br=br+1;
    load();

})
var k=1;
var n=1;
function load(){
if (localStorage.length === 0 ) {
    fetch(req)
    .then((resp)=>{
        if(resp.ok){
            return resp.json();
            
        }
        else{
            
            throw new Error ('err');
            
        }
    })
    .then ((json)=>{
            while(k<=br*3){
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(k++));
        
        
            var th = document.createElement('th')
            tr.appendChild(th);

            var a = document.createElement('a');
            a.setAttribute('href',json[k-2].url)

            a.setAttribute('target','blank_')
            a.style.textDecoration='none'
            a.style.color='black'


            var img =document.createElement('img');
            var att = document.createAttribute("src"); 
            att.value =json[k-2].slika;                          
            img.setAttributeNode(att);  
            th.appendChild(a);
            a.appendChild(img)
            


              
            img.addEventListener('mouseenter',(e)=>{
                var h= document.createElement('h1')
                var broj=e.target.parentElement.parentElement.parentElement.firstChild.textContent
            
                h.innerHTML=json[broj-1].naziv;
                e.target.parentElement.appendChild(h)
             })
             img.addEventListener('mouseout',(e)=>{
                 e.target.parentElement.lastChild.remove()
             })
             
             
           
            

            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(json[k-2].izdavac));
        
            
            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(json[k-2].zanr));
        
            
            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(json[k-2].ocjena));
              

            
         
            var th = document.createElement('th')
            tr.appendChild(th);
             var deleteBtn = document.createElement("button");
             deleteBtn.className = "btn btn-danger btn-sm float-right delete";
             deleteBtn.appendChild(document.createTextNode("X"));
             th.appendChild(deleteBtn)
             deleteBtn.addEventListener('click',(e)=>{
                 e.target.parentElement.parentElement.remove()
             } )
               };
})
.catch((err)=> {
        
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    var th = document.createElement('th')
    tr.appendChild(th);
    more.setAttributeNode(document.createAttribute('disabled'));
    th.appendChild(document.createTextNode("NO MORE"));
})
}

// ako se posalje forma
else{
     fetch(req)
    .then((resp)=>{
        if(resp.ok)
        return resp.json();
        else{
            throw new Error ('err')
        }
    })

    .then((json)=>{
          
        if((json).length<=k){
            throw new Error ('err')
        }
    var tvalue=localStorage.getItem('text');
    var ivalue=localStorage.getItem('ime');
    var zvalue=localStorage.getItem('zanr');
    var ovalue=localStorage.getItem('ocjena');
    if( (ivalue==="off"&&zvalue==='off' )| (ivalue==='on' &&zvalue==='off'))
    {
    while( k<=br*3 && k<=json.length){
  if(json[n-1].naziv.toLowerCase().startsWith(tvalue)&&json[n-1].ocjena>=parseInt(ovalue)){
      
      n++;
     
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(k++));
         
          
        
            var th = document.createElement('th') 
            tr.appendChild(th);
            var a = document.createElement('a');
            a.setAttribute('href',json[n-2].url)
            a.setAttribute('target','blank_')
            a.style.textDecoration='none'
            a.style.color='black'



            var img =document.createElement('img');
            var att = document.createAttribute("src"); 
            att.value =json[n-2].slika;                          
            img.setAttributeNode(att);  
            th.appendChild(a);
            a.appendChild(img)
            


              
            img.addEventListener('mouseenter',(e)=>{
                var broj;
                for(i=0;i<json.length;i++){
                    if (e.target.getAttribute('src')==json[i].slika){
                        broj=i;

                    }
                }


                var h= document.createElement('h1')
                h.innerHTML=json[broj].naziv;
                e.target.parentElement.appendChild(h)
             })
             img.addEventListener('mouseout',(e)=>{
                 e.target.parentElement.lastChild.remove()
             })
             
            
            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(json[n-2].izdavac));
        
            
            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(json[n-2].zanr));
        
            
            var th = document.createElement('th')
            tr.appendChild(th);
            th.appendChild(document.createTextNode(json[n-2].ocjena));

            
            var th = document.createElement('th')
            tr.appendChild(th);
             var deleteBtn = document.createElement("button");
             deleteBtn.className = "btn btn-danger btn-sm float-right delete";
             deleteBtn.appendChild(document.createTextNode("X"));
             th.appendChild(deleteBtn)
             deleteBtn.addEventListener('click',(e)=>{
                 e.target.parentElement.parentElement.remove()
             } )
        }
        else{
            n++;
        }
    }
}
        else{
            while( k<=br*3 && k<=json.length){
              words = json[n-1].zanr.toLowerCase().split(',')
                
          if((words.some((word)=>{
              return word.startsWith(tvalue)

          }))&&json[n-1].ocjena>=parseInt(ovalue))
          {
              n++;
             
                    var tr = document.createElement('tr');
                    tbody.appendChild(tr);
                    var th = document.createElement('th')
                    tr.appendChild(th);
                    th.appendChild(document.createTextNode(k++));
                 
                
            var th = document.createElement('th') 
            tr.appendChild(th);
            var a = document.createElement('a');
            a.setAttribute('href',json[n-2].url)
            a.setAttribute('target','blank_')
            a.style.textDecoration='none'
            a.style.color='black'



            var img =document.createElement('img');
            var att = document.createAttribute("src"); 
            att.value =json[n-2].slika;                          
            img.setAttributeNode(att);  
            th.appendChild(a);
            a.appendChild(img)
            


              
            img.addEventListener('mouseenter',(e)=>{
                var broj;
                for(i=0;i<json.length;i++){
                    if (e.target.getAttribute('src')==json[i].slika){
                        broj=i;

                    }
                }


                var h= document.createElement('h1')
                h.innerHTML=json[broj].naziv;
                e.target.parentElement.appendChild(h)
             })
             img.addEventListener('mouseout',(e)=>{
                 e.target.parentElement.lastChild.remove()
             })
             
                     
                    
                    var th = document.createElement('th')
                    tr.appendChild(th);
                    th.appendChild(document.createTextNode(json[n-2].izdavac));
                
                    
                    var th = document.createElement('th')
                    tr.appendChild(th);
                    th.appendChild(document.createTextNode(json[n-2].zanr));
                
                    
                    var th = document.createElement('th')
                    tr.appendChild(th);
                    th.appendChild(document.createTextNode(json[n-2].ocjena));

                    
            var th = document.createElement('th')
            tr.appendChild(th);
             var deleteBtn = document.createElement("button");
             deleteBtn.className = "btn btn-danger btn-sm float-right delete";
             deleteBtn.appendChild(document.createTextNode("X"));
             th.appendChild(deleteBtn)
             deleteBtn.addEventListener('click',(e)=>{
                 e.target.parentElement.parentElement.remove()
             } )
                }
                else{
                    n++;
                }
            }
    }
})

.catch((err)=> {
        
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    var th = document.createElement('th')
    tr.appendChild(th);
    more.setAttributeNode(document.createAttribute('disabled'));
    th.appendChild(document.createTextNode("NO MORE"));
})

}
}
load()