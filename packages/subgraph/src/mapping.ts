import { store, BigInt, Bytes, Address } from '@graphprotocol/graph-ts';
import {
  YourContract,
  SetPurpose,
} from '../generated/YourContract/YourContract';
import { Webway, Transfer } from '../generated/Webway/Webway';
import {
  Purpose,
  Sender,
  // Token,
  // TokenContract,
  Owner,
  // All,
  // OwnerPerTokenContract,
} from '../generated/schema';

export function handleSetPurpose(event: SetPurpose): void {
  let senderString = event.params.sender.toHexString();

  let sender = Sender.load(senderString);

  if (sender === null) {
    sender = new Sender(senderString);
    sender.address = event.params.sender;
    sender.createdAt = event.block.timestamp;
    sender.purposeCount = BigInt.fromI32(1);
  } else {
    sender.purposeCount = sender.purposeCount.plus(BigInt.fromI32(1));
  }

  let purpose = new Purpose(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  purpose.purpose = event.params.purpose;
  purpose.sender = senderString;
  purpose.createdAt = event.block.timestamp;
  purpose.transactionHash = event.transaction.hash.toHex();

  purpose.save();
  sender.save();
}

let ZERO_ADDRESS_STRING = '0x0000000000000000000000000000000000000000';

let ZERO_ADDRESS: Bytes = Bytes.fromHexString(ZERO_ADDRESS_STRING) as Bytes;
let ZERO = BigInt.fromI32(0);
let ONE = BigInt.fromI32(1);

export function handleTransfer(event: Transfer): void {
  let from = event.params.from.toHex();
  let to = event.params.to.toHex();
  let id = event.params.tokenId.toString();
  let fromId = from.toString() + ' ' + id;
  let toId = to.toString() + ' ' + id;

  if (from != ZERO_ADDRESS_STRING) {
    let ownerFrom = Owner.load(fromId);
    ownerFrom.own = false;
    ownerFrom.save();
  }
  let ownerTo = Owner.load(toId);
  if (ownerTo == null) {
    ownerTo = new Owner(toId);
  }
  ownerTo.own = true;
  ownerTo.save();
  // if from isnt zero add, then subtract from ownership
}
