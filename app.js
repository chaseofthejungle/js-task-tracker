// 1. Retrieve Elements that Handle Initial Task Creation
let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTaskList = document.getElementById("incomplete-tasks");
let completedTaskList = document.getElementById("completed-tasks");

// 2. Prepare (Declare, Append) Elements Needed for List Items
let createNewTaskElement = function (taskString) {
	let listItem = document.createElement("li");
	listItem.classList.add('test');
	let checkBox = document.createElement("input");
	let label = document.createElement("label");
	let editInput = document.createElement("input");
	let renameButton = document.createElement("button");
	let deleteButton = document.createElement("button");

	label.innerText = taskString;
	checkBox.type = "checkbox";
	editInput.type = "text";

	renameButton.innerText = "Rename";	
	renameButton.className = "rename";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	// Each list item needs these elements appended to them.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(renameButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

// 3. Functionality to Add a Task
let addTask = function () {
	let listItem = createNewTaskElement(taskInput.value);

	if (taskInput.value == "") {
		return;
	}

	incompleteTaskList.appendChild(listItem); // listItem needs to be added to Incomplete List Task List before being bound
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// 4. Functionality to Rename a Task
let renameTask = function () {
	let listItem = this.parentNode;
	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");

	// Check if list item is ready to be renamed.
	if (listItem.classList.contains("renameMode")) {
		modifyTaskName();
	} else {
		editInput.value = label.innerText;
		listItem.classList.toggle("renameMode");
	}

	// Logic for if user confirms item rename with enter key instead of rename button press.
	listItem.addEventListener("keypress", function(event) {
    	if (event.key === "Enter") {
			if (listItem.classList.contains("renameMode")) {
				modifyTaskName();
			} else {
				editInput.value = label.innerText;
			}
    	}
	});

	// Method to be called if the task name should be updated.
	modifyTaskName = () => {
		if (editInput.value === "") {
			alert("Please enter a task name.");
		} else {
			label.innerText = editInput.value;
			listItem.classList.toggle("renameMode");
		}
	}
}

// 5. Functionality to Delete a Task
let deleteTask = function () {
	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	ul.removeChild(listItem); // Removes parent list item from the unordered list.
}

// 6. Functionality to Complete a Task
let taskCompleted = function () {
	let listItem = this.parentNode;
	completedTaskList.appendChild(listItem); // Appends task list item to completed tasks list.
	bindTaskEvents(listItem, taskIncomplete);
}

// 7. Functionality to Check Off a Task as Incomplete
let taskIncomplete = function () {
	let listItem = this.parentNode;
	incompleteTaskList.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

// 8. Logic for Binding Rename/Delete Functionality to Buttons/Checkboxes
let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {	
    	// Select list item's child.
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let renameButton = taskListItem.querySelector("button.rename");
	let deleteButton = taskListItem.querySelector("button.delete");

	// Bind task based on button or checkbox activity.
	renameButton.onclick = renameTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskList.children.length; i++) {
	bindTaskEvents(incompleteTaskList.children[i], taskCompleted);
}

for (let i = 0; i < completedTaskList.children.length; i++) {
	bindTaskEvents(completedTaskList.children[i], taskIncomplete);
}
