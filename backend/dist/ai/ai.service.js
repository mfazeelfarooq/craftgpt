"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
const cache_manager_2 = require("cache-manager");
let AiService = class AiService {
    configService;
    cacheManager;
    openai;
    constructor(configService, cacheManager) {
        this.configService = configService;
        this.cacheManager = cacheManager;
        this.openai = new openai_1.default({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }
    async grammarCorrect(text) {
        const cacheKey = `grammar:${text}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a grammar correction assistant. Correct the given text.' },
                { role: 'user', content: text },
            ],
            max_tokens: 100,
        });
        const correctedText = response.choices[0].message.content?.trim() ?? text;
        await this.cacheManager.set(cacheKey, correctedText);
        return correctedText;
    }
    async suggestQuickReplies(context) {
        const cacheKey = `replies:${JSON.stringify(context)}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You provide short, relevant quick-reply suggestions for a chat conversation. Provide 3 options as a JSON array of strings.' },
                ...context
            ],
            max_tokens: 150,
        });
        const replyText = response.choices[0].message.content ?? '[]';
        try {
            const replies = JSON.parse(replyText);
            await this.cacheManager.set(cacheKey, replies);
            return replies;
        }
        catch {
            return [];
        }
    }
    async summarizeConversation(messages) {
        const content = messages.map(m => m.content).join('\n');
        const cacheKey = `summary:${content}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a conversation summarizer. Provide a 2-3 sentence summary of the following messages.' },
                { role: 'user', content: content },
            ],
            max_tokens: 200,
        });
        const summary = response.choices[0].message.content?.trim() ?? 'No summary available.';
        await this.cacheManager.set(cacheKey, summary);
        return summary;
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _b : Object])
], AiService);
//# sourceMappingURL=ai.service.js.map