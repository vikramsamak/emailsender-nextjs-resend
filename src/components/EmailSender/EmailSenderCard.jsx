"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmailSendingForm from "./EmailSendingForm";

function EmailSenderCard() {
  return (
    <Card className="h-auto w-full">
      <CardHeader>
        <CardTitle className="font-mono font-semibold uppercase tracking-wide border-b p-2">
          New Email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EmailSendingForm />
      </CardContent>
    </Card>
  );
}

export default EmailSenderCard;
