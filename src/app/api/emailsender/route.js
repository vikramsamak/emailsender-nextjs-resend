import { resend } from "@/libs/resend";
import { NextResponse } from "next/server";
import moment from "moment-timezone";

export async function GET() {
  const indianTime = moment().tz("Asia/Kolkata");

  const indianformattedDate = indianTime.format("DD MM YYYY");

  const indianformattedTime = indianTime.format("hh mm ss a");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.SENDER_EMAIL,
        to: [process.env.RECEIVER_EMAIL],
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
