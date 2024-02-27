"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Purpose: This file is used to check the health of the FHM server by sending a request to the health endpoint.
const index_1 = require("./index");
const HEALTH_CHECK_URL = "http://localhost:9543/health";
(0, index_1.startFHM)();
function checkHealth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Attempting health check...");
            const response = yield fetch(HEALTH_CHECK_URL, { method: 'GET' });
            if (response.status === 200 && response.statusText === 'OK') {
                console.log("Health check successful!");
                process.exit(0);
            }
            else {
                console.error("Health check failed! Unexpected response:", response.status, response.statusText);
                process.exit(1);
            }
        }
        catch (error) {
            console.error("Health check failed due to error:", error);
            process.exit(1);
        }
    });
}
// The following line should be removed to avoid an undefined 'exit' error.
// exit(0);
setTimeout(checkHealth, 10000);
//   checkHealth();
