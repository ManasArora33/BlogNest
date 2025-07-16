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
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router/router"));
const db_1 = require("./db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use('/api/v1', router_1.default);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
function shutdown(signal) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Received signal ${signal}. Closing server & disconnecting from DB...`);
        server.close((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error('Error during server close:', err);
                process.exit(1);
            }
            yield db_1.prisma.$disconnect();
            console.log('✅ Prisma disconnected, server shut down gracefully.');
            process.exit(0);
        }));
        // Force shutdown after a timeout (e.g., 10s)
        setTimeout(() => {
            console.error('🔶 Forced shutdown due to timeout');
            process.exit(1);
        }, 10000);
    });
}
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => {
    process.on(sig, () => shutdown(sig));
});
