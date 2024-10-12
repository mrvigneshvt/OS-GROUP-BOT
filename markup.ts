class markup {
    constructor() {
    }

    public FileCaption(file: {
        _id: any
        fileName: string
        fileId: string,
        fileUniqueId: string,
        fileMimeType: string,
        fileSize: string,
        fileChannelName: string,
        fileChannelId: string,
        __v: any
    }) {
        return `<b>File Name: ${file.fileName}\n\nFile Size: ${file.fileSize}\n\nThese File WIll be deleted in 1 Min to keep it Permanent forward to Any Other Chat !</b>`
    }

    public introReplyMarkup(botName: string, publicChannelName: string) {
        return [
            [{ text: 'Add to Group', url: `http://t.me/${botName}?startgroup=true` }],
            [{ text: 'Update', url: `https://t.me/${publicChannelName}` }, { text: 'Premium', callbackData: 'planIntro' }]
        ]
    }

    public bannedReplyMarkup(paymentScreenshotId: string) {
        return [
            [{ text: 'Admin..', url: paymentScreenshotId }]
        ]
    }

    public myPlanReplyMarkup() {
        return [
            [{ text: "Get Free Trial", callbackData: 'freePlan' }],
            [{ text: "Premium Plans", callbackData: 'showPlans' }],
            [{ text: "Close", callbackData: "delte" }]

        ]
    }

    public forceSubReplyMarkup(forceSubUrl: string) {
        return [
            [{ text: "JOIN HERE !", url: forceSubUrl }]
        ]
    }

    public contactAdminReplyMarkup(contactAdminUrl: string) {
        return [
            [{ text: 'MSG Admin !', url: contactAdminUrl }]
        ]
    }

    public newMemberReplyMarkup(publicChannelName: string, paymentScreenshotId: string, updatesChannel: string = 'https://t.me/MachiXhubBot') {
        return [
            [{ text: 'Support Group', url: `https://t.me/${publicChannelName}` }, { text: 'Updates Channel', url: updatesChannel }],
            [{ text: 'Bot Owner', url: `${paymentScreenshotId}` }]
        ]
    }

    public planStartReplyMarkup() {
        return [
            [{ text: ' > Premium Plans', callbackData: 'showPlans' }],
            [{ text: ' > Check Benefits', callbackData: 'showBenefits' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ]
    }

    public paymentMethodReplyMarkup() {
        return [
            [{ text: ' Pay on UPI', callbackData: 'upi' }],
            [{ text: ' Scan QR Code', callbackData: 'qr' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ]
    }

    public planPriceReplyMarkup(paymentScreenshotId: string) {
        return [
            [{ text: `1 Week: 19 Rs`, callbackData: 'plans/1 week/19' }, { text: `1 Month: 59 Rs`, callbackData: 'plans/1 month/59' }],
            [{ text: `6 Month: 399 Rs`, callbackData: 'plans/6 month/399' }, { text: `1 Year: 600 Rs`, callbackData: 'plans/1 year/600' }],
            [{ text: 'Get Help', url: paymentScreenshotId }],
            [{ text: 'Close X', callbackData: `delete` }]
        ]
    }

    public upiReplyMarkup(paymentScreenshotId: string) {
        return [
            [{ text: 'Send Screenshot <=', url: paymentScreenshotId }],
            [{ text: '=> Get QR Code ', callbackData: 'qr' }, { text: 'Change Premium Plans', callbackData: 'showPlans' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ]
    }

    public qrReplyMarkup(paymentScreenshotId: string) {
        return [
            [{ text: 'Send Screenshot <=', url: paymentScreenshotId }],
            [{ text: '=> Get UPI Code ', callbackData: 'upi' }, { text: 'Change Premium Plans', callbackData: 'showPlans' }],
            [{ text: 'Close X', callbackData: `delete` }]
        ]
    }

    public groupJoinerReplyMarkup(paymentScreenshotId: string) {
        return [
            [{ text: 'Support Group', url: paymentScreenshotId }, { text: 'Updates Channel', url: paymentScreenshotId }],
            [{ text: 'Bot Owner', url: paymentScreenshotId }]
        ]
    }


}

export const Markup = new markup()