import React, { useEffect, useState } from 'react';
import axios from "axios";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import './index.scss';

// API GET Route
// http://localhost:3001/api/v1/users/jobs;

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [openedJob, setOpenedJob] = useState('');
    const [error, setError] = useState('');

    const onFetchJobsHandler = async () => {
        const response = await axios.get('api/v1/users/jobs');
        if (response.status === 200) {
            return response.data;
        }
        return response;
    };

    useEffect(() => {
        onFetchJobsHandler()
            .then((res) => setJobs(res))
            .catch((e) => setError(e.message));
    }, []);

    const onOpenJobHandler = (jobName) => {
        setOpenedJob(jobName);
    };

    const onCloseJobHandler = () => {
        setOpenedJob('');
    };

    const Job = ({ job }) => {
        return (
            <div className="job-container">
                <div className="job-container__job">
                    <div className="job-container__job__title-container">
                        <div className="job-container__job__title-container__title-main">
                            <span className="job-container__job__title-container__title-main__title">{job.name}</span>
                            {openedJob === job.name ? <span onClick={onCloseJobHandler}><KeyboardArrowUpIcon /></span> : <span onClick={() => onOpenJobHandler(job.name)}><KeyboardArrowDownIcon /></span>}
                        </div>
                        <div className="job-container__job__title-container__title-main">
                            <span>{job.location}</span>
                            <span>{job.department}</span>
                        </div>
                    </div>
                    <div className="job-container__job__title-container">
                        <button className="job-container__job__title-container__apply-btn">Apply</button>
                    </div>
                </div>
                {openedJob === job.name && (
                    <div className="job-container__description">
                        {job.description}
                    </div>
                )}
            </div>
        );
    };

    if (error) {
        return (
            <span className="error-msg">{error}</span>
        );
    }

    return (
        <div className="jobs">
            {jobs.length > 0 ? jobs.map((job) => (<Job job={job} />)) : <span>No open jobs</span>}
        </div>
    );
}

export default Jobs;
