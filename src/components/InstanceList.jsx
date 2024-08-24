import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstanceList = () => {
    const [instances, setInstances] = useState([]);
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    // Fetch instances based on year and semester
    const fetchInstances = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/instances/${year}/${semester}`);
            setInstances(response.data);
        } catch (error) {
            console.error('Error fetching instances:', error);
        }
    };

    // Handle view instance
    const handleViewInstance = (instanceId) => {
        const instance = instances.find(inst => inst.id === instanceId);
        if (instance) {
            alert(`Instance Details:\nCourse: ${instance.course?.title || 'N/A'}\nYear: ${instance.year}\nSemester: ${instance.semester}`);
        } else {
            console.error('Instance not found');
        }
    };

    // Handle delete instance
    const handleDeleteInstance = async (instanceId) => {
        try {
            await axios.delete(`http://localhost:8081/api/instances/${instanceId}`);
            setInstances(instances.filter(inst => inst.id !== instanceId));
        } catch (error) {
            console.error('Error deleting instance:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-end mb-3">
                <div className="me-2">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input
                        type="text"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="me-2">
                    <label htmlFor="semester" className="form-label">Semester</label>
                    <input
                        type="text"
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="form-control"
                    />
                </div>
                
                <div>
                    <button onClick={fetchInstances} className="btn btn-primary" style={{ height: '2.4rem' }}>
                        List Instances
                    </button>
                </div>
            </div>

            {instances.length > 0 && (
                <table className="course-list-btn">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Year-Sem</th>
                            <th>Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instances.map((instance) => (
                            <tr key={instance.id}>
                                <td>{instance.course?.title || 'N/A'}</td>
                                <td>{instance.year} - Semester {instance.semester}</td>
                                <td>{instance.course?.code || 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleViewInstance(instance.id)} className="btn btn-primary">View</button>
                                    <button onClick={() => handleDeleteInstance(instance.id)} className="btn btn-primary">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default InstanceList;
