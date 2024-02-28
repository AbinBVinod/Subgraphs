import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  CreateIncreaseOrder,
  CancelIncreaseOrder,
  UpdateIncreaseOrder,
  ExecuteIncreaseOrder,
  CreateDecreaseOrder,
  CancelDecreaseOrder,
  UpdateDecreaseOrder,
  ExecuteDecreaseOrder,
  CreateSwapOrder,
  CancelSwapOrder,
  UpdateSwapOrder,
  ExecuteSwapOrder
} from "../generated/OrderBook/OrderBook"

import {
  CreateIncreasePosition,
  CancelIncreasePosition,
  CreateDecreasePosition,
  CancelDecreasePosition,
  ExecuteIncreasePosition,
  ExecuteDecreasePosition
} from "../generated/PositionRouter/PositionRouter"

import {
  BuyUSDF,
  SellUSDF,
  Swap,
  IncreasePosition,
  DecreasePosition,
  LiquidatePosition,
  UpdatePnl,
  CollectPositionTradeFees
} from "../generated/Vault/Vault"

import {
  CreateSwap,
  ExecuteSwap,
  CancelSwap
} from "../generated/SwapRouter/SwapRouter"

import {
  CreateAddLiquidity,
  CancelAddLiquidity,
  CreateRemoveLiquidity,
  CancelRemoveLiquidity
} from "../generated/LiquidityRouter/LiquidityRouter"

import {
  AddLiquidity,
  RemoveLiquidity
} from "../generated/FlpManager/FlpManager"

import {
  Action, RecentPnl, RecentPositionTradeFees, RecentSwap, TokenLeverageAction, TokenSwapAction, UserFlpStat, UserTradesStat
} from "../generated/schema"

import {
  JSONEncoder, getTokenActionId, getTokenDecimals, getTokenPrice
} from "./helpers"

import {
  timestampToPeriod
} from "../../utils"

const LIQUIDATOR_ADDRESS = "0xe3512bba61a9b3a9db34db97f1721ee4d8e68c86"
const ORDER_KEEPER_ADDRESS = "0x0e164f5e399b670b7ce18c4b6e02d486793e550f"
let ZERO = BigInt.fromI32(0)
let BASIS_POINTS_DIVISOR = BigInt.fromI32(10000)

export function handleCreateIncreaseOrder(event: CreateIncreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("purchaseToken", event.params.purchaseToken)
  encoder.setBigInt("purchaseTokenAmount", event.params.purchaseTokenAmount)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateIncreaseOrder", event.params.account, "trade")
}

export function handleCancelIncreaseOrder(event: CancelIncreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("purchaseToken", event.params.purchaseToken)
  encoder.setBigInt("purchaseTokenAmount", event.params.purchaseTokenAmount)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelIncreaseOrder", event.params.account, "trade")
}

export function handleUpdateIncreaseOrder(event: UpdateIncreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "UpdateIncreaseOrder", event.params.account, "trade")
}

export function handleExecuteIncreaseOrder(event: ExecuteIncreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("purchaseToken", event.params.purchaseToken)
  encoder.setBigInt("purchaseTokenAmount", event.params.purchaseTokenAmount)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("executionPrice", event.params.executionPrice)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "ExecuteIncreaseOrder", event.params.account, "trade")

  if (event.params.purchaseToken.toHexString() != event.params.collateralToken.toHexString()) {
    let recentSwap = RecentSwap.load('swap')
    if (recentSwap != null) {
      let account = event.params.account.toHexString()
      let timestamp = event.block.timestamp
      let key = 'swap'
      
      _storeUserTradesStat(timestamp, "hourly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "daily", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "weekly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "total", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    }
  }
}

export function handleCreateDecreaseOrder(event: CreateDecreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateDecreaseOrder", event.params.account, "trade")
}

export function handleCancelDecreaseOrder(event: CancelDecreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelDecreaseOrder", event.params.account, "trade")
}

export function handleUpdateDecreaseOrder(event: UpdateDecreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "UpdateDecreaseOrder", event.params.account, "trade")
}

