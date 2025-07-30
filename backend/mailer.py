import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(subject: str, body_html: str, to_email: str):
    from_email = "reporter@tondomaine.com"
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    password = "TON_MDP"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email

    html_part = MIMEText(body_html, "html")
    msg.attach(html_part)

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(from_email, password)
            server.sendmail(from_email, to_email, msg.as_string())
        print("✅ E-mail envoyé")
    except Exception as e:
        print(f"❌ Erreur d'envoi : {e}")
