import { useState } from "react";
import AlertModal from "./AlertModal";
import { useAuth } from "../contexts/authContext";

const SubscriptionGuard = ({ children }) => {
    const { userData } = useAuth();
    const [showPopup, setShowPopup] = useState(!userData.isSubscribed);


    if (!userData.isSubscribed && showPopup) {
        return <AlertModal />;
    }

    return <>{children}</>;
};

export default SubscriptionGuard;
