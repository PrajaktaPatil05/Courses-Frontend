import React, { useState } from 'react';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    // Function to fetch courses from the backend
    const handleListCourses = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/courses');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div className="course-list">
            <button className="list-courses-btn" onClick={handleListCourses}>
                List courses
            </button>
            {courses.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Course Title</th>
                            <th>Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.title}</td> 
                                <td>{course.code}</td>
                                <td>
                                    <button>🔍</button>
                                    <button>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No courses available. Click "List courses" to load data.</p>
            )}
        </div>
    );
};

export default CourseList;
