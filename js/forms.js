
BASE_URL = 'https://pilar-connectado.herokuapp.com/v1/'

async function sendPostUserRequest(url,body)
{
    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(BASE_URL+url, {method:"POST",
            headers: headers,
            body: JSON.stringify(body)
        })
    .then(response => {
        

        if(response.status == 200){
            response.json().then(user =>{
            window.localStorage.setItem("userId", user.id)
            console.log(window.localStorage.getItem('isPilarMember'))

            if(window.localStorage.getItem('isPilarMember')=="true"){
                window.location.replace("./formsPilarMember.html")

                console.log("entrou aqui")
                //window.location.href = './formsPilarMember.html'
                
            }else{
                console.log("nao é pilar member")
                window.location.replace("./formsPortoMember.html")
                //window.location.href = "./formsPortoMember.html"
            }})
        }else{
            response.json().then(error =>{
                alert("Email já existe")
            })
        }
    }).catch(error => {
        console.log(error)
        alert("Erro ao cadastrar usuário, provavelmente CPF já cadastrado")
    })
  
}

function cadastrarUsuario()
{
    event.preventDefault()
    let url = 'users/'

    let firstName = document.getElementById('firstName').value.toString()
    let lastName = document.getElementById('lastName').value.toString()

    let email = document.getElementById('email').value.toString()
    let password = document.getElementById('password').value.toString()
    let password2 = document.getElementById('password2').value.toString()
    let address = document.getElementById('address').value.toString()
    let cpf = document.getElementById('cpf').value.toString()

    let gridCheckPilarMember = document.getElementById('gridCheckPilarMember').checked

    window.localStorage.setItem('isPilarMember', gridCheckPilarMember)
    console.log(window.localStorage.getItem('isPilarMember'))
    console.log(password,password2)
    if (password != password2){
        alert("Senhas não conferem")
        
    }

    body = {
        "email": email,
        "name": firstName+" "+lastName,
        "password": password,
        "address": address,
        "cpf": cpf

    }

    console.log(body)
    sendPostUserRequest(url,body)
}





async function sendPostMemberRequest(url,body)
{

    console.log(url)
    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(url, {method:"POST",
            headers: headers,

            body: JSON.stringify(body)
        }).then(response => {
            console.log(response.status)
            response.json().then(member =>{
               
                childNodes = document.getElementById('skillList').childNodes
                
                for(i=1; i < childNodes.length; i++){
                   
                   if(childNodes[i].firstChild.checked==true){
                       let skill = childNodes[i].firstChild.value
                       let url = BASE_URL+'skill_pilar_member/'
                       let body = {
                           "id_pilarmember": member.id,
                           "id_skill": parseInt(skill)
                       }
                       console.log(body)
                       sendPostSkillPilarMemberRequest(url,body)
                   }
                    
                }

            }).finally(
                window.location.replace("./home.html")
            )

        })
    
    
}



async function sendPostSkillPilarMemberRequest(url,body)
{
    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(url, {method:"POST",
            headers: headers,
            mode:'no-cors',
            body: JSON.stringify(body)
        })
    .then(response => {
        

        if(response.status == 200){
            console.log("sucesso")
        }else{
            response.json().then(error =>{
                alert("Error ao cadastrar")
            })
        }
    }).catch(error => {
        console.log(error)
        alert("Erro ao cadastrar")
    })
  
}


console.log(window.localStorage.getItem('isPilarMember'))




function cadastrarUsuarioPilar()
{
    event.preventDefault()
    let url = BASE_URL+'pilar_member/'

    let summary = document.getElementById('summary').value
    let instagram = document.getElementById('instagram').value
    let id_user = parseInt(window.localStorage.getItem('userId'))

    

    body = {
        "introduction": summary,
        "instagram": instagram,
        "evaluation": 1,
        "id_user":id_user,
    }

    console.log(body)
    sendPostMemberRequest(url,body)
}



function cadastrarUsuarioPorto()
{
    event.preventDefault()
    let url = BASE_URL+'porto_member/'

    let address = document.getElementById('address').value
   
    let company = document.getElementById('company').value

    let id_user = parseInt(window.localStorage.getItem('userId'))

    

    body = {
        "workaddress": address,
        "company_name": company,
        "id_user":id_user,
    }

    console.log(body)
    sendPostMemberRequest(url,body)
}


getSkillsList = async function(elementId, inputType) {


    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(BASE_URL+'skill/', {
        method: 'GET',
        headers: headers,
    }).then(response => response.json().then(data => {
        console.log(data);
        let selectDOM = document.getElementById(elementId)
        data.forEach(element => {


            /**
             *  <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Default checkbox
                </label>
              </div>
             */

              let div = document.createElement("div");
              div.className = "form-check"
              let input = document.createElement("input");
              input.className = "form-check-input"
              input.type = inputType
              input.id = element.id
              input.value = element.id
              input.name = 'skillSelector'
              let label = document.createElement("label")
              label.className = "form-check-label"
              label.innerHTML = element.name
              label.setAttribute("for",element.id)
              div.appendChild(input)
              div.appendChild(label)
              selectDOM.appendChild(div)
        }
        )
    })).catch(error => console.error('Error:', error));


}
getSkillsList("skillList", "checkbox");

getSkillsList("skillListRadio", "radio");


const getByIdRequest = async(url, id) =>
{   
  //fetch(url).then(response => response.json).then(console.log);
  
  return await (await fetch(BASE_URL + url +`${id}/`)).json();
  //showOpportunityDetails(await opportunity.json());
  //const portoMember = await fetch(BASE_URL + "opportunity/by/id/2/");
  //showPortoMemberDetails(portoMember);
  //return await data.json();
}

async function sendPostPhoneRequest(url,body)
{
    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    return await fetch(url, 
        {   method:"POST",
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
       
            if(response.status != 200){

                response.json().then(error =>{
                    alert("Error ao cadastrar o telefone")
                })

            }
    
        }).catch(error => {
            console.log(error)
            alert("Erro ao cadastrar o Telefone")
        })
}

async function sendPostOpportunityRequest(url,body){

    let headers = new Headers();
    
    headers.append("Content-type","application/json");

    await fetch(url, {
            method:"POST",
            headers: headers,
            body: JSON.stringify(body)
        })
    .then(response => {
        console.log(body)

        if(response.status == 200){
            console.log("sucesso")
            location.reload()
        }else{
            alert("Error ao cadastrar")
        }
    }).catch(error => {
        console.log(error)
        alert("Erro ao cadastrar")
    })


}

function cadastrarOportunidade(){


    event.preventDefault()
    
   
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let id_user = parseInt(window.localStorage.getItem('userId'))
    let startDate = document.getElementById('startDate').value
    let endDate = document.getElementById('endDate').value
    let value = document.getElementById('value').value

    childNodes = document.getElementById('skillListRadio').childNodes
    let id_skill = null            
    for(i=1; i < childNodes.length; i++){
    
        if(childNodes[i].firstChild.checked==true){
            id_skill = childNodes[i].firstChild.value
            
        }
            
    }
    
    if(id_skill == undefined){
        alert("Selecione uma habilidade")
    }
    console.log(id_user)
    getByIdRequest('porto_member/by/user/',id_user).then(portomember =>{
        console.log(portomember)
        body = {
 
            "id_portomember": parseInt(localStorage.getItem('id_PortoMember')),
            "title": title,
            "startDate": startDate,
            "endDate": endDate, 
            "description": description,
            "id_skill": parseInt(id_skill),
            "value": parseFloat(value),
          }
        
    
        
        sendPostOpportunityRequest(BASE_URL+'opportunity/',body)


    })

   

    


}