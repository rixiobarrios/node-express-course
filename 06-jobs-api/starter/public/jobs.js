// You will need to create loginRegister.js, register.js, login.js, jobs.js, and addEdit.js files, all in the public directory.

// The jobs.js module is as follows:

import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    token,
    enableInput,
} from './index.js';
import { showLoginRegister } from './loginRegister.js';
import { showAddEdit } from './addEdit.js';

let jobsDiv = null;
let jobsTable = null;
let jobsTableHeader = null;

// Add this function inside jobs.js
const deleteJob = async (jobId) => {
    if (!jobId) {
        message.textContent = 'No job selected for deletion.';
        return;
    }

    try {
        const response = await fetch(`/api/v1/jobs/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            message.textContent = 'The job entry was deleted.';
            showJobs(); // Refresh the job list
        } else {
            message.textContent = 'Failed to delete the job entry.';
        }
    } catch (err) {
        console.log(err);
        message.textContent = 'A communication error occurred.';
    }
};

export const handleJobs = () => {
    jobsDiv = document.getElementById('jobs');
    const logoff = document.getElementById('logoff');
    const addJob = document.getElementById('add-job');
    jobsTable = document.getElementById('jobs-table');
    jobsTableHeader = document.getElementById('jobs-table-header');

    jobsDiv.addEventListener('click', (e) => {
        if (inputEnabled && e.target.nodeName === 'BUTTON') {
            if (e.target === addJob) {
                showAddEdit(null);

                // However, the edit and delete buttons don’t actually work. This is because the click handler in jobs.js isn’t set to look for them yet. We can add a section to the click handler to remedy this.
            } else if (e.target.classList.contains('editButton')) {
                message.textContent = '';
                showAddEdit(e.target.dataset.id);
                // adding delete method
            } else if (e.target.classList.contains('deleteButton')) {
                const jobId = e.target.dataset.id;
                deleteJob(jobId);
                // } else if (e.target === logoff) {
                //     showLoginRegister();
                // }
                //  Logoff doesn’t work right at present, but this can be corrected in jobs.js with the following change:
            } else if (e.target === logoff) {
                setToken(null);

                message.textContent = 'You have been logged off.';

                jobsTable.replaceChildren([jobsTableHeader]);

                showLoginRegister();
            }
        }
    });
};

// There is a somewhat tricky part to this. We want to have edit and delete buttons for each row of the table. But, how do we associate an edit button with the edit operation, and when it is clicked, how do we know which entry is to be edited? This is done as follows. The edit buttons are given a class of "editButton", and similarly, the delete buttons are given a class of "deleteButton". We can also add an data-<something> attribute to the buttons. These are called data attributes and in Javascript they correspond to a DOM hash/object called dataset. By adding a data-id attribute to the elemnet, we can access it via the dataset.id property. We want to set that id to be the id of that job (or your custom object), as returned from the database.

// It looks like this in jobs.js:
export const showJobs = async () => {
    try {
        enableInput(false);

        const response = await fetch('/api/v1/jobs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        let children = [jobsTableHeader];

        if (response.status === 200) {
            if (data.count === 0) {
                jobsTable.replaceChildren(...children); // clear this for safety
            } else {
                for (let i = 0; i < data.jobs.length; i++) {
                    let rowEntry = document.createElement('tr');

                    let editButton = `<td><button type="button" class="editButton" data-id=${data.jobs[i]._id}>edit</button></td>`;
                    let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.jobs[i]._id}>delete</button></td>`;
                    let rowHTML = `
            <td>${data.jobs[i].company}</td>
            <td>${data.jobs[i].position}</td>
            <td>${data.jobs[i].status}</td>
            <div>${editButton}${deleteButton}</div>`;

                    rowEntry.innerHTML = rowHTML;
                    children.push(rowEntry);
                }
                jobsTable.replaceChildren(...children);
            }
        } else {
            message.textContent = data.msg;
        }
    } catch (err) {
        console.log(err);
        message.textContent = 'A communication error occurred.';
    }
    enableInput(true);
    setDiv(jobsDiv);
};
// So, plug this code into jobs.js at the appropriate point, and then try the application again. You should now be able to see the entries for each job.

// export const showJobs = async () => {
//     setDiv(jobsDiv);
// };