export function handleExecuteDecreaseOrder(event: ExecuteDecreaseOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("triggerPrice", event.params.triggerPrice)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("executionPrice", event.params.executionPrice)
  encoder.setBigInt("pnl", _getRecentPnl())
  encoder.setBigInt("fee", _getPositionTradeFees())
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "ExecuteDecreaseOrder", event.params.account, "trade")
}

export function handleCreateSwapOrder(event: CreateSwapOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("triggerRatio", event.params.triggerRatio)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBoolean("shouldUnwrap", event.params.shouldUnwrap)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateSwapOrder", event.params.account, "trade")
}

export function handleCancelSwapOrder(event: CancelSwapOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("triggerRatio", event.params.triggerRatio)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBoolean("shouldUnwrap", event.params.shouldUnwrap)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelSwapOrder", event.params.account, "trade")
}

export function handleUpdateSwapOrder(event: UpdateSwapOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.ordexIndex)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("triggerRatio", event.params.triggerRatio)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBoolean("shouldUnwrap", event.params.shouldUnwrap)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "UpdateSwapOrder", event.params.account, "trade")
}

export function handleExecuteSwapOrder(event: ExecuteSwapOrder): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setBigInt("orderIndex", event.params.orderIndex)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("amountOut", event.params.amountOut)
  encoder.setBigInt("triggerRatio", event.params.triggerRatio)
  encoder.setBoolean("triggerAboveThreshold", event.params.triggerAboveThreshold)
  encoder.setBoolean("shouldUnwrap", event.params.shouldUnwrap)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "ExecuteSwapOrder", event.params.account, "trade")

  if (event.params.path.length == 2) {
    let path: Address[] = event.params.path

    let tokenIn = path[0]
    let tokenInAction = new TokenSwapAction(getTokenActionId(tokenIn, event))
    tokenInAction.token = tokenIn.toHexString()
    tokenInAction.amount = event.params.amountIn
    tokenInAction.price = getTokenPrice(tokenIn)
    tokenInAction.isIn = true
    tokenInAction.timestamp = event.block.timestamp.toI32()
    tokenInAction.save()
  
    let tokenOut = path[1]
    let tokenOutAction = new TokenSwapAction(getTokenActionId(tokenOut, event))
    tokenOutAction.token = tokenOut.toHexString()
    tokenOutAction.amount = event.params.amountOut
    tokenOutAction.price = getTokenPrice(tokenOut)
    tokenOutAction.isIn = false
    tokenOutAction.timestamp = event.block.timestamp.toI32()
    tokenOutAction.save()

    let recentSwap = RecentSwap.load('swap')
    if (recentSwap != null) {
      let account = event.params.account.toHexString()
      let timestamp = event.block.timestamp
      let key = 'swap'
      
      _storeUserTradesStat(timestamp, "hourly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "daily", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "weekly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "total", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    }
  }
}

export function handleCreateIncreasePosition(event: CreateIncreasePosition): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("index", event.params.index)
  encoder.setBigInt("blockNumber", event.params.blockNumber)
  encoder.setBigInt("blockTime", event.params.blockTime)
  encoder.setBigInt("gasPrice", event.params.gasPrice)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateIncreasePosition", event.params.account, "trade")
}

export function handleCancelIncreasePosition(event: CancelIncreasePosition): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("blockGap", event.params.blockGap)
  encoder.setBigInt("timeGap", event.params.timeGap)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelIncreasePosition", event.params.account, "trade")
}

export function handleExecuteIncreasePosition(event: ExecuteIncreasePosition): void {
  let path: Address[] = event.params.path
  if (path.length > 1) {
    let recentSwap = RecentSwap.load('swap')
    if (recentSwap != null) {
      let account = event.params.account.toHexString()
      let timestamp = event.block.timestamp
      let key = 'swap'
      
      _storeUserTradesStat(timestamp, "hourly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "daily", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "weekly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "total", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    }
  }
}

export function handleCreateDecreasePosition(event: CreateDecreasePosition): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setAddress("receiver", event.params.receiver)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("index", event.params.index)
  encoder.setBigInt("blockNumber", event.params.blockNumber)
  encoder.setBigInt("blockTime", event.params.blockTime)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateDecreasePosition", event.params.account, "trade")
}

