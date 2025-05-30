import * as Brevo from "@getbrevo/brevo"

const apiInstance = new Brevo.TransactionalEmailsApi()
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)

const SENDER_EMAIL = process.env.SENDER_EMAIL!
const SENDER_NAME = process.env.SENDER_NAME!

export const sendOtpEmail = async (to : string, otpCode : string) => {
    const sendSmtpEmail = new Brevo.SendSmtpEmail()

    sendSmtpEmail.sender = {
        email : SENDER_EMAIL,
        name : SENDER_NAME
    }

    sendSmtpEmail.to = [
        {
            email : to 
        }
    ]

    sendSmtpEmail.subject = "Your OTP code for password reset"
    sendSmtpEmail.htmlContent = `<p>Your OTP code is <strong>${otpCode}</strong>. It is valid for 10 minutes.</p>`
    sendSmtpEmail.textContent = `Your OTP code is ${otpCode}. It is valid for 10 minutes`

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail)
        console.log(`OTP email sent to ${to}`)
    } catch (error) {
        console.error("Error sending OTP email:", error)
        throw new Error("Failed to send OTP email")
    }

}


export const sendVerificationEmail = async (to : string, verificationToken : string) => {
   const verificationLink = `http://localhost:7000/api/auth/verify-email?token=${verificationToken}`
   const sendSmtpEmail = new Brevo.SendSmtpEmail()

   sendSmtpEmail.sender = {
    email : SENDER_EMAIL,
    name : SENDER_NAME
   }

   sendSmtpEmail.to = [{
    email : to
   }]

   sendSmtpEmail.subject = "Verify your email address"
   sendSmtpEmail.htmlContent = `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`
   sendSmtpEmail.textContent = `Please verify your email by clicking the following link :${verificationLink}`

   try {
    await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log(`Verification email sent to ${to}`)
   } catch (error) {
    console.error("Error sending verification email:", error)
    throw new Error("Failed to send verification email")
   }
}