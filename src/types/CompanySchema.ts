import {Output, array, object, string, number } from "valibot"

export const DraftCompanySchema = object({
    nameCompany: string(),
    phoneCompany: string(),
    rfcCompany: string(),
    curpCompany: string(),
    emailCompany: string(),
    impuestoCompany: string(),
    userId: number()
})

export const CompanySchema = object({
    id: number(),
    nameCompany: string(),
    phoneCompany: string(),
    rfcCompany: string(),
    curpCompany: string(),
    emailCompany: string(),
    impuestoCompany: string(),
    userId: number(),
    user: object({
        id: number(),
        nameUsuario: string(),
    }),
    sucursales: array(object({
        id: number(),
        nameSucursal: string(),
        emailSucursal: string(),
        impuestoSucursal: string(),
        companyId: number()
    }))
})

export const CompanySchemaEdit = object({
    id: number(),
    nameCompany: string(),
    phoneCompany: string(),
    rfcCompany: string(),
    curpCompany: string(),
    emailCompany: string(),
    impuestoCompany: string(),
    userId: number()
})

export const CompanyArraySchema = array(CompanySchema)
export type Company = Output<typeof CompanySchema>

export const CompanyArrayEditSchema = array(CompanySchemaEdit)
export type CompanyShow = Output<typeof CompanySchemaEdit>
