import { NextResponse } from "next/server";

import {
  EMAIL_FAILED_RESPONSE,
  EMAIL_SUCCESS_RESPONSE,
} from "@/helpers/constants";

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

  try {
    const emailbody = {
      from: process.env.SENDER_EMAIL,
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
        const { name } = attachment;
        const content = await attachment.arrayBuffer();
        attachments.push({ name, content });
      }
      emailbody.attachments = attachments;
    }

    const res = await fetch(process.env.API_URL, {
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
      console.log(res);
      return NextResponse.json({ error: EMAIL_FAILED_RESPONSE });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
