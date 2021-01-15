import React from 'react';
import moment from 'moment';
import axios from 'axios';

const Task = ({task, index, openModal, getUserTasks}) => {
  let id, taskname, tasklabel, assignee, tags, startdate, enddate, status, details;
  
  if (task) {
    ({ id, taskname, tasklabel, assignee, tags, startdate, enddate, status, details } = task);
  }


  const renderStatusLabel = () => {
    return status === "in-progress"
      ? 'In Progress' 
      : (status === 'complete'
        ? 'Complete'
        : 'Not Stared'
      )
  };

  const completeTask = () => {
    axios.post('/api/post/statusUpdate', {id, status: 'complete'})
    .then(response => {
      getUserTasks()
    })
  }

  const uncompleteTask = () => {
    axios.post('/api/post/statusUpdate', {id, status: 'in-progress'})
    .then(response => {
      getUserTasks()
    })
  }

  return (
    <>
      <div className="Task">
        <div className={`complete-button ${status === 'complete' ? 'completed' : ''}`} onClick={() => {
          if (status === 'complete') {
            uncompleteTask();
          } else {
            completeTask();
          }
        }}>
          {status === 'complete'
            ? <i class="fas fa-check"></i>
            : null}
        </div>
        <div className="task-name column">
          <span className="label">{tasklabel}</span>
          <div className="details" onClick={() => openModal(id)}>
            <span className="label">Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className="assignee column">
          <span className="label">{assignee}</span>
        </div>
        <div className="tags column">
          <span className="label">{tags}</span>
        </div>
        <div className="date column">
          <span className="label">{moment(startdate, 'YYYY-MM-DD').format('MM/DD/YY')}</span>
        </div>
        <div className="date column">
          <span className="label">{moment(enddate, 'YYYY-MM-DD').format('MM/DD/YY')}</span>
        </div>
        <div className="status column">
          <span className="label">{renderStatusLabel()}</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Task;