export function handleCancelDecreasePosition(event: CancelDecreasePosition): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setAddress("receiver", event.params.receiver)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("blockGap", event.params.blockGap)
  encoder.setBigInt("timeGap", event.params.timeGap)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelDecreasePosition", event.params.account, "trade")
}

export function handleExecuteDecreasePosition(event: ExecuteDecreasePosition): void {
  let path: Address[] = event.params.path
  if (path.length > 1) {
    let recentSwap = RecentSwap.load('swap')
    if (recentSwap != null) {
      let account = event.params.account.toHexString()
      let timestamp = event.block.timestamp
      let key = 'swap'
      
      _storeUserTradesStat(timestamp, "hourly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "daily", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "weekly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "total", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    }
  }
}

export function handleBuyUSDF(event: BuyUSDF): void {
  // let encoder = new JSONEncoder()

  // encoder.pushObject(null)
  // encoder.setAddress("account", event.params.account)
  // encoder.setAddress("token", event.params.token)
  // encoder.setBigInt("tokenAmount", event.params.tokenAmount)
  // encoder.setBigInt("usdfAmount", event.params.usdfAmount)
  // encoder.setBigInt("feeBasisPoints", event.params.feeBasisPoints)
  // encoder.popObject()

  // let params = encoder.toString()
  // _storeAction(event, params, "BuyUSDF", event.params.account, "trade")
  let entity = RecentSwap.load('buyUSDF')
  if (entity == null) {
    entity = new RecentSwap('buyUSDF')
  }
  entity.volume = event.params.usdfAmount.times(BigInt.fromString("1000000000000"))
  entity.fee = entity.volume.times(event.params.feeBasisPoints).div(BASIS_POINTS_DIVISOR)
  entity.save()
}

export function handleSellUSDF(event: SellUSDF): void {
  // let encoder = new JSONEncoder()

  // encoder.pushObject(null)
  // encoder.setAddress("account", event.params.account)
  // encoder.setAddress("token", event.params.token)
  // encoder.setBigInt("usdfAmount", event.params.usdfAmount)
  // encoder.setBigInt("tokenAmount", event.params.tokenAmount)
  // encoder.setBigInt("feeBasisPoints", event.params.feeBasisPoints)
  // encoder.popObject()

  // let params = encoder.toString()
  // _storeAction(event, params, "SellUSDF", event.params.account, "trade")

  let entity = RecentSwap.load('sellUSDF')
  if (entity == null) {
    entity = new RecentSwap('sellUSDF')
  }
  entity.volume = event.params.usdfAmount.times(BigInt.fromString("1000000000000"))
  entity.fee = entity.volume.times(event.params.feeBasisPoints).div(BASIS_POINTS_DIVISOR)
  entity.save()
}

export function handleSwap(event: Swap): void {
  // let encoder = new JSONEncoder()

  // encoder.pushObject(null)
  // encoder.setAddress("account", event.params.account)
  // encoder.setAddress("tokenIn", event.params.tokenIn)
  // encoder.setAddress("tokenOut", event.params.tokenOut)
  // encoder.setBigInt("amountIn", event.params.amountIn)
  // encoder.setBigInt("amountOut", event.params.amountOut)
  // encoder.setBigInt("amountOutAfterFees", event.params.amountOutAfterFees)
  // encoder.setBigInt("feeBasisPoints", event.params.feeBasisPoints)
  // encoder.popObject()

  // let params = encoder.toString()
  // _storeAction(event, params, "Swap", event.params.account, "trade")
  let entity = RecentSwap.load('swap')
  if (entity == null) {
    entity = new RecentSwap('swap')
  }

  let decimals = getTokenDecimals(event.params.tokenIn.toHexString())
  let denominator = BigInt.fromString("10").pow(decimals)
  entity.volume = event.params.amountIn.times(getTokenPrice(event.params.tokenIn)).div(denominator)
  entity.fee = entity.volume.times(event.params.feeBasisPoints).div(BASIS_POINTS_DIVISOR)
  entity.save()
}

export function handleIncreasePosition(event: IncreasePosition): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setString("key", event.params.key.toHexString())
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("price", event.params.price)
  encoder.setBigInt("fee", event.params.fee)
  encoder.pushObject("flags")
  encoder.setBoolean("isOrderExecution", event.transaction.from.toHexString() == ORDER_KEEPER_ADDRESS)
  encoder.popObject()
  encoder.popObject()

  let action = "IncreasePosition-"
  let tokenActionType = "increase"
  if (event.params.isLong) {
    action += "Long"
    tokenActionType += "Long"
  } else {
    action += "Short"
    tokenActionType += "Short"
  }

  let params = encoder.toString()
  _storeAction(event, params, action, event.params.account, "trade")

  if (event.params.sizeDelta.gt(BigInt.fromI32(0))) {
    let tokenAction = new TokenLeverageAction(getTokenActionId(event.params.indexToken, event))
    tokenAction.token = event.params.indexToken.toHexString()
    tokenAction.price = getTokenPrice(event.params.indexToken)
    tokenAction.sizeDelta = event.params.sizeDelta
    tokenAction.type = tokenActionType
    tokenAction.timestamp = event.block.timestamp.toI32()
    tokenAction.save()
  }

  let account = event.params.account.toHexString()
  let timestamp = event.block.timestamp
  let key = 'margin'
  
  _storeUserTradesStat(timestamp, "hourly", account, key, event.params.sizeDelta, event.params.fee, ZERO)
  _storeUserTradesStat(timestamp, "daily", account, key, event.params.sizeDelta, event.params.fee, ZERO)
  _storeUserTradesStat(timestamp, "weekly", account, key, event.params.sizeDelta, event.params.fee, ZERO)
  _storeUserTradesStat(timestamp, "total", account, key, event.params.sizeDelta, event.params.fee, ZERO)
}

