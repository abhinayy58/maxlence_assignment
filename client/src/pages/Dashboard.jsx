import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/authUtils";
import api from "../utils/api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      setError("Failed to load dashboard data");
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <div className="user-menu">
            <div className="user-info">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="user-avatar"
              />
              <span className="user-name">
                Welcome, {user?.name || user?.email}
              </span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={fetchDashboardData}>Retry</button>
          </div>
        )}

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">
                {dashboardData?.stats?.totalUsers || 0}
              </p>
            </div>
            <div className="stat-card">
              <h3>Active Sessions</h3>
              <p className="stat-number">
                {dashboardData?.stats?.activeSessions || 0}
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-number">
                ${dashboardData?.stats?.totalRevenue || 0}
              </p>
            </div>
            <div className="stat-card">
              <h3>New Orders</h3>
              <p className="stat-number">
                {dashboardData?.stats?.newOrders || 0}
              </p>
            </div>
          </div>
        </section>

        <section className="actions-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn primary">Create New Project</button>
            <button className="action-btn secondary">View Reports</button>
            <button className="action-btn secondary">Manage Users</button>
            <button className="action-btn secondary">Settings</button>
          </div>
        </section>

        <section className="activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {dashboardData?.recentActivity?.length > 0 ? (
              dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    <span>{activity.type === "login" ? "🔐" : "📊"}</span>
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.description}</p>
                    <span className="activity-time">{activity.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activity">No recent activity</p>
            )}
          </div>
        </section>
        <section className="profile-section">
          <h2>Profile Summary</h2>
          <div className="profile-card">
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {user?.name || "Not provided"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Role:</strong> {user?.role || "User"}
              </p>
              <p>
                <strong>Last Login:</strong> {user?.lastLogin || "N/A"}
              </p>
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
