import { types, schema } from "papr";
import papr from "$/modules/papr";
import { ObjectId } from "mongodb";

export const userSample: UserDocument = {
    _id: new ObjectId(),
    userId: "",
    spark: {
        crystal: 0,
        mobaCoin: 0,
        tenTicket: 0,
        ticket: 0,
    },
};

export const userSchema = {
    _id: types.objectId({ required: true }),
    userId: types.string({ required: true }),
    spark: types.object({
        crystal: types.number({}),
        ticket: types.number({}),
        tenTicket: types.number({}),
        mobaCoin: types.number({}),
    }),
};

const UserSchema = schema(userSchema);

export type UserDocument = typeof UserSchema[0];

export const User = papr.model("user", UserSchema);
