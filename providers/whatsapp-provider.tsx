"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import useDarkMode from "@/hooks/use-dark-mode";

const WhatsAppProvider = () => {
  const { isDark } = useDarkMode();
  return (
    <div>
      <FloatingWhatsApp
        accountName="Driplare"
        phoneNumber="+8801608331365"
        avatar="d-logo.png"
        chatMessage={"Hi there.\nLet's build a business."}
        placeholder="Let's talk."
        // darkMode={true}
        allowEsc={true}
        notificationDelay={5}
        notificationLoop={3}
      />
    </div>
  );
};

export default WhatsAppProvider;
