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

export class BonusMultiplierChange extends ethereum.Event {
  get params(): BonusMultiplierChange__Params {
    return new BonusMultiplierChange__Params(this);
  }
}

export class BonusMultiplierChange__Params {
  _event: BonusMultiplierChange;

  constructor(event: BonusMultiplierChange) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Distribute extends ethereum.Event {
  get params(): Distribute__Params {
    return new Distribute__Params(this);
  }
}

export class Distribute__Params {
  _event: Distribute;

  constructor(event: Distribute) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class BonusDistributor extends ethereum.SmartContract {
  static bind(address: Address): BonusDistributor {
    return new BonusDistributor("BonusDistributor", address);
  }

  BASIS_POINTS_DIVISOR(): BigInt {
    let result = super.call(
      "BASIS_POINTS_DIVISOR",
      "BASIS_POINTS_DIVISOR():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_BASIS_POINTS_DIVISOR(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "BASIS_POINTS_DIVISOR",
      "BASIS_POINTS_DIVISOR():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  BONUS_DURATION(): BigInt {
    let result = super.call("BONUS_DURATION", "BONUS_DURATION():(uint256)", []);

    return result[0].toBigInt();
  }

  try_BONUS_DURATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "BONUS_DURATION",
      "BONUS_DURATION():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  admin(): Address {
    let result = super.call("admin", "admin():(address)", []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("admin", "admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  bonusMultiplierBasisPoints(): BigInt {
    let result = super.call(
      "bonusMultiplierBasisPoints",
      "bonusMultiplierBasisPoints():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_bonusMultiplierBasisPoints(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "bonusMultiplierBasisPoints",
      "bonusMultiplierBasisPoints():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  distribute(): BigInt {
    let result = super.call("distribute", "distribute():(uint256)", []);

    return result[0].toBigInt();
  }

  try_distribute(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("distribute", "distribute():(uint256)", []);
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

  lastDistributionTime(): BigInt {
    let result = super.call(
      "lastDistributionTime",
      "lastDistributionTime():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_lastDistributionTime(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastDistributionTime",
      "lastDistributionTime():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  pendingRewards(): BigInt {
    let result = super.call("pendingRewards", "pendingRewards():(uint256)", []);

    return result[0].toBigInt();
  }

  try_pendingRewards(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "pendingRewards",
      "pendingRewards():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardToken(): Address {
    let result = super.call("rewardToken", "rewardToken():(address)", []);

    return result[0].toAddress();
  }

  try_rewardToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("rewardToken", "rewardToken():(address)", []);
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

  tokensPerInterval(): BigInt {
    let result = super.call(
      "tokensPerInterval",
      "tokensPerInterval():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_tokensPerInterval(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokensPerInterval",
      "tokensPerInterval():(uint256)",
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

  get _rewardToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _rewardTracker(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DistributeCall extends ethereum.Call {
  get inputs(): DistributeCall__Inputs {
    return new DistributeCall__Inputs(this);
  }

  get outputs(): DistributeCall__Outputs {
    return new DistributeCall__Outputs(this);
  }
}

export class DistributeCall__Inputs {
  _call: DistributeCall;

  constructor(call: DistributeCall) {
    this._call = call;
  }
}

export class DistributeCall__Outputs {
  _call: DistributeCall;

  constructor(call: DistributeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SetAdminCall extends ethereum.Call {
  get inputs(): SetAdminCall__Inputs {
    return new SetAdminCall__Inputs(this);
  }

  get outputs(): SetAdminCall__Outputs {
    return new SetAdminCall__Outputs(this);
  }
}

export class SetAdminCall__Inputs {
  _call: SetAdminCall;

  constructor(call: SetAdminCall) {
    this._call = call;
  }

  get _admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetAdminCall__Outputs {
  _call: SetAdminCall;

  constructor(call: SetAdminCall) {
    this._call = call;
  }
}

export class SetBonusMultiplierCall extends ethereum.Call {
  get inputs(): SetBonusMultiplierCall__Inputs {
    return new SetBonusMultiplierCall__Inputs(this);
  }

  get outputs(): SetBonusMultiplierCall__Outputs {
    return new SetBonusMultiplierCall__Outputs(this);
  }
}

export class SetBonusMultiplierCall__Inputs {
  _call: SetBonusMultiplierCall;

  constructor(call: SetBonusMultiplierCall) {
    this._call = call;
  }

  get _bonusMultiplierBasisPoints(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetBonusMultiplierCall__Outputs {
  _call: SetBonusMultiplierCall;

  constructor(call: SetBonusMultiplierCall) {
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

export class UpdateLastDistributionTimeCall extends ethereum.Call {
  get inputs(): UpdateLastDistributionTimeCall__Inputs {
    return new UpdateLastDistributionTimeCall__Inputs(this);
  }

  get outputs(): UpdateLastDistributionTimeCall__Outputs {
    return new UpdateLastDistributionTimeCall__Outputs(this);
  }
}

export class UpdateLastDistributionTimeCall__Inputs {
  _call: UpdateLastDistributionTimeCall;

  constructor(call: UpdateLastDistributionTimeCall) {
    this._call = call;
  }
}

export class UpdateLastDistributionTimeCall__Outputs {
  _call: UpdateLastDistributionTimeCall;

  constructor(call: UpdateLastDistributionTimeCall) {
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
