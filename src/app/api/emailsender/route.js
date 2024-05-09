import { getIndianTime } from "@/helpers/getIndianTime";
import { resend } from "@/libs/resend";
import emailjs from "@emailjs/nodejs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@vikramsamak.com",
      to: ["vikramsamak02@gmail.com"],
      subject: "Hello world",
      text: `This is system generated mail sent by cronjob-next app. Current Time: ${getIndianTime(
        new Date()
      )} Current Env ${process.env.NODE_ENV}`,
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
