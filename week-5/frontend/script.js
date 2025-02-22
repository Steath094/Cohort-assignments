// const todoBoard = {
//     todosList: [{ title: 'My name is shady', description: 'Fuck You', category: 'Easy' }],
//     inProgressList: [{ title: "Write API", description: "Develop backend API", category: 'Medium' }],
//     underReviewList: [{ title: "Build UI", description: "Create the main UI components", category: 'Urgent' },
//         { title: "Fix Bug", description: "Resolve login issue", category: 'Easy' }],
//     finishedList: [{ title: "Fix Bug", description: "Creating Login Issue", category: 'Easy' }],
// };
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour12: false }); // 24-hour format: HH:MM:SS
}

function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHrs > 0) {
      return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
  } else if (diffMin > 0) {
      return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
  } else {
      return `Just now`;
  }
}
async function render() {
  try {
      const response = await fetch("http://localhost:3000/user/todos", {
          method: "GET",
          headers: {
              'Authorization': `Bearer ${sessionStorage.getItem("userToken")}`
          }
      });

      if (!response.ok) {
          throw new Error("Failed to fetch todos. User might not be authenticated.");
      }

      const todoData = await response.json();
      const todoBoard = todoData.data; // This is an array of todos
      // console.log("Fetched Todos:", todoBoard);

      // Select lists
      const lists = {
          todoList: document.querySelector('.todoList'),
          inProgressList: document.querySelector('.inProgressList'),
          underReviewList: document.querySelector('.underReviewList'),
          finishedList: document.querySelector('.finishedList')
      };
      
      // Clear all lists before updating
      Object.values(lists).forEach(list => {
          list.innerHTML = ''; 
      });

      if (todoBoard.length === 0) {
          // Show empty message if no todos exist
          Object.keys(lists).forEach(category => {
              if (lists[category]) {
                  lists[category].innerHTML = `<div class="empty-message">No todos in ${category}</div>`;
              }
          });
      } else {
          // Populate each list with todos
          todoBoard.forEach(item => {
              const category = item.category || "todoList"; // Default to todoList if category is missing
              const list = lists[category];

              if (list) {
                  list.innerHTML += `
                      <div class="todo ${category}Item" draggable="true" data-id="${item._id}" data-category="${category}">
                          <div class="title">${item.title}</div>
                          <div class="description"><p>${item.description}</p></div>
                          <div class="utils">
                              <div class="left">
                                  <div class="type">${item.difficulty || "Easy"}</div>
                                  <div class="time">
                                      <span class="colorGrey">
                                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343">
                                              <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/>
                                          </svg>
                                      </span> 
                                      <span>${formatTime(item.createdAt)}</span>
                                  </div>
                              </div>
                              <div class="right">${timeAgo(item.updatedAt)}</div>
                          </div>
                      </div>`;
              }
          });

          // Show "No todos" message for empty lists
          Object.keys(lists).forEach(category => {
              if (lists[category] && lists[category].children.length === 0) {
                  lists[category].innerHTML = `<div class="empty-message">No todos in ${category}</div>`;
              }
          });
      }

      // Apply background color based on task type
      document.querySelectorAll('.type').forEach(item => {
          if (item.innerText === 'Easy') {
              item.style.backgroundColor = '#FFD700';
          } else if (item.innerText === 'Urgent') {
              item.style.backgroundColor = 'Red';
          }
      });

      applyDragAndDrop(); // Reapply drag & drop event listeners
  } catch (error) {
      console.error("Error fetching todos:", error);
  }
}



