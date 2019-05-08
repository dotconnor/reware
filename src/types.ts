// eslint-disable-next-line no-unused-vars
import { Request, Response } from "express"
export type Middleware = (req: Request, res: Response) => any

export interface Options {
  exactPathMatch?: boolean
}
