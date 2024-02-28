import { BigInt, Address, TypedMap, ethereum } from "@graphprotocol/graph-ts"
import {
  Price
} from "../generated/schema"

export class JSONEncoder {
  private _isFirstKey: i32[];
  private result: string[];

  constructor() {
    this._isFirstKey = new Array<i32>(10);
    this.result = new Array<string>();
    this._isFirstKey.push(1);
  }

  get isFirstKey(): boolean {
    return <boolean>this._isFirstKey[this._isFirstKey.length - 1];
  }

  toString(): string {
    return this.result.join("");
  }

  setString(name: string | null, value: string): void {
    this.writeKey(name);
    this.writeString(value);
  }

  setBoolean(name: string | null, value: boolean): void {
    this.writeKey(name);
    this.writeBoolean(value);
  }

  setNull(name: string | null): void {
    this.writeKey(name);
    this.write("null");
  }

  setBigInt(name: string | null, value: BigInt): void {
    this.setString(name, value.toString())
  }

  setAddress(name: string | null, value: Address): void {
    this.setString(name, value.toHexString())
  }

  pushArray(name: string | null): boolean {
    this.writeKey(name);
    this.write("[");
    this._isFirstKey.push(1);
    return true;
  }

  popArray(): void {
    this.write("]");
    this._isFirstKey.pop();
  }

  pushObject(name: string | null): boolean {
    this.writeKey(name);
    this.write("{");
    this._isFirstKey.push(1);
    return true;
  }

  popObject(): void {
    this.write("}");
    this._isFirstKey.pop();
  }

  private writeKey(str: string | null): void {
    if (!this.isFirstKey) {
      this.write(",");
    } else {
      this._isFirstKey[this._isFirstKey.length - 1] = 0;
    }
    if (str != null && (<string>str).length > 0) {
      this.writeString(str!);
      this.write(":");
    }
  }

  private writeString(str: string): void {
    this.write('"');
    let savedIndex = 0;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      let needsEscaping =
        char < 0x20 || char == '"'.charCodeAt(0) || char == "\\".charCodeAt(0);
      if (needsEscaping) {
        this.write(str.substring(savedIndex, i));
        savedIndex = i + 1;
        if (char == '"'.charCodeAt(0)) {
          this.write('\\"');
        } else if (char == "\\".charCodeAt(0)) {
          this.write("\\\\");
        } else if (char == "\b".charCodeAt(0)) {
          this.write("\\b");
        } else if (char == "\n".charCodeAt(0)) {
          this.write("\\n");
        } else if (char == "\r".charCodeAt(0)) {
          this.write("\\r");
        } else if (char == "\t".charCodeAt(0)) {
          this.write("\\t");
        } else {
          // TODO: Implement encoding for other contol characters
          // @ts-ignore integer does have toString
          assert(
            false,
            "Unsupported control character code: " + char.toString()
          );
        }
      }
    }
    this.write(str.substring(savedIndex, str.length));
    this.write('"');
  }

  private writeBoolean(value: boolean): void {
    this.write(value ? "true" : "false");
  }

  private write(str: string): void {
    this.result.push(str);
  }
}

export let WETH = "0xd158b0f013230659098e58b66b602dff8f7ff120"
export let BTC = "0x68f180fcce6836688e9084f035309e29bf0a2095"
export let WLD = "0xdc6ff44d5d932cbd77b52e5612ba0529dc6226f1"
export let OP = "0x4200000000000000000000000000000000000042"
export let USDT = "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
export let USDC = "0x7f5c764cbc14f9669b88837ca1490cca17c31607"
export let PRECISION = BigInt.fromI32(10).pow(30)

export function getTokenPrice(token: Address): BigInt {
  let id = token.toHexString()
  let entity = Price.load(id)
  if (entity != null) {
    return entity.price
  }

  let prices = new TypedMap<String, BigInt>()
  prices.set(WETH, BigInt.fromI32(1900).times(PRECISION))
  prices.set(BTC, BigInt.fromI32(28600).times(PRECISION))
  prices.set(WLD, BigInt.fromI32(227).times(BigInt.fromI32(10).pow(28)))
  prices.set(OP, BigInt.fromI32(172).times(BigInt.fromI32(10).pow(28)))
  prices.set(USDC, PRECISION)
  prices.set(USDT, PRECISION)

  return prices.get(id) as BigInt
}

export function getTokenDecimals(token: String): u8 {
  let tokenDecimals = new Map<String, i32>()
  tokenDecimals.set(WETH, 18)
  tokenDecimals.set(BTC, 8)
  tokenDecimals.set(WLD, 18)
  tokenDecimals.set(OP, 18)
  tokenDecimals.set(USDC, 6)
  tokenDecimals.set(USDT, 6)

  return tokenDecimals.get(token) as u8
}

export function getTokenActionId(token: Address, event: ethereum.Event): string {
  return event.block.timestamp.toString() + ":" + token.toHexString() + ":" + event.transaction.hash.toHexString() + ':' + event.logIndex.toString()
}