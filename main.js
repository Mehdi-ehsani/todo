const addTodo   = document.querySelector("#submit");
const todoText  = document.querySelector("#input");
const todoCon   = document.querySelector(".todo-container");
const todoX = document.querySelector(".todo");
const filter  = document.querySelector("#select");

filter.addEventListener("click" ,event => {
 


   const todo = todoCon.childNodes;
   let num = 1;
   todo.forEach(todos => {
       num++

       if(num > 4) {
        switch(event.target.value) {
            case "All":
               todos.style.display = "flex" 
            break;
            case "Complited":
              if(todos.classList.contains("tick")){
               todos.style.display = "flex" 
                
              }else {
                todos.style.display = "none";
              }
              break;
              case "Uncomplited":
                if(todos.classList.contains("tick")){
                    todos.style.display = "none" 
                     
                   }else {
                     todos.style.display = "flex";
                   }
                   break;

        }
       }
   })
})


document.addEventListener("DOMContentLoaded" , getTodos);



addTodo.addEventListener("click" , () => {
    let text = todoText.value;
    if(text.length > 1) {
        const Ctodo = document.createElement("div");
        Ctodo.classList.add("todo");
        
        const Cinput = document.createElement("input");
        Cinput.setAttribute("type" , "text");
        Cinput.setAttribute("readonly" , "readonly");
        Cinput.id = "todo-input";
        Cinput.setAttribute("value" , text);
        
        
        
        const CmenuBtn = document.createElement("div");
        CmenuBtn.classList.add("menu");
    
        const Cdate = document.createElement("div");
        Cdate.classList.add("date");
         
        const getDate = new Date();
        const day = getDate.getDate();
        let month = getDate.getMonth();
        const year = getDate.getFullYear();
        month = month + 1;
        Cdate.innerText = `${year}/${month}/${day}`
    
        const Cicon = document.createElement("i");
        Cicon.classList.add("fas");
        Cicon.classList.add("fa-ellipsis-v");
        Cicon.classList.add("icon");
        
    
        const Cmenu = document.createElement("div");
        Cmenu.classList.add("after");
        Cmenu.classList.add("not");
      
       
        
        const Cul = document.createElement("ul");
        const Cedit = document.createElement("li");
        const Ctick = document.createElement("li");
        const Cdelete = document.createElement("li");
        Cedit.classList.add( "edit");
        Ctick.classList.add(  "tick");
        Cdelete.classList.add("delete");
        Cedit.innerText = "Edit";
        Ctick.innerText = "Complited";
        Cdelete.innerText = "Delete";
        Cul.appendChild(Cedit);
        Cul.appendChild(Ctick);
        Cul.appendChild(Cdelete);
    
        Cmenu.appendChild(Cul);
        CmenuBtn.appendChild(Cicon);
        Ctodo.appendChild(Cinput);
        Ctodo.appendChild(Cdate);
        Ctodo.appendChild(CmenuBtn);
        Ctodo.appendChild(Cmenu);
    
        todoCon.appendChild(Ctodo)
        
    
        saveLocalTodo(todoText.value , Cdate.innerText);
    
    
        todoText.value = "";
    
        CmenuBtn.addEventListener("click" , toggle);
        function toggle () {
        Cmenu.classList.toggle("not");
        Ctodo.classList.toggle("margin");
        setTimeout(() => {
            Ctodo.classList.remove("margin");
            Cmenu.classList.add("not");
    
        },12000)
        
        
        }
        let value;
        Cedit.addEventListener("click" , () => {
        if(Cedit.innerText == "Edit"){
         Cinput.removeAttribute("readonly");
         Cinput.focus();
         Cinput.style.animationName = "edit";
         Cedit.innerText = "Save"
         value = Cinput.value;
        }else {
            const parentUl = event.target.parentElement;
            const parentDiv = parentUl.parentElement;
            const parentTodo  = parentDiv.parentElement;
       
       let todos;
       if (localStorage.getItem("todos") === null) {
           todos = [];
       } else {
           todos = JSON.parse(localStorage.getItem("todos"));
       }
        const index =   parentTodo.children[0].value;
        
        todos.forEach(item => {
            const  {todo , date}  = item;
            if(todo == value) {
                delete item.todo;
                item.todo = index
                
            }
        })
    
       
        localStorage.setItem("todos", JSON.stringify(todos))
    
    
    
            Cinput.setAttribute("readonly" , "readonly");
            Cedit.innerText = "Edit"
            Cinput.style.animationName = "none";
        }
     })
        Ctick.addEventListener("click" , () => {
        Ctodo.classList.toggle("tick");
        if(Ctodo.classList.length == 2){
            Ctick.innerText = "Complited"
        }else {
            
            Ctick.innerText = "unComplited"
        }
     })
       Cdelete.addEventListener("click" , event => {
           const parentUl = event.target.parentElement;
           const parentDiv = parentUl.parentElement;
           const parentTodo  = parentDiv.parentElement;
           
           let todos;
           if (localStorage.getItem("todos") === null) {
               todos = [];
           } else {
               todos = JSON.parse(localStorage.getItem("todos"));
           }
            const index =   parentTodo.children[0].value;
            
            todos.forEach(item => {
                const  {todo , date}  = item;
                if(todo == index) {
                    todos.splice(todos.indexOf(item) , 1);
                }
            })
    
           
            localStorage.setItem("todos", JSON.stringify(todos))
            parentTodo.remove();
            location.reload();
    
           
    
       })
    }
  
  
  
})
function saveLocalTodo(todo , date) {
    let todos;
    let item;
    if (localStorage.getItem("todos") === null ) {
        todos = [];
    
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    item = {
        "todo" : todo,
        "date" : date
    }
    
    todos.unshift(item);

    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos () {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(item => {
      
      const  {todo , date , complited}  = item;

        const Ctodo = document.createElement("div");
        Ctodo.classList.add("todo");

        if(complited){
            Ctodo.classList.add("tick");
        }else {
            Ctodo.classList.remove("tick");
        }
        
        const Cinput = document.createElement("input");
        Cinput.setAttribute("type" , "text");
        Cinput.setAttribute("readonly" , "readonly");
        Cinput.id = "todo-input";
        Cinput.setAttribute("value" , todo);
        
        
        
        const CmenuBtn = document.createElement("div");
        CmenuBtn.classList.add("menu");

        const Cdate = document.createElement("div");
        Cdate.classList.add("date");
         

        Cdate.innerText = date;
      
    
        const Cicon = document.createElement("i");
        Cicon.classList.add("fas");
        Cicon.classList.add("fa-ellipsis-v");
        Cicon.classList.add("icon");
        
    
        const Cmenu = document.createElement("div");
        Cmenu.classList.add("after");
        Cmenu.classList.add("not");
      
       
        
        const Cul = document.createElement("ul");
        const Cedit = document.createElement("li");
        const Ctick = document.createElement("li");
        const Cdelete = document.createElement("li");
        Cedit.classList.add( "edit");
        Ctick.classList.add(  "tick");
        Cdelete.classList.add("delete");
        Cedit.innerText = "Edit";
        Ctick.innerText = "Complited";
        Cdelete.innerText = "Delete";
        Cul.appendChild(Cedit);
        Cul.appendChild(Ctick);
        Cul.appendChild(Cdelete);
    
        Cmenu.appendChild(Cul);
        CmenuBtn.appendChild(Cicon);
        Ctodo.appendChild(Cinput);
        Ctodo.appendChild(Cdate);
        Ctodo.appendChild(CmenuBtn);
        Ctodo.appendChild(Cmenu);
    
        todoCon.appendChild(Ctodo)
        
        CmenuBtn.addEventListener("click" , toggle);
        function toggle () {
        
        Cmenu.classList.toggle("not");
        Ctodo.classList.toggle("margin");
        setTimeout(() => {
            Cmenu.classList.add("not")
            Ctodo.classList.remove("margin");
        },12000)
        
       
        }
        let value;
        Cedit.addEventListener("click" , event => {

           
        if(Cedit.innerText == "Edit"){
         Cinput.removeAttribute("readonly");
         Cinput.focus();
         Cinput.style.animationName = "edit";
         Cedit.innerText = "Save";
         value = Cinput.value;
        
        }else {
            const parentUl = event.target.parentElement;
            const parentDiv = parentUl.parentElement;
            const parentTodo  = parentDiv.parentElement;
       
       let todos;
       if (localStorage.getItem("todos") === null) {
           todos = [];
       } else {
           todos = JSON.parse(localStorage.getItem("todos"));
       }
        const index =   parentTodo.children[0].value;
        
        todos.forEach(item => {
            const  {todo , date}  = item;
            if(todo == value) {
                delete item.todo;
                item.todo = index
                
            }
        })

       
        localStorage.setItem("todos", JSON.stringify(todos))
           

            Cinput.setAttribute("readonly" , "readonly");
            Cedit.innerText = "Edit"
            Cinput.style.animationName = "none";
        }
     })
        Ctick.addEventListener("click" , (event) => {




        Ctodo.classList.toggle("tick");
        if(Ctodo.classList.length == 2){
            Ctick.innerText = "Complited"
            
            const parentUl = event.target.parentElement;
            const parentDiv = parentUl.parentElement;
            const parentTodo  = parentDiv.parentElement;
            const index =   parentTodo.children[0].value;

             
           let todos;
             if (localStorage.getItem("todos") === null) {
           todos = [];
         } else {
           todos = JSON.parse(localStorage.getItem("todos"));
             }

             todos.forEach(item => {
                const  {todo , date}  = item;
                if(todo == index) {
                  item.complited = false;
                  
                    
                }
            })

                localStorage.setItem("todos", JSON.stringify(todos))
       
      
        
      

       
   



        }else {
            
            Ctick.innerText = "unComplited";

            const parentUl = event.target.parentElement;
            const parentDiv = parentUl.parentElement;
            const parentTodo  = parentDiv.parentElement;
            const index =   parentTodo.children[0].value;

             
           let todos;
             if (localStorage.getItem("todos") === null) {
           todos = [];
         } else {
           todos = JSON.parse(localStorage.getItem("todos"));
             }

             todos.forEach(item => {
                const  {todo , date}  = item;
                if(todo == index) {
                  item.complited = true;
                  console.log(item)
                    
                }
            })

                localStorage.setItem("todos", JSON.stringify(todos))
        }
     })
       Cdelete.addEventListener("click" , event => {
           const parentUl = event.target.parentElement;
           const parentDiv = parentUl.parentElement;
           const parentTodo  = parentDiv.parentElement;
           
           let todos;
           if (localStorage.getItem("todos") === null) {
               todos = [];
           } else {
               todos = JSON.parse(localStorage.getItem("todos"));
           }
            const index =   parentTodo.children[0].value;

            todos.forEach(item => {
                const  {todo , date}  = item;
                if(todo == index) {
                    todos.splice(todos.indexOf(item) , 1);
                }
            })
            
        
            localStorage.setItem("todos", JSON.stringify(todos))
            parentTodo.remove();
            location.reload();
           
    
       })
       
    });
    
    let todo  = JSON.parse(localStorage.getItem("todos"));
    if(todos.length == 0 ){
        const img = document.querySelector(".img");
        img.style.display = "flex";
        
        
    }
}




