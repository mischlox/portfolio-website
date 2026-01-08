import os
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv
load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=os.getenv("MAIL_STARTTLS", "True").lower() == "true",
    MAIL_SSL_TLS=os.getenv("MAIL_SSL_TLS", "False").lower() == "true",
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)
MAIL_TO = os.getenv("MAIL_TO")

router = APIRouter()

class ContactFormRequest(BaseModel):
    name: str = Field(..., max_length=100)
    email: EmailStr = Field(..., max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)


@router.post("/submit-contact", status_code=status.HTTP_200_OK)
async def submit_contact(request: ContactFormRequest):
    """Handles the contact form submission by sending the main email."""
    print("START EMAIL HANDLING")
    if not MAIL_TO or not conf.MAIL_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Email service configuration is missing."
        )

    fm = FastMail(conf)
    
    try:
        owner_email_body = f"""
New Contact Form Submission:

Name: {request.name}
Email: {request.email}

Message:
{request.message}
"""
        owner_message = MessageSchema(
            subject=f"Portfolio Inquiry from {request.name}",
            recipients=[MAIL_TO], 
            body=owner_email_body,
            subtype=MessageType.plain,
            reply_to=[request.email] 
        )
        await fm.send_message(owner_message)

        confirmation_email_body = f"""
Dear {request.name},

Thank you for reaching out! I have successfully received your message and will respond to your inquiry as soon as possible.

Best regards,
Michael Schlosser

***
Disclaimer: This is an automated confirmation of your contact form submission to Michael Schlosser's portfolio. If you received this email in error and did not submit a contact form, please ignore this message.
"""
        confirmation_message = MessageSchema(
            subject="Confirmation: Your Inquiry has been received",
            recipients=[request.email],
            body=confirmation_email_body,
            subtype=MessageType.plain
        )
        await fm.send_message(confirmation_message)

        return {"message": "Emails sent successfully to owner and sender"}
        
    except Exception as e:
        print(f"ERROR SENDING EMAIL: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send email. Please try again later."
        )