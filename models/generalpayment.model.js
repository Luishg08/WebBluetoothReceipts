import PaymentInvoices from "./paymentinvoices.model.js";

export default class GeneralPayment {
    constructor(data = {}) {
        this.paymentNumber = data.paymentNumber || null;
        this.date = data.date || null;
        this.cardCode = data.cardCode || "";
        this.cardName = data.cardName || "";
        this.docentryContract = data.docentryContract || "";
        this.anticipeValue = data.anticipeValue || 0;
        this.totalValue = data.totalValue || 0;
        this.dateStart = data.dateStart || null;
        this.dateEnd = data.dateEnd || null;
        this.cashPayment = data.cashPayment || 0;
        this.cardPayment = data.cardPayment || 0;
        this.checkPayment = data.checkPayment || 0;
        this.feeValue = data.feeValue || 0;
        this.observation = data.observation || "";
        this.quotaValue = data.quotaValue || 0;
        this.comments = data.comments || "";
        this.manCollectName = data.manCollectName || "";
        this.invoices = data.invoices ? data.invoices.map(invoice => new PaymentInvoices(invoice)) : [];
    }
}