export function handleDecreasePosition(event: DecreasePosition): void {
  let isLiquidation = event.transaction.from.toHexString() == LIQUIDATOR_ADDRESS
  let pnl = _getRecentPnl()

  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setString("key", event.params.key.toHexString())
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBigInt("collateralDelta", event.params.collateralDelta)
  encoder.setBigInt("sizeDelta", event.params.sizeDelta)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("price", event.params.price)
  encoder.setBigInt("pnl", pnl)
  encoder.setBigInt("fee", event.params.fee)
  encoder.pushObject("flags")
  encoder.setBoolean("isOrderExecution", event.transaction.from.toHexString() == ORDER_KEEPER_ADDRESS)
  encoder.setBoolean("isLiquidation", isLiquidation)
  encoder.popObject()
  encoder.popObject()

  let action = "DecreasePosition-"
  let tokenActionType = "decrease"
  if (isLiquidation) {
    tokenActionType = "liquidatePartial"
  }

  if (event.params.isLong) {
    action += "Long"
    tokenActionType += "Long"
  } else {
    action += "Short"
    tokenActionType += "Short"
  }

  let params = encoder.toString()
  _storeAction(event, params, action, event.params.account, "trade")

  if (event.params.sizeDelta.gt(BigInt.fromI32(0))) {
    let tokenAction = new TokenLeverageAction(getTokenActionId(event.params.indexToken, event))
    tokenAction.token = event.params.indexToken.toHexString()
    tokenAction.price = getTokenPrice(event.params.indexToken)
    tokenAction.sizeDelta = event.params.sizeDelta
    tokenAction.type = tokenActionType
    tokenAction.timestamp = event.block.timestamp.toI32()
    tokenAction.save()
  }

  let account = event.params.account.toHexString()
  let timestamp = event.block.timestamp
  let key = 'margin'
  
  _storeUserTradesStat(timestamp, "hourly", account, key, event.params.sizeDelta, event.params.fee, pnl)
  _storeUserTradesStat(timestamp, "daily", account, key, event.params.sizeDelta, event.params.fee, pnl)
  _storeUserTradesStat(timestamp, "weekly", account, key, event.params.sizeDelta, event.params.fee, pnl)
  _storeUserTradesStat(timestamp, "total", account, key, event.params.sizeDelta, event.params.fee, pnl)
}

