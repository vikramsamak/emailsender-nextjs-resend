import TailwindWrapper from "@/components/TailwindWrapper";
import { Container, Button, Text } from "@react-email/components";

export default function Testemailtemplate() {
  return (
    <TailwindWrapper>
      <Container className="flex justify-center items-center">
        <Text>This is system generated mail sent by cronjob-next app.</Text>
      </Container>
    </TailwindWrapper>
  );
}
