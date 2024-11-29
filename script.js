const hamburger = document.querySelector('.hamburger');
const tabs = document.querySelector('.tabs');
const closebtn = document.querySelector('.close-btn');
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotContainer = document.getElementById("chatbotContainer");
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const questionButtons = document.querySelectorAll(".question-btn");

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('bx-x');
    tabs.classList.toggle('active');
});

closebtn.addEventListener('click', () => {
    tabs.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
    const chatboxIcon = document.getElementById("chatboxIcon");
    const chatbot = document.getElementById("bot");
    const chatbox = document.getElementById("chatbox");
    const chatOptions = document.getElementById("chat-options");
    const closeChatButton = document.getElementById("close");
    const clearChatButton = document.getElementById("menu");

    // Function to simulate typing animation
    function typeWriter(text, isUserMessage, callback) {
        let index = 0;
        const typingSpeed = 60;
        const p = document.createElement("p");

        p.classList.add(isUserMessage ? "user-message" : "bot-message");
        chatbox.appendChild(p);
        chatbox.scrollTop = chatbox.scrollHeight;

        function type() {
            if (index < text.length) {
                p.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    function displayMessage(message, isUserMessage = false, callback) {
        typeWriter(message, isUserMessage, callback);
    }

    function showOptions(options) {
        chatOptions.innerHTML = "";
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.addEventListener("click", function () {
                displayMessage(`You: ${option.text}`, true);
                setTimeout(() => {
                    displayMessage(option.response);
                    if (option.followUp) {
                        showOptions(option.followUp);
                    }
                }, 500);
            });
            chatOptions.appendChild(button);
        });
    }

    function handleUnknownQuestion() {
        displayMessage("I’m not sure how to answer that. Can you try something else?");
    }

    function processUserQuestion(inputText) {
        const recognizedOptions = {
            " Who are you ": "I am Tokoloho Lekoro. A Software Developer.",
            " What do you do ": "I specialize in building Mobile and Web applications",
            " What is your tech stack ": "At the moment I specialize in C#, Flutter and Dart",
            " Industry Experience ": "I am still learning and gaining experience.",
            " How can i contact you ": "You can contact me via email, phone, or LinkedIn."
        };

        const response = recognizedOptions[inputText.toLowerCase()];
        if (response) {
            displayMessage(response);
        } else {
            handleUnknownQuestion();
        }
    }

    function startChat() {
        chatbox.innerHTML = ""; // Clear previous messages when starting chat
        displayMessage("Hello, This is Maverick. How can I help you?", false, function () {
            showOptions([
                { text: "Who are you ", response: "I am Tokoloho Lekoro. A Software Developer." },
                { text: "What do you do ", response: "I specialize in building Mobile and Web applications." },
                { text: "What do you specialize in ", response: "At the moment I specialize in C#, Flutter and Dart." },
                { text: "Industry Experience ", response: "I am still learning and gaining experience." },
                {
                    text: "How can I contact you?",
                    response: "How would you like to contact me?",
                    followUp: [
                        { text: "Email", response: "You can contact me via email: tokoloho57@gmail.com." },
                        { text: "Personal Number", response: "You can contact me via Phone Number: 0849992284." },
                        { text: "LinkedIn", response: "You can reach me on LinkedIn: Tokoloho Lekoro." }
                    ]
                    
                },
            ]);
        });
    }

    // Event listener for the chat icon
    chatboxIcon.addEventListener("click", function () {
        chatbot.style.display = "block";
        chatIcon.style.display = "none";
        startChat();
        
    });

    // Event listener for closing the chat
    closeChatButton.addEventListener("click", function () {
        chatbot.style.display = "none";
        chatboxIcon.style.display = "block";
        chatbox.innerHTML = ""; // Clear chat messages for the next session
    });

    // Event listener for clearing the chat
    clearChatButton.addEventListener("click", function () {
        chatbox.innerHTML = ""; // Only clear chat messages without closing
        startChat(); // Show the initial question set again
    });

    // Event listener for handling user questions (typing or other input)
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && chatOptions.children.length === 0) {
            const userQuestion = chatbox.lastElementChild.textContent.replace("You: ", "").trim();
            processUserQuestion(userQuestion);
        }
    });
});






