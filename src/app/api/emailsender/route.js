import { NextResponse } from "next/server";
import moment from "moment-timezone";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const indianTime = moment().tz("Asia/Kolkata");

  const indianformattedDate = indianTime.format("DD MM YYYY");

  const indianformattedTime = indianTime.format("hh mm ss a");

  const reqBody = await req.json();
  const { to: emailto } = reqBody;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.SENDER_EMAIL,
        to: emailto,
        subject: "TEST",
        text: `This is system generated mail sent by cronjob-next app. Current Time: ${indianformattedDate} - ${indianformattedTime}. Current Env ${process.env.NODE_ENV}`,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ msg: "Email sent sucessfully." });
    } else {
      return NextResponse.json({ error: "Failed to send email." });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
