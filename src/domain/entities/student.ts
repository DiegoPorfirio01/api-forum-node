import { randomUUID } from "node:crypto"
import { Entity } from "../../core/entities/entity"

interface StudantProps {
  name: string
}

export class Studant extends Entity<StudantProps> {
  // constructor(props: StudantProps, id?: string) {
  //   super(props, id)
  // }
}