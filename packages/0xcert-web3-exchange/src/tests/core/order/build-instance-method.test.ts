import { Spec } from '@specron/spec';
import { Context } from '@0xcert/web3-context';
import { ExchangeOrder } from '../../../core/order';

interface Data {
  context: Context;
}

const spec = new Spec<Data>();

spec.before(async (stage) => {
  const context = new Context();
  await context.attach({
    exchangeId: '0x825C96c2c73f9eC9C983BAAa3f5EbBc77aC2e981',
    ...stage,
  });

  stage.set('context', context);
});

spec.test('generates and sets order claim', async (ctx) => {
  const context = ctx.get('context');

  const order = new ExchangeOrder(context);
  await order.build({
    makerId: '0x342da4DaE236037E9586499DA06494DDE2a0b52b',
    takerId: '0x1231858C3aeFe5B5E8A5C81d2b5341fbc41E2B13',
    transfers: [
      {
        ledgerId: '0x2bD270a0F3232E9f11dd439D8E5e74694e46dC53',
        senderId: '0x342da4DaE236037E9586499DA06494DDE2a0b52b',
        receiverId: '0x287206D90777dcB5fb96070D0DDF06737FCE3d1E',
        amount: 5000,
      },
      {
        ledgerId: '0x2bD270a0F3232E9f11dd439D8E5e74694e46dC53',
        senderId: '0x342da4DaE236037E9586499DA06494DDE2a0b52b',
        receiverId: '0x28bC05dd0Eb0A3912AB7ea9d9C0A0502AE0773C7',
        amount: 300,
      },
    ],
    seed: 1535113220,
    expiration: 1535113820,
  });

  ctx.deepEqual(order.claim, '0xf18951659b9a486eaba2dbd0dbe73243ac7b21a0faa640692f9b52dcc9543b5a');
});

export default spec;