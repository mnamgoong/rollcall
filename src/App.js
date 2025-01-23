import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './Screens/Dashboard';
import CreateTrip from './Screens/CreateTrip/CreateTrip';
import MyTrips from './Screens/MyTrips/Overview';
import Help from './Screens/Help';
import EditTrip from './Screens/EditTrips/EditTrip'; // Import EditTrip component
import { fetchUserAttributes } from 'aws-amplify/auth';

function App({ signOut, user }) {
    const [selectedPage, setSelectedPage] = useState("Dashboard");
    const [selectedTripId, setSelectedTripId] = useState(null);
    const [trips, setTrips] = useState([]);
    const [userAttributes, setUserAttributes] = useState(null); // State to store user attributes

    // Fetch user attributes on component mount or when the user object changes
    useEffect(() => {
        const handleFetchUserAttributes = async () => {
            try {
                const attributes = await fetchUserAttributes();
                setUserAttributes(attributes); // Store the attributes in state
                console.log("User Attributes:", attributes); // Debug log
            } catch (error) {
                console.error("Error fetching user attributes:", error);
            }
        };

        handleFetchUserAttributes();
    }, [user]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const userEmail = userAttributes?.email; // Use the fetched email from userAttributes
                if (!userEmail) {
                    console.error("User email not available.");
                    return;
                }

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

        if (userAttributes) {
            fetchTrips();
        }
    }, [userAttributes]);

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

    return (
        <DashboardLayout
            userName={userAttributes?.name || "Loading..."} // Display name from userAttributes
            onSignOut={signOut}
            selectedPage={selectedPage}
            onPageSelect={setSelectedPage}
        >
            {renderContent()}
        </DashboardLayout>
    );
}

export default withAuthenticator(App);
