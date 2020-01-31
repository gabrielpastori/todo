var ul = document.querySelector("ul");
ul.style.marginTop="10vh";
var bt = document.querySelector("#insertbt");
var ok=1;
var id=0;
var deletes=0;
if(localStorage.getItem('list')!=null) {
    var arr = JSON.parse(localStorage.getItem('list'));
    var ok = 0;
}else{
    var arr=[];
}
function createButton(src,hint,bt){
    bt.type="image";
    bt.src=src;
    bt.style.width="13px";
    bt.style.height="13px";
    bt.title=hint;
    bt.style.marginLeft="12px";
    return bt;
}
function updateClass(){
    var lis=document.querySelectorAll('li');
    for(var i=0;i<lis.length;i++){
        lis[i].classList=i;
        
        
        
    }
}
function deleteF(classV){
    var lis = document.querySelectorAll('li')
    for(var i=0;i<lis.length;i++){
        if(lis[i].classList[0] == classV){
            arr.splice(i,1);
        }
    }
}
function decrementId(){
    id--;
}
function addItem(input,id,f){
    var span = document.createElement('span');
    var text = document.createTextNode(input);
    span.appendChild(text);
    var li=document.createElement("li");
    li.classList=id;
    var btDelete = document.createElement("input");
    var btComplete = document.createElement("input");
    btDelete.classList+="Delete";
    btComplete.classList+="Complete";
    
    btDelete = createButton("delete.png","Delete task",btDelete);
    btComplete = createButton("complete.png","Mark as complete",btComplete);

    li.appendChild(span);
    li.appendChild(btDelete);
    li.appendChild(btComplete);
    if(f=='create'){
        
        var aux={'value':input,'complete':false};
        arr.push(aux);
    }else{
        if(arr[id]['complete']){
            span.style.textDecoration = "line-through";
        }
    }
    localStorage.setItem('list',JSON.stringify(arr));
    
    
    
    btComplete.addEventListener("click",function(event){
        var classV = event.target.parentElement.classList[0];
        arr[classV]={'value':input,'complete':true};
        localStorage.setItem('list',JSON.stringify(arr));
        span.style.textDecoration = "line-through";
    }
    );
    btDelete.addEventListener("click",function(event){
       
        deleteF(li.classList[0]);
        localStorage.setItem('list',JSON.stringify(arr));
        ul.removeChild(li);
        decrementId();
        updateClass();
        
        
        
    });
    ul.appendChild(li);
}
function loadData(){
    var aux = JSON.parse(localStorage.getItem('list'));
    if(!ok){
        for(var i=0;i<aux.length;i++){
            addItem(aux[i].value,i,'load');
        }
    }
}
if(!ok){
    var id=arr.length;
}
bt.addEventListener("click",function(){
        var input = document.querySelector("#insertInput").value;
        if(input!=""){
            addItem(input,id,'create');
            id++;
        }
    }
);
window.addEventListener("load",loadData);