export function handleLiquidatePosition(event: LiquidatePosition): void {
  let fee = _getPositionTradeFees()
  let pnl = BigInt.fromI32(0)
  if (fee.lt(event.params.collateral)) {
    pnl = (event.params.collateral.minus(fee)).times(BigInt.fromI32(-1))
  }

  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setString("key", event.params.key.toHexString())
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("collateralToken", event.params.collateralToken)
  encoder.setAddress("indexToken", event.params.indexToken)
  encoder.setBoolean("isLong", event.params.isLong)
  encoder.setBigInt("size", event.params.size)
  encoder.setBigInt("collateral", event.params.collateral)
  encoder.setBigInt("reserveAmount", event.params.reserveAmount)
  encoder.setBigInt("realizedPnl", event.params.realisedPnl)
  encoder.setBigInt("markPrice", event.params.markPrice)
  encoder.setBigInt("pnl", pnl)
  encoder.setBigInt("fee", fee)
  encoder.popObject()

  let action = "LiquidatePosition-"
  let tokenActionType = "liquidateFull"
  if (event.params.isLong) {
    action += "Long"
    tokenActionType += "Long"
  } else {
    action += "Short"
    tokenActionType += "Short"
  }

  let params = encoder.toString()
  _storeAction(event, params, action, event.params.account, "trade")

  let tokenAction = new TokenLeverageAction(getTokenActionId(event.params.indexToken, event))
  tokenAction.token = event.params.indexToken.toHexString()
  tokenAction.price = getTokenPrice(event.params.indexToken)
  tokenAction.sizeDelta = event.params.size
  tokenAction.type = tokenActionType
  tokenAction.timestamp = event.block.timestamp.toI32()
  tokenAction.save()

  let account = event.params.account.toHexString()
  let timestamp = event.block.timestamp
  let key = 'liquidation'
  
  _storeUserTradesStat(timestamp, "hourly", account, key, event.params.size, fee, pnl)
  _storeUserTradesStat(timestamp, "daily", account, key, event.params.size, fee, pnl)
  _storeUserTradesStat(timestamp, "weekly", account, key, event.params.size, fee, pnl)
  _storeUserTradesStat(timestamp, "total", account, key, event.params.size, fee, pnl)
}

export function handleUpdatePnl(event: UpdatePnl): void {
  let entity = RecentPnl.load('recentPnl')
  if (entity == null) {
    entity = new RecentPnl('recentPnl')
  }
  entity.hasProfit = event.params.hasProfit
  entity.delta = event.params.delta
  entity.save()
}

export function handleCollectPositionTradeFees(event: CollectPositionTradeFees): void {
  let entity = RecentPositionTradeFees.load('recentFees')
  if (entity == null) {
    entity = new RecentPositionTradeFees('recentFees')
  }

  entity.fee = event.params.feeUsd
  entity.save()
}

export function handleCreateSwap(event: CreateSwap): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setAddress("receiver", event.params.receiver)
  encoder.setBigInt("acceptableRatio", event.params.acceptableRatio)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("index", event.params.index)
  encoder.setBigInt("blockNumber", event.params.blockNumber)
  encoder.setBigInt("blockTime", event.params.blockTime)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateSwap", event.params.account, "trade")
}

