import { MongoClient } from "mongodb";
import Papr from "papr";

export let client: MongoClient;
export let connected: boolean = false;
const papr = new Papr();

export async function connect() {
    if (process.env.MONGODB_CONSTR) client = await MongoClient.connect(process.env.MONGODB_CONSTR);
    else return false;
    papr.initialize(client.db("yashabot"));
    await papr.updateSchemas();
    return (connected = true);
}

export async function disconnect() {
    await client.close();
    return (connected = false);
}

export default papr;
