import React from 'react';
import moment from 'moment';

const Task = ({task, index, openModal}) => {
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

  return (
    <div className={`Task ${index & 1 ? '' : 'gray'}`}>
      <div className="complete-button" onClick={() => console.log('👻'.repeat(20))}> {/* TODO add in completion functionality */}</div>
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
      <div className="start column">
        <span className="label">{moment(startdate, 'YYYY-MM-DD').format('MM/DD/YY')}</span>
      </div>
      <div className="end column">
        <span className="label">{moment(enddate, 'YYYY-MM-DD').format('MM/DD/YY')}</span>
      </div>
      <div className="status column">
        <span className="label">{renderStatusLabel()}</span>
      </div>
    </div>
  );
};

export default Task;
