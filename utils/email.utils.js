import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Generates customized HTML for email verification or password reset.
 * @param {string} subject - The email subject
 * @param {string} actionLink - The verification or reset link
 * @returns {string} - HTML formatted email
 */
const generateHtml = (subject, actionLink) => {
  const heading1 = subject.includes("Verification")
    ? "Verify your Email"
    : "Reset Password";
  const heading2 = subject.includes("Verification")
    ? "to get access to dashboard"
    : "It happens to the best of us.";
  const message = subject.includes("Verification")
    ? "Thank you for registering! Please verify your email by clicking the button below:"
    : "It looks like you requested a password reset. Click the button below to reset your password:";

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]>-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t58{padding:0 0 22px!important}.t43,.t54,.t70,.t9{text-align:center!important}.t42,.t53,.t69,.t8{vertical-align:top!important;width:600px!important}.t6{border-top-left-radius:0!important;border-top-right-radius:0!important;padding:20px 30px!important}.t40{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important;padding:30px!important}.t78{mso-line-height-alt:20px!important;line-height:20px!important}.t3{width:44px!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;800&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id=body class=t81 style="min-width:100%;Margin:0px;padding:0px;background-color:#E0E0E0;"><div class=t80 style="background-color:#E0E0E0;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t79 style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#E0E0E0;" valign=top align=center>
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color=#E0E0E0/>
</v:background>
<![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center id=innerTable><tr><td align=center>
<table class=t61 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=566 class=t60 style="width:566px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t60 style="width:566px;">
<!--<![endif]-->
<table class=t59 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t58 style="padding:50px 10px 31px 10px;"><div class=t57 style="width:100%;text-align:center;"><div class=t56 style="display:inline-block;"><table class=t55 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t54><td></td><td class=t53 width=546 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t52 style="width:100%;"><tr><td class=t51 style="background-color:transparent;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t16 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=546 class=t15 style="width:600px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t15 style="width:600px;">
<!--<![endif]-->
<table class=t14 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t13><div class=t12 style="width:100%;text-align:center;"><div class=t11 style="display:inline-block;"><table class=t10 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t9><td></td><td class=t8 width=546 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t7 style="width:100%;"><tr><td class=t6 style="overflow:hidden;background-color:#64F5D6;padding:49px 50px 0 50px;border-radius:18px 18px 0 0;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=left>
<table class=t4 role=presentation cellpadding=0 cellspacing=0 style="Margin-right:auto;"><tr>
<!--[if mso]>
<td width=228 class=t3 style="width:228px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t3 style="width:228px;">
<!--<![endif]-->
<table class=t2 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t1><div style="font-size:0px;"></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t5 style="mso-line-height-rule:exactly;mso-line-height-alt:54px;line-height:54px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t50 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=546 class=t49 style="width:600px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t49 style="width:600px;">
<!--<![endif]-->
<table class=t48 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t47><div class=t46 style="width:100%;text-align:center;"><div class=t45 style="display:inline-block;"><table class=t44 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t43><td></td><td class=t42 width=546 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t41 style="width:100%;"><tr><td class=t40 style="overflow:hidden;background-color:#F8F8F8;padding:40px 50px 40px 50px;border-radius:0 0 18px 18px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=left>
<table class=t21 role=presentation cellpadding=0 cellspacing=0 style="Margin-right:auto;"><tr>
<!--[if mso]>
<td width=381 class=t20 style="width:381px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t20 style="width:381px;">
<!--<![endif]-->
<table class=t19 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t18><h1 class=t17 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:30px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${heading1}<br/>${heading2}</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t22 style="mso-line-height-rule:exactly;mso-line-height-alt:25px;line-height:25px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=left>
<table class=t27 role=presentation cellpadding=0 cellspacing=0 style="Margin-right:auto;"><tr>
<!--[if mso]>
<td width=446 class=t26 style="width:563px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t26 style="width:563px;">
<!--<![endif]-->
<table class=t25 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t24><p class=t23 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${message}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t28 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=left>
<table class=t33 role=presentation cellpadding=0 cellspacing=0 style="Margin-right:auto;"><tr>
<!--[if mso]>
<td width=234 class=t32 style="background-color:#12B491;overflow:hidden;width:234px;border-radius:40px 40px 40px 40px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t32 style="background-color:#12B491;overflow:hidden;width:234px;border-radius:40px 40px 40px 40px;">
<!--<![endif]-->
<table class=t31 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t30 style="text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;padding:0 30px 0 30px;"><a class=t29 href="${actionLink}" style="display:block;margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2.4px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target=_blank>${heading1}</a></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t34 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=left>
<table class=t39 role=presentation cellpadding=0 cellspacing=0 style="Margin-right:auto;"><tr>
<!--[if mso]>
<td width=446 class=t38 style="width:563px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t38 style="width:563px;">
<!--<![endif]-->
<table class=t37 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t36><p class=t35 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">If you have any questions or need further assistance, please do not hesitate to contact our support team by replying to this email or visiting our support page.</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t77 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=600 class=t76 style="width:600px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t76 style="width:600px;">
<!--<![endif]-->
<table class=t75 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t74><div class=t73 style="width:100%;text-align:center;"><div class=t72 style="display:inline-block;"><table class=t71 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t70><td></td><td class=t69 width=600 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t68 style="width:100%;"><tr><td class=t67 style="padding:0 50px 0 50px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t66 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width=420 class=t65 style="width:420px;">
<![endif]-->
<!--[if !mso]>-->
<td class=t65 style="width:420px;">
<!--<![endif]-->
<table class=t64 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t63><p class=t62 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">© 2025 Trusty Living. All Rights Reserved<br/></p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t78 style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>
`;
};

/**
 * Sends an email using SendGrid.
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} actionLink - Verification or reset link
 */
export const sendMail = async (to, subject, actionLink) => {
  const msg = {
    to: to,
    from: process.env.SENDGRID_EMAIL,
    subject: subject,
    text: `Click this link: ${actionLink}`,
    html: generateHtml(subject, actionLink),
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to} successfully.`);
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
  }
};

