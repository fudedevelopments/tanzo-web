import { useState, useEffect } from 'react';
import { Schema } from "../../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import outputs from "../../amplify_outputs.json";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../state/store";
import { isAdmin, notAdmin } from "../state/authdetails/AuthDetails";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

Amplify.configure(outputs);

const client = generateClient<Schema>();

function AdminLogin() {
    const dispatch = useDispatch();
    const authStatus = useSelector((state: RootState) => state.auth.isAuth);
    const authadmin = useSelector((state: RootState) => state.auth.isAdmin);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const fetchResponse = async () => {
        setLoading(true); // Start loading
        try {
            const response = await client.models.Admin.list();
            if (response.errors || !response.data) {
                dispatch(notAdmin());
            } else {
                dispatch(isAdmin());
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
            dispatch(notAdmin());
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (authStatus && !authadmin) {
            fetchResponse();
        }
    }, [authStatus, authadmin]);

    // Navigate when authadmin becomes true
    useEffect(() => {
        if (authadmin) {
            navigate("/admin-dashboard");
        }
    }, [authadmin, navigate]);

    if (!authStatus) {
        return (
            <div>
                <Authenticator />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="loading-indicator">
                <p>Loading...</p>
            </div>
        );
    }
    if (!authadmin) {
        return (
            <div>
               <h1>You Don’t have access to this page</h1>
            </div>
        )
    }

    return null;
}

export default AdminLogin;
