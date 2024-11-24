import React, { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { authStatus } = useAuthenticator((context) => [context.authStatus, context.user]);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === "authenticated") {
            navigate("/");
            window.location.reload();  
        }
    }, [authStatus, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
                <Authenticator />
            </div>
        </div>
    );
}

export default LoginPage;
