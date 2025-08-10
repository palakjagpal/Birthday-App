import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"
import { getDatabase ,
    ref,
    push,
    onValue,
    remove
 } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js"

const firebaseConfig = {
    databaseURL : "https://birthday-app-9c2d8-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database ,"birthdays") 


const birthdayInputField = document.getElementById("birthday-input")
const submitButton = document.getElementById("submit-button")
const deleteButton = document.getElementById("delete-button")
const ulEl = document.getElementById("ul-el")

onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist){
        console.log(snapshot.val())
    const snapshotValues = snapshot.val()
    const birthdays = Object.values(snapshotValues)
    render(birthdays)
    }
})

console.log(database)


submitButton.addEventListener("click", function() {
    push(referenceInDB, birthdayInputField.value)
    birthdayInputField.value = ""
})          

//Delete button function
deleteButton.addEventListener("click", function(){
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

function render(birthdays){
    let listItems =""
    // Render the leads in the unordered list using ulEl.textContent
    for (let i = 0; i < birthdays.length; i++) {
        //rendering html elements with js
        //listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"
        //Template String Method    
        listItems += `
            <li>
                <p>
                    ${birthdays[i]}
                </p>
            </li>
        `
        console.log("listItems:"+listItems)
        //New method alternate innerHTML
        /*const li = document.createElement('li')
        li.textContent = myLeads[i]
        ulEl.append(li)*/ 
    }
    ulEl.innerHTML=listItems
}
