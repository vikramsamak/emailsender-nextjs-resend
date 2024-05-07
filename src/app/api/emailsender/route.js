import { getIndianTime } from "@/helpers/getIndianTime";
import emailjs from "@emailjs/nodejs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const templateParams = {
      emailtext: `This is system generated mail sent by cronjob-next app. Current Time: ${getIndianTime(
        new Date()
      )} Current Env ${process.env.NODE_ENV}`,
    };

    try {
      const emailRes = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }
      );

      if (emailRes.status === 200) {
        return NextResponse.json({ msg: "Email sucessfully sent" });
      } else {
        return NextResponse.json({ error: "Failed to send email" });
      }
    } catch (err) {
      console.log("EMAILJS FAILED...", err);
      return NextResponse.json({ error: "Failed to send email" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
