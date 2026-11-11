
let tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    const deadline = document.getElementById("deadline");

    const name = input.value.trim();

    if (name === "") {
        alert("Please enter a task!");
        return;
    }

    const priority = getPriority(name, deadline.value);

    tasks.push({
        name: name,
        deadline: deadline.value,
        priority: priority,
        completed: false
    });

    input.value = "";
    deadline.value = "";

    displayTasks();
}

function getPriority(name, date) {
    const text = name.toLowerCase();
    const urgentWords = ["urgent", "bug", "error", "fix", "deadline"];

    if (urgentWords.some(word => text.includes(word))) {
        return "High";
    }

    if (date) {
        const days = (new Date(date) - new Date()) /
                     (1000 * 60 * 60 * 24);

        if (days <= 2) return "High";
        if (days <= 7) return "Medium";
    }

    return "Low";
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task";

        const title = document.createElement("strong");
        title.textContent = task.name;

        const details = document.createElement("p");
        details.textContent =
            "Priority: " + task.priority +
            " | Status: " +
            (task.completed ? "Completed" : "Pending");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.onclick = () => {
            task.completed = true;
            displayTasks();
        };

        div.append(title, details, completeBtn);
        list.appendChild(div);
    });

    document.getElementById("total").textContent = tasks.length;

    document.getElementById("completed").textContent =
        tasks.filter(t => t.completed).length;

    document.getElementById("pending").textContent =
        tasks.filter(t => !t.completed).length;
}

function getAISuggestion() {
    const pending = tasks.filter(t => !t.completed);

    const high = pending.filter(t => t.priority === "High");

    let message;

    if (pending.length === 0) {
        message = "Great! All tasks are completed.";
    } else if (high.length > 0) {
        message = "AI Suggestion: Complete high priority tasks first. You have " +
                  high.length + " urgent task(s).";
    } else {
        message = "AI Suggestion: Start with the earliest deadline and complete your pending tasks.";
    }

    document.getElementById("suggestion").textContent = message;
}

displayTasks();
