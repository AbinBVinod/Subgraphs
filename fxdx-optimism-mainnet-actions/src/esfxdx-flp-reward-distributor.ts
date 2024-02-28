import {
  Distribute as DistributeEvent,
  TokensPerIntervalChange as TokensPerIntervalChangeEvent
} from "../generated/EsfxdxFlpRewardDistributor/EsfxdxFlpRewardDistributor"
import { Distribute, TokensPerIntervalChange } from "../generated/schema"

export function handleDistribute(event: DistributeEvent): void {
  let entity = new Distribute(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensPerIntervalChange(
  event: TokensPerIntervalChangeEvent
): void {
  let entity = new TokensPerIntervalChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
