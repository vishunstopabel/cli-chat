import { checkAuthenticated } from "./utils/auth.js";
import { showBanner } from "./utils/banner.js";
// console.clear();
const args = process.argv[2];
showBanner();
await checkAuthenticated();
