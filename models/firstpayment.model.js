export default class FirstPayment {
    constructor(data = {}) {
        this.docentryContract = data.docentryContract || '';
        this.planName = data.planName || '';
        this.client = {
            typeDocument: data.client.typeDocument || '',
            cardCode: data.client.cardCode || '',
            firstName: data.client.firstName || '',
            lastName: data.client.lastName || '',
            email: data.client.email || '',
            address:  data.client.address || '',
            neighborhood: data.client.neighborhood || '',
            residenceCity: data.client.residenceCity || '',
            cellPhone: data.client.cellPhone || ''
        };
        this.beneficiaries = data.beneficiaries ? data.beneficiaries.map(beneficiary => {
            return {
                document: beneficiary.document || '',
                firstName: beneficiary.firstName || '',
                lastName: beneficiary.lastName || '',
                age: beneficiary.age || '',
                relative: beneficiary.relative || ''
            };
        }) : [];
        this.agreement = data.agreement || '';
        this.date = data.date || '';
        this.dateStart = data.dateStart || '';
        this.dateEnd = data.dateEnd || '';
        this.account = data.account || '';
        this.sucursal = data.sucursal || '';
        this.quotaValue = data.quotaValue || '';
        this.totalValue = data.totalValue || '';
        this.manCollectName = data.manCollectName || '';
        this.comments = data.comments || '';
    }
}