export function handleExecuteSwap(event: ExecuteSwap): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("amountOut", event.params.amountOut)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setAddress("receiver", event.params.receiver)
  encoder.setBigInt("acceptableRatio", event.params.acceptableRatio)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("blockNumber", event.params.blockGap)
  encoder.setBigInt("blockTime", event.params.timeGap)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "ExecuteSwap", event.params.account, "trade")

  if (event.params.path.length == 2) {
    let path: Address[] = event.params.path
    let tokenIn = path[0]
    let tokenInAction = new TokenSwapAction(getTokenActionId(tokenIn, event))
    tokenInAction.token = tokenIn.toHexString()
    tokenInAction.amount = event.params.amountIn
    tokenInAction.price = getTokenPrice(tokenIn)
    tokenInAction.isIn = true
    tokenInAction.timestamp = event.block.timestamp.toI32()
    tokenInAction.save()
  
    let tokenOut = path[1]
    let tokenOutAction = new TokenSwapAction(getTokenActionId(tokenOut, event))
    tokenOutAction.token = tokenOut.toHexString()
    tokenOutAction.amount = event.params.amountOut
    tokenOutAction.price = getTokenPrice(tokenOut)
    tokenOutAction.isIn = false
    tokenOutAction.timestamp = event.block.timestamp.toI32()
    tokenOutAction.save()

    let recentSwap = RecentSwap.load('swap')
    if (recentSwap != null) {
      let account = event.params.account.toHexString()
      let timestamp = event.block.timestamp
      let key = 'swap'
      
      _storeUserTradesStat(timestamp, "hourly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "daily", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "weekly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
      _storeUserTradesStat(timestamp, "total", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    }
  }
}

export function handleCancelSwap(event: CancelSwap): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)

  encoder.pushArray("path")
  for (let i = 0; i < event.params.path.length; ++i) {
    let path: Address[] = event.params.path
    encoder.setAddress(null, path[i])
  }
  encoder.popArray()

  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setAddress("receiver", event.params.receiver)
  encoder.setBigInt("acceptableRatio", event.params.acceptableRatio)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("blockGap", event.params.blockGap)
  encoder.setBigInt("timeGap", event.params.timeGap)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelSwap", event.params.account, "trade")
}

export function handleCreateAddLiquidity(event: CreateAddLiquidity): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("token", event.params.token)
  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minUsdf", event.params.minUsdf)
  encoder.setBigInt("minFlp", event.params.minFlp)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("index", event.params.index)
  encoder.setBigInt("blockNumber", event.params.blockNumber)
  encoder.setBigInt("blockTime", event.params.blockTime)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateAddLiquidity", event.params.account, "liquidity")
}

export function handleCancelAddLiquidity(event: CancelAddLiquidity): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("token", event.params.token)
  encoder.setBigInt("amountIn", event.params.amountIn)
  encoder.setBigInt("minUsdf", event.params.minUsdf)
  encoder.setBigInt("minFlp", event.params.minFlp)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("blockGap", event.params.blockGap)
  encoder.setBigInt("timeGap", event.params.timeGap)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelAddLiquidity", event.params.account, "liquidity")
}

export function handleCreateRemoveLiquidity(event: CreateRemoveLiquidity): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("tokenOut", event.params.tokenOut)
  encoder.setBigInt("flpAmount", event.params.flpAmount)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setAddress("receiver", event.params.receiver)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("index", event.params.index)
  encoder.setBigInt("blockNumber", event.params.blockNumber)
  encoder.setBigInt("blockTime", event.params.blockTime)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CreateRemoveLiquidity", event.params.account, "liquidity")
}

export function handleCancelRemoveLiquidity(event: CancelRemoveLiquidity): void {
  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("tokenOut", event.params.tokenOut)
  encoder.setBigInt("flpAmount", event.params.flpAmount)
  encoder.setBigInt("minOut", event.params.minOut)
  encoder.setAddress("receiver", event.params.receiver)
  encoder.setBigInt("acceptablePrice", event.params.acceptablePrice)
  encoder.setBigInt("executionFee", event.params.executionFee)
  encoder.setBigInt("blockGap", event.params.blockGap)
  encoder.setBigInt("timeGap", event.params.timeGap)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "CancelRemoveLiquidity", event.params.account, "liquidity")
}

