import React from 'react';
import DashboardCard from "./DashboardCard";

const DashboardList = () => {
    return (
        <div className="card-body ">
            <DashboardCard title="Bible Teachings"/>
            <DashboardCard title="Posts"/>
            <DashboardCard title="Bible Verses"/>
            <DashboardCard title="Users"/>
        </div>
    );
};

export default DashboardList;