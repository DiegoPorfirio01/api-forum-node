import { randomUUID } from "node:crypto"

export class Studant {
  public id: string = randomUUID()
  public name: string

  constructor(name: string, id?: string) {
    this.name = name
    this.id = id ?? randomUUID()
  }
}