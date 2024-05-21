import { Output, array, object, string, number } from "valibot"

export const DraftSucursalSchema = object({
    nameSucursal: string(),
    emailSucursal: string(),
    impuestoSucursal: string(),
    companyId: number(),
})

export const SucursalSchema = object({
    id: number(),
    nameSucursal: string(),
    emailSucursal: string(),
    impuestoSucursal: string(),
    companyId: number(),
    company: object({
        id: number(),
        nameCompany: string(),
        phoneCompany: string(),
    })
})

export const SucursalSchemaEdit = object({
    nameSucursal: string(),
    emailSucursal: string(),
    impuestoSucursal: string(),
    companyId: number(),
})


export const SucursalArraySchema = array(SucursalSchema)
export type Sucursal = Output<typeof SucursalSchema>

export const SucursalArrayEditSchema = array(SucursalSchemaEdit)
export type SucursalEdit = Output <typeof SucursalSchemaEdit>