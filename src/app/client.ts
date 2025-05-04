import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "ae4cde6975cdca6c9621f37235a65219";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
  secretKey: "OwEUwlcf5RwrcCjgdWqRz0dMMoIk94gS4VXCUNyZWrPgXgVPd4pwDJL0BZX3Mn7qOBr6ehT4acWcVf9jcvOnyQ"
});
