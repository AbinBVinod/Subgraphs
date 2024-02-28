// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Claim extends ethereum.Event {
  get params(): Claim__Params {
    return new Claim__Params(this);
  }
}

export class Claim__Params {
  _event: Claim;

  constructor(event: Claim) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class PairTransfer extends ethereum.Event {
  get params(): PairTransfer__Params {
    return new PairTransfer__Params(this);
  }
}

export class PairTransfer__Params {
  _event: PairTransfer;

  constructor(event: PairTransfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get claimedAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get balance(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Vester extends ethereum.SmartContract {
  static bind(address: Address): Vester {
    return new Vester("Vester", address);
  }

  allowance(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)],
    );

    return result[0].toBigInt();
  }

  try_allowance(param0: Address, param1: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  approve(param0: Address, param1: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);

    return result[0].toBoolean();
  }

  try_approve(param0: Address, param1: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(_account: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(_account),
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(_account),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balances(param0: Address): BigInt {
    let result = super.call("balances", "balances(address):(uint256)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBigInt();
  }

  try_balances(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balances", "balances(address):(uint256)", [
      ethereum.Value.fromAddress(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bonusRewards(param0: Address): BigInt {
    let result = super.call("bonusRewards", "bonusRewards(address):(uint256)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBigInt();
  }

  try_bonusRewards(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "bonusRewards",
      "bonusRewards(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claim(): BigInt {
    let result = super.call("claim", "claim():(uint256)", []);

    return result[0].toBigInt();
  }

  try_claim(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("claim", "claim():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimForAccount(_account: Address, _receiver: Address): BigInt {
    let result = super.call(
      "claimForAccount",
      "claimForAccount(address,address):(uint256)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromAddress(_receiver),
      ],
    );

    return result[0].toBigInt();
  }

  try_claimForAccount(
    _account: Address,
    _receiver: Address,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimForAccount",
      "claimForAccount(address,address):(uint256)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromAddress(_receiver),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimable(_account: Address): BigInt {
    let result = super.call("claimable", "claimable(address):(uint256)", [
      ethereum.Value.fromAddress(_account),
    ]);

    return result[0].toBigInt();
  }

  try_claimable(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("claimable", "claimable(address):(uint256)", [
      ethereum.Value.fromAddress(_account),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimableToken(): Address {
    let result = super.call("claimableToken", "claimableToken():(address)", []);

    return result[0].toAddress();
  }

  try_claimableToken(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "claimableToken",
      "claimableToken():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  claimedAmounts(param0: Address): BigInt {
    let result = super.call(
      "claimedAmounts",
      "claimedAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBigInt();
  }

  try_claimedAmounts(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimedAmounts",
      "claimedAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  cumulativeClaimAmounts(param0: Address): BigInt {
    let result = super.call(
      "cumulativeClaimAmounts",
      "cumulativeClaimAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBigInt();
  }

  try_cumulativeClaimAmounts(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "cumulativeClaimAmounts",
      "cumulativeClaimAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  cumulativeRewardDeductions(param0: Address): BigInt {
    let result = super.call(
      "cumulativeRewardDeductions",
      "cumulativeRewardDeductions(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBigInt();
  }

  try_cumulativeRewardDeductions(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "cumulativeRewardDeductions",
      "cumulativeRewardDeductions(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  esToken(): Address {
    let result = super.call("esToken", "esToken():(address)", []);

    return result[0].toAddress();
  }

  try_esToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("esToken", "esToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getCombinedAverageStakedAmount(_account: Address): BigInt {
    let result = super.call(
      "getCombinedAverageStakedAmount",
      "getCombinedAverageStakedAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );

    return result[0].toBigInt();
  }

  try_getCombinedAverageStakedAmount(
    _account: Address,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCombinedAverageStakedAmount",
      "getCombinedAverageStakedAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getMaxVestableAmount(_account: Address): BigInt {
    let result = super.call(
      "getMaxVestableAmount",
      "getMaxVestableAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );

    return result[0].toBigInt();
  }

  try_getMaxVestableAmount(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMaxVestableAmount",
      "getMaxVestableAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPairAmount(_account: Address, _esAmount: BigInt): BigInt {
    let result = super.call(
      "getPairAmount",
      "getPairAmount(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromUnsignedBigInt(_esAmount),
      ],
    );

    return result[0].toBigInt();
  }

  try_getPairAmount(
    _account: Address,
    _esAmount: BigInt,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPairAmount",
      "getPairAmount(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_account),
        ethereum.Value.fromUnsignedBigInt(_esAmount),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTotalVested(_account: Address): BigInt {
    let result = super.call(
      "getTotalVested",
      "getTotalVested(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );

    return result[0].toBigInt();
  }

  try_getTotalVested(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTotalVested",
      "getTotalVested(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getVestedAmount(_account: Address): BigInt {
    let result = super.call(
      "getVestedAmount",
      "getVestedAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );

    return result[0].toBigInt();
  }

  try_getVestedAmount(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getVestedAmount",
      "getVestedAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_account)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  gov(): Address {
    let result = super.call("gov", "gov():(address)", []);

    return result[0].toAddress();
  }

  try_gov(): ethereum.CallResult<Address> {
    let result = super.tryCall("gov", "gov():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hasMaxVestableAmount(): boolean {
    let result = super.call(
      "hasMaxVestableAmount",
      "hasMaxVestableAmount():(bool)",
      [],
    );

    return result[0].toBoolean();
  }

  try_hasMaxVestableAmount(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasMaxVestableAmount",
      "hasMaxVestableAmount():(bool)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  hasPairToken(): boolean {
    let result = super.call("hasPairToken", "hasPairToken():(bool)", []);

    return result[0].toBoolean();
  }

  try_hasPairToken(): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasPairToken", "hasPairToken():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  hasRewardTracker(): boolean {
    let result = super.call(
      "hasRewardTracker",
      "hasRewardTracker():(bool)",
      [],
    );

    return result[0].toBoolean();
  }

  try_hasRewardTracker(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasRewardTracker",
      "hasRewardTracker():(bool)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isHandler(param0: Address): boolean {
    let result = super.call("isHandler", "isHandler(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBoolean();
  }

  try_isHandler(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isHandler", "isHandler(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lastVestingTimes(param0: Address): BigInt {
    let result = super.call(
      "lastVestingTimes",
      "lastVestingTimes(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBigInt();
  }

  try_lastVestingTimes(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastVestingTimes",
      "lastVestingTimes(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  pairAmounts(param0: Address): BigInt {
    let result = super.call("pairAmounts", "pairAmounts(address):(uint256)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBigInt();
  }

  try_pairAmounts(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "pairAmounts",
      "pairAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  pairSupply(): BigInt {
    let result = super.call("pairSupply", "pairSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_pairSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("pairSupply", "pairSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  pairToken(): Address {
    let result = super.call("pairToken", "pairToken():(address)", []);

    return result[0].toAddress();
  }

  try_pairToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("pairToken", "pairToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewardTracker(): Address {
    let result = super.call("rewardTracker", "rewardTracker():(address)", []);

    return result[0].toAddress();
  }

  try_rewardTracker(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "rewardTracker",
      "rewardTracker():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transfer(param0: Address, param1: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);

    return result[0].toBoolean();
  }

  try_transfer(param0: Address, param1: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(param0: Address, param1: Address, param2: BigInt): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
      ],
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    param0: Address,
    param1: Address,
    param2: BigInt,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferredAverageStakedAmounts(param0: Address): BigInt {
    let result = super.call(
      "transferredAverageStakedAmounts",
      "transferredAverageStakedAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBigInt();
  }

  try_transferredAverageStakedAmounts(
    param0: Address,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "transferredAverageStakedAmounts",
      "transferredAverageStakedAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transferredCumulativeRewards(param0: Address): BigInt {
    let result = super.call(
      "transferredCumulativeRewards",
      "transferredCumulativeRewards(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBigInt();
  }

  try_transferredCumulativeRewards(
    param0: Address,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "transferredCumulativeRewards",
      "transferredCumulativeRewards(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vestingDuration(): BigInt {
    let result = super.call(
      "vestingDuration",
      "vestingDuration():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_vestingDuration(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "vestingDuration",
      "vestingDuration():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _vestingDuration(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _esToken(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _pairToken(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get _claimableToken(): Address {
    return this._call.inputValues[5].value.toAddress();
  }

  get _rewardTracker(): Address {
    return this._call.inputValues[6].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value1(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class ClaimCall extends ethereum.Call {
  get inputs(): ClaimCall__Inputs {
    return new ClaimCall__Inputs(this);
  }

  get outputs(): ClaimCall__Outputs {
    return new ClaimCall__Outputs(this);
  }
}

export class ClaimCall__Inputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class ClaimCall__Outputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ClaimForAccountCall extends ethereum.Call {
  get inputs(): ClaimForAccountCall__Inputs {
    return new ClaimForAccountCall__Inputs(this);
  }

  get outputs(): ClaimForAccountCall__Outputs {
    return new ClaimForAccountCall__Outputs(this);
  }
}

export class ClaimForAccountCall__Inputs {
  _call: ClaimForAccountCall;

  constructor(call: ClaimForAccountCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _receiver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ClaimForAccountCall__Outputs {
  _call: ClaimForAccountCall;

  constructor(call: ClaimForAccountCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DepositForAccountCall extends ethereum.Call {
  get inputs(): DepositForAccountCall__Inputs {
    return new DepositForAccountCall__Inputs(this);
  }

  get outputs(): DepositForAccountCall__Outputs {
    return new DepositForAccountCall__Outputs(this);
  }
}

export class DepositForAccountCall__Inputs {
  _call: DepositForAccountCall;

  constructor(call: DepositForAccountCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepositForAccountCall__Outputs {
  _call: DepositForAccountCall;

  constructor(call: DepositForAccountCall) {
    this._call = call;
  }
}

export class SetBonusRewardsCall extends ethereum.Call {
  get inputs(): SetBonusRewardsCall__Inputs {
    return new SetBonusRewardsCall__Inputs(this);
  }

  get outputs(): SetBonusRewardsCall__Outputs {
    return new SetBonusRewardsCall__Outputs(this);
  }
}

export class SetBonusRewardsCall__Inputs {
  _call: SetBonusRewardsCall;

  constructor(call: SetBonusRewardsCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetBonusRewardsCall__Outputs {
  _call: SetBonusRewardsCall;

  constructor(call: SetBonusRewardsCall) {
    this._call = call;
  }
}

export class SetCumulativeRewardDeductionsCall extends ethereum.Call {
  get inputs(): SetCumulativeRewardDeductionsCall__Inputs {
    return new SetCumulativeRewardDeductionsCall__Inputs(this);
  }

  get outputs(): SetCumulativeRewardDeductionsCall__Outputs {
    return new SetCumulativeRewardDeductionsCall__Outputs(this);
  }
}

export class SetCumulativeRewardDeductionsCall__Inputs {
  _call: SetCumulativeRewardDeductionsCall;

  constructor(call: SetCumulativeRewardDeductionsCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetCumulativeRewardDeductionsCall__Outputs {
  _call: SetCumulativeRewardDeductionsCall;

  constructor(call: SetCumulativeRewardDeductionsCall) {
    this._call = call;
  }
}

export class SetGovCall extends ethereum.Call {
  get inputs(): SetGovCall__Inputs {
    return new SetGovCall__Inputs(this);
  }

  get outputs(): SetGovCall__Outputs {
    return new SetGovCall__Outputs(this);
  }
}

export class SetGovCall__Inputs {
  _call: SetGovCall;

  constructor(call: SetGovCall) {
    this._call = call;
  }

  get _gov(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetGovCall__Outputs {
  _call: SetGovCall;

  constructor(call: SetGovCall) {
    this._call = call;
  }
}

export class SetHandlerCall extends ethereum.Call {
  get inputs(): SetHandlerCall__Inputs {
    return new SetHandlerCall__Inputs(this);
  }

  get outputs(): SetHandlerCall__Outputs {
    return new SetHandlerCall__Outputs(this);
  }
}

export class SetHandlerCall__Inputs {
  _call: SetHandlerCall;

  constructor(call: SetHandlerCall) {
    this._call = call;
  }

  get _handler(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _isActive(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetHandlerCall__Outputs {
  _call: SetHandlerCall;

  constructor(call: SetHandlerCall) {
    this._call = call;
  }
}

export class SetHasMaxVestableAmountCall extends ethereum.Call {
  get inputs(): SetHasMaxVestableAmountCall__Inputs {
    return new SetHasMaxVestableAmountCall__Inputs(this);
  }

  get outputs(): SetHasMaxVestableAmountCall__Outputs {
    return new SetHasMaxVestableAmountCall__Outputs(this);
  }
}

export class SetHasMaxVestableAmountCall__Inputs {
  _call: SetHasMaxVestableAmountCall;

  constructor(call: SetHasMaxVestableAmountCall) {
    this._call = call;
  }

  get _hasMaxVestableAmount(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SetHasMaxVestableAmountCall__Outputs {
  _call: SetHasMaxVestableAmountCall;

  constructor(call: SetHasMaxVestableAmountCall) {
    this._call = call;
  }
}

export class SetTransferredAverageStakedAmountsCall extends ethereum.Call {
  get inputs(): SetTransferredAverageStakedAmountsCall__Inputs {
    return new SetTransferredAverageStakedAmountsCall__Inputs(this);
  }

  get outputs(): SetTransferredAverageStakedAmountsCall__Outputs {
    return new SetTransferredAverageStakedAmountsCall__Outputs(this);
  }
}

export class SetTransferredAverageStakedAmountsCall__Inputs {
  _call: SetTransferredAverageStakedAmountsCall;

  constructor(call: SetTransferredAverageStakedAmountsCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetTransferredAverageStakedAmountsCall__Outputs {
  _call: SetTransferredAverageStakedAmountsCall;

  constructor(call: SetTransferredAverageStakedAmountsCall) {
    this._call = call;
  }
}

export class SetTransferredCumulativeRewardsCall extends ethereum.Call {
  get inputs(): SetTransferredCumulativeRewardsCall__Inputs {
    return new SetTransferredCumulativeRewardsCall__Inputs(this);
  }

  get outputs(): SetTransferredCumulativeRewardsCall__Outputs {
    return new SetTransferredCumulativeRewardsCall__Outputs(this);
  }
}

export class SetTransferredCumulativeRewardsCall__Inputs {
  _call: SetTransferredCumulativeRewardsCall;

  constructor(call: SetTransferredCumulativeRewardsCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetTransferredCumulativeRewardsCall__Outputs {
  _call: SetTransferredCumulativeRewardsCall;

  constructor(call: SetTransferredCumulativeRewardsCall) {
    this._call = call;
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value1(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value1(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value2(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferStakeValuesCall extends ethereum.Call {
  get inputs(): TransferStakeValuesCall__Inputs {
    return new TransferStakeValuesCall__Inputs(this);
  }

  get outputs(): TransferStakeValuesCall__Outputs {
    return new TransferStakeValuesCall__Outputs(this);
  }
}

export class TransferStakeValuesCall__Inputs {
  _call: TransferStakeValuesCall;

  constructor(call: TransferStakeValuesCall) {
    this._call = call;
  }

  get _sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _receiver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class TransferStakeValuesCall__Outputs {
  _call: TransferStakeValuesCall;

  constructor(call: TransferStakeValuesCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawTokenCall extends ethereum.Call {
  get inputs(): WithdrawTokenCall__Inputs {
    return new WithdrawTokenCall__Inputs(this);
  }

  get outputs(): WithdrawTokenCall__Outputs {
    return new WithdrawTokenCall__Outputs(this);
  }
}

export class WithdrawTokenCall__Inputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class WithdrawTokenCall__Outputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }
}