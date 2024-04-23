import { Tailwind } from "@react-email/components";

export default function TailwindWrapper({ children }) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      {children}
    </Tailwind>
  );
}
