import GeneralPayment from '../models/generalpayment.model.js';
import PaymentInvoices from '../models/paymentinvoices.model.js';
import FirstPayment from '../models/firstpayment.model.js';

export default class PaymentRecepits {
    replaceAccents(text) {
        if (typeof text !== 'string') return text;
        const replacements = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
        };
        return text.replace(/[áéíóúÁÉÍÓÚ]/g, char => replacements[char] || char);
    }

    getAnticipatedPaymentReceipt(anticipe) {
        let data = new GeneralPayment(anticipe);
        return `
        RECAUDO ANTICIPADO  
--------------------------------
Fecha: ${this.replaceAccents(data.date)}  
Numero de recibo: ${this.replaceAccents(data.anticipeValue)}  
Cliente: ${this.replaceAccents(data.cardName)}  
Documento: ${this.replaceAccents(data.cardCode)}  
No. Contrato: ${this.replaceAccents(data.docentryContract)}  
--------------------------------
Detalles del Pago  
Anticipo: ${this.replaceAccents(data.anticipeValue)}  
Total Recaudado: ${this.replaceAccents(data.totalValue)}  
Pago Realizado:  
- Efectivo: ${this.replaceAccents(data.cashPayment)}  
- Tarjeta: ${this.replaceAccents(data.cardPayment)}  
- Cheque: ${this.replaceAccents(data.cashPayment)}  
Valor Cuota: ${this.replaceAccents(data.quotaValue)}  
--------------------------------
Periodo del Servicio  
Inicio: ${this.replaceAccents(data.dateStart)}  
Fin: ${this.replaceAccents(data.dateEnd)}  
--------------------------------
Observaciones:  
${this.replaceAccents(data.comments)}  
Asesor: ${this.replaceAccents(data.manCollectName)}  
--------------------------------
Firma Asesor


--------------------------------

`;
    }

    getInmediatePaymentReceipt(inmediate) {
        let data = new GeneralPayment(inmediate);
        let receipt = `
        RECAUDO INMEDIATO 
--------------------------------
Fecha: ${this.replaceAccents(data.date)}
Numero de Recibo: ${this.replaceAccents(data.paymentNumber)}
Cliente: ${this.replaceAccents(data.cardName)}
Documento: ${this.replaceAccents(data.cardName)}
No. Contrato: ${this.replaceAccents(data.docentryContract)}
--------------------------------
DETALLE DEL PAGO
Anticipo: $${this.replaceAccents(data.anticipeValue)}
Total Recaudado: $${this.replaceAccents(data.totalValue)}
Pago Realizado:
    Efectivo: $${this.replaceAccents(data.cashPayment)}
    Tarjeta: $${this.replaceAccents(data.cardPayment)}
    Cheque: $${this.replaceAccents(data.checkPayment)}
--------------------------------
Periodo del Servicio:
Inicio: ${this.replaceAccents(data.dateStart)}
Fin: ${this.replaceAccents(data.dateEnd)}
--------------------------------
DETALLE DE FACTURAS PAGADAS:\n`;

        data.invoices.forEach(invoice => {
            receipt += `Factura #${this.replaceAccents(invoice.transId)}
    Valor Pagado: $${this.replaceAccents(invoice.sumApplied)}
    Saldo Pendiente: $${this.replaceAccents(invoice.sumPending)}
    Vigencia: ${this.replaceAccents(invoice.dateStart)} - ${this.replaceAccents(invoice.dateEnd)}
--------------------------------\n`;
        });

        receipt += `Observaciones:
"${this.replaceAccents(data.comments)}"
Asesor: ${this.replaceAccents(data.manCollectName)}
--------------------------------
Firma Asesor


--------------------------------
`;

        return receipt;
    }

    getFirstPaymentReceipt(first) {
        let data = new FirstPayment(first);
        let receipt = `
        PRIMER RECAUDO  
--------------------------------
Fecha: ${this.replaceAccents(data.date)}  
No. Contrato: ${this.replaceAccents(data.docentryContract)}  
Convenio: ${this.replaceAccents(data.agreement)}  
Sucursal: ${this.replaceAccents(data.sucursal)}  
--------------------------------
Cliente: ${this.replaceAccents(data.client.firstName)} ${this.replaceAccents(data.client.lastName)}  
Tipo de Documento: ${this.replaceAccents(data.client.typeDocument)}  
Documento: ${this.replaceAccents(data.client.cardCode)}  
Correo: ${this.replaceAccents(data.client.email)}  
Telefono: ${this.replaceAccents(data.client.cellPhone)}  
Direccion: ${this.replaceAccents(data.client.address)}, ${this.replaceAccents(data.client.neighborhood)}, ${this.replaceAccents(data.client.residenceCity)}  
--------------------------------
Plan Adquirido: ${this.replaceAccents(data.planName)}  
Vigencia: ${this.replaceAccents(data.dateStart)} - ${this.replaceAccents(data.dateEnd)}  
--------------------------------
Beneficiarios:\n`;

        data.beneficiaries.forEach(beneficiary => {
            receipt += `Documento: ${this.replaceAccents(beneficiary.document)}
${this.replaceAccents(beneficiary.firstName)} ${this.replaceAccents(beneficiary.lastName)} (${this.replaceAccents(beneficiary.age)} anos) - ${this.replaceAccents(beneficiary.relative)}\n`;
        });

        receipt += `--------------------------------
Detalles del Pago  
Valor Cuota: $${this.replaceAccents(data.quotaValue)}  
Total Pagado: $${this.replaceAccents(data.totalValue)}  
--------------------------------
Observaciones:  
${this.replaceAccents(data.comments)}
Asesor: ${this.replaceAccents(data.manCollectName)}  
--------------------------------
Firma Asesor


--------------------------------

    `;

        return receipt;
    }
}