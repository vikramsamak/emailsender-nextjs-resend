import TailwindWrapper from "@/components/TailwindWrapper";
import { getIndianTime } from "@/helpers/getIndianTime";
import { Container, Text } from "@react-email/components";

export default function Testemailtemplate() {
  const currentTime = getIndianTime(new Date());

  return (
    <TailwindWrapper>
      <Container className="flex flex-col justify-center items-center">
        <Text>This is system generated mail sent by cronjob-next app.</Text>
        <Text>Current Hour: {new Date(currentTime).toLocaleTimeString()}</Text>
        <Text>Current Env {process.env.NODE_ENV}</Text>
      </Container>
    </TailwindWrapper>
  );
}
