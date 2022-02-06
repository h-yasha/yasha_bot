import { types, schema } from "papr";
import papr from "$/modules/papr";

const channelSchema = schema({
    _id: types.objectId({ required: true }),
    channelId: types.string({ required: true }),
    serverId: types.string(),
    mangaIds: types.array(types.string({ required: true })),
});

export type ChannelDocument = typeof channelSchema[0];

export const Channel = papr.model("channel", channelSchema);
