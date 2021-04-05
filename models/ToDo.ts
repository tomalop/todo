import { Field, ID, ObjectType } from "type-graphql";
import IAuditable from "../interfaces/IAuditable";

@ObjectType()
export default class ToDo implements IAuditable {
    
    @Field(() => ID)
    id!: string;

    @Field({nullable: true})
    content?: String;

    @Field()
    created!: Date;
    
    @Field()
    lastModified!: Date;
}
