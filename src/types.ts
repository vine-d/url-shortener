import z from 'zod'

export type CreateLinkRequest = typeof CreateLinkRequest
export const CreateLinkRequest = z.object({
  code: z.string().min(3),
  url: z.string().url(),
})

export type ExpandCodeParams = typeof ExpandCodeParams
export const ExpandCodeParams = z.object({
  code: z.string().min(3),
})
