import { randomUUID } from "node:crypto"

export class Entity<Props> {
  private _id: string
  protected props: Props

  get id() {
    return this._id
  }

  constructor(props:any, id: string | undefined) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}