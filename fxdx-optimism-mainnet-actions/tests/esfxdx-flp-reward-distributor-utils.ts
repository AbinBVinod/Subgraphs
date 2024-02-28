import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  Distribute,
  TokensPerIntervalChange
} from "../generated/EsfxdxFlpRewardDistributor/EsfxdxFlpRewardDistributor"

export function createDistributeEvent(amount: BigInt): Distribute {
  let distributeEvent = changetype<Distribute>(newMockEvent())

  distributeEvent.parameters = new Array()

  distributeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return distributeEvent
}

export function createTokensPerIntervalChangeEvent(
  amount: BigInt
): TokensPerIntervalChange {
  let tokensPerIntervalChangeEvent = changetype<TokensPerIntervalChange>(
    newMockEvent()
  )

  tokensPerIntervalChangeEvent.parameters = new Array()

  tokensPerIntervalChangeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensPerIntervalChangeEvent
}
