import Testemailtemplate from "@/EmailTemplates/testTemplate";
import { resend } from "@/libs/resend";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vikramsamak02@gmail.com",
      subject: "Hello World",
      react: <Testemailtemplate />,
    });
    return NextResponse.json({ sucess: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
