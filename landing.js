const logo = document.getElementById("secretLogo");
const message = document.getElementById("secretMessage");

let clicks = 0;

logo.addEventListener("click", () => {

    clicks++;

    if(clicks === 3){
        message.textContent = "PROTOCOL DETECTED...";
    }

    if(clicks === 5){
        message.textContent = "VERIFYING USER...";
    }

    if(clicks === 7){

        document.body.style.background = "#000";
        document.body.innerHTML = `
            <div style="
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            color:#00ff66;
            font-family:Orbitron;">
            
            <h1>MOTHERSHIP</h1>
            <p>ACCESS GRANTED</p>

            </div>
        `;

        setTimeout(()=>{
            window.location.href = "login.html";
        },2500);
    }

});