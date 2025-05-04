import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "a2043332eb5ce6f21d8b518ebef572ee";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
  secretKey: "vISGrcq4-EYmLtqlZxA4EldTVhtou8DkVIE4wsjTUxFG1_plZ5586aETylPpXgTQmxsUZ_qFkX2aHcwX1wjbOw"
});
