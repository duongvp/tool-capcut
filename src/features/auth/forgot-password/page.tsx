import { useState } from "react"
import ForgotPasswordForm from "./components/ForgotPasswordForm"
import OTPVerification from "./components/OTPVerification"

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');


    const handleLoginBack = () => {
        // Navigate back to login page
    }

    return (
        <>
            {step === 1 && (
                <ForgotPasswordForm setStep={setStep} setEmail={setEmail} handleLoginBack={handleLoginBack} />
            )}
            {step === 2 && (
                <OTPVerification
                    email={email}
                    setStep={setStep}
                    handleLoginBack={handleLoginBack}
                    setResetToken={() => { }}
                />
            )}
            {/* {step === 3 && (
                <OTPVerification
                    email={email}
                    setStep={setStep}
                    handleLoginBack={handleLoginBack}
                    setResetToken={() => { }}
                />
            )} */}
        </>
    )
}