import { Field, InputType } from "type-graphql";
import ToDo from "../../models/ToDo";

@InputType()
export class UpdateTodoInput implements Partial<ToDo> {
    @Field()
    id!: string;

    @Field({ nullable: true })
    content?: string;
}
