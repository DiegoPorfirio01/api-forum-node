import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  // constructor(props: InstructorProps, id?:string) {
  //   super(props, id)
  // }
  static create(props: InstructorProps, id?: UniqueEntityId) {
    const studant = new Instructor(
      {
        ...props,
      },
      id,
    )

    return studant
  }
}