function applyDragAndDrop() {
    let items = document.querySelectorAll('.todo');
    let lists = document.querySelectorAll('.todoList, .inProgressList, .underReviewList, .finishedList');
    // console.log(lists);
    
    items.forEach(item => {
        item.setAttribute("draggable", "true"); // Ensure draggable attribute

        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
    lists.forEach(list => {
      list.addEventListener('dragover', (e) => {
          e.preventDefault(); // Necessary to allow dropping
          list.classList.add('over');
      });

      list.addEventListener('dragleave', () => {
          list.classList.remove('over');
      });

      list.addEventListener('drop', async (e) => {
        e.preventDefault();
        // console.log("working");
        // console.log(list);
        
        list.classList.remove('over'); // Remove visual effect
        // console.log(dragSrcEl);
        
        if (!dragSrcEl) return; // Ensure an item is being dragged
    
        const todoId = dragSrcEl.dataset.id; // Fetch the todo's ID
        const newCategory = list.classList[0] // Get the category of the target list
        // console.log(newCategory);
        
        if (!todoId || !newCategory) return; // Ensure valid data
    
        try {
            // Send PUT request to update the category in DB
            const response = await fetch(`http://localhost:3000/todo/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("userToken")}` // Ensure authentication
                },
                body: JSON.stringify({ category: newCategory }) // Send updated category
            });
    
            if (!response.ok) {
                throw new Error("Failed to update category.");
            }
    
            // Re-fetch todos after successful update
            await render(); // Fetch and re-render the updated todos
        } catch (error) {
            console.error("Error updating todo category:", error);
        }
    });
    
  });
}

function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('over');
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    document.querySelectorAll('.todo').forEach(item => {
        item.classList.remove('over');
    });
}

async function handleDrop(e) {
  e.stopPropagation();
  // const dragSrcEl = document.querySelector(".dragging");
  // console.log(dragSrcEl);
  
  if (!dragSrcEl) return; // Prevent errors if no element is dragged

  const todoId = dragSrcEl.dataset.id; // Ensure each todo item has a data-id attribute
  const destCategory = this.dataset.category; // The category where the item is dropped
  // console.log(destCategory);
  
  if (!todoId || !destCategory) return; // Ensure valid data

  try {
      // Send PUT request to update the category in DB
      const response = await fetch(`http://localhost:3000/todo/${todoId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${sessionStorage.getItem("userToken")}` // Ensure auth token is sent
          },
          body: JSON.stringify({ category: destCategory }) // Send updated category
      });

      if (!response.ok) {
          throw new Error("Failed to update category.");
      }

      // Re-fetch todos after successful update
      await render(); // Fetch and re-render the updated todos
  } catch (error) {
      console.error("Error updating todo category:", error);
  }
}


