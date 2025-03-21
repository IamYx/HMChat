export const cmdMap = {
    '29_5': 'v2VoiceToText'
};
export const voiceToTextTag = {
    mimeType: 0,
    sampleRate: 1,
    voiceUrl: 2,
    duration: 3
};
export const cmdConfig = {
    v2VoiceToText: {
        sid: 29,
        cid: 5,
        service: 'messageService',
        params: [{ type: 'Property', name: 'tag', reflectMapper: voiceToTextTag }],
        response: [{ type: 'String', name: 'data' }]
    }
};