export function handleAddLiquidity(event: AddLiquidity): void {
  let account = event.params.account.toHexString()
  let timestamp = event.block.timestamp

  let recentSwap = RecentSwap.load('buyUSDF')
  if (recentSwap != null) {
    let key = 'mint'
    
    _storeUserTradesStat(timestamp, "hourly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    _storeUserTradesStat(timestamp, "daily", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    _storeUserTradesStat(timestamp, "weekly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    _storeUserTradesStat(timestamp, "total", account, key, recentSwap.volume, recentSwap.fee, ZERO)
  }

  let usdAmount = event.params.usdfAmount.times(BigInt.fromString("1000000000000"))
  let flpAmount = event.params.usdfAmount
  if (event.params.aumInUsdf.gt(ZERO)) {
    flpAmount = event.params.usdfAmount.times(event.params.flpSupply).div(event.params.aumInUsdf)
  }

  _storeUserFlpStat(timestamp, "hourly", account, flpAmount, usdAmount, ZERO, ZERO)
  _storeUserFlpStat(timestamp, "daily", account, flpAmount, usdAmount, ZERO, ZERO)
  _storeUserFlpStat(timestamp, "weekly", account, flpAmount, usdAmount, ZERO, ZERO)
  _storeUserFlpStat(timestamp, "total", account, flpAmount, usdAmount, ZERO, ZERO)

  let totalUserFlpStat = UserFlpStat.load("total:0:" + account)
  let netFlpBalance = ZERO
  if (totalUserFlpStat != null) {
    netFlpBalance = totalUserFlpStat.boughtFlp.minus(totalUserFlpStat.soldFlp)
  }

  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("token", event.params.token)
  encoder.setBigInt("amount", event.params.amount)
  encoder.setBigInt("flpAmount", flpAmount)
  encoder.setBigInt("flpBalance", netFlpBalance)
  encoder.setBigInt("aumInUsdf", event.params.aumInUsdf)
  encoder.setBigInt("flpSupply", event.params.flpSupply)
  encoder.setBigInt("usdfAmount", event.params.usdfAmount)
  encoder.setBigInt("mintAmount", event.params.mintAmount)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "AddLiquidity", event.params.account, "liquidity")

}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  let account = event.params.account.toHexString()
  let timestamp = event.block.timestamp

  let recentSwap = RecentSwap.load('sellUSDF')
  if (recentSwap != null) {
    let key = 'burn'
    
    _storeUserTradesStat(timestamp, "hourly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    _storeUserTradesStat(timestamp, "daily", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    _storeUserTradesStat(timestamp, "weekly", account, key, recentSwap.volume, recentSwap.fee, ZERO)
    _storeUserTradesStat(timestamp, "total", account, key, recentSwap.volume, recentSwap.fee, ZERO)
  }

  let usdAmount = event.params.usdfAmount.times(BigInt.fromString("1000000000000"))
  let flpAmount = event.params.flpAmount

  _storeUserFlpStat(timestamp, "hourly", account, ZERO, ZERO, flpAmount, usdAmount)
  _storeUserFlpStat(timestamp, "daily", account, ZERO, ZERO, flpAmount, usdAmount)
  _storeUserFlpStat(timestamp, "weekly", account, ZERO, ZERO, flpAmount, usdAmount)
  _storeUserFlpStat(timestamp, "total", account, ZERO, ZERO, flpAmount, usdAmount)

  let totalUserFlpStat = UserFlpStat.load("total:0:" + account)
  let netFlpBalance = ZERO
  if (totalUserFlpStat != null) {
    netFlpBalance = totalUserFlpStat.boughtFlp.minus(totalUserFlpStat.soldFlp)
  }

  let encoder = new JSONEncoder()

  encoder.pushObject(null)
  encoder.setAddress("account", event.params.account)
  encoder.setAddress("token", event.params.token)
  encoder.setBigInt("flpAmount", event.params.flpAmount)
  encoder.setBigInt("flpBalance", netFlpBalance)
  encoder.setBigInt("aumInUsdf", event.params.aumInUsdf)
  encoder.setBigInt("flpSupply", event.params.flpSupply)
  encoder.setBigInt("usdfAmount", event.params.usdfAmount)
  encoder.setBigInt("amountOut", event.params.amountOut)
  encoder.popObject()

  let params = encoder.toString()
  _storeAction(event, params, "RemoveLiquidity", event.params.account, "liquidity")

}