async function addTask() {
    const form = document.querySelector(".todo-form");
    const title = form.children[0].value.trim();
    const description = form.children[1].value.trim();
    const difficulty = form.children[2].value.trim();
  // console.log(difficulty);
  
    if (title === '' || description === '') return;
    const res = await fetch("http://localhost:3000/todo/", {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("userToken")}`,
          'Content-Type': 'application/json' // Add this
      },
      body: JSON.stringify({ title, description, category: "todoList", difficulty })
  });
  
    
    form.children[0].value = '';
    form.children[1].value = '';
    render();
}

document.addEventListener('DOMContentLoaded',async () => {
    // Check the page URL and run the appropriate logic
    const currentPage = window.location.pathname;
    // console.log(currentPage);

  
    // Function to check login status and redirect if not logged in
    function checkLoginStatus() {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        window.location.href = 'login.html';
      }
    }
  
    // Handle login form submission
    if (currentPage.includes('login.html')) {
      const form = document.querySelector("form"),
        emailField = form.querySelector(".email-field"),
        emailInput = emailField.querySelector(".email"),
        passField = form.querySelector(".create-password"),
        passInput = passField.querySelector(".password")
        // console.log(form);
        
        // Email Validtion
        function checkEmail() {
        const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailInput.value.match(emaiPattern)) {
            return emailField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
        }
        emailField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
        }

        // Hide and show password
        const eyeIcons = document.querySelectorAll(".show-hide");
        eyeIcons.forEach((eyeIcon) => {
        eyeIcon.addEventListener("click", () => {
            const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
            if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
            }
            eyeIcon.classList.replace("bx-show", "bx-hide");
            pInput.type = "password";
        });
        });
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        checkEmail();
        const email = emailInput.value;
        const password = passInput.value;
        try {
          const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
  
          if (response.ok) {
            const result = await response.json();
            // console.log(result);
            
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userToken', result.data.accessToken); // Optional
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to landing page
          } else {
            alert('Login failed. Please check your credentials.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    }
  
    // Handle signup form submission
    if (currentPage.includes('signup.html')) {
      // const signupForm = document.getElementById('signup-form');
      const form = document.querySelector("form"),
        nameField = form.querySelector(".name-field"),
        nameInput = nameField.querySelector(".name"),
        usernameField = form.querySelector(".username-field"),
        usernameInput = usernameField.querySelector(".username"),
        emailField = form.querySelector(".email-field"),
        emailInput = emailField.querySelector(".email"),
        passField = form.querySelector(".create-password"),
        passInput = passField.querySelector(".password"),
        cPassField = form.querySelector(".confirm-password"),
        cPassInput = cPassField.querySelector(".cPassword");
        // Name Validtion
        function checkname() {
          const namePattern = /^[a-zA-Z]+$/;
          if (!nameInput.value.match(namePattern)) {
            return nameField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
          }
          nameField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
        }

          // Username Validtion
        function checkusername() {
          const usernamePattern = /^[a-zA-Z0-9]+$/;
          if (!usernameInput.value.match(usernamePattern)) {
            return usernameField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
          }
          usernameField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
        }

        // Email Validtion
        function checkEmail() {
          const emaiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailInput.value.match(emaiPattern)) {
            return emailField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
          }
          emailField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
        }

        // Hide and show password
        const eyeIcons = document.querySelectorAll(".show-hide");

        eyeIcons.forEach((eyeIcon) => {
          eyeIcon.addEventListener("click", () => {
            const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
            if (pInput.type === "password") {
              eyeIcon.classList.replace("bx-hide", "bx-show");
              return (pInput.type = "text");
            }
            eyeIcon.classList.replace("bx-show", "bx-hide");
            pInput.type = "password";
          });
        });

        // Password Validation
        function createPass() {
          const passPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
          if (!passInput.value.match(passPattern)) {
            return passField.classList.add("invalid"); //adding invalid class if password input value do not match with passPattern
          }
          passField.classList.remove("invalid"); //removing invalid class if password input value matched with passPattern
        }

        // Confirm Password Validtion
        function confirmPass() {
          if (passInput.value !== cPassInput.value || cPassInput.value === "") {
            return cPassField.classList.add("invalid");
          }
          cPassField.classList.remove("invalid");
        }
         //calling function on key up
         nameInput.addEventListener("keyup", checkname);
         usernameInput.addEventListener("keyup", checkusername);
         emailInput.addEventListener("keyup", checkEmail);
         passInput.addEventListener("keyup", createPass);
         cPassInput.addEventListener("keyup", confirmPass);

        // Calling Funtion on Form Sumbit
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
          e.preventDefault(); //preventing form submitting
          checkEmail();
          checkname();
          checkusername();
          createPass();
          confirmPass();

         
          if (
            usernameField.classList.contains("invalid") ||
            nameField.classList.contains("invalid") ||
            emailField.classList.contains("invalid") ||
            passField.classList.contains("invalid") ||
            cPassField.classList.contains("invalid")
          ) {
            alert('Error Occurred while signing up');
            // Reset form fields
            // form.reset();
          }
        const fullName = nameInput.value;
        const userName = usernameInput.value;
        const email = emailInput.value;
        const password = passInput.value;
          // console.log(fullName);
          
        try {
          const response = await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email,userName, password }),
          });
          // console.log(response);
          if (response.ok) {
            alert('Signup successful!');
            window.location.href = 'login.html'; // Redirect to login page
          } else {
            alert('Signup failed. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    }
    // Handle logout
    if (currentPage.includes('index.html')) {
      checkLoginStatus(); // Ensure the user is logged in to access the landing page
      render();
      const logoutButton = document.getElementById('logout-button');
      if (logoutButton) {
        logoutButton.addEventListener('click', () => {
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('userToken'); // Optional
          alert('You have been logged out.');
          window.location.href = 'login.html'; // Redirect to login page
        });
      }
    }
  });