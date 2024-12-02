import React, { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './Components/auth/LoginPage';
import LoadingPage from './Components/auth/LoadingPage';
import ErrorPage from './Components/auth/ErrorPage';
import Dashboard from './Screens/Dashboard';
import CreateTrip from './Screens/CreateTrip/CreateTrip';
import MyTrips from './Screens/MyTrips/Overview';
import Help from './Screens/Help';
import EditTrip from './Screens/MyTrips/EditTrip'; // Import EditTrip component

function App() {
    const auth = useAuth();
    const [selectedPage, setSelectedPage] = useState("Dashboard");
    const [selectedTripId, setSelectedTripId] = useState(null);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const userEmail = auth.user?.profile.email;
                const response = await fetch(
                    `https://olt95t35ea.execute-api.us-east-1.amazonaws.com/dev/gettrips?email=${encodeURIComponent(userEmail)}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTrips(data.data || []);
            } catch (error) {
                console.error('Error fetching trips:', error);
                setTrips([]);
            }
        };

        if (auth.user) {
            fetchTrips();
        }
    }, [auth.user]);

    const renderContent = () => {
        switch (selectedPage) {
            case "Create a Trip":
                return (
                    <CreateTrip
                        setSelectedPage={setSelectedPage}
                        tripData={selectedTripId ? trips.find((trip) => trip.id === selectedTripId) : null}
                        isEditing={Boolean(selectedTripId)}
                    />
                );
            case "Edit Trip": // Add routing for EditTrip
                return (
                    <EditTrip
                        tripId={selectedTripId}
                        onBack={() => setSelectedPage("My Trips")} // Navigate back to My Trips
                    />
                );
            case "My Trips":
                return (
                    <MyTrips
                        setSelectedPage={setSelectedPage}
                        setSelectedTripId={setSelectedTripId}
                    />
                );
            case "Help":
                return <Help />;
            default:
                return <Dashboard />;
        }
    };

    const handleSignOut = async () => {
        await auth.removeUser();
        const cognitoDomain = "https://us-east-1mpeeh4bud.auth.us-east-1.amazoncognito.com";
        const clientId = "6ihgv04tth5if17o08l7liq1co";
        const logoutUri = "http://localhost:3000";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <LoadingPage />;
    }

    if (auth.error) {
        return <ErrorPage error={auth.error} />;
    }

    if (!auth.isAuthenticated) {
        return <LoginPage onLogin={() => auth.signinRedirect()} />;
    }

    return (
        <DashboardLayout
            userName={auth.user?.profile.name}
            onSignOut={handleSignOut}
            selectedPage={selectedPage}
            onPageSelect={setSelectedPage}
        >
            {renderContent()}
        </DashboardLayout>
    );
}

export default App;
