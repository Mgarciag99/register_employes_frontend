export interface PayloadCreateCompany{
    idCountry: number;
    idMunicipality?: number;
    idDepartment?: number;
    nit: string;
    legalName: string;
    comercialName: string;
    phoneNumber: string;
    email: string;
}