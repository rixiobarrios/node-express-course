// You will need to create loginRegister.js, register.js, login.js, jobs.js, and addEdit.js files, all in the public directory.

// The addEdit.js module is as follows:

import { enableInput, inputEnabled, message, setDiv, token } from './index.js';
import { showJobs } from './jobs.js';

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let addingJob = null;
// adding delete method
let deletingJob = null;

export const handleAddEdit = () => {
    addEditDiv = document.getElementById('edit-job');
    company = document.getElementById('company');
    position = document.getElementById('position');
    status = document.getElementById('status');
    addingJob = document.getElementById('adding-job');
    // adding delete method
    deletingJob = document.getElementById('deleting-job');
    const editCancel = document.getElementById('edit-cancel');

    // addEditDiv.addEventListener('click', (e) => {
    //     if (inputEnabled && e.target.nodeName === 'BUTTON') {
    //         if (e.target === addingJob) {
    //             showJobs();
    //         } else if (e.target === editCancel) {
    //             showJobs();
    //         }
    //     }
    // });

    // Next we need to make the changes so that we can create job entries. The addEdit.js module is changed as follows:

    addEditDiv.addEventListener('click', async (e) => {
        if (inputEnabled && e.target.nodeName === 'BUTTON') {
            if (e.target === addingJob) {
                enableInput(false);

                let method = 'POST';
                let url = '/api/v1/jobs';
                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            company: company.value,
                            position: position.value,
                            status: status.value,
                        }),
                    });

                    const data = await response.json();
                    if (response.status === 201) {
                        // 201 indicates a successful create
                        message.textContent = 'The job entry was created.';

                        company.value = '';
                        position.value = '';
                        status.value = 'pending';

                        showJobs();
                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.log(err);
                    message.textContent = 'A communication error occurred.';
                }

                enableInput(true);
            } else if (e.target === editCancel) {
                message.textContent = '';
                showJobs();
            }
            // So far, so good, but what happens when the user clicks on the update button? In this case, we need to do a PATCH instead of a POST, and we need to include the id of the entry to be updated in the URL. So we need the following additional changes to addEdit.js:
            if (e.target === addingJob) {
                enableInput(false);

                let method = 'POST';
                let url = '/api/v1/jobs';

                if (addingJob.textContent === 'update') {
                    method = 'PATCH';
                    url = `/api/v1/jobs/${addEditDiv.dataset.id}`;
                }

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            company: company.value,
                            position: position.value,
                            status: status.value,
                        }),
                    });

                    const data = await response.json();
                    if (response.status === 200 || response.status === 201) {
                        if (response.status === 200) {
                            // a 200 is expected for a successful update
                            message.textContent = 'The job entry was updated.';
                        } else {
                            // a 201 is expected for a successful create
                            message.textContent = 'The job entry was created.';
                        }

                        company.value = '';
                        position.value = '';
                        status.value = 'pending';
                        showJobs();
                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.log(err);
                    message.textContent = 'A communication error occurred.';
                }
                enableInput(true);
            }
            // Make these changes, and editing jobs should work. Make sure that adding a new job still work correctly.
            // adding delete method
            if (e.target === deletingJob) {
                enableInput(false);
                const jobId = addEditDiv.dataset.id;

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

                enableInput(true);
            }
        }
    });
};

// export const showAddEdit = (job) => {
//     message.textContent = '';
//     setDiv(addEditDiv);
// };

// The dataset.id contains the id of the entry to be edited. That is then passed on to the showAddEdit function. So we need to change that function to do something with this parameter.

// This function is in addEdit.js, and should be changed as follows:

export const showAddEdit = async (jobId) => {
    if (!jobId) {
        company.value = '';
        position.value = '';
        status.value = 'pending';
        addingJob.textContent = 'add';
        message.textContent = '';

        setDiv(addEditDiv);
    } else {
        enableInput(false);

        try {
            const response = await fetch(`/api/v1/jobs/${jobId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.status === 200) {
                company.value = data.job.company;
                position.value = data.job.position;
                status.value = data.job.status;
                addingJob.textContent = 'update';
                message.textContent = '';
                addEditDiv.dataset.id = jobId;

                setDiv(addEditDiv);
            } else {
                // might happen if the list has been updated since last display
                message.textContent = 'The jobs entry was not found';
                showJobs();
            }
        } catch (err) {
            console.log(err);
            message.textContent = 'A communications error has occurred.';
            showJobs();
        }

        enableInput(true);
    }
};

// With this change, the add/edit div will be displayed with the appropriate values. If an add is being done, the function is called with a null parameter, and the form comes up blank with an add button. If an edit is being done, the function is called with the id of the entry to edit. The job is then retrieved from the database and the input fields are populated, and the button is changed to say update. We also store the id of the entry in the dataset.id of the addEdit div, so we keep track of which entry is to be updated.
