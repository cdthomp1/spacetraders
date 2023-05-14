import clientPromise from "../../../lib/mongodb-promise";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"


export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    if (session) {

        const client = await clientPromise;
        const db = client.db("SpaceTradersTest");
        const jsonBody = JSON.parse(req.body);

        console.log(jsonBody)

        const newAgent = {
            agentSymbol: jsonBody.agentSymbol,
            agentToken: jsonBody.agentToken
        }



        const query = { email: session.user.email }
        const update = { $push: { agents: newAgent } };
        const options = { upsert: true };

        await db.collection('userAgents').updateOne(query, update, options)

        const userAgents = await db.collection('userAgents').findOne(query)
        console.log(userAgents)


        res.status(200).json(userAgents);
    } else {
        // Not Signed in
        res.status(401).json({ msg: "Please sign in" })
    }





}