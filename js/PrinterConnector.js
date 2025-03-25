import PaymentRecepits from './PaymentRecepits.js';

export default class PrinterConnector{
    constructor(){
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;
    }
    /**
     * Método que se encarga de conexión con la impresora e invocación de impresión de recibo
     * @param {String} paymentType Tipo de pago 
     * @returns {Promise<void>}
     */
    async connectDevice(paymentType){
        try {
            //Solicitar permiso y dispositivos de impresora
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }] // Filtro por servicio de impresora térmica
            });
            const server = await device.gatt.connect(); // Conectar al dispositivo
            const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb'); // Obtener servicio de impresora
            this.characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb'); // Obtener característica de impresora
            this.printReceipt(paymentType, printerCaracteristic);
        } catch (error) {
            console.error("Error al conectar:", error);
        }
    }

    /**
     * Método que imprime el recibo de un pago dependiendo del tipo de pago
     * @param {string} paymentType 
     * @returns {Promise<void>}
     */
    async printReceipt(paymentType) {
    if (!this.characteristic) {
        await this.connectDevice();
        if (!this.characteristic) {
            return;
        }
    }
    const paymentReceipt = new PaymentRecepits();
    let jsonPayment = await this.obtenerDatos(paymentType);
    let textReceipt = '';
    switch (paymentType) {
        case "anticipado":
            textReceipt = paymentReceipt.getAnticipatedPaymentReceipt(jsonPayment);
            break;
        case "inmediato":
            textReceipt = paymentReceipt.getInmediatePaymentReceipt(jsonPayment);
            break;
        case "primer":
            textReceipt = paymentReceipt.getFirstPaymentReceipt(jsonPayment);
            break;
        default:
            alert("Tipo de pago no soportado");
            return; 
    }
    //alert(textReceipt);
    let textReceiptEncode = this.encodeText(textReceipt);
    const encoder = new TextEncoder('iso-8859-1');
    const data = encoder.encode(textReceiptEncode);
    console.log(data);
    const chunkSize = 512; // Límite de Bluetooth

    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        try {
            await this.characteristic.writeValue(chunk);
        } catch (error) {
            console.error("Error al imprimir:", error);
            return;
        }
    }
}

 encodeText(text) {
    const replacements = {
        'á': '\xE1', 'é': '\xE9', 'í': '\xED', 'ó': '\xF3', 'ú': '\xFA',
        'Á': '\xC1', 'É': '\xC9', 'Í': '\xCD', 'Ó': '\xD3', 'Ú': '\xDA',
        'ñ': '\xF1', 'Ñ': '\xD1'
    };
    return text.replace(/[áéíóúÁÉÍÓÚñÑ]/g, char => replacements[char] || char);
}
    /**
     * Método que obtiene un json de un archivo, no usar en producción
     * @returns {Promise<Object>}
     */
    async obtenerDatos(paymentType) {
        try {
            let response = '';
            switch (paymentType) {
                case "anticipado":
                    response = await fetch('../json/anticipo.json');
                    break;
                case "inmediato":
                    response = await fetch('../json/inmediato.json');
                    break;
                case "primer":
                    response = await fetch('../json/primerRecaudo.json');
                    break;
                default:
                    alert("Tipo de pago no soportado");
            }
            const data = await response.json();
            console.log(data); 
            return data;
        } catch (error) {
            console.error('Error cargando JSON:', error);
        }
    }

}

const printerConnector = new PrinterConnector();
document.addEventListener("DOMContentLoaded", () => {
    const printButton = document.getElementById("printButton");
    
    if (!printButton) {
        console.error("Error: El botón de impresión no se encontró en el DOM.");
        return;
    }

    printButton.addEventListener("click", () => {
        console.log("Botón presionado, intentando conectar a la impresora...");
        printerConnector.printReceipt("anticipado");
    });
});