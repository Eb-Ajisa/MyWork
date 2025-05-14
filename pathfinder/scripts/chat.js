import { CalcRoute2, CalcRoute3, CalcRoute4 } from './fromto.js';
const home = document.getElementById("homee")?.value; 

const buildingMap = {
  "science complex": "sc",
  "glen garage": "gg",
  "administration building": "ab",
  "hawkins hall": "hh",
  "lithicum hall": "lh",
  "tubman, hariss, barton, douglas hall": "th",
  "university union": "uu",
  "millenium hall": "ml",
  "10-west": "tw",
  "center for the arts": "ca",
  "glen towers and dining hall": "gt",
  "york rd/comp sci/math building": "yr",
  "lecture hall": "lah",
  "library": "cl",
  "newell": "na",
  "liberal arts": "lab",
  "marshall and barnes": "mh",
  "west village commons": "wvc",
  "west village garage": "wvg",
  "enrollment services": "es",
  "psycology building": "psb",
  "towers": "rt",
  "burdick hall": "bd",
  "stephens and van hall": "sav",
  "heath professional building": "healthp"
};

//Will be used to send the home and building to the Fromto.js
function extractAndRoute(reply) {
  const matches = Object.keys(buildingMap).filter(name =>
    reply.toLowerCase().includes(name)
  );

  const buildingCodes = matches.map(name => buildingMap[name]);

  // Get user's selected home code
  const homeCode = document.getElementById("homee")?.value;

  if (!homeCode) {
    alert("No home selected, skipping AI route setup.");
    return;
  }

  if (buildingCodes.length >= 1) {
    // go from home to first suggested building on map
    console.log("Route from home -> first suggested building on map2, ", buildingCodes[0]);
    CalcRoute2(homeCode, buildingCodes[0]);
  

  if (buildingCodes.length >= 2) {
    // go from home to second suggested building on map, this is different for debugging reasons
    console.log("Routing to map3:", homeCode, "->", buildingCodes[1]);
    CalcRoute3(homeCode, buildingCodes[1]);
  }

  if (buildingCodes.length >= 3) {
    // go from home to third suggested building on map
    console.log("Route from home -> third building on map4", buildingCodes[2]);
    CalcRoute4(homeCode, buildingCodes[2]);
  }
}
}


async function getBotResponse(message) {
  //retrieve all building names once more by building ID
  function getAllBuildings() {
    const building1 = document.getElementById("building1");
    const building2 = document.getElementById("building2");
    const options = [...building1.options, ...building2.options, ...building1.options];
    return [...new Set(options.map(opt => opt.textContent.trim()))];
  }

  const currentPage = window.location.pathname;
  const year = document.getElementById("year")?.value;
  const major = document.getElementById("major")?.value;
  const home = document.getElementById("homee")?.value;
  const buildings = getAllBuildings();

  //Before continuing wait for this fetch/post to be done
  const response = await fetch("http://localhost:3500/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, page: currentPage, year, major, home, buildings })
  });

  const data = await response.json();
  const reply = data.reply;

  extractAndRoute(reply); // update maps

  return reply;
}
document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chat-box");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
  
    // toggle chat window open/close
    chatToggle.onclick = () => {
      chatBox.classList.toggle("open");
    };
  
    // handle sending message
    chatSend.onclick = async () => {
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;
  
      addMessage("user", userMessage);
      chatInput.value = "";
  
      const reply = await getBotResponse(userMessage);
      addMessage("bot", reply);
    };
  
    function addMessage(sender, text) {
      const msg = document.createElement("div");
      msg.className = sender;
      msg.textContent = `${sender === "user" ? "You" : "Bot"}: ${text}`;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

  // Set up listeners for auto-context update
  const selects = ["homee", "major", "year"];
  selects.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", async () => {
        // Wait a tick to ensure DOM updates are complete
        setTimeout(async () => {
          const home = document.getElementById("homee")?.value || "Not specified";
          const major = document.getElementById("major")?.value || "Not specified";
          const year = document.getElementById("year")?.value || "Not specified";

          const contextUpdateMessage = `
My updated selections are:
- Home: ${home}
- Major: ${major}
- Year: ${year}
Please consider this the latest info about me.
          `;
          const reply = await getBotResponse(contextUpdateMessage);
          addMessage("bot", reply);
        }, 100);
      });
    }
  });

});

// when homee or major or year changes, take note of that AI
// function setupAutoContextUpdate() {
//
//     const selects = ["homee", "major", "year"];
//     selects.forEach(id => {
//       const el = document.getElementById(id);
//       if (el) {
//         el.addEventListener("change", async () => {
//           const message = `Update my info based on the latest selections.`;
//           const reply = await getBotResponse(message);
//           addMessage("bot", reply);
//         });
//       }
//     });
//   }
//   
//   document.addEventListener("DOMContentLoaded", () => {
//     setupAutoContextUpdate();
//   });
//   
  
