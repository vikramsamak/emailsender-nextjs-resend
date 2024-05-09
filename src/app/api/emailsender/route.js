import { resend } from "@/libs/resend";
import { NextResponse } from "next/server";
import moment from "moment-timezone";

export async function GET() {
  const indianTime = moment().tz("Asia/Kolkata");

  const indianformattedDate = indianTime.format("DD MM YYYY");

  const indianformattedTime = indianTime.format("hh mm ss a");

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: [process.env.RECEIVER_EMAIL],
      subject: "Test",
      text: `This is system generated mail sent by cronjob-next app. Current Time: ${indianformattedDate} - ${indianformattedTime}. Current Env ${process.env.NODE_ENV}`,
    });

    if (data) {
      return NextResponse.json({ msg: "Email sent sucessfully." });
    }

    if (error) {
      return NextResponse.json({ error: "Failed to send email." });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
