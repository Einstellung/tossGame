import { BigNumber, utils } from "ethers"

export const tokenDecimal = (amount: BigNumber) => {
  const decimal = 18
  return utils.formatUnits(amount, decimal)
}