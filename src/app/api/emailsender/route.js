import { NextResponse } from "next/server";

import {
  BASE64_ENCODING,
  EMAIL_FAILED_RESPONSE,
  EMAIL_SUCCESS_RESPONSE,
  RESEND_API_URL,
  SENDER_EMAIL,
} from "@/helpers/constants";
import { arrayBufferToBase64 } from "@/helpers/helperFunctions";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const reqBody = await req.formData();

  const emailTo = reqBody.get("emailTo");
  const emailCc = reqBody.get("emailCc");
  const emailBcc = reqBody.get("emailBcc");
  const emailSubject = reqBody.get("emailSubject");
  const emailText = reqBody.get("emailText");
  const emailAttachments = reqBody.getAll("emailAttachments");

  const emailbody = {
    from: SENDER_EMAIL,
    to: emailTo,
    subject: emailSubject,
    text: emailText,
  };

  if (emailBcc.trim() !== "") {
    emailbody.bcc = emailBcc;
  }

  if (emailCc.trim() !== "") {
    emailbody.cc = emailCc;
  }

  const attachments = [];
  if (emailAttachments) {
    for (const attachment of emailAttachments) {
      const { name, type } = attachment;
      const content = await attachment.arrayBuffer();

      const base64Content = arrayBufferToBase64(content);
      attachments.push({
        filename: name,
        content: base64Content,
        encoding: BASE64_ENCODING,
        type: type,
      });
    }
    emailbody.attachments = attachments;
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailbody),
    });

    if (res.ok) {
      return NextResponse.json({ msg: EMAIL_SUCCESS_RESPONSE });
    } else {
      return NextResponse.json({ error: EMAIL_FAILED_RESPONSE });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: EMAIL_FAILED_RESPONSE });
  }
}
