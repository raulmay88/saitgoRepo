import {Output, array, object, string, number, boolean } from "valibot"

export const DraftUserSchema = object({
    nameUsuario : string(),
    perfilUsuario : string(),
    clienteUsuario: string(),
    vendedorUsuario: string(),
    webUsuario: string(),
    passwordUsuario: string(),
})

export const UserSchema = object({
    id: number(),
    nameUsuario : string(),
    perfilUsuario : string(),
    clienteUsuario: string(),
    vendedorUsuario: string(),
    webUsuario: string(),
    passwordUsuario: string(),
    availability: boolean(),
    companies: array(object({
        id: number(),
        nameCompany: string(),
        phoneCompany: string()
    }))
})

export const UserSchemaEdit = object({
    id: number(),
    nameUsuario : string(),
    perfilUsuario : string(),
    clienteUsuario: string(),
    vendedorUsuario: string(),
    webUsuario: string(),
    passwordUsuario: string(),
    availability: boolean()
})

export const UserArraySchema = array(UserSchema)
export type User = Output<typeof UserSchema>

export const UserArrayEditSchema = array(UserSchemaEdit)
export type UserEdit = Output<typeof UserSchemaEdit>