import { BigInt, Address } from "@graphprotocol/graph-ts"

import {
  Price
} from "../generated/schema"

import {
  PriceUpdate
} from '../generated/FastPriceEvents/FastPriceEvents'

function _storePrice(
  timestamp: BigInt,
  token: Address,
  price: BigInt
): void {
  let id = token.toHexString()

  let entity = Price.load(id)

  if (entity == null) {
    entity = new Price(id)
  }

  entity.price = price
  entity.timestamp = timestamp.toI32()

  entity.save()
}

export function handlePriceUpdate(event: PriceUpdate): void {
  _storePrice(event.block.timestamp, event.params.token, event.params.price)
}
