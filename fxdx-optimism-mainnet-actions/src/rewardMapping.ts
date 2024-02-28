import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts"
import {
  Distribute
} from "../generated/EsFxdxFxdxRewardDistributor/RewardDistributor"

import {
  Claim
} from "../generated/StakedFxdxTracker/RewardTracker"

import {
  RewardAction,
  RewardsStat
} from "../generated/schema"

import {
  timestampToPeriod
} from "../../utils"

let ZERO = BigInt.fromI32(0)

export function handleDistributeEsFxdxRewards(event: Distribute): void {
  _storeAction(event, "distribute", event.transaction.from, ZERO, ZERO, event.params.amount, ZERO)
}

export function handleDistributeBnFxdxRewards(event: Distribute): void {
  _storeAction(event, "distribute", event.transaction.from, ZERO, event.params.amount, ZERO, ZERO)
}

export function handleDistributeFeeRewards(event: Distribute): void {
  _storeAction(event, "distribute", event.transaction.from, ZERO, ZERO, ZERO, event.params.amount)
}

export function handleClaimFxdxRewards(event: Claim): void {
  _storeAction(event, "claim", event.params.receiver, event.params.amount, ZERO, ZERO, ZERO)
}

export function handleClaimEsFxdxRewards(event: Claim): void {
  _storeAction(event, "claim", event.params.receiver, ZERO, ZERO, event.params.amount, ZERO)
}

export function handleClaimBnFxdxRewards(event: Claim): void {
  _storeAction(event, "claim", event.params.receiver, ZERO, event.params.amount, ZERO, ZERO)
}

export function handleClaimFeeRewards(event: Claim): void {
  _storeAction(event, "claim", event.params.receiver, ZERO, ZERO, ZERO, event.params.amount)
}

function _storeAction(
  event: ethereum.Event,
  type: string,
  account: Address,
  fxdx: BigInt,
  bnFxdx: BigInt,
  esFxdx: BigInt,
  fee: BigInt,
): void {
  let id = _getIdFromEvent(event)

  let entity = RewardAction.load(id)
  if (entity == null) {
    entity = new RewardAction(id)

    entity.blockNumber = event.block.number.toI32()
    entity.type = type
    entity.account = account.toHexString()
    entity.timestamp = event.block.timestamp.toI32()
    entity.txhash = event.transaction.hash.toHexString()

    entity.fxdx = fxdx
    entity.bnFxdx = bnFxdx
    entity.esFxdx = esFxdx
    entity.fee = fee
  } else {
    entity.fxdx = entity.fxdx.plus(fxdx)
    entity.bnFxdx = entity.bnFxdx.plus(bnFxdx)
    entity.esFxdx = entity.esFxdx.plus(esFxdx)
    entity.fee = entity.fee.plus(fee)
  }

  entity.save()

  if (type == "claim") {
    _storeRewardsStat(event.block.timestamp, "hourly", account.toHexString(), fxdx, bnFxdx, esFxdx, fee)
    _storeRewardsStat(event.block.timestamp, "daily", account.toHexString(), fxdx, bnFxdx, esFxdx, fee)
    _storeRewardsStat(event.block.timestamp, "weekly", account.toHexString(), fxdx, bnFxdx, esFxdx, fee)
    _storeRewardsStat(event.block.timestamp, "total", account.toHexString(), fxdx, bnFxdx, esFxdx, fee)

    _storeRewardsStat(event.block.timestamp, "hourly", "total", fxdx, bnFxdx, esFxdx, fee)
    _storeRewardsStat(event.block.timestamp, "daily", "total", fxdx, bnFxdx, esFxdx, fee)
    _storeRewardsStat(event.block.timestamp, "weekly", "total", fxdx, bnFxdx, esFxdx, fee)
    _storeRewardsStat(event.block.timestamp, "total", "total", fxdx, bnFxdx, esFxdx, fee)
  }
}

function _getIdFromEvent(event: ethereum.Event): string {
  return event.block.number.toString() + ":" + event.transaction.hash.toHexString()
}

function _getOrCreateRewardsStat(
  timestamp: BigInt,
  period: string,
  account: string
): RewardsStat {
  let periodTimestamp = timestampToPeriod(timestamp, period)
  let id = period + ":" + periodTimestamp.toString() + ":" + account

  let entity = RewardsStat.load(id)
  if (entity === null) {
    entity = new RewardsStat(id)

    entity.account = account
    entity.fxdx = ZERO
    entity.bnFxdx = ZERO
    entity.esFxdx = ZERO
    entity.fee = ZERO
    entity.timestamp = periodTimestamp.toI32()
    entity.period = period
  }
  return entity as RewardsStat
}

function _storeRewardsStat(
  timestamp: BigInt,
  period: string,
  account: string,
  fxdx: BigInt,
  bnFxdx: BigInt,
  esFxdx: BigInt,
  fee: BigInt
): void {
  let entity = _getOrCreateRewardsStat(timestamp, period, account)

  entity.fxdx = entity.fxdx.plus(fxdx)
  entity.bnFxdx = entity.bnFxdx.plus(bnFxdx)
  entity.esFxdx = entity.esFxdx.plus(esFxdx)
  entity.fee = entity.fee.plus(fee)

  entity.save()
}