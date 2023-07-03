if(!"webkitSpeechRecognition" in window){
  alert("Speech Recognition not Available")
} 
if (!"speechSynthesis" in window) {
  alert("Sorry, your browser doesn't support text to speech!")
}//  else {
//   alert("yo wes")
// }

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
  const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
  const synth = window.speechSynthesis;
  const voices = [];
  let recognition = new SpeechRecognition();
  

  //recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "id";
  recognition.interimResults = false;
  //recognition.maxAlternatives = 1;
  recognition.onError = () => {
    console.log('error')
  };
  
  recognition.onresult = function (event) {
    let textResult = event.results[0][0].transcript;
    console.log(event.results[0][0].transcript);	
    //document.querySelector("#result").innerHTML = textResult;
    document.getElementById("input").value = textResult;		
    output(textResult);
    //setTimeout(function(){inputField.value = "";},1000);
  }
  
  /* const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  }); */
  document.write('<script type="text/javascript" src="chat-model.js"></script>');
  
  document.querySelector("#start").onclick = () => {
    recognition.start();
  };
  
  // document.querySelector("#stop").onclick = () => {
  // 	recognition.stop();
  // };
  
  function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
      .replace(/ a /g, " ")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    if (compare(utterances, answers, text)) {
      // mencari kalimat yang sesuai dengan pertanyaan yang diterima
      product = compare(utterances, answers, text);
    } 
    else {
      product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }
    addChatEntry(input, product);
    
  }
  
  function compare(utterancesArray, answersArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < utterancesArray.length; x++) {
      for (let y = 0; y < utterancesArray[x].length; y++) {
        if (utterancesArray[x][y] === string) {
          let replies = answersArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) {
        break;
      }
    }
    return reply;
  }
  
  function addChatEntry(input, product) {
    const messagesContainer = document.getElementById("messages");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<span>${input}</span>`;
    messagesContainer.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
  
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
    setTimeout(() => {
      botText.innerText = `${product}`;
      const utterThis = new SpeechSynthesisUtterance(product);
      utterThis.lang = "id";
      synth.speak(utterThis);
    }, 2000);
    
  }