import { NextResponse } from "next/server";

import {
  EMAIL_FAILED_RESPONSE,
  EMAIL_SUCCESS_RESPONSE,
  RESEND_API_URL,
} from "@/helpers/constants";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const reqBody = await req.json();
  const { emailTo, emailCc, emailBcc, emailSubject, emailText } = reqBody;

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
      return NextResponse.json({ error: EMAIL_FAILED_RESPONSE });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
