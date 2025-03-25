export default class PaymentInvoices {
    constructor(data = {}) {
        this.transId = data.transId || null;
        this.sumApplied = data.sumApplied || 0;
        this.sumPending = data.sumPending || 0;
        this.dateStart = data.dateStart || null;
        this.dateEnd = data.dateEnd || null;
    }
}
