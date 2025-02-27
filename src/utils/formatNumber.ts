import { BigNumber } from '@ethersproject/bignumber'
import { commify, formatUnits } from '@ethersproject/units'
import { ZERO } from '@src/constants'

export const formatNumber = (v: string, decimals = 18, visibleDecimals = 5) => {
  try {
    const bv = BigNumber.from(v)

    if (bv.eq(ZERO)) {
      return '0'
    }

    if (bv.lt(BigNumber.from(10).pow(decimals - 6))) {
      return '< 0.000001'
    }

    const remainder = bv.mod(BigNumber.from(10).pow(decimals - visibleDecimals))

    return commify(formatUnits(bv.sub(remainder), decimals))
  } catch {
    return v
  }
}
