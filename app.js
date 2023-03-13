// 1. Add Elements
let taskInput = document.getElementById("new-task"); // New Task Element
let addButton = document.getElementsByTagName("button")[0]; // Button Element #1
let incompleteTaskHolder = document.getElementById("incomplete-tasks"); // List of Incomplete Tasks
let completedTasksHolder = document.getElementById("completed-tasks"); // List of Completed Tasks

// 2. Create a New Task Item (using a Function)
let createNewTaskElement = function (taskString) {
	let listItem = document.createElement("li");

	let checkBox = document.createElement("input"); // input checkbox
	let label = document.createElement("label"); // label
	let editInput = document.createElement("input"); // input text
	let renameButton = document.createElement("button"); // rename button
	let deleteButton = document.createElement("button"); // delete button

	label.innerText = taskString; // innerText can handle special chars, unlike HTML.

	checkBox.type = "checkbox"; // declaring checkbox type for checkbox
	editInput.type = "text"; // declaring text type for input

	renameButton.innerText = "Rename";	
	renameButton.className = "rename";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	// Append List Items
	listItem.appendChild(checkBox); // checkbox
	listItem.appendChild(label); // label
	listItem.appendChild(editInput); // input text
	listItem.appendChild(renameButton); // rename button
	listItem.appendChild(deleteButton); // delete button
	return listItem; // now that items are appended, return them all
}

// 3. Add a Task
let addTask = function () {
	let listItem = createNewTaskElement(taskInput.value);

	if (taskInput.value == "") {
		return;
	}

	incompleteTaskHolder.appendChild(listItem); // listItem needs to be added to Incomplete List Task Holder
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

// 4. Rename a Task
let renameTask = function () {
	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("renameMode");

    // Check if parent class element is in Rename Mode
	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}

	listItem.classList.toggle("renameMode");
}

// 5. Delete a Task
let deleteTask = function () {
	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	ul.removeChild(listItem); // Removes parent list item from the unordered list.
}

// 6. Complete a Task
let taskCompleted = function () {
	let listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem); // Appends task list item to completed tasks list.
	bindTaskEvents(listItem, taskIncomplete);
}

// 7. Check Off Task as Incomplete
let taskIncomplete = function () {
	let listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

// 8. Add a Task
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {	
    // Select List Item's Child
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let renameButton = taskListItem.querySelector("button.rename");
	let deleteButton = taskListItem.querySelector("button.delete");

	// Bind Task to Respective Button or Checkbox
	renameButton.onclick = renameTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

// 9. Bind Events to List Item Child Elements (for both Complete and Incomplete Tasks)
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}