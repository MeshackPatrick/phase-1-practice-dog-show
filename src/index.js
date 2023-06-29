document.addEventListener("DOMContentLoaded", () => {
    const dogForm = document.getElementById("dog-form");
    const tableBody = document.getElementById("table-body");
  
    // Fetch and display all dogs
    function fetchDogs() {
      fetch("http://localhost:3000/dogs")
        .then((response) => response.json())
        .then((dogs) => {
          dogs.forEach((dog) => {
            displayDog(dog);
          });
        });
    }
  
    // Display a dog in the table
    function displayDog(dog) {
      const dogRow = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.textContent = dog.name;
  
      const breedCell = document.createElement("td");
      breedCell.textContent = dog.breed;
  
      const sexCell = document.createElement("td");
      sexCell.textContent = dog.sex;
  
      const editButtonCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        populateFormWithDog(dog);
      });
      editButtonCell.appendChild(editButton);
  
      dogRow.appendChild(nameCell);
      dogRow.appendChild(breedCell);
      dogRow.appendChild(sexCell);
      dogRow.appendChild(editButtonCell);
  
      tableBody.appendChild(dogRow);
    }
  
    // Populate the form with dog's current information
    function populateFormWithDog(dog) {
      const nameInput = document.getElementsByName("name")[0];
      const breedInput = document.getElementsByName("breed")[0];
      const sexInput = document.getElementsByName("sex")[0];
  
      nameInput.value = dog.name;
      breedInput.value = dog.breed;
      sexInput.value = dog.sex;
  
      dogForm.addEventListener("submit", (event) => {
        event.preventDefault();
        updateDog(dog.id);
      });
    }
  
    // Update dog information
    function updateDog(dogId) {
      const nameInput = document.getElementsByName("name")[0];
      const breedInput = document.getElementsByName("breed")[0];
      const sexInput = document.getElementsByName("sex")[0];
  
      const patchData = {
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value,
      };
  
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(patchData),
      })
        .then(() => {
          clearForm();
          clearTable();
          fetchDogs();
        })
        .catch((error) => console.error("Error updating dog:", error));
    }
  
    // Clear the form inputs
    function clearForm() {
      dogForm.reset();
      dogForm.removeEventListener("submit", updateDog);
    }
  
    // Clear the table rows
    function clearTable() {
      tableBody.innerHTML = "";
    }
  
    // Initialize the app
    fetchDogs();
  });
  