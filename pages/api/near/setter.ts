import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@figment-near/lib';
import {connect, KeyPair} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const {network, accountId, secret, newMessage} = req.body;
  try {
    const config = configFromNetwork(network);
    const keypair = KeyPair.fromString(secret);
    config.keyStore?.setKey('testnet', accountId, keypair);

    const near = await connect(config);
    const account = await near.account(accountId);
    // Look at functionCall and pass the expected args
    const optionsCall = {
      contractId: accountId,
      methodName: 'set_greeting',
      args: {message: newMessage},
    };
    const response = await account.functionCall(optionsCall);
    return res.status(200).json(response.transaction.hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
