import TailwindWrapper from "@/components/TailwindWrapper";
import { Container, Text } from "@react-email/components";

export default function Testemailtemplate() {
  const currentHour = new Date().getHours();

  return (
    <TailwindWrapper>
      <Container className="flex flex-col justify-center items-center">
        <Text>This is system generated mail sent by cronjob-next app.</Text>
        <Text>Current Hour: {currentHour}</Text>
      </Container>
    </TailwindWrapper>
  );
}
