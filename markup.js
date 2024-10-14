"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markup = void 0;
class markup {
    constructor() {
    }
    FileCaption(file) {
        return `<b><u>File Name:</u> ${file.fileName}\n\n<u>File Size:</u> ${file.fileSize}\n\n<u>These File WIll be deleted in 1 Min to keep it Permanent forward to Any Other Chat !</u></b>`;
    }
    introReplyMarkup(botName, publicChannelName) {
        return [
            [{ text: 'Add to Group', url: `http://t.me/${botName}?startgroup=true` }],
            [{ text: 'Update', url: `https://t.me/${publicChannelName}` }, { text: 'Premium', callbackData: 'planIntro' }]
        ];
    }
    bannedReplyMarkup(paymentScreenshotId) {
        return [
            [{ text: 'Admin..', url: paymentScreenshotId }]
        ];
    }
    myPlanReplyMarkup() {
        return [
            [{ text: "Get Free Trial", callbackData: 'freePlan' }],
            [{ text: "Premium Plans", callbackData: 'showPlans' }],
            [{ text: "Close", callbackData: "delte" }]
        ];
    }
    forceSubReplyMarkup(forceSubUrl) {
        return [
            [{ text: "JOIN HERE !", url: forceSubUrl }]
        ];
    }
    contactAdminReplyMarkup(contactAdminUrl) {
        return [
            [{ text: 'MSG Admin !', url: contactAdminUrl }]
        ];
    }
    newMemberReplyMarkup(publicChannelName, paymentScreenshotId, updatesChannel = 'https://t.me/MachiXhubBot') {
        return [
            [{ text: 'Support Group', url: `${publicChannelName}` }, { text: 'Updates Channel', url: updatesChannel }],
            [{ text: 'Bot Owner', url: `${paymentScreenshotId}` }]
        ];
    }
    planStartReplyMarkup() {
        return [
            [{ text: ' > Premium Plans', callbackData: 'showPlans' }],
            [{ text: ' > Check Benefits', callbackData: 'showBenefits' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ];
    }
    paymentMethodReplyMarkup() {
        return [
            [{ text: ' Pay on UPI', callbackData: 'upi' }],
            [{ text: ' Scan QR Code', callbackData: 'qr' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ];
    }
    planPriceReplyMarkup(paymentScreenshotId) {
        return [
            [{ text: `1 Week: 19 Rs`, callbackData: 'plans/1 week/19' }, { text: `1 Month: 59 Rs`, callbackData: 'plans/1 month/59' }],
            [{ text: `6 Month: 399 Rs`, callbackData: 'plans/6 month/399' }, { text: `1 Year: 600 Rs`, callbackData: 'plans/1 year/600' }],
            [{ text: 'Get Help', url: paymentScreenshotId }],
            [{ text: 'Close X', callbackData: `delete` }]
        ];
    }
    upiReplyMarkup(paymentScreenshotId) {
        return [
            [{ text: 'Send Screenshot <=', url: paymentScreenshotId }],
            [{ text: '=> Get QR Code ', callbackData: 'qr' }, { text: 'Change Premium Plans', callbackData: 'showPlans' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ];
    }
    qrReplyMarkup(paymentScreenshotId) {
        return [
            [{ text: 'Send Screenshot <=', url: paymentScreenshotId }],
            [{ text: '=> Get UPI Code ', callbackData: 'upi' }, { text: 'Change Premium Plans', callbackData: 'showPlans' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ];
    }
    groupJoinerReplyMarkup(paymentScreenshotId) {
        return [
            [{ text: 'Support Group', url: paymentScreenshotId }, { text: 'Updates Channel', url: paymentScreenshotId }],
            [{ text: 'Bot Owner', url: paymentScreenshotId }]
        ];
    }
}
exports.Markup = new markup();