function _storeAction(
  event: ethereum.Event,
  params: string,
  action: string,
  account: Address,
  type: string
): void {
  let id = _getIdFromEvent(event)

  let entity = new Action(id)
  entity.blockNumber = event.block.number.toI32()
  entity.params = params
  entity.txhash = event.transaction.hash.toHexString()
  entity.action = action
  entity.type = type
  entity.account = account.toHexString()
  entity.timestamp = event.block.timestamp.toI32()

  entity.save()
}

function _getIdFromEvent(event: ethereum.Event): string {
  return event.block.timestamp.toString() + ":" + event.transaction.hash.toHexString() + ':' + event.logIndex.toString()
}

function _getOrCreateUserTradesStat(
  timestamp: BigInt,
  period: string,
  account: string
): UserTradesStat {
  let periodTimestamp = timestampToPeriod(timestamp, period)
  let id = period + ":" + periodTimestamp.toString() + ":" + account

  let entity = UserTradesStat.load(id)
  if (entity === null) {
    entity = new UserTradesStat(id)

    entity.account = account

    entity.swapVolume = ZERO
    entity.marginVolume = ZERO
    entity.liquidationVolume = ZERO
    entity.mintVolume = ZERO
    entity.burnVolume = ZERO

    entity.swapFees = ZERO
    entity.marginFees = ZERO
    entity.liquidationFees = ZERO
    entity.mintFees = ZERO
    entity.burnFees = ZERO
    
    entity.netPnl = ZERO

    entity.timestamp = periodTimestamp.toI32()
    entity.period = period
  }
  entity.lastActiveAt = timestamp.toI32()
  return entity as UserTradesStat
}

function _getRecentPnl(): BigInt {
  let entity = RecentPnl.load('recentPnl')
  if (entity == null) {
    return BigInt.fromI32(0)
  }
  
  if (entity.hasProfit) {
    return entity.delta
  } else {
    return entity.delta.times(BigInt.fromI32(-1))
  }
}

function _getPositionTradeFees(): BigInt {
  let entity = RecentPositionTradeFees.load('recentFees')
  if (entity == null) {
    return BigInt.fromI32(0)
  }
  
  return entity.fee
}

function _storeUserTradesStat(
  timestamp: BigInt,
  period: string,
  account: string,
  key: String,
  volumeDelta: BigInt,
  feeDelta: BigInt,
  pnlDelta: BigInt
): void {
  let entity = _getOrCreateUserTradesStat(timestamp, period, account)

  entity.setBigInt(key + 'Volume', entity.getBigInt(key + 'Volume').plus(volumeDelta))
  entity.setBigInt(key + 'Fees', entity.getBigInt(key + 'Fees').plus(feeDelta))
  
  entity.netPnl = entity.netPnl.plus(pnlDelta)

  entity.save()
}

function _getOrCreateUserFlpStat(
  timestamp: BigInt,
  period: string,
  account: string
): UserFlpStat {
  let periodTimestamp = timestampToPeriod(timestamp, period)
  let id = period + ":" + periodTimestamp.toString() + ":" + account

  let entity = UserFlpStat.load(id)
  if (entity === null) {
    entity = new UserFlpStat(id)

    entity.account = account

    entity.boughtFlp = ZERO
    entity.usdSpentForBuy = ZERO
    entity.soldFlp = ZERO
    entity.usdReceivedForSell = ZERO

    entity.timestamp = periodTimestamp.toI32()
    entity.period = period
  }
  
  return entity as UserFlpStat
}

function _storeUserFlpStat(
  timestamp: BigInt,
  period: string,
  account: string,
  boughtFlp: BigInt,
  usdSpentForBuy: BigInt,
  soldFlp: BigInt,
  usdReceivedForSell: BigInt
): void {
  let entity = _getOrCreateUserFlpStat(timestamp, period, account)

  entity.boughtFlp = entity.boughtFlp.plus(boughtFlp)
  entity.usdSpentForBuy = entity.usdSpentForBuy.plus(usdSpentForBuy)
  entity.soldFlp = entity.soldFlp.plus(soldFlp)
  entity.usdReceivedForSell = entity.usdReceivedForSell.plus(usdReceivedForSell)

  entity.save()
}