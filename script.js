const prompt = document.querySelector('.prompt')
const chatContainer = document.querySelector('.chat-container')
const heading = document.querySelector('.heading')
// const userChat = document.querySelector('.text')
const reload = document.querySelector('.reload button')
let userMessage = null;
let button = document.querySelector('#prompt')
let apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDc1RH3BK1RVNazeffb6SqO2VIuwMK9Vk8"
async function getapiresponse(aichat){
    try{
        let response = await  fetch(apiUrl,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({
                "contents": [{"role": "user", "parts":[{"text": userMessage}]}]
        })
        })
        let data = await response.json()
         console.log(data)
         let ans = data?.candidates[0].content.parts[0].text
         console.log(ans)
         
        // let apiresponse = data?.candidates[0].content.parts[0].text
        // console.log(await response.json().candidates[0].content.part[0].text)
       
        // console.log(apiresponse)
        aichat.querySelector('.text').innerText= ans
    }
    catch(error){
        console.log(error)
    }
    finally{
        aichat.querySelector('.loading').classList.add('none')
    }
}
function createChatBox( html,userClass){
    let div = document.createElement('div');
    div.classList.add(userClass)
    div.innerHTML = html;
    return div
}
function showLoading(){
    let html = `<div class="img">
                <img src="chatbot-4736275.svg" alt="" width="50">
            </div>
            <p class="text"></p>
            <img src="load-33.gif" alt="" class="loading" height="50px">`
            let aiBox = createChatBox(html,"ai-chat")
            chatContainer.appendChild(aiBox);  
            getapiresponse(aiBox)
}
button.addEventListener('click', ()=>{
    console.log("clicked")
    userMessage = prompt.value
    if(!userMessage==""){
        heading.classList.add('none')
    }
    if(!userMessage){
        
        return;
    }
    let html = `<div class="img">
                <img src="avatar-3637561.svg" alt="" >
            </div>
            <p class="text"</p>`
    let userBox = createChatBox(html,"user-chat")
    userBox.querySelector('.text').innerText = userMessage
    chatContainer.appendChild(userBox); 
    prompt.value = ""
    setTimeout(showLoading,5000,{      // showloading is function

    })
});
// prompt.addEventListener('click',()=>{
//     heading.classList.add('none')

// })
reload.addEventListener('click',()=>{
    location.reload();
})