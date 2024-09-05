import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface StudantProps {
  name: string
}

export class Studant extends Entity<StudantProps> {
  // constructor(props: StudantProps, id?: string) {
  //   super(props, id)
  // }
  static create(
    props: StudantProps,
    id?: UniqueEntityId
  ) {
    const studant = new Studant({
      ...props,
    }, id)

    return studant
  }
}