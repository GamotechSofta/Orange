import { createContext, useCallback, useContext, useMemo, useState } from "react";
import GetInTouchModal from "../components/GetInTouchModal.jsx";
import { getWeb3ApisKey, getWeb3ContactKey, getWeb3GamesKey } from "../lib/web3forms.js";

const Web3ContactModalContext = createContext(null);

export function Web3ContactModalProvider({ children }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [apisOpen, setApisOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);

  const contactKey = getWeb3ContactKey();
  const apisKey = getWeb3ApisKey();
  const gamesKey = getWeb3GamesKey();

  const openContactModal = useCallback(() => setContactOpen(true), []);
  const openApisModal = useCallback(() => setApisOpen(true), []);
  const openGamesModal = useCallback(() => setGamesOpen(true), []);

  const value = useMemo(
    () => ({ openContactModal, openApisModal, openGamesModal }),
    [openContactModal, openApisModal, openGamesModal]
  );

  return (
    <Web3ContactModalContext.Provider value={value}>
      {children}
      <GetInTouchModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        accessKey={contactKey}
        title="Get in touch"
        description="Share your details and we'll respond as soon as possible."
        subject="Header — Get in touch"
        variant="contact"
      />
      <GetInTouchModal
        isOpen={apisOpen}
        onClose={() => setApisOpen(false)}
        accessKey={apisKey}
        title="Get in touch"
        description="Tell us about your API integration — we'll follow up shortly."
        subject="APIs — Get in touch"
        variant="cta"
      />
      <GetInTouchModal
        isOpen={gamesOpen}
        onClose={() => setGamesOpen(false)}
        accessKey={gamesKey}
        title="Get in touch"
        description="Tell us about your game or platform needs — we'll follow up shortly."
        subject="Games — Get in touch"
        variant="cta"
      />
    </Web3ContactModalContext.Provider>
  );
}

export function useWeb3ContactModals() {
  const ctx = useContext(Web3ContactModalContext);
  if (!ctx) {
    throw new Error("useWeb3ContactModals must be used within Web3ContactModalProvider");
  }
  return ctx;
}
