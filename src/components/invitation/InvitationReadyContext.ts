import { createContext, useContext } from 'react';

export const InvitationReadyContext = createContext(false);
export const useInvitationReady = () => useContext(InvitationReadyContext);
