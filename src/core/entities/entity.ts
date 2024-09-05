import { randomUUID } from "node:crypto"
import { UniqueEntityId } from "./unique-entity-id"

export class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  constructor(props:any, id: string | undefined) {
    this.props = props
    this._id = new UniqueEntityId(id)
  }
}