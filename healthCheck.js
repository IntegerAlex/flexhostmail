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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const HEALTH_CHECK_URL = "http://localhost:9543/health";
function checkHealth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(HEALTH_CHECK_URL);
            if (response.status === 200 && response.data === 'OK') {
                console.log("Health check successful!");
            }
            else {
                console.error("Health check failed!");
                process.exit(1);
            }
        }
        catch (error) {
            console.error("Health check failed due to error:", error);
            process.exit(1);
        }
    });
}
checkHealth();
